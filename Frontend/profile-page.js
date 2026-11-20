
const API_URL = "http://localhost:3000/api";

async function loadProfile() {
    try {
        const response = await fetch(API_URL + "/me", {
            credentials: "include"
        });

        if (!response.ok) {
            window.location.href = "auth.html";
            return;
        }

        const data = await response.json();
        const user = data.user;

        document.getElementById("profile-name").textContent = user.name;
        document.getElementById("profile-email").textContent = user.email;

        document.getElementById("info-name").textContent = user.name;
        document.getElementById("info-email").textContent = user.email;

        document.getElementById("profile-avatar").textContent =
            user.name.charAt(0).toUpperCase();

        const created = user.created_at
            ? new Date(user.created_at).toLocaleDateString()
            : "Not available";

        document.getElementById("info-created").textContent = created;
       
// Calculate membership days
const createdDate = user.created_at
    ? new Date(user.created_at)
    : new Date();

const days = Math.max(
    0,
    Math.floor(
        (Date.now() - createdDate.getTime()) /
        (1000 * 60 * 60 * 24)
    )
);

document.getElementById("member-days").textContent = days;

// Temporary statistics (database integration pending)
document.getElementById("total-decisions").textContent = 0;
document.getElementById("total-factors").textContent = 0;
document.getElementById("explored-factors").textContent = 0;

    } catch (error) {
        console.error("Profile loading error:", error);
        alert("Unable to load profile. Please check your server.");
    }
}

document.getElementById("profile-logout").addEventListener("click", async () => {
    try {
        const response = await fetch(API_URL + "/logout", {
            method: "POST",
            credentials: "include"
        });

        if (!response.ok) throw new Error("Logout failed");

        sessionStorage.removeItem("blindspotUser");
        window.location.href = "auth.html";

    } catch (error) {
        alert("Logout failed. Please try again.");
    }
});

loadProfile();
