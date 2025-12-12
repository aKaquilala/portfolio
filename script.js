// Theme toggle (light/dark)
const toggleButton = document.getElementById("theme-toggle");
const body = document.body;
const icon = toggleButton.querySelector(".icon");

toggleButton.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
        icon.textContent = "☀️";
        toggleButton.classList.add("active");
    } else {
        icon.textContent = "🌙";
        toggleButton.classList.remove("active");
    }

    // rotate icon for extra polish
    icon.style.transform = "rotate(360deg)";
    setTimeout(() => icon.style.transform = "rotate(0deg)", 420);
});

// Scroll reveal for sections
const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add("visible");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", () => {
    revealOnScroll();
    animateSkillBars(); // animate on load too, if visible
});

// Animated skill bars
function animateSkillBars() {
    const fills = document.querySelectorAll(".skill-fill");
    fills.forEach(fill => {
        const percent = parseInt(fill.getAttribute("data-fill")) || 0;
        // if element is within viewport, animate; otherwise animate when scrolled into view
        const rect = fill.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            fill.style.width = percent + "%";
        } else {
            // attach observer to animate when visible
            const obs = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        fill.style.width = percent + "%";
                        obs.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            obs.observe(fill);
        }
    });
}

// Smooth in-page nav scrolling
document.querySelectorAll('.nav-link').forEach(a=>{
    a.addEventListener('click', e=>{
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if(target){
            target.scrollIntoView({behavior:'smooth', block:'start'});
        }
    });
});
