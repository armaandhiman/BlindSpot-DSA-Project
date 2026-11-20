/* ==========================================
   BLINDSPOT - DECISION DISCOVERY ENGINE
========================================== */

// 1. KNOWLEDGE GRAPH DATABASE

const factorDatabase = {

    financial: {
        title: "Financial considerations",
        description: "Money, expenses and financial consequences.",
        perspective: "financial",
        importance: 9,
        related: ["hiddenCost", "opportunity", "resources"]
    },

    opportunity: {
        title: "Opportunity cost",
        description: "What opportunities might you lose by choosing this option?",
        perspective: "financial",
        importance: 8,
        related: ["alternatives", "future", "time"]
    },

    hiddenCost: {
        title: "Hidden costs",
        description: "Additional expenses that may not be immediately obvious.",
        perspective: "financial",
        importance: 9,
        related: ["financial", "maintenance"]
    },

    time: {
        title: "Time investment",
        description: "How much time will this decision require?",
        perspective: "practical",
        importance: 8,
        related: ["opportunity", "routine"]
    },

    maintenance: {
        title: "Maintenance requirements",
        description: "What ongoing effort will be required?",
        perspective: "practical",
        importance: 7,
        related: ["hiddenCost", "resources"]
    },

    resources: {
        title: "Resource availability",
        description: "Do you have the resources needed to make this work?",
        perspective: "practical",
        importance: 8,
        related: ["time", "financial"]
    },

    alternatives: {
        title: "Alternative options",
        description: "Are there better alternatives you haven't explored?",
        perspective: "personal",
        importance: 9,
        related: ["opportunity", "future"]
    },

    risk: {
        title: "Potential risks",
        description: "What could go wrong, and how would you handle it?",
        perspective: "risk",
        importance: 10,
        related: ["backup", "hiddenCost"]
    },

    backup: {
        title: "Backup plan",
        description: "What happens if your original plan fails?",
        perspective: "risk",
        importance: 9,
        related: ["risk", "alternatives"]
    },

    dependency: {
        title: "External dependencies",
        description: "Does success depend on other people, services or systems?",
        perspective: "risk",
        importance: 7,
        related: ["risk", "resources"]
    },

    future: {
        title: "Long-term consequences",
        description: "How might this decision affect your future?",
        perspective: "future",
        importance: 9,
        related: ["opportunity", "time"]
    },

    flexibility: {
        title: "Future flexibility",
        description: "Can you change your decision later if circumstances change?",
        perspective: "future",
        importance: 8,
        related: ["alternatives", "risk"]
    },

    lifestyle: {
        title: "Lifestyle impact",
        description: "How will this affect your everyday life and routine?",
        perspective: "personal",
        importance: 8,
        related: ["time", "health"]
    },

    health: {
        title: "Health and wellbeing",
        description: "Could this affect your physical or mental wellbeing?",
        perspective: "personal",
        importance: 9,
        related: ["lifestyle", "time"]
    },

    compatibility: {
        title: "Compatibility",
        description: "Does this fit your existing needs and circumstances?",
        perspective: "practical",
        importance: 7,
        related: ["resources", "alternatives"]
    },

    learning: {
        title: "Learning requirements",
        description: "What new skills or knowledge will you need?",
        perspective: "future",
        importance: 7,
        related: ["time", "resources"]
    },

    social: {
        title: "Social impact",
        description: "How might this affect your relationships and support network?",
        perspective: "personal",
        importance: 7,
        related: ["lifestyle", "dependency"]
    },

    legal: {
        title: "Legal considerations",
        description: "Are there regulations, permissions or contractual obligations?",
        perspective: "risk",
        importance: 9,
        related: ["dependency", "hiddenCost"]
    },

    // AUTOMOBILE-SPECIFIC FACTORS

    vehicleType: {
        title: "Vehicle type and suitability",
        description: "Does a hatchback, sedan, SUV or other vehicle suit your daily needs?",
        perspective: "practical",
        importance: 9,
        related: ["usagePattern", "parking", "alternatives"]
    },

    fuelType: {
        title: "Fuel type and efficiency",
        description: "Compare petrol, diesel, CNG, hybrid and electric options.",
        perspective: "financial",
        importance: 9,
        related: ["runningCost", "usagePattern", "alternatives"]
    },

    runningCost: {
        title: "Real-world running costs",
        description: "Estimate monthly fuel or electricity expenses using your expected distance and vehicle efficiency.",
        perspective: "financial",
        importance: 10,
        related: ["fuelType", "maintenance", "financial"]
    },

    insurance: {
        title: "Insurance and protection",
        description: "Consider annual insurance premiums, coverage, deductibles and repair expenses.",
        perspective: "financial",
        importance: 8,
        related: ["hiddenCost", "risk"]
    },

    depreciation: {
        title: "Vehicle depreciation",
        description: "Consider how the vehicle may lose value over time.",
        perspective: "financial",
        importance: 8,
        related: ["future", "alternatives", "resaleValue"]
    },

    parking: {
        title: "Parking and infrastructure",
        description: "Check parking availability, road conditions and EV charging access.",
        perspective: "practical",
        importance: 8,
        related: ["vehicleType", "usagePattern"]
    },

    usagePattern: {
        title: "Daily driving requirements",
        description: "Evaluate your commute, highway journeys, average distance and frequency of use.",
        perspective: "practical",
        importance: 10,
        related: ["vehicleType", "fuelType", "runningCost"]
    },

    safetyFeatures: {
        title: "Vehicle safety",
        description: "Evaluate crash-test ratings, airbags, braking systems and driver assistance features.",
        perspective: "risk",
        importance: 10,
        related: ["vehicleType", "insurance", "risk"]
    },

    resaleValue: {
        title: "Resale value",
        description: "Consider resale demand, brand reputation and expected ownership period.",
        perspective: "future",
        importance: 8,
        related: ["depreciation", "maintenance"]
    },

    financing: {
        title: "Car loan and financing",
        description: "Evaluate down payment, monthly EMI, interest rates and loan tenure.",
        perspective: "financial",
        importance: 10,
        related: ["financial", "hiddenCost", "alternatives"]
    }

};


