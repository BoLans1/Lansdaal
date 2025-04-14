// main.js - Enhanced version with modern features

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components and functionality
    initNavigation();
    initScrollAnimations();
    initProgressBars();
    initContactForm();
    initScrollProgress();
    initScrollToTop();
    initTypedEffect();

    // Check if dark mode is preferred
    checkDarkMode();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');

    // Navbar background change on scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active nav item based on scroll position
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }

                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Animate progress bars when visible
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('aria-valuenow') + '%';
                progressBar.style.width = width;
            }
        });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
        // Reset width to 0 initially
        bar.style.width = '0%';
    });
}

// Initialize progress bars with animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(progressBar => {
        progressBar.style.width = '0%';
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Form validation
        if (!validateForm(contactForm)) {
            return;
        }

        // Get form values
        const fromName = contactForm.elements['name'].value;
        const fromEmail = contactForm.elements['email'].value;
        const message = contactForm.elements['message'].value;

        // Prepare template parameters
        const templateParams = {
            from_name: fromName,
            from_email: fromEmail,
            message: message
        };

        // Show loading state
        const formStatus = document.getElementById('form-status');
        formStatus.innerHTML = '<div class="alert alert-info">Sending message...</div>';

        // Send email using EmailJS
        emailjs.send('service_n7tbqg4', 'template_1qe2e94', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                formStatus.innerHTML = '<div class="alert alert-success">Message sent successfully!</div>';
                contactForm.reset();

                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }, function (error) {
                console.log('FAILED...', error);
                formStatus.innerHTML = '<div class="alert alert-danger">Failed to send message. Please try again.</div>';
            });
    });

    // Form validation function
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else if (input.type === 'email' && input.value.trim() && !isValidEmail(input.value)) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }

            // Add input event listener to validate on change
            input.addEventListener('input', function () {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('is-invalid');
                } else if (this.type === 'email' && this.value.trim() && !isValidEmail(this.value)) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });
        });

        return isValid;
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Scroll progress indicator
function initScrollProgress() {
    // Create scroll progress bar if it doesn't exist
    if (!document.querySelector('.scroll-progress-container')) {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress-container';

        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';

        progressContainer.appendChild(progressBar);
        document.body.appendChild(progressContainer);
    }

    const progressBar = document.querySelector('.scroll-progress-bar');

    window.addEventListener('scroll', function () {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = scrollProgress + '%';
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Typed.js effect for dynamic text
function initTypedEffect() {
    // Check if element exists and Typed.js is loaded
    const typedElement = document.querySelector('.typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed(typedElement, {
            strings: [
                'Technical Web Analytics Consultant',
                'Privacy Specialist',
                'GDPR Compliance Expert',
                'Data Protection Professional'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }
}

// Check for dark mode preference
function checkDarkMode() {
    // Check if user has a preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Listen for changes in preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

// Add project page specific enhancements
function initProjectPage() {
    // Enhance project images with lightbox functionality
    const projectImages = document.querySelectorAll('.project-img');

    projectImages.forEach(image => {
        image.addEventListener('click', function () {
            // Create lightbox if lightbox functionality is available
            if (typeof createLightbox === 'function') {
                createLightbox(this.src, this.alt);
            }
        });

        // Add cursor pointer and hover effect
        image.style.cursor = 'pointer';
    });
}

// Helper function to create a simple lightbox
function createLightbox(src, alt) {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
    lightbox.style.display = 'flex';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';
    lightbox.style.zIndex = '9999';
    lightbox.style.opacity = '0';
    lightbox.style.transition = 'opacity 0.3s ease';

    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.boxShadow = '0 5px 30px rgba(0,0,0,0.3)';
    img.style.transform = 'scale(0.9)';
    img.style.transition = 'transform 0.3s ease';

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '20px';
    closeBtn.style.background = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '2rem';
    closeBtn.style.cursor = 'pointer';

    // Add elements to DOM
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    // Prevent scrolling while lightbox is open
    document.body.style.overflow = 'hidden';

    // Animate in
    setTimeout(() => {
        lightbox.style.opacity = '1';
        img.style.transform = 'scale(1)';
    }, 10);

    // Close on click
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox || e.target === closeBtn) {
            img.style.transform = 'scale(0.9)';
            lightbox.style.opacity = '0';

            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        }
    });
}
