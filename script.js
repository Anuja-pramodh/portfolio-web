/* ==========================================
           JAVASCRIPT FUNCTIONALITY
           ========================================== */

        // Wait for DOM to load
        document.addEventListener('DOMContentLoaded', function() {
            
            // Create animated stars
            function createStars() {
                const starsContainer = document.getElementById('stars');
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
                    document.getElementById('loader').classList.add('hidden');
                }, 500);
            });

            /* ------------------------------------------
               Mobile Navigation Toggle
               ------------------------------------------ */
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            const navLinks = document.querySelectorAll('.nav-link');

            // Toggle mobile menu
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                
                // Animate hamburger to X
                const spans = hamburger.querySelectorAll('span');
                if (navMenu.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });

            // Close mobile menu when clicking a link
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.classList.remove('active');
                    const spans = hamburger.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                });
            });

            /* ------------------------------------------
               Active Navigation Highlighting
               ------------------------------------------ */
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

            /* ------------------------------------------
               Scroll Animations (Intersection Observer)
               ------------------------------------------ */
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
                        skillBars.forEach(bar => {
                            const width = bar.getAttribute('data-width');
                            setTimeout(() => {
                                bar.style.width = width + '%';
                            }, 200);
                        });

                        // Animate stats counter
                        const statNumbers = entry.target.querySelectorAll('.stat-number');
                        statNumbers.forEach(stat => {
                            const target = parseInt(stat.getAttribute('data-target'));
                            animateValue(stat, 0, target, 2000);
                        });
                    }
                });
            }, observerOptions);

            // Observe all sections
            document.querySelectorAll('.section').forEach(section => {
                observer.observe(section);
            });

            // Counter animation function
            function animateValue(obj, start, end, duration) {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    obj.innerHTML = Math.floor(progress * (end - start) + start);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            }

            /* ------------------------------------------
               Scroll to Top Button
               ------------------------------------------ */
            const scrollTopBtn = document.getElementById('scrollTop');

            window.addEventListener('scroll', function() {
                if (window.pageYOffset > 300) {
                    scrollTopBtn.classList.add('visible');
                } else {
                    scrollTopBtn.classList.remove('visible');
                }
            });

            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            /* ------------------------------------------
               Form Validation & Submission
               ------------------------------------------ */
            const contactForm = document.getElementById('contactForm');
            const formSuccess = document.getElementById('formSuccess');

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form fields
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const message = document.getElementById('message');
                
                let isValid = true;

                // Validate name
                if (name.value.trim() === '') {
                    showError(name, 'nameError');
                    isValid = false;
                } else {
                    hideError(name, 'nameError');
                }

                // Validate email
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value.trim())) {
                    showError(email, 'emailError');
                    isValid = false;
                } else {
                    hideError(email, 'emailError');
                }

                // Validate message
                if (message.value.trim() === '') {
                    showError(message, 'messageError');
                    isValid = false;
                } else {
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
                        formSuccess.style.display = 'flex';
                        contactForm.reset();
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            formSuccess.style.display = 'none';
                        }, 5000);
                    }, 1500);
                }
            });

            function showError(input, errorId) {
                input.classList.add('error');
                document.getElementById(errorId).style.display = 'block';
            }

            function hideError(input, errorId) {
                input.classList.remove('error');
                document.getElementById(errorId).style.display = 'none';
            }

            // Real-time validation
            ['name', 'email', 'message'].forEach(fieldId => {
                const field = document.getElementById(fieldId);
                field.addEventListener('input', function() {
                    if (field.value.trim() !== '') {
                        field.classList.remove('error');
                        document.getElementById(fieldId + 'Error').style.display = 'none';
                    }
                });
            });

            /* ------------------------------------------
               Navbar Background on Scroll
               ------------------------------------------ */
            const navbar = document.getElementById('navbar');
            
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            /* ------------------------------------------
               Parallax Effect on Hero Image
               ------------------------------------------ */
            const heroImage = document.getElementById('heroImage');
            
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.3;
                
                if (heroImage && scrolled < 800) {
                    heroImage.style.transform = `translateY(${parallax}px)`;
                }
            });
        });