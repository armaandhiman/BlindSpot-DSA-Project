
// ==========================================
// BLINDSPOT USER NAVIGATION
// ==========================================

const AUTH_API = "http://localhost:3000/api";

async function loadNavbarUser() {

    const guestNav = document.getElementById("guest-nav");
    const userNav = document.getElementById("user-nav");

    if (!guestNav || !userNav) return;

    try {

        const response = await fetch(AUTH_API + "/me", {
            credentials: "include"
        });

        if (!response.ok) {
            guestNav.classList.remove("hidden");
            userNav.classList.add("hidden");
            return;
        }

        const data = await response.json();
        const user = data.user;

        sessionStorage.setItem(
            "blindspotUser",
            JSON.stringify(user)
        );

        document.getElementById("nav-username").textContent =
            user.name;

        document.getElementById("dropdown-name").textContent =
            user.name;

        document.getElementById("dropdown-email").textContent =
            user.email;

        document.getElementById("nav-avatar").src =
            "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(user.name) +
            "&background=5141a8&color=fff&size=128";

        guestNav.classList.add("hidden");
        userNav.classList.remove("hidden");

    } catch (error) {

        console.error("Could not load user:", error);

        guestNav.classList.remove("hidden");
        userNav.classList.add("hidden");

    }

}


// Profile dropdown

const profileMenuButton = document.getElementById(
    "profile-menu-btn"
);

const profileDropdown = document.getElementById(
    "profile-dropdown"
);

if (profileMenuButton && profileDropdown) {

    profileMenuButton.addEventListener("click", function() {

        profileDropdown.classList.toggle("hidden");

    });

    document.addEventListener("click", function(event) {

        if (
            !profileMenuButton.contains(event.target) &&
            !profileDropdown.contains(event.target)
        ) {

            profileDropdown.classList.add("hidden");

        }

    });

}


// Logout

const logoutButton = document.getElementById("logout-btn");

if (logoutButton) {

    logoutButton.addEventListener("click", async function() {

        try {

            const response = await fetch(
                AUTH_API + "/logout",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            if (!response.ok) {
                throw new Error("Logout failed.");
            }

            sessionStorage.removeItem("blindspotUser");

            window.location.href = "auth.html";

        } catch (error) {

            alert("Could not logout. Please try again.");

            console.error(error);

        }

    });

}


// Initialize navbar

loadNavbarUser();
