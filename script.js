
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

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible");
        }
    });
}, {
    threshold: 0.12
});

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


// ========================================
// MINI DEVELOPER TERMINAL
// ========================================

(() => {
    const terminalForm = document.getElementById("terminalForm");
    const terminalInput = document.getElementById("terminalInput");
    const terminalOutput = document.getElementById("terminalOutput");

    if (!terminalForm || !terminalInput || !terminalOutput) return;


// Typing animation for terminal placeholder
const placeholderText = "Type a command...";
let placeholderIndex = 0;
let deletingPlaceholder = false;

function animatePlaceholder() {
    if (document.activeElement === terminalInput) {
        setTimeout(animatePlaceholder, 300);
        return;
    }

    if (!deletingPlaceholder) {
        placeholderIndex++;
        terminalInput.placeholder =
            placeholderText.substring(0, placeholderIndex);

        if (placeholderIndex === placeholderText.length) {
            deletingPlaceholder = true;
            setTimeout(animatePlaceholder, 1500);
            return;
        }
    } else {
        placeholderIndex--;
        terminalInput.placeholder =
            placeholderText.substring(0, placeholderIndex);

        if (placeholderIndex === 0) {
            deletingPlaceholder = false;
        }
    }

    setTimeout(animatePlaceholder, deletingPlaceholder ? 60 : 100);
}

animatePlaceholder();


    function printLine(text, className = "") {
        const line = document.createElement("p");
        line.textContent = text;

        if (className) {
            line.className = className;
        }

        terminalOutput.appendChild(line);
    }

    function printLink(text, url) {
        const line = document.createElement("p");
        const link = document.createElement("a");

        link.textContent = text;
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.style.color = "#f3a7c4";
        link.style.textDecoration = "underline";

        line.appendChild(link);
        terminalOutput.appendChild(line);
    }

    function runCommand(command) {
        const cmd = command.toLowerCase().trim();

        if (!cmd) return;

        printLine(`lyra@portfolio:~$ ${command}`);

        switch (cmd) {
            case "help":
                printLine("Available commands:", "terminal-result-title");
                printLine("about     - Learn more about me");
                printLine("skills    - View my technical skills");
                printLine("contact   - Get my contact information");
                printLine("portfolio - Visit my portfolio website");
                printLine("clear     - Clear the terminal");
                printLine("help      - Show available commands");
                break;

            case "about":
                printLine("ABOUT ME", "terminal-result-title");
                printLine("Hi! I'm Lyra Mae Borling.");
                printLine("I'm a BS Information Technology graduate from EARIST, Batch 2026.");
                printLine("I'm interested in frontend and backend development.");
                printLine("Currently learning, exploring, and improving my coding skills.");
                break;

            case "skills":
                printLine("MY TECHNICAL SKILLS", "terminal-result-title");
                printLine("HTML & CSS");
                printLine("JavaScript");
                printLine("React");
                printLine("PHP & MySQL");
                printLine("Node.js");
                printLine("Flutter");
                break;

            case "contact":
                printLine("LET'S CONNECT!", "terminal-result-title");
                printLine("Email: lyraborling03@gmail.com");
                printLink(
                    "Send me an email ↗",
                    "mailto:lyraborling03@gmail.com"
                );
                printLink(
                    "Visit my GitHub ↗",
                    "https://github.com/LyraMae03"
                );
                break;

            case "portfolio":
                printLine("MY PORTFOLIO WEBSITE", "terminal-result-title");
                printLine("Check out my portfolio here:");
                printLink("Visit my portfolio ↗", "https://lyramaeportfolio.vercel.app/");
                break;

            case "clear":
                terminalOutput.innerHTML = "";
                break;

            default:
                printLine(
                    `Command not found: ${command}. Type "help" to see available commands.`,
                    "terminal-error"
                );
        }

        // Automatically scroll to the latest output
        terminalOutput.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }

    terminalForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const command = terminalInput.value.trim();

        if (!command) return;

        runCommand(command);
        terminalInput.value = "";
    });
})();

// ========================================
// SPARKLE CURSOR TRAIL
// ========================================

(() => {
    const sparkleColors = ["#f3a7c4", "#e58aaa", "#d8a7ff", "#ffffff"];

    let lastSparkle = 0;

    document.addEventListener("mousemove", (event) => {
        const now = Date.now();

        // Control sparkle frequency
        if (now - lastSparkle < 40) return;
        lastSparkle = now;

        const sparkle = document.createElement("span");

        sparkle.className = "cursor-sparkle";
        sparkle.textContent = "✦";

        sparkle.style.left = `${event.clientX}px`;
        sparkle.style.top = `${event.clientY}px`;
        sparkle.style.color =
            sparkleColors[Math.floor(Math.random() * sparkleColors.length)];

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 800);
    });
})();

// ========================================
// SCROLL PROGRESS BAR
// ========================================

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollTop = window.scrollY;
    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();

// Always start at the top when the page loads
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });
});