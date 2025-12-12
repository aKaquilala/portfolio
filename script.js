// ==============================================
// THEME TOGGLE WITH LOCAL STORAGE PERSISTENCE
// ==============================================
const themeToggle = () => {
    const toggleButton = document.getElementById("theme-toggle");
    const body = document.body;
    const icon = toggleButton.querySelector(".icon");
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.add("light");
        icon.textContent = "☀️";
        toggleButton.classList.add("active");
    }
    
    toggleButton.addEventListener("click", () => {
        body.classList.toggle("light");
        const isLight = body.classList.contains("light");
        
        if (isLight) {
            icon.textContent = "☀️";
            toggleButton.classList.add("active");
            localStorage.setItem("theme", "light");
        } else {
            icon.textContent = "🌙";
            toggleButton.classList.remove("active");
            localStorage.setItem("theme", "dark");
        }
        
        // Smooth icon rotation animation
        icon.style.transition = "transform 0.42s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        icon.style.transform = "rotate(360deg)";
        setTimeout(() => {
            icon.style.transform = "rotate(0deg)";
        }, 420);
    });
};

// ==============================================
// SCROLL REVEAL WITH INTERSECTION OBSERVER
// ==============================================
const initScrollReveal = () => {
    const reveals = document.querySelectorAll(".reveal");
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for multiple elements
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    reveals.forEach(reveal => observer.observe(reveal));
};

// ==============================================
// ANIMATED SKILL BARS
// ==============================================
const animateSkillBars = () => {
    const fills = document.querySelectorAll(".skill-fill");
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const percent = parseInt(fill.getAttribute("data-fill")) || 0;
                
                // Animate with slight delay for smooth effect
                setTimeout(() => {
                    fill.style.width = percent + "%";
                }, 150);
                
                observer.unobserve(fill);
            }
        });
    }, observerOptions);
    
    fills.forEach(fill => observer.observe(fill));
};

// ==============================================
// SMOOTH SCROLL NAVIGATION
// ==============================================
const initSmoothScroll = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.nav').offsetHeight;
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
};

// ==============================================
// ACTIVE NAV LINK ON SCROLL
// ==============================================
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.nav').offsetHeight;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - navHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// ==============================================
// NAVBAR BACKGROUND ON SCROLL
// ==============================================
const initNavbarScroll = () => {
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
};

// ==============================================
// TYPING ANIMATION ENHANCEMENT
// ==============================================
const enhanceTypewriter = () => {
    const typewriterElement = document.querySelector('.typewriter p');
    if (!typewriterElement) return;
    
    // Add completion callback
    typewriterElement.addEventListener('animationend', (e) => {
        if (e.animationName === 'typing') {
            setTimeout(() => {
                typewriterElement.style.borderRight = 'none';
            }, 1000);
        }
    });
};

// ==============================================
// PARALLAX EFFECT FOR PROFILE IMAGE
// ==============================================
const initParallax = () => {
    const profileImg = document.getElementById('profile-img');
    if (!profileImg) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (scrolled < 600) {
            profileImg.style.transform = `translateY(${rate}px)`;
        }
    });
};

// ==============================================
// PROJECT CARD TILT EFFECT
// ==============================================
const initProjectTilt = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.01)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
};

// ==============================================
// PERFORMANCE: REDUCE MOTION FOR ACCESSIBILITY
// ==============================================
const checkReducedMotion = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        
        // Disable parallax and tilt effects
        const profileImg = document.getElementById('profile-img');
        if (profileImg) {
            window.removeEventListener('scroll', initParallax);
        }
    }
};

// ==============================================
// LAZY LOAD IMAGES
// ==============================================
const initLazyLoad = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        return;
    }
    
    // Fallback for browsers without native lazy loading
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// ==============================================
// INITIALIZE ALL FEATURES
// ==============================================
const init = () => {
    // Check for reduced motion preference first
    checkReducedMotion();
    
    // Initialize all features
    themeToggle();
    initScrollReveal();
    animateSkillBars();
    initSmoothScroll();
    updateActiveNavLink();
    initNavbarScroll();
    enhanceTypewriter();
    initParallax();
    initProjectTilt();
    initLazyLoad();
    
    // Set first nav link as active on load
    const firstNavLink = document.querySelector('.nav-link');
    if (firstNavLink) firstNavLink.classList.add('active');
};

// ==============================================
// LOAD EVENT
// ==============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Prevent animations from running on page resize
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});
