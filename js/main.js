// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add fade-in animation to elements as they come into view
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

   // Close mobile menu when a link is clicked
   const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
   const menuToggle = document.getElementById('navbarNav');
   const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
   navLinks.forEach((l) => {
       l.addEventListener('click', () => { bsCollapse.hide(); });
   });
