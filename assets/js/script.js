/**
 * Gabriel Chacón - Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNav();
    initTabs();
    initScrollReveal();
});

/**
 * Sticky Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial call to set status if page is refreshed down
    handleScroll();
}

/**
 * Mobile Navigation Menu
 */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Accessibility update
        const isExpanded = mobileToggle.classList.contains('active');
        mobileToggle.setAttribute('aria-expanded', isExpanded);
    };
    
    mobileToggle.addEventListener('click', toggleMenu);
    
    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
}

/**
 * Interactive Tabs Switcher
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                pane.classList.remove('fade-in');
            });
            
            // Add active class to current button and target pane
            button.classList.add('active');
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
                // Trigger reflow for fade-in animation
                void targetPane.offsetWidth;
                targetPane.classList.add('fade-in');
            }
        });
    });
}

/**
 * Scroll Reveal Animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    // Check if browser supports IntersectionObserver
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of element is visible
        };
        
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once revealed, we don't need to observe it anymore
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers: show elements immediately
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }
}


