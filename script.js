// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    menuIcon.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
});

// Navigation
const navButtons = document.querySelectorAll('.nav-btn');
let activeSection = 'home';

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const section = button.getAttribute('data-section');
        scrollToSection(section);
    });
});

function scrollToSection(section) {
    activeSection = section;
    
    // Update active states
    navButtons.forEach(btn => {
        if (btn.getAttribute('data-section') === section) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Close mobile menu
    mobileNav.classList.remove('active');
    menuIcon.textContent = '☰';
    
    // Scroll to section
    const element = document.getElementById(section);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Explore button
const exploreBtn = document.querySelector('.explore-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        scrollToSection('projects');
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const messageInput = document.getElementById('messageInput');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;
    
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    window.location.href = `mailto:akaquilala@mcm.edu.ph?subject=${subject}&body=${body}`;
});

// Intersection Observer for active section detection
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            navButtons.forEach(btn => {
                if (btn.getAttribute('data-section') === sectionId) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});