// ==========================================
// BLINDSPOT: EXPANDED DOMAIN KNOWLEDGE BASE
// ==========================================

Object.assign(factorDatabase, {

    // RELATIONSHIP FACTORS

    trust: {
        title: "Trust and Honesty",
        description: "Evaluate whether both people are honest, dependable and transparent with each other.",
        perspective: "Relationship",
        importance: 10,
        related: ["communication", "emotionalSafety", "respect"]
    },

    emotionalSafety: {
        title: "Emotional Safety",
        description: "Can you express your feelings, concerns and vulnerabilities without fear of humiliation, threats or punishment?",
        perspective: "Relationship",
        importance: 10,
        related: ["trust", "respect", "communication", "boundaries"]
    },

    respect: {
        title: "Mutual Respect",
        description: "Consider whether both partners respect each other's opinions, individuality, time and personal choices.",
        perspective: "Relationship",
        importance: 10,
        related: ["boundaries", "trust", "compatibility"]
    },

    communication: {
        title: "Communication Quality",
        description: "Examine whether you can discuss difficult topics openly, listen to each other and resolve misunderstandings.",
        perspective: "Relationship",
        importance: 9,
        related: ["trust", "emotionalSafety", "conflictResolution"]
    },

    boundaries: {
        title: "Personal Boundaries",
        description: "Consider whether both partners respect privacy, independence, consent and personal boundaries.",
        perspective: "Relationship",
        importance: 10,
        related: ["respect", "emotionalSafety", "lifestyle"]
    },

    conflictResolution: {
        title: "Conflict Resolution",
        description: "Look at how disagreements are handled. Are problems discussed constructively or do they involve repeated blame, insults or avoidance?",
        perspective: "Relationship",
        importance: 9,
        related: ["communication", "respect", "trust"]
    },

    sharedValues: {
        title: "Shared Values and Goals",
        description: "Consider whether your important beliefs, priorities and expectations for the future are compatible.",
        perspective: "Relationship",
        importance: 8,
        related: ["compatibility", "future", "lifestyle"]
    },

    emotionalCompatibility: {
        title: "Emotional Compatibility",
        description: "Evaluate whether your emotional needs, expectations and ways of showing affection are compatible.",
        perspective: "Relationship",
        importance: 8,
        related: ["communication", "sharedValues", "compatibility"]
    },

    // CAREER FACTORS

    jobStability: {
        title: "Job Stability",
        description: "Evaluate the security of the role, company financial health, industry conditions and possibility of layoffs.",
        perspective: "Career",
        importance: 9,
        related: ["financial", "risk", "backup"]
    },

    careerGrowth: {
        title: "Career Growth",
        description: "Consider promotion opportunities, increasing responsibility and the long-term direction this role offers.",
        perspective: "Career",
        importance: 10,
        related: ["opportunity", "learning", "future"]
    },

    workCulture: {
        title: "Workplace Culture",
        description: "Evaluate management style, team relationships, workplace expectations and whether the environment supports you.",
        perspective: "Career",
        importance: 8,
        related: ["social", "health", "lifestyle"]
    },

    skillDevelopment: {
        title: "Skill Development",
        description: "Consider whether this opportunity helps you develop relevant technical, professional and transferable skills.",
        perspective: "Career",
        importance: 9,
        related: ["learning", "future", "opportunity"]
    },

    workLifeBalance: {
        title: "Work-Life Balance",
        description: "Evaluate working hours, flexibility, commute, stress and the time left for your personal life.",
        perspective: "Career",
        importance: 8,
        related: ["time", "health", "lifestyle"]
    },

    // EDUCATION FACTORS

    universityReputation: {
        title: "University Reputation",
        description: "Evaluate academic reputation, accreditation, faculty quality and recognition in your chosen field.",
        perspective: "Education",
        importance: 8,
        related: ["opportunity", "future", "alternatives"]
    },

    placementOpportunities: {
        title: "Placement Opportunities",
        description: "Research placement rates, recruiting companies, average outcomes and opportunities in your target career.",
        perspective: "Education",
        importance: 9,
        related: ["careerGrowth", "financial", "opportunity"]
    },

    academicFit: {
        title: "Academic Fit",
        description: "Consider whether the curriculum, teaching approach and specialization match your interests and goals.",
        perspective: "Education",
        importance: 9,
        related: ["learning", "future", "compatibility"]
    },

    educationCost: {
        title: "Total Education Cost",
        description: "Calculate tuition, accommodation, living expenses, books, travel and other costs across the entire program.",
        perspective: "Education",
        importance: 10,
        related: ["financial", "hiddenCost", "risk"]
    },

    // FINANCIAL FACTORS

    emergencyFund: {
        title: "Emergency Fund",
        description: "Check whether you have enough accessible savings to handle unexpected expenses without financial distress.",
        perspective: "Finance",
        importance: 9,
        related: ["financial", "risk", "backup"]
    },

    debtBurden: {
        title: "Debt Burden",
        description: "Evaluate existing loans, interest rates, repayment obligations and how new debt affects your finances.",
        perspective: "Finance",
        importance: 10,
        related: ["financial", "hiddenCost", "risk"]
    },

    cashFlow: {
        title: "Monthly Cash Flow",
        description: "Compare regular income with expenses and determine whether this decision leaves you with enough monthly flexibility.",
        perspective: "Finance",
        importance: 9,
        related: ["financial", "hiddenCost", "lifestyle"]
    },

    opportunityCost: {
        title: "Opportunity Cost",
        description: "Consider what other investments, goals or opportunities you may give up by committing your money here.",
        perspective: "Finance",
        importance: 8,
        related: ["alternatives", "financial", "future"]
    },

    // RELOCATION FACTORS

    costOfLiving: {
        title: "Local Cost of Living",
        description: "Estimate rent, groceries, transport, utilities and everyday expenses in your destination city.",
        perspective: "Relocation",
        importance: 10,
        related: ["financial", "hiddenCost", "lifestyle"]
    },

    housingAvailability: {
        title: "Housing Availability",
        description: "Research rental prices, housing quality, deposits, neighbourhoods and distance from work or study.",
        perspective: "Relocation",
        importance: 9,
        related: ["costOfLiving", "financial", "lifestyle"]
    },

    socialSupport: {
        title: "Social Support Network",
        description: "Consider access to friends, family, community and people who can support you after relocating.",
        perspective: "Relocation",
        importance: 8,
        related: ["social", "health", "lifestyle"]
    },

    localOpportunities: {
        title: "Local Opportunities",
        description: "Evaluate career options, educational institutions, professional networks and growth opportunities at the destination.",
        perspective: "Relocation",
        importance: 9,
        related: ["opportunity", "future", "careerGrowth"]
    }

});


