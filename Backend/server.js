
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const initSqlJs = require("sql.js");

const app = express();
const PORT = 3000;

const SESSION_SECRET =
    process.env.SESSION_SECRET || "blindspot-local-development-secret-change-this";

const executablePath = path.join(__dirname, "..", "Dsa", "blindspot");
const databaseDirectory = path.join(__dirname, "database");
const databasePath = path.join(databaseDirectory, "blindspot.db");

let db;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors({
    origin: [
        "http://127.0.0.1:5505",
        "http://localhost:5505"
    ],
    credentials: true
}));

app.use(express.json({ limit: "1mb" }));

app.use(session({
    name: "blindspot.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// ==========================================
// DATABASE HELPERS
// ==========================================

function saveDatabase() {
    const data = db.export();
    fs.writeFileSync(databasePath, Buffer.from(data));
}

function getRows(sql, params = []) {
    const statement = db.prepare(sql);
    statement.bind(params);

    const rows = [];

    while (statement.step()) {
        rows.push(statement.getAsObject());
    }

    statement.free();
    return rows;
}

function getUserByEmail(email) {
    const rows = getRows(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows[0] || null;
}

function getUserById(id) {
    const rows = getRows(
        "SELECT id, name, email, created_at FROM users WHERE id = ?",
        [id]
    );

    return rows[0] || null;
}

// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({
            success: false,
            message: "Please login first."
        });
    }

    next();
}

// ==========================================
// HOME API
// ==========================================

app.get("/", (req, res) => {
    res.json({
        message: "BlindSpot backend is running!",
        authentication: true
    });
});

// ==========================================
// REGISTER API
// ==========================================

app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email and password."
            });
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim().toLowerCase();

        if (cleanName.length < 2 || cleanName.length > 60) {
            return res.status(400).json({
                success: false,
                message: "Name must contain 2 to 60 characters."
            });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        if (password.length < 8 || password.length > 72) {
            return res.status(400).json({
                success: false,
                message: "Password must contain 8 to 72 characters."
            });
        }

        if (getUserByEmail(cleanEmail)) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists."
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        db.run(
            `INSERT INTO users (name, email, password_hash, created_at)
             VALUES (?, ?, ?, ?)`,
            [
                cleanName,
                cleanEmail,
                passwordHash,
                new Date().toISOString()
            ]
        );

        saveDatabase();

        const user = getUserByEmail(cleanEmail);

        req.session.regenerate(error => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "Account created, but login session could not start."
                });
            }

            req.session.userId = user.id;

            req.session.save(sessionError => {
                if (sessionError) {
                    return res.status(500).json({
                        success: false,
                        message: "Could not start login session."
                    });
                }

                res.status(201).json({
                    success: true,
                    message: "Account created successfully!",
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        created_at: user.created_at
                    }
                });
            });
        });

    } catch (error) {
        console.error("Registration error:", error);

        res.status(500).json({
            success: false,
            message: "Registration failed."
        });
    }
});

// ==========================================
// LOGIN API
// ==========================================

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const cleanEmail = email.trim().toLowerCase();
        const user = getUserByEmail(cleanEmail);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        req.session.regenerate(error => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: "Could not create login session."
                });
            }

            req.session.userId = user.id;

            req.session.save(sessionError => {
                if (sessionError) {
                    return res.status(500).json({
                        success: false,
                        message: "Could not save login session."
                    });
                }

                res.json({
                    success: true,
                    message: "Login successful!",
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        created_at: user.created_at
                    }
                });
            });
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Login failed."
        });
    }
});

// ==========================================
// CURRENT USER API
// ==========================================

app.get("/api/me", requireLogin, (req, res) => {
    const user = getUserById(req.session.userId);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found."
        });
    }

    res.json({
        success: true,
        user
    });
});

// ==========================================
// LOGOUT API
// ==========================================

app.post("/api/logout", requireLogin, (req, res) => {
    req.session.destroy(error => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Logout failed."
            });
        }

        res.clearCookie("blindspot.sid");

        res.json({
            success: true,
            message: "Logged out successfully."
        });
    });
});

// ==========================================
// C++ GRAPH DISCOVERY API
// ==========================================

app.post("/api/discover", (req, res) => {
    const { factors, depth = 2 } = req.body;

    if (
        !Array.isArray(factors) ||
        factors.length === 0 ||
        !factors.every(f => typeof f === "string") ||
        !Number.isInteger(Number(depth)) ||
        Number(depth) < 0 ||
        Number(depth) > 10
    ) {
        return res.status(400).json({
            error: "Invalid factors or depth."
        });
    }

    const cpp = spawn(executablePath);

    let output = "";
    let errorOutput = "";
    let responseSent = false;

    cpp.stdout.on("data", chunk => {
        output += chunk.toString();
    });

    cpp.stderr.on("data", chunk => {
        errorOutput += chunk.toString();
    });

    cpp.on("error", error => {
        if (responseSent) return;

        responseSent = true;

        res.status(500).json({
            error: "Could not execute C++ engine.",
            details: error.message
        });
    });

    cpp.on("close", code => {
        if (responseSent) return;

        responseSent = true;

        if (code !== 0) {
            return res.status(500).json({
                error: "C++ execution failed.",
                details: errorOutput
            });
        }

        const discovered = output
            .trim()
            .split(",")
            .filter(Boolean);

        res.json({
            success: true,
            discovered
        });
    });

    cpp.stdin.write(
        factors.join(",") + "\n" + Number(depth) + "\n"
    );

    cpp.stdin.end();
});

// ==========================================
// SAVE NEW DECISION
// ==========================================

