// Theme Toggle
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;
const icon = toggleButton.querySelector(".icon");

toggleButton.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
        icon.textContent = "☀️";
    } else {
        icon.textContent = "🌙";
    }

    icon.style.transform = "rotate(360deg)";
    setTimeout(() => icon.style.transform = "rotate(0deg)", 400);
});

// Scroll Reveal
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