// ==========================================
// DEEPER RELATIONSHIP FACTORS
// ==========================================

Object.assign(factorDatabase, {

    consistency: {
        title: "Consistency of Actions",
        description: "Do actions consistently match promises, or is there a repeated gap between words and behaviour?",
        perspective: "Relationship",
        importance: 9,
        related: ["trust", "accountability"]
    },

    accountability: {
        title: "Accountability",
        description: "Can both partners acknowledge mistakes, take responsibility and make meaningful changes?",
        perspective: "Relationship",
        importance: 9,
        related: ["conflictResolution", "respect"]
    },

    independence: {
        title: "Personal Independence",
        description: "Can both people maintain their friendships, interests, identity and individual goals?",
        perspective: "Relationship",
        importance: 8,
        related: ["boundaries", "emotionalSafety"]
    },

    familyExpectations: {
        title: "Family Expectations",
        description: "Have you discussed family involvement, cultural expectations and how these may affect your future together?",
        perspective: "Relationship",
        importance: 7,
        related: ["sharedValues", "future"]
    },

    financialCompatibility: {
        title: "Financial Compatibility",
        description: "Are your attitudes towards spending, saving, debt and financial responsibilities compatible?",
        perspective: "Relationship",
        importance: 8,
        related: ["sharedValues", "financial"]
    },

    futureCommitment: {
        title: "Future Commitment",
        description: "Are both partners aligned on commitment, marriage expectations and the direction of the relationship?",
        perspective: "Relationship",
        importance: 9,
        related: ["sharedValues", "compatibility"]
    },

    emotionalEffort: {
        title: "Emotional Effort",
        description: "Is emotional support, affection and effort mutual rather than consistently coming from just one person?",
        perspective: "Relationship",
        importance: 9,
        related: ["communication", "emotionalSafety"]
    },

    conflictPatterns: {
        title: "Recurring Conflict Patterns",
        description: "Are the same disagreements repeating without resolution, or are both partners learning and improving?",
        perspective: "Relationship",
        importance: 8,
        related: ["conflictResolution", "communication"]
    }

});


