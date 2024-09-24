// Initialize EmailJS with your Public Key
(function(){
    emailjs.init("zUyjNcHa6wci7pDA5"); // Replace with your actual EmailJS public key
})();

// Initialize tsParticles
tsParticles.load("tsparticles", {
    background: {
        color: {
            value: "#2c3e50"
        }
    },
    fpsLimit: 60,
    interactivity: {
        events: {
            onClick: { enable: true, mode: "push" },
            onHover: { enable: true, mode: "repulse" },
            resize: true
        },
        modes: {
            push: { quantity: 4 },
            repulse: { distance: 100, duration: 0.4 }
        }
    },
    particles: {
        color: { value: "#ffffff" },
        links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1 },
        collisions: { enable: false },
        move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: false, speed: 2, straight: false },
        number: { density: { enable: true, area: 800 }, value: 50 },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } }
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
