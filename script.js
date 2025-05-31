// Initialize EmailJS with your Public Key
(function(){
    emailjs.init("zUyjNcHa6wci7pDA5"); // Replace with your actual EmailJS public key
})();

// Initialize tsParticles with Modern Configuration
tsParticles.load("tsparticles", {
    background: {
        color: {
            value: "transparent"
        }
    },
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
        color: { 
            value: ["#6366f1", "#8b5cf6", "#a855f7", "#06d6a0"] 
        },
        links: { 
            color: "#6366f1", 
            distance: 120, 
            enable: true, 
            opacity: 0.3, 
            width: 1.5 
        },
        collisions: { enable: false },
        move: { 
            direction: "none", 
            enable: true, 
            outModes: { default: "bounce" }, 
            random: true, 
            speed: 1.5, 
            straight: false 
        },
        number: { 
            density: { enable: true, area: 1000 }, 
            value: 30 
        },
        opacity: { 
            value: { min: 0.3, max: 0.7 },
            animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.3,
                sync: false
            }
        },
        shape: { 
            type: ["circle", "triangle"] 
        },
        size: { 
            value: { min: 2, max: 6 },
            animation: {
                enable: true,
                speed: 2,
                minimumValue: 2,
                sync: false
            }
        }
    },
    detectRetina: true
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll-to-Top Button Visibility
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Fade-in effect on scroll
document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

// Enhanced Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Enhanced fade-in animation with stagger effect
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // Stagger animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Add typing effect for hero text
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        setTimeout(typeWriter, 500);
    }
});

// Enhanced navbar active link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Contact Form Handling with EmailJS
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate form
    const form = event.target;
    if (!form.checkValidity()) {
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    // Collect form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Show loading indicator
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

    // Send email via EmailJS
    emailjs.send("service_vif5738", "template_d1kx5j9", {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    })
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        const formMessage = document.getElementById('form-message');
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        formMessage.textContent = "Your message has been sent successfully!";
        formMessage.style.display = 'block';
        form.reset();
        form.classList.remove('was-validated');
    }, function(error) {
        console.error('FAILED...', error);
        const formMessage = document.getElementById('form-message');
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
        formMessage.textContent = "An error occurred while sending your message. Please try again later.";
        formMessage.style.display = 'block';
    })
    .finally(() => {
        // Reset submit button
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message';
    });
});

// Scroll-to-Top Button Functionality
document.getElementById('scrollTopBtn').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