// Connect deeper factors to existing relationship factors.

factorDatabase.trust.related.push("consistency");

factorDatabase.respect.related.push("accountability");

factorDatabase.boundaries.related.push("independence");

factorDatabase.sharedValues.related.push(
    "familyExpectations",
    "financialCompatibility",
    "futureCommitment"
);

factorDatabase.emotionalSafety.related.push("emotionalEffort");

factorDatabase.conflictResolution.related.push("conflictPatterns");

console.log("Expanded domain knowledge base loaded.");

// 2. DECISION KEYWORD PROFILES

const profiles = [

    // AUTOMOBILE DECISIONS

    {
        keywords: [
            "car", "cars", "automobile", "vehicle",
            "sedan", "hatchback", "suv", "crossover",
            "electric vehicle", "ev", "used car", "new car"
        ],

        factors: [
            "vehicleType", "fuelType", "runningCost",
            "insurance", "depreciation", "parking",
            "usagePattern", "safetyFeatures", "resaleValue",
            "financing", "maintenance", "hiddenCost",
            "alternatives", "risk"
        ]
    },

    // CAREER DECISIONS

    {
        keywords: [
            "job", "career", "employment",
            "work", "salary", "profession",
            "promotion", "company"
        ],

        factors: [
            "financial", "opportunity", "time",
            "future", "risk", "backup",
            "lifestyle", "learning", "social",
            "flexibility", "alternatives"
        ]
    },

    // RELOCATION DECISIONS

    {
        keywords: [
            "move", "moving", "relocate",
            "relocation", "city", "abroad",
            "country", "migrate"
        ],

        factors: [
            "financial", "hiddenCost", "time",
            "lifestyle", "social", "health",
            "opportunity", "risk", "backup",
            "future", "flexibility", "alternatives"
        ]
    },

    // TECHNOLOGY PURCHASES

    {
        keywords: [
            "laptop", "computer", "phone",
            "mobile", "device", "gadget"
        ],

        factors: [
            "financial", "hiddenCost", "maintenance",
            "compatibility", "alternatives",
            "future", "risk", "resources"
        ]
    },

    // EDUCATION DECISIONS

    {
        keywords: [
            "college", "university", "degree",
            "education", "course", "study",
            "school", "admission"
        ],

        factors: [
            "financial", "opportunity", "time",
            "future", "learning", "social",
            "alternatives", "compatibility",
            "risk", "lifestyle"
        ]
    },

    // BUSINESS DECISIONS

    {
        keywords: [
            "business", "startup", "entrepreneur",
            "found", "venture", "market"
        ],

        factors: [
            "financial", "hiddenCost", "risk",
            "backup", "opportunity", "time",
            "resources", "legal", "dependency",
            "future", "alternatives"
        ]
    },

    // TRAVEL DECISIONS

    {
        keywords: [
            "travel", "trip", "vacation",
            "holiday", "visit", "tour"
        ],

        factors: [
            "financial", "hiddenCost", "time",
            "health", "risk", "backup",
            "legal", "lifestyle", "alternatives"
        ]
    },

    // RELATIONSHIP DECISIONS

    {
        keywords: [
            "relationship", "marriage",
            "partner", "friendship", "dating"
        ],

        factors: [
            "social", "lifestyle", "health",
            "future", "time", "compatibility",
            "alternatives", "flexibility"
        ]
    },

    // INVESTMENT DECISIONS

    {
        keywords: [
            "invest", "investment", "stock",
            "money", "property", "finance"
        ],

        factors: [
            "financial", "risk", "backup",
            "opportunity", "future", "alternatives",
            "hiddenCost", "legal"
        ]
    },

    // EXPANDED DOMAIN PROFILES

    // RELATIONSHIP

    {
        keywords: [
            "relationship", "partner", "dating",
            "marriage", "boyfriend", "girlfriend",
            "breakup", "compatibility", "couple",
            "toxic relationship", "my partner"
        ],

        factors: [
            "trust",
            "emotionalSafety",
            "respect",
            "communication",
            "boundaries",
            "conflictResolution",
            "sharedValues",
            "emotionalCompatibility"
        ]
    },

    // CAREER

    {
        keywords: [
            "job", "career", "resign", "quit",
            "promotion", "switch job", "new job",
            "workplace", "profession", "internship"
        ],

        factors: [
            "jobStability",
            "careerGrowth",
            "workCulture",
            "skillDevelopment",
            "workLifeBalance"
        ]
    },

    // EDUCATION

    {
        keywords: [
            "university", "college", "degree",
            "masters", "ms", "mba", "study abroad",
            "higher education", "admission",
            "course", "phd"
        ],

        factors: [
            "universityReputation",
            "placementOpportunities",
            "academicFit",
            "educationCost",
            "learning"
        ]
    },

    // FINANCE

    {
        keywords: [
            "investment", "invest", "loan",
            "debt", "savings", "financial",
            "money", "budget", "stock",
            "mutual fund", "property"
        ],

        factors: [
            "emergencyFund",
            "debtBurden",
            "cashFlow",
            "opportunityCost",
            "risk"
        ]
    },

    // RELOCATION

    {
        keywords: [
            "relocate", "relocation", "move to",
            "moving to", "shift to", "abroad",
            "move abroad", "new city",
            "settle in", "migrate"
        ],

        factors: [
            "costOfLiving",
            "housingAvailability",
            "socialSupport",
            "localOpportunities",
            "health",
            "lifestyle"
        ]
    }

];


