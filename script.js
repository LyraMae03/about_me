
// ========================================
// DARK MODE
// ========================================

const themeToggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("lyra-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
} else {
    document.body.classList.remove("dark-mode");
    themeToggle.textContent = "🌙";
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
}

// Toggle dark mode
themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");

    if (isDark) {
        themeToggle.textContent = "☀️";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
        localStorage.setItem("lyra-theme", "dark");
    } else {
        themeToggle.textContent = "🌙";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
        localStorage.setItem("lyra-theme", "light");
    }
});


// ========================================
// MOBILE NAVIGATION
// ========================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});


// ========================================
// SCROLL REVEAL ANIMATION
// ========================================

// Reveal page elements as they enter the screen.
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
});


// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        }
    });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));


// ========================================
// TYPEWRITER ANIMATION
// ========================================

const typingText = document.getElementById("typingText");

const words = [
    "IT Graduate",
    "Aspiring Web Developer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 60 : 110;

    // Pause after completing a word
    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1500;
        isDeleting = true;
    }

    // Move to the next word after erasing
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

// Start animation
if (typingText) {
    typeEffect();
}
