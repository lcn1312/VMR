/**
 * VMR Combustíveis - Main Javascript
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Header Scrolled State --- */
    const header = document.getElementById('header');
    const scrollBtn = document.getElementById('scroll-top');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            scrollBtn.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            scrollBtn.classList.remove('visible');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    /* --- 2. Mobile Menu Toggle --- */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    
    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('nav-open');
        const icon = mobileToggle.querySelector('i');
        if (nav.classList.contains('nav-open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    /* --- 3. Smooth Scroll & Close mobile menu on click --- */
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu if open
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
            
            // Handle smooth scroll manually if needed or just let CSS scroll-behavior handle it
            // Active class management is handled by Intersection Observer mostly
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    /* --- 4. Intersection Observer for Animations --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        animateObserver.observe(el);
    });

    /* --- 5. Accordion Logic --- */
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const body = item.querySelector('.accordion-body');
        
        // Initialize body max-height if it has active class by default
        if (item.classList.contains('active')) {
            body.style.maxHeight = body.scrollHeight + "px";
        }

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all others
            accordionItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-body').style.maxHeight = null;
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + "px";
            }
        });
    });

    /* --- 6. Active Nav Link on Scroll --- */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // offset for fixed header
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
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
    
    /* --- 7. Simple Form Handle Form Submit (Visual only) --- */
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            btn.style.pointerEvents = 'none';
            
            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Mensagem Enviada!';
                btn.style.backgroundColor = '#10b981'; // Green
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.backgroundColor = '';
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }

    /* --- 8. Hero Background Slideshow --- */
    const heroSlides = document.querySelectorAll('.bg-slide');
    if (heroSlides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 4000);
    }

});