// 3. UNIVERSAL FACTORS

const universalFactors = [
    "alternatives",
    "risk",
    "future",
    "time",
    "financial"
];


// APPLICATION STATE

let discoveredFactors = [];
let consideredFactors = new Set();
let currentDecision = "";
let currentDecisionId = null;
let currentPerspective = "all";
let extraFactors = [];
let expandedFactors = new Set();


// 5. HELPER FUNCTIONS

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(char) {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];

    });

}


function getFactor(id) {

    return factorDatabase[id];

}



// ==========================================
// SAVE DECISION TO DATABASE
// ==========================================

async function saveCurrentDecision() {

    if (!currentDecision) return;

    const factors = [
        ...new Set([
            ...discoveredFactors.map(factor => factor.id),
            ...extraFactors.map(factor => factor.id)
        ])
    ];

    const considered = [...consideredFactors];

    const isUpdate = currentDecisionId !== null;

    const url = isUpdate
        ? `http://localhost:3000/api/decisions/${currentDecisionId}`
        : "http://localhost:3000/api/decisions";

    try {

        const response = await fetch(url, {
            method: isUpdate ? "PUT" : "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                decision: currentDecision,
                factors: factors,
                consideredFactors: considered
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Could not save decision.");
        }

        if (!isUpdate && data.decisionId) {
            currentDecisionId = data.decisionId;
        }

    } catch (error) {

        console.error("Decision save error:", error);

    }

}


// 6. ANALYZE USER DECISION

async function startAnalysis() {

    const input = document.getElementById("decision");

    const decision = input.value.trim();

    if (decision.length < 5) {
        alert("Please describe your decision in more detail.");
        input.focus();
        return;
    }

    if (decision.length > 500) {
        alert("Please keep your decision under 500 characters.");
        return;
    }

    currentDecision = decision;
    currentDecisionId = null;

    consideredFactors.clear();
    expandedFactors.clear();
    extraFactors = [];

    const loading = document.getElementById("loading");
    const results = document.getElementById("results");

    loading.classList.remove("hidden");
    results.classList.add("hidden");

    document.getElementById("analyzer").scrollIntoView({
        behavior: "smooth"
    });

    const messages = [
        "Understanding your decision...",
        "Searching connected factors...",
        "Running C++ graph traversal...",
        "Ranking discovered factors..."
    ];

    let index = 0;

    const loadingText = document.getElementById("loading-text");

    loadingText.textContent = messages[index];

    const interval = setInterval(() => {

        index = (index + 1) % messages.length;

        loadingText.textContent = messages[index];

    }, 700);

    try {

        // STEP 1: Identify starting factors using JavaScript

        discoverFactors(decision);

        const startingFactors = discoveredFactors.map(
            factor => factor.id
        );

        // STEP 2: Send factors to Node.js backend

        const response = await fetch(
            "http://localhost:3000/api/discover",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    factors: startingFactors,

                    depth: 2

                })

            }
        );

        if (!response.ok) {

            throw new Error(
                "Backend error: " + response.status
            );

        }

        const data = await response.json();

        if (!data.success || !Array.isArray(data.discovered)) {

            throw new Error("Invalid response from C++ engine.");

        }

        // STEP 3: Merge original and C++ discovered factors

        const allFactorIds = new Set([
            ...startingFactors,
            ...data.discovered
        ]);

        // STEP 4: Update results using actual C++ output

        discoveredFactors = Array.from(allFactorIds)

            .filter(id => factorDatabase[id])

            .map(id => ({
                id: id,
                ...factorDatabase[id]
            }));

        // STEP 5: Rank factors by importance

        discoveredFactors.sort((a, b) => {

            return b.importance - a.importance;

        });

        // STEP 6: Display final results

        clearInterval(interval);

        renderResults();

        // SAVE DECISION TO DATABASE

        await saveCurrentDecision();

        loading.classList.add("hidden");

        results.classList.remove("hidden");

        results.scrollIntoView({
            behavior: "smooth"
        });

        console.log("C++ BFS Results:", data.discovered);

        console.log("Total factors:", discoveredFactors.length);

    }

    catch (error) {

        clearInterval(interval);

        loading.classList.add("hidden");

        console.error("BlindSpot Error:", error);

        alert(
            "Could not connect to the C++ engine. " +
            "Make sure the Node.js backend is running."
        );

    }

}

// 7. DISCOVER FACTORS USING KEYWORDS

function discoverFactors(decision) {

    const text = decision.toLowerCase();

    let selected = new Set(universalFactors);

    profiles.forEach(profile => {

        const matched = profile.keywords.some(keyword => {

            const pattern = new RegExp(
                "\\b" + keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b",
                "i"
            );

            return pattern.test(text);

        });

        if (matched) {

            profile.factors.forEach(id => {
                selected.add(id);
            });

        }

    });

    // Include general factors when no specialized profile matches.

    if (selected.size === universalFactors.length) {

        [
            "resources",
            "compatibility",
            "dependency",
            "flexibility",
            "backup",
            "learning"
        ].forEach(id => selected.add(id));

    }

    discoveredFactors = Array.from(selected).map(id => {

        return {
            id: id,
            ...getFactor(id)
        };

    });

    // Rank factors by importance.

    discoveredFactors.sort((a, b) => {

        return b.importance - a.importance;

    });

}


// 8. RENDER RESULTS

function renderResults() {

    document.getElementById("result-decision").textContent =
        "Decision: " + currentDecision;

    document.getElementById("total-factors").textContent =
        discoveredFactors.length + extraFactors.length;

    document.getElementById("missing-factors").textContent =
        discoveredFactors.length + extraFactors.length -
        consideredFactors.size;

    updateCoverage();

    renderFactors();

    renderGraph();

}


// 9. UPDATE COVERAGE SCORE

function updateCoverage() {

    const total = discoveredFactors.length + extraFactors.length;

    const coverage = total === 0
        ? 0
        : Math.round((consideredFactors.size / total) * 100);

    document.getElementById("coverage-score").textContent =
        coverage + "%";

    document.getElementById("missing-factors").textContent =
        total - consideredFactors.size;

}


// 10. RENDER FACTOR CARDS

function renderFactors() {

    const container = document.getElementById("factor-list");

    let factors = [...discoveredFactors, ...extraFactors];

    if (currentPerspective !== "all") {

        factors = factors.filter(factor => {

            return factor.perspective === currentPerspective;

        });

    }

    document.getElementById("factor-count").textContent =
        factors.length + " factors";

    if (factors.length === 0) {

        container.innerHTML =
            "<p>No factors available in this perspective.</p>";

        return;

    }

    container.innerHTML = factors.map(factor => {

        const checked = consideredFactors.has(factor.id);

        return `

            <div class="factor-card">

                <h4>${escapeHTML(factor.title)}</h4>

                <p>${escapeHTML(factor.description)}</p>

                <div class="factor-meta">

                    <span class="factor-category">
                        ${escapeHTML(factor.perspective)}
                    </span>

                    <span class="importance">
                        Importance: ${factor.importance}/10
                    </span>

                </div>

                <button
                    class="perspective-btn ${checked ? "active" : ""}"
                    style="margin-top:15px"
                    onclick="toggleConsidered('${escapeHTML(factor.id)}')"
                >
                    ${checked ? "✓ Considered" : "Mark as considered"}
                </button>

            </div>

        `;

    }).join("");

}


// 11. MARK FACTORS AS CONSIDERED

function toggleConsidered(id) {

    if (consideredFactors.has(id)) {

        consideredFactors.delete(id);

    } else {

        consideredFactors.add(id);

    }

    renderFactors();

    updateCoverage();

    renderGraph();

    saveCurrentDecision();

}


// 12. PERSPECTIVE FILTER

document.querySelectorAll(".perspective-btn[data-perspective]")
    .forEach(button => {

        button.addEventListener("click", function() {

            document.querySelectorAll(
                ".perspective-btn[data-perspective]"
            ).forEach(btn => btn.classList.remove("active"));

            this.classList.add("active");

            currentPerspective = this.dataset.perspective;

            renderFactors();

        });

    });


// 13. GENERATE GRAPH VISUALIZATION

