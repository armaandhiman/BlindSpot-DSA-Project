
// ==========================================
// BLINDSPOT AUTHENTICATION SYSTEM
// ==========================================

const API_URL = "http://localhost:3000/api";

let currentMode = "login";


// ==========================================
// DOM ELEMENTS
// ==========================================

const authForm = document.getElementById("auth-form");

const nameGroup = document.getElementById("name-group");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const authTitle = document.getElementById("auth-title");

const authSubtitle = document.getElementById("auth-subtitle");

const authMessage = document.getElementById("auth-message");

const submitButton = document.getElementById("submit-button");

const loginTab = document.getElementById("login-tab");

const registerTab = document.getElementById("register-tab");

const switchText = document.getElementById("switch-text");

const switchButton = document.getElementById("switch-button");


// ==========================================
// CHANGE LOGIN / REGISTER MODE
// ==========================================

function setAuthMode(mode) {

    currentMode = mode;

    authMessage.textContent = "";
    authMessage.className = "auth-message";

    if (mode === "register") {

        nameGroup.classList.remove("hidden");

        nameInput.required = true;

        authTitle.textContent = "Create your account.";

        authSubtitle.textContent =
            "Start making more thoughtful decisions.";

        submitButton.textContent = "Create Account";

        loginTab.classList.remove("active");

        registerTab.classList.add("active");

        switchText.textContent = "Already have an account?";

        switchButton.textContent = "Login";

    } else {

        nameGroup.classList.add("hidden");

        nameInput.required = false;

        authTitle.textContent = "Welcome back.";

        authSubtitle.textContent =
            "Login to continue your journey.";

        submitButton.textContent = "Login to BlindSpot";

        registerTab.classList.remove("active");

        loginTab.classList.add("active");

        switchText.textContent = "New to BlindSpot?";

        switchButton.textContent = "Create an account";

    }

}


// ==========================================
// SHOW MESSAGE
// ==========================================

function showMessage(message, type = "error") {

    authMessage.textContent = message;

    authMessage.className = "auth-message";

    if (type === "success") {

        authMessage.classList.add("success");

    }

}


// ==========================================
// HANDLE FORM SUBMISSION
// ==========================================

authForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const email = emailInput.value.trim();

    const password = passwordInput.value;

    const name = nameInput.value.trim();

    if (currentMode === "register" && name.length < 2) {

        showMessage("Please enter your full name.");

        return;

    }

    if (password.length < 8) {

        showMessage("Password must contain at least 8 characters.");

        return;

    }

    const endpoint = currentMode === "register"
        ? "/register"
        : "/login";

    const requestBody = currentMode === "register"
        ? { name, email, password }
        : { email, password };

    submitButton.disabled = true;

    submitButton.textContent =
        currentMode === "register"
            ? "Creating account..."
            : "Logging in...";

    showMessage("");

    try {

        const response = await fetch(API_URL + endpoint, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            credentials: "include",

            body: JSON.stringify(requestBody)

        });

        const data = await response.json();

        if (!response.ok) {

            throw new Error(
                data.message || "Something went wrong."
            );

        }

        showMessage(data.message, "success");

        // Save basic user information for frontend display.

        sessionStorage.setItem(
            "blindspotUser",
            JSON.stringify(data.user)
        );

        // Redirect after successful authentication.

        setTimeout(() => {

            window.location.href = "index.html";

        }, 700);

    }

    catch (error) {

        showMessage(error.message);

    }

    finally {

        submitButton.disabled = false;

        submitButton.textContent =
            currentMode === "register"
                ? "Create Account"
                : "Login to BlindSpot";

    }

});


// ==========================================
// TAB BUTTONS
// ==========================================

loginTab.addEventListener("click", () => {

    setAuthMode("login");

});

registerTab.addEventListener("click", () => {

    setAuthMode("register");

});

switchButton.addEventListener("click", () => {

    setAuthMode(
        currentMode === "login"
            ? "register"
            : "login"
    );

});


// ==========================================
// CHECK EXISTING SESSION
// ==========================================

async function checkExistingSession() {

    try {

        const response = await fetch(API_URL + "/me", {

            method: "GET",

            credentials: "include"

        });

        if (response.ok) {

            const data = await response.json();

            sessionStorage.setItem(
                "blindspotUser",
                JSON.stringify(data.user)
            );

            window.location.href = "index.html";

        }

    }

    catch (error) {

        console.log("No active session found.");

    }

}


// ==========================================
// INITIALIZE
// ==========================================

setAuthMode("login");

checkExistingSession();

console.log("BlindSpot authentication frontend loaded.");
