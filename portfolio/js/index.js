const modeToggle = document.getElementById("mode-toggle");
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    if (modeToggle) {
        const darkMode = theme === "dark";
        modeToggle.querySelector("img").src = darkMode ? "../images/sun.png" : "../images/moon.png";
        modeToggle.setAttribute("aria-label", darkMode ? "Switch to light theme" : "Switch to dark theme");
    }
}

setTheme(savedTheme || (prefersDark ? "dark" : "light"));

modeToggle?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
});

document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
});