function renderGraph() {

    const container = document.getElementById("graph-container");

    const factors = [
        ...discoveredFactors,
        ...extraFactors
    ];

    const width = Math.max(container.clientWidth, 320);
    const height = 380;

    const centerX = width / 2;
    const centerY = height / 2;

    const radius = Math.min(width * 0.32, 135);

    const nodes = factors.slice(0, 10);

    if (nodes.length === 0) return;

    let svg = `
        <svg viewBox="0 0 ${width} ${height}"
             xmlns="http://www.w3.org/2000/svg">

            <defs>
                <radialGradient id="centerGlow">
                    <stop offset="0%" stop-color="#927cff"/>
                    <stop offset="100%" stop-color="#5141b5"/>
                </radialGradient>
            </defs>
    `;

    // Draw connections.

    nodes.forEach((factor, index) => {

        const angle =
            (index / nodes.length) * Math.PI * 2 - Math.PI / 2;

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        svg += `
            <line
                class="graph-edge"
                x1="${centerX}"
                y1="${centerY}"
                x2="${x}"
                y2="${y}"
            />
        `;

    });

    // Draw center node.

    svg += `
        <circle
            cx="${centerX}"
            cy="${centerY}"
            r="43"
            fill="url(#centerGlow)"
            stroke="#b4a8ff"
            stroke-width="2"
        />

        <text
            x="${centerX}"
            y="${centerY}"
            fill="white"
            font-size="11"
            font-weight="bold"
            text-anchor="middle"
            dominant-baseline="middle"
        >
            DECISION
        </text>
    `;

    // Draw factor nodes.

    nodes.forEach((factor, index) => {

        const angle =
            (index / nodes.length) * Math.PI * 2 - Math.PI / 2;

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const isConsidered = consideredFactors.has(factor.id);

        svg += `

            <g
                class="graph-node"
                onclick="exploreFactor('${escapeHTML(factor.id)}')"
            >

                <circle
                    cx="${x}"
                    cy="${y}"
                    r="17"
                    fill="${isConsidered ? "#247f69" : "#5141a8"}"
                    stroke="${isConsidered ? "#42d6a4" : "#a99dff"}"
                />

                <text
                    x="${x}"
                    y="${y + 30}"
                >
                    ${escapeHTML(factor.title.split(" ")[0])}
                </text>

            </g>

        `;

    });

    svg += "</svg>";

    container.innerHTML = svg;

}

// 14. EXPLORE CONNECTED FACTORS

function exploreFactor(id) {

    const factor =
        factorDatabase[id] ||
        extraFactors.find(item => item.id === id);

    if (!factor) return;

    const oldPanel = document.getElementById(
        "factor-detail-overlay"
    );

    if (oldPanel) oldPanel.remove();

    const relatedFactors = (factor.related || [])
        .map(relatedId => {

            return factorDatabase[relatedId] ||
                extraFactors.find(item => item.id === relatedId);

        })
        .filter(Boolean);

    const isConsidered = consideredFactors.has(id);

    const overlay = document.createElement("div");

    overlay.id = "factor-detail-overlay";
    overlay.className = "factor-detail-overlay";

    overlay.innerHTML = `

        <div class="factor-detail-panel">

            <div class="detail-header">

                <div>
                    <span class="detail-eyebrow">
                        BLINDSPOT DISCOVERY
                    </span>

                    <h2>${escapeHTML(factor.title)}</h2>
                </div>

                <button
                    class="detail-close"
                    id="close-factor-panel"
                    aria-label="Close panel"
                >
                    &times;
                </button>

            </div>

            <div class="detail-importance">

                <div>
                    <span class="detail-muted">
                        Importance score
                    </span>

                    <strong>
                        ${factor.importance}/10
                    </strong>
                </div>

                <div class="importance-track">
                    <div
                        class="importance-fill"
                        style="width:${factor.importance * 10}%"
                    ></div>
                </div>

            </div>

            <div class="detail-section">

                <h3>Why should you consider this?</h3>

                <p>${escapeHTML(factor.description)}</p>

            </div>

            <div class="detail-section">

                <h3>Perspective</h3>

                <span class="detail-category">
                    ${escapeHTML(factor.perspective)}
                </span>

            </div>

            <div class="detail-section">

                <h3>Connected considerations</h3>

                <div class="connected-factor-list">

                    ${
                        relatedFactors.length > 0

                        ? relatedFactors.map(item => `

                            <button
                                class="connected-factor"
                                data-factor-id="${escapeHTML(item.id)}"
                            >
                                <span>
                                    ${escapeHTML(item.title)}
                                </span>

                                <span>↗</span>
                            </button>

                        `).join("")

                        : `
                            <p class="detail-muted">
                                No additional connections available yet.
                            </p>
                        `
                    }

                </div>

            </div>

            <div class="detail-footer">

                <button
                    id="mark-factor"
                    class="detail-action ${isConsidered ? "marked" : ""}"
                >
                    ${
                        isConsidered
                        ? "✓ Already considered"
                        : "Mark as considered"
                    }
                </button>

            </div>

        </div>

    `;

    document.body.appendChild(overlay);

    // Close panel

    document.getElementById(
        "close-factor-panel"
    ).addEventListener("click", () => {

        overlay.remove();

    });

    // Close when clicking outside panel

    overlay.addEventListener("click", event => {

        if (event.target === overlay) {

            overlay.remove();

        }

    });

    // Explore connected factors

    overlay.querySelectorAll(".connected-factor")
        .forEach(button => {

            button.addEventListener("click", () => {

                exploreFactor(button.dataset.factorId);

            });

        });

    // Mark factor as considered

    document.getElementById("mark-factor")
        .addEventListener("click", function() {

            if (consideredFactors.has(id)) {

                consideredFactors.delete(id);

            } else {

                consideredFactors.add(id);

            }

            renderFactors();

            updateCoverage();

            renderGraph();

            saveCurrentDecision();

            overlay.remove();

            exploreFactor(id);

        });

}


