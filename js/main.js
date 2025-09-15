// Main JavaScript for Blameo landing page
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Mobile dropdown toggle
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.nav-dropdown');
            dropdown.classList.toggle('active');
        });
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Close dropdown when clicking dropdown links
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Scroll-triggered animations for service blocks
    const serviceBlocks = document.querySelectorAll('.service-block');
    const serviceColumns = document.querySelectorAll('.service-column');
    const serviceImages = document.querySelectorAll('.service-illustration');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger child animations
                const children = entry.target.querySelectorAll('.service-column, .service-list li, .tech-tag');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    serviceBlocks.forEach(block => {
        observer.observe(block);
    });
    
    // Add CSS classes for animation states
    const style = document.createElement('style');
    style.textContent = `
        .service-block {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .service-block.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-column {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .service-column.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-list li {
            opacity: 0;
            transform: translateX(-20px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .service-list li.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .tech-tag {
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .tech-tag.animate-in {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
});