app.post("/api/decisions", requireLogin, (req, res) => {
    try {
        const {
            decision,
            factors,
            consideredFactors = []
        } = req.body;

        if (
            typeof decision !== "string" ||
            decision.trim().length < 5 ||
            decision.trim().length > 500 ||
            !Array.isArray(factors) ||
            !factors.every(f => typeof f === "string") ||
            !Array.isArray(consideredFactors) ||
            !consideredFactors.every(f => typeof f === "string")
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid decision data."
            });
        }

        const now = new Date().toISOString();

        db.run(
            `INSERT INTO decisions
            (user_id, decision, factors, considered_factors,
             factor_count, considered_count, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                req.session.userId,
                decision.trim(),
                JSON.stringify(factors),
                JSON.stringify(consideredFactors),
                factors.length,
                consideredFactors.length,
                now,
                now
            ]
        );

        const result = getRows(
            "SELECT last_insert_rowid() AS id"
        )[0];

        saveDatabase();

        res.status(201).json({
            success: true,
            message: "Decision saved successfully.",
            decisionId: result.id
        });

    } catch (error) {
        console.error("Save decision error:", error);

        res.status(500).json({
            success: false,
            message: "Could not save decision."
        });
    }
});

// ==========================================
// UPDATE EXISTING DECISION
// ==========================================

app.put("/api/decisions/:id", requireLogin, (req, res) => {
    try {
        const decisionId = Number(req.params.id);
        const { factors, consideredFactors = [] } = req.body;

        if (
            !Number.isInteger(decisionId) ||
            decisionId <= 0 ||
            !Array.isArray(factors) ||
            !factors.every(f => typeof f === "string") ||
            !Array.isArray(consideredFactors) ||
            !consideredFactors.every(f => typeof f === "string")
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid decision update."
            });
        }

        const existing = getRows(
            "SELECT id FROM decisions WHERE id = ? AND user_id = ?",
            [decisionId, req.session.userId]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Decision not found."
            });
        }

        db.run(
            `UPDATE decisions
             SET factors = ?,
                 considered_factors = ?,
                 factor_count = ?,
                 considered_count = ?,
                 updated_at = ?
             WHERE id = ? AND user_id = ?`,
            [
                JSON.stringify(factors),
                JSON.stringify(consideredFactors),
                factors.length,
                consideredFactors.length,
                new Date().toISOString(),
                decisionId,
                req.session.userId
            ]
        );

        saveDatabase();

        res.json({
            success: true,
            message: "Decision updated successfully."
        });

    } catch (error) {
        console.error("Update decision error:", error);

        res.status(500).json({
            success: false,
            message: "Could not update decision."
        });
    }
});

// ==========================================
// GET USER DECISION HISTORY
// ==========================================

app.get("/api/decisions", requireLogin, (req, res) => {
    try {
        const decisions = getRows(
            `SELECT id, decision, factors, considered_factors,
                    factor_count, considered_count, created_at, updated_at
             FROM decisions
             WHERE user_id = ?
             ORDER BY created_at DESC`,
            [req.session.userId]
        ).map(item => ({
            ...item,
            factors: JSON.parse(item.factors || "[]"),
            considered_factors: JSON.parse(
                item.considered_factors || "[]"
            )
        }));

        res.json({
            success: true,
            decisions
        });

    } catch (error) {
        console.error("Get decisions error:", error);

        res.status(500).json({
            success: false,
            message: "Could not load decisions."
        });
    }
});

// ==========================================
// PROFILE STATISTICS API
// ==========================================

app.get("/api/profile/stats", requireLogin, (req, res) => {
    try {
        const stats = getRows(
            `SELECT
                COUNT(*) AS total_decisions,
                COALESCE(SUM(factor_count), 0) AS total_factors,
                COALESCE(SUM(considered_count), 0) AS total_considered
             FROM decisions
             WHERE user_id = ?`,
            [req.session.userId]
        )[0];

        res.json({
            success: true,
            stats
        });

    } catch (error) {
        console.error("Profile stats error:", error);

        res.status(500).json({
            success: false,
            message: "Could not load profile statistics."
        });
    }
});

// ==========================================
// START SERVER + INITIALIZE DATABASE
// ==========================================

async function startServer() {
    try {
        fs.mkdirSync(databaseDirectory, {
            recursive: true
        });

        const SQL = await initSqlJs();

        if (fs.existsSync(databasePath)) {
            const fileBuffer = fs.readFileSync(databasePath);
            db = new SQL.Database(fileBuffer);
        } else {
            db = new SQL.Database();
        }

        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS decisions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                decision TEXT NOT NULL,
                factors TEXT NOT NULL DEFAULT '[]',
                considered_factors TEXT NOT NULL DEFAULT '[]',
                factor_count INTEGER NOT NULL DEFAULT 0,
                considered_count INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);
        // MIGRATE EXISTING DECISIONS TABLE

const decisionColumns = db.exec(
    "PRAGMA table_info(decisions)"
)[0].values.map(column => column[1]);

if (!decisionColumns.includes("factor_count")) {
    db.run(`
        ALTER TABLE decisions
        ADD COLUMN factor_count INTEGER NOT NULL DEFAULT 0
    `);
}

if (!decisionColumns.includes("considered_count")) {
    db.run(`
        ALTER TABLE decisions
        ADD COLUMN considered_count INTEGER NOT NULL DEFAULT 0
    `);
}

console.log("Decision database migration checked.");

        saveDatabase();

        app.listen(PORT, () => {
            console.log("--------------------------------");
            console.log("BLINDSPOT BACKEND STARTED");
            console.log("--------------------------------");
            console.log(`Server running at http://localhost:${PORT}`);
            console.log("Authentication APIs are ready.");
            console.log("C++ discovery API is preserved.");
            console.log("Decision history APIs are ready.");
        });

    } catch (error) {
        console.error("Could not start BlindSpot:", error);
        process.exit(1);
    }
}

startServer();