// 15. SECOND-LEVEL DISCOVERY

function discoverDeeper() {

    const newFactors = [];

    const currentIds = new Set([
        ...discoveredFactors.map(f => f.id),
        ...extraFactors.map(f => f.id)
    ]);

    // Explore connections from discovered factors.

    discoveredFactors.forEach(factor => {

        if (!consideredFactors.has(factor.id)) {

            factor.related.forEach(id => {

                if (!currentIds.has(id) &&
                    !expandedFactors.has(id)) {

                    const connected = getFactor(id);

                    if (connected) {

                        newFactors.push({
                            id: id,
                            ...connected
                        });

                        expandedFactors.add(id);

                    }

                }

            });

        }

    });

    // Add new factors.

    extraFactors.push(...newFactors);

    if (newFactors.length === 0) {

        alert(
            "No new connected factors found. " +
            "Try considering or exploring existing factors."
        );

        return;

    }

    // Update interface.

    renderResults();

    saveCurrentDecision();

    alert(
        newFactors.length +
        " deeper factors discovered!"
    );

}


// 16. ADD CUSTOM FACTOR

function addCustomFactor() {

    const input = document.querySelector(
        "#custom-factor, #custom-factor-input"
    );

    if (!input) {
        console.error("Custom factor input not found");
        return;
    }

    const title = input.value.trim();

    if (title.length < 3) {
        alert("Please enter at least 3 characters.");
        return;
    }

    const id = "custom_" + Date.now();

    const customFactor = {
        id: id,
        title: title,
        description:
            "A custom consideration added by you. Think about how it could influence your decision.",
        perspective: "Personal",
        importance: 5,
        related: []
    };

    extraFactors.push(customFactor);

    input.value = "";

    renderResults();

    saveCurrentDecision();

}


// 17. RESET ANALYSIS

function resetAnalysis() {

    currentDecision = "";
    currentDecisionId = null;

    discoveredFactors = [];

    consideredFactors.clear();

    extraFactors = [];

    expandedFactors.clear();

    currentPerspective = "all";

    const input = document.getElementById("decision");

    if (input) input.value = "";

    const results = document.getElementById("results");

    if (results) results.classList.add("hidden");

    const loading = document.getElementById("loading");

    if (loading) loading.classList.add("hidden");

    const panel = document.getElementById(
        "factor-detail-overlay"
    );

    if (panel) panel.remove();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// 18. CHARACTER COUNTER

const decisionInput = document.getElementById("decision");

if (decisionInput) {

    decisionInput.addEventListener("input", function() {

        const counter = document.getElementById("char-count");

        if (counter) {

            counter.textContent =
                this.value.length + "/500";

        }

    });

}


// 19. BUTTON EVENT LISTENERS

const analyzeButton = document.getElementById("analyze-btn");

if (analyzeButton) {

    analyzeButton.addEventListener("click", startAnalysis);

}

const deeperButton = document.getElementById("discover-deeper-btn");

if (deeperButton) {

    deeperButton.addEventListener("click", discoverDeeper);

}

const customButton = document.querySelector(
    "#add-custom-btn, #add-factor-btn"
);

if (customButton) {

    customButton.addEventListener("click", addCustomFactor);

}

const resetButton = document.getElementById("reset-btn");

if (resetButton) {

    resetButton.addEventListener("click", resetAnalysis);

}


// 20. INITIALIZE APPLICATION

console.log("BlindSpot initialized successfully.");


// 21. SCROLL TO ANALYZER

function scrollToAnalyzer() {

    document.getElementById("analyzer").scrollIntoView({
        behavior: "smooth"
    });

}


// 22. WINDOW RESIZE

window.addEventListener("resize", function() {

    const results = document.getElementById("results");

    if (results && !results.classList.contains("hidden")) {

        renderGraph();

    }

});


// 23. ENGINE INITIALIZED

console.log("BlindSpot Discovery Engine initialized.");
console.log("Knowledge graph loaded.");