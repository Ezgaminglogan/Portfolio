// Initialize EmailJS
(function(){
    emailjs.init("zUyjNcHa6wci7pDA5"); // Replace with your EmailJS public key
})();

// Initialize tsParticles
tsParticles.load("tsparticles", {
    background: { color: { value: "transparent" } },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
            resize: true
        },
        modes: {
            push: { quantity: 2 },
            repulse: { distance: 80, duration: 0.4 }
        }
    },
    particles: {
        color: { value: ["#6366f1", "#8b5cf6", "#a855f7", "#06d6a0", "#ffffff"] },
        links: { color: "#6366f1", distance: 120, enable: true, opacity: 0.3, width: 1.5 },
        collisions: { enable: false },
        move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: true, speed: 1.5, straight: false },
        number: { density: { enable: true, area: 1000 }, value: 30 },
        opacity: { value: { min: 0.3, max: 0.7 } },
        shape: { type: ["circle", "triangle"] },
        size: { value: { min: 2, max: 6 } }
    },
    detectRetina: true
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Modal functions - FIXED
function openModal(modalId) {
    console.log('Opening modal:', modalId); // Debug log
    const modal = document.getElementById(modalId);
    
    if (modal) {
        // Add modal class for styling
        modal.classList.add('modal');
        
        // Show modal
        modal.classList.add('active');
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation to modal content
        const modalContent = modal.querySelector('div[class*="bg-slate-800"]');
        if (modalContent) {
            modalContent.style.transform = 'scale(1)';
        }
        
        console.log('Modal opened successfully'); // Debug log
    } else {
        console.error('Modal not found:', modalId); // Debug log
    }
}

function closeModal(modalId) {
    console.log('Closing modal:', modalId); // Debug log
    const modal = document.getElementById(modalId);
    
    if (modal) {
        // Add exit animation
        const modalContent = modal.querySelector('div[class*="bg-slate-800"]');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.9)';
        }
        
        // Hide modal after animation
        setTimeout(() => {
            modal.classList.remove('active');
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            
            // Restore body scroll
            document.body.style.overflow = 'auto';
        }, 200);
        
        console.log('Modal closed successfully'); // Debug log
    } else {
        console.error('Modal not found:', modalId); // Debug log
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal') || e.target.closest('.bg-black\\/80')) {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top
document.getElementById('scrollTopBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showFormMessage('error', 'Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('error', 'Please enter a valid email address.');
        return;
    }
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    
    emailjs.send("service_vif5738", "template_d1kx5j9", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    })
    .then(() => {
        showFormMessage('success', 'Message sent successfully!');
        this.reset();
    })
    .catch((error) => {
        console.error('EmailJS Error:', error);
        showFormMessage('error', 'Failed to send message. Please try again.');
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
    });
});

function showFormMessage(type, message) {
    const formMessage = document.getElementById('form-message');
    formMessage.className = `text-center font-medium mt-4 p-4 rounded-xl transition-all duration-300 ${type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`;
    formMessage.textContent = message;
    formMessage.style.opacity = '1';
    
    setTimeout(() => {
        formMessage.style.opacity = '0';
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'text-center font-medium mt-4';
        }, 300);
    }, 5000);
}

// Close mobile menu when clicking links
document.addEventListener('DOMContentLoaded', () => {
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobile-menu').classList.add('hidden');
        });
    });
    
    // Add click event listeners to modal buttons - IMPORTANT FIX
    const modalButtons = document.querySelectorAll('[onclick*="openModal"]');
    modalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const onclickAttr = button.getAttribute('onclick');
            const modalId = onclickAttr.match(/openModal\('(.+)'\)/)[1];
            openModal(modalId);
        });
    });
    
    // Add click event listeners to modal close buttons
    const closeButtons = document.querySelectorAll('[onclick*="closeModal"]');
    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const onclickAttr = button.getAttribute('onclick');
            const modalId = onclickAttr.match(/closeModal\('(.+)'\)/)[1];
            closeModal(modalId);
        });
    });
    
    console.log('Modal event listeners attached'); // Debug log
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in classes
    document.querySelectorAll('.animate-fade-in-up, .fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Add any additional scroll handling here if needed
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

console.log('Script loaded successfully'); // Debug log
