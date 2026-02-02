/* ==========================================
   ENHANCED JAVASCRIPT FUNCTIONALITY
   WITH SMOOTH ANIMATIONS & SCROLLING
   ========================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // SMOOTH SCROLL ENHANCEMENT
    // ==========================================
    
    // Create animated stars
    function createStars() {
        const starsContainer = document.getElementById('stars');
        if (!starsContainer) return;
        
        const numberOfStars = 100;
        
        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }
    
    createStars();

    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.add('hidden');
            }
        }, 500);
    });

    /* ==========================================
       Mobile Navigation Toggle
       ========================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        // Toggle mobile menu
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Smooth scroll to section
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    const section = document.querySelector(href);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }

    /* ==========================================
       Active Navigation Highlighting
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       Scroll Animations (Intersection Observer)
       ========================================== */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars if inside this section
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach((bar, index) => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 100 + index * 100);
                });

                // Animate stats counter
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    setTimeout(() => {
                        animateValue(stat, 0, target, 2000);
                    }, 100 + index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Counter animation function with easing
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(easeProgress * (end - start) + start);
            
            obj.innerHTML = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    /* ==========================================
       Scroll to Top Button with Smooth Animation
       ========================================== */
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            if (!scrollTopBtn.classList.contains('visible')) {
                scrollTopBtn.classList.add('visible');
            }
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Smooth scroll to top with easing
            const startPosition = window.pageYOffset;
            const distance = -startPosition;
            const duration = 1000;
            let start = null;

            const scroll = (timestamp) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease-out cubic function
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const position = startPosition + distance * easeProgress;
                
                window.scrollTo(0, position);
                
                if (progress < 1) {
                    window.requestAnimationFrame(scroll);
                }
            };

            window.requestAnimationFrame(scroll);
        });
    }

    /* ==========================================
       Form Validation & Submission
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formSuccess = document.getElementById('formSuccess');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;

            // Validate name
            if (name && name.value.trim() === '') {
                showError(name, 'nameError');
                isValid = false;
            } else if (name) {
                hideError(name, 'nameError');
            }

            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailPattern.test(email.value.trim())) {
                showError(email, 'emailError');
                isValid = false;
            } else if (email) {
                hideError(email, 'emailError');
            }

            // Validate message
            if (message && message.value.trim() === '') {
                showError(message, 'messageError');
                isValid = false;
            } else if (message) {
                hideError(message, 'messageError');
            }

            // If valid, show success message
            if (isValid) {
                // Simulate form submission
                const btn = contactForm.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                btn.disabled = true;

                setTimeout(() => {
                    if (formSuccess) {
                        formSuccess.style.display = 'flex';
                        // Smooth fade in animation
                        formSuccess.style.animation = 'slideInDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    }
                    
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    
                    // Hide success message after 5 seconds with smooth fade out
                    setTimeout(() => {
                        if (formSuccess) {
                            formSuccess.style.opacity = '0';
                            formSuccess.style.transition = 'opacity 0.5s ease-out';
                            setTimeout(() => {
                                formSuccess.style.display = 'none';
                                formSuccess.style.opacity = '1';
                                formSuccess.style.transition = 'opacity 0s';
                            }, 500);
                        }
                    }, 5000);
                }, 1500);
            }
        });

        function showError(input, errorId) {
            input.classList.add('error');
            const errorEl = document.getElementById(errorId);
            if (errorEl) {
                errorEl.style.display = 'block';
                errorEl.style.animation = 'slideInDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            }
        }

        function hideError(input, errorId) {
            input.classList.remove('error');
            const errorEl = document.getElementById(errorId);
            if (errorEl) {
                errorEl.style.display = 'none';
            }
        }

        // Real-time validation
        ['name', 'email', 'message'].forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', function() {
                    if (field.value.trim() !== '') {
                        field.classList.remove('error');
                        const errorEl = document.getElementById(fieldId + 'Error');
                        if (errorEl) {
                            errorEl.style.display = 'none';
                        }
                    }
                });
            }
        });
    }

    /* ==========================================
       Navbar Background on Scroll
       ========================================== */
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* ==========================================
       Smooth Parallax Effect on Hero Section
       ========================================== */
    const heroImage = document.getElementById('heroImage');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.25;
            
            if (scrolled < 800) {
                heroImage.style.transform = `translateY(${parallax}px)`;
            }
        });
    }

    /* ==========================================
       Mouse Position Light Effect (Optional)
       ========================================== */
    const mouseLight = document.createElement('div');
    mouseLight.className = 'mouse-light';
    mouseLight.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.1), transparent);
        filter: blur(60px);
        pointer-events: none;
        z-index: 0;
        display: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(mouseLight);

    // Optional: Show light effect on mouse move (uncomment to enable)
    /*
    document.addEventListener('mousemove', function(e) {
        mouseLight.style.left = (e.clientX - 150) + 'px';
        mouseLight.style.top = (e.clientY - 150) + 'px';
        mouseLight.style.opacity = '0.5';
    });

    document.addEventListener('mouseleave', function() {
        mouseLight.style.opacity = '0';
    });
    */

    /* ==========================================
       Smooth Scroll Behavior Enhancement
       ========================================== */
    
    // Enhanced smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    /* ==========================================
       Performance Optimization: Debounce Scroll Events
       ========================================== */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optional: Use debounced scroll for better performance on heavy animations
    const debouncedScroll = debounce(() => {
        // Add any scroll-dependent animations here
    }, 50);

    window.addEventListener('scroll', debouncedScroll);
});