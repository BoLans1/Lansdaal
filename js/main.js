// main.js

document.addEventListener('DOMContentLoaded', function() {
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.fade-in-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
    
        // Get form values safely
        var fromName = this.elements['name'] ? this.elements['name'].value : '';
        var fromEmail = this.elements['email'] ? this.elements['email'].value : '';
        var message = this.elements['message'] ? this.elements['message'].value : '';
    
        // Log the values to check if they're being captured correctly
        console.log('Name:', fromName);
        console.log('Email:', fromEmail);
        console.log('Message:', message);
    
        // Prepare template parameters
        var templateParams = {
            from_name: fromName,
            from_email: fromEmail,
            message: message
        };
    
        emailjs.send('service_n7tbqg4', 'template_1qe2e94', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Your message has been sent successfully!');
                document.getElementById('contact-form').reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send the message. Please try again later.');
            });
    });


    // Project filter functionality (if needed)
    // This assumes you have filter buttons with data-filter attributes
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});