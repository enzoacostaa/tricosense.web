// TricoSense Elite JavaScript
class TricoSenseApp {
    constructor() {
        this.isLoaded = false;
        this.currentDemoStep = 1;
        this.metricsAnimated = false;
        this.activityInterval = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeLoadingScreen();
        this.initializeNavigation();
        this.initializeAnimations();
        this.initializeMetrics();
        this.initializeActivityFeed();
        this.initializeTabs();
        this.initializeBackToTop();
        this.initializeIntersectionObserver();
        this.preloadImages();
    }

    setupEventListeners() {
        // Window events
        window.addEventListener('load', () => this.handlePageLoad());
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());

        // Navigation events
        document.addEventListener('click', (e) => this.handleNavigation(e));

        // Form events
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        }

        // Modal events
        window.addEventListener('click', (e) => this.handleModalClick(e));

        // Hamburger menu
        const hamburger = document.getElementById('hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }
    }

    initializeLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Simulate loading process
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    this.isLoaded = true;
                    this.startInitialAnimations();
                }, 500);
            }
        }, 2000);
    }

    startInitialAnimations() {
        // Animate hero elements
        this.animateCounters();
        this.animateProgressBars();
        this.startActivityFeed();
    }

    initializeNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                }
            });
        });

        // Active link highlighting
        this.updateActiveNavLink();
    }

    handleScroll() {
        this.updateNavbarAppearance();
        this.updateActiveNavLink();
        this.updateBackToTopVisibility();
        this.handleScrollAnimations();
    }

    updateNavbarAppearance() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    initializeMetrics() {
        this.metricsData = {
            conversion: { current: 0, target: 42.8, suffix: '%' },
            aov: { current: 0, target: 94, prefix: '$' },
            retailers: { current: 0, target: 157 },
            diagnostics: { current: 0, target: 2847 },
            onlineRetailers: { current: 0, target: 89 },
            physicalRetailers: { current: 0, target: 68 },
            scientificPoints: { current: 0, target: 47 }
        };
    }

    animateCounters() {
        if (this.metricsAnimated) return;

        const counters = document.querySelectorAll('[data-target]');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    
                    // Format number based on value
                    let displayValue;
                    if (target > 1000) {
                        displayValue = Math.floor(current).toLocaleString();
                    } else if (target % 1 !== 0) {
                        displayValue = current.toFixed(1);
                    } else {
                        displayValue = Math.floor(current);
                    }
                    
                    counter.textContent = displayValue;
                    requestAnimationFrame(updateCounter);
                }
            };

            // Add stagger delay
            const delay = Array.from(counters).indexOf(counter) * 200;
            setTimeout(updateCounter, delay);
        });

        this.metricsAnimated = true;
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar[data-width]');
        
        progressBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, index * 300);
        });

        const channelBars = document.querySelectorAll('.bar-fill[data-width]');
        channelBars.forEach((bar, index) => {
            const targetWidth = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, index * 400 + 500);
        });
    }

    initializeActivityFeed() {
        this.activityData = [
            { name: 'María G.', action: 'completó diagnóstico capilar', time: 'hace 2 min', avatar: 'MG' },
            { name: 'Carlos R.', action: 'compró rutina completa ($127)', time: 'hace 5 min', avatar: 'CR' },
            { name: 'Ana L.', action: 'inició consulta tricológica', time: 'hace 8 min', avatar: 'AL' },
            { name: 'Diego M.', action: 'recomendó producto a amigo', time: 'hace 12 min', avatar: 'DM' },
            { name: 'Sofia P.', action: 'completó diagnóstico capilar', time: 'hace 15 min', avatar: 'SP' },
            { name: 'Luis C.', action: 'compró rutina premium ($156)', time: 'hace 18 min', avatar: 'LC' },
            { name: 'Emma T.', action: 'calificó con 5 estrellas', time: 'hace 22 min', avatar: 'ET' },
            { name: 'Pablo K.', action: 'compartió en redes sociales', time: 'hace 25 min', avatar: 'PK' }
        ];
    }

    startActivityFeed() {
        const activityList = document.getElementById('activity-list');
        if (!activityList) return;

        let currentIndex = 0;

        const addActivity = () => {
            const activity = this.activityData[currentIndex % this.activityData.length];
            const activityElement = this.createActivityElement(activity);
            
            activityList.insertBefore(activityElement, activityList.firstChild);
            
            // Remove excess activities
            if (activityList.children.length > 5) {
                activityList.removeChild(activityList.lastChild);
            }
            
            currentIndex++;
        };

        // Add initial activities
        for (let i = 0; i < 3; i++) {
            addActivity();
        }

        // Continue adding activities every 8 seconds
        this.activityInterval = setInterval(addActivity, 8000);
    }

    createActivityElement(activity) {
        const div = document.createElement('div');
        div.className = 'activity-item';
        div.innerHTML = `
            <div class="activity-avatar">${activity.avatar}</div>
            <div class="activity-text">
                <strong>${activity.name}</strong> ${activity.action}
            </div>
            <div class="activity-time">${activity.time}</div>
        `;
        return div;
    }

    initializeTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                button.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    initializeBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                this.smoothScrollTo(document.body);
            });
        }
    }

    updateBackToTopVisibility() {
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    smoothScrollTo(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Demo Modal Functions
    openDemo() {
        const modal = document.getElementById('demoModal');
        if (modal) {
            modal.classList.add('active');
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            this.currentDemoStep = 1;
            this.showDemoStep(1);
        }
    }

    closeDemo() {
        const modal = document.getElementById('demoModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                this.resetDemoForm();
            }, 300);
        }
    }

    nextStep() {
        if (this.validateCurrentStep()) {
            this.currentDemoStep++;
            this.showDemoStep(this.currentDemoStep);
        }
    }

    prevStep() {
        this.currentDemoStep--;
        this.showDemoStep(this.currentDemoStep);
    }

    showDemoStep(stepNumber) {
        const steps = document.querySelectorAll('.demo-step');
        steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === stepNumber);
        });
    }

    validateCurrentStep() {
        const currentStep = document.querySelector(`#step${this.currentDemoStep}`);
        const inputs = currentStep.querySelectorAll('input[required], select[required]');
        
        for (let input of inputs) {
            if (!input.value.trim()) {
                input.focus();
                this.showValidationMessage(input, 'Este campo es requerido');
                return false;
            }
        }
        return true;
    }

    showValidationMessage(input, message) {
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);

        // Remove error message after 3 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 3000);
    }

    scheduleDemo() {
        if (this.validateCurrentStep()) {
            // Simulate API call
            this.showDemoStep(3);
            
            // Send data (in real implementation, this would be an actual API call)
            this.sendDemoRequest();
        }
    }

    sendDemoRequest() {
        const formData = {
            name: document.getElementById('demoName')?.value,
            email: document.getElementById('demoEmail')?.value,
            company: document.getElementById('demoCompany')?.value,
            businessType: document.getElementById('businessType')?.value,
            monthlyVolume: document.getElementById('monthlyVolume')?.value,
            timestamp: new Date().toISOString()
        };

        console.log('Demo request submitted:', formData);
        
        // In a real implementation, you would send this to your backend
        // fetch('/api/demo-request', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // });
    }

    resetDemoForm() {
        const form = document.querySelector('.demo-form');
        if (form) {
            const inputs = form.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.value = '';
            });
        }
        this.currentDemoStep = 1;
    }

    // Contact Form Handler
    handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!this.validateContactForm(data)) {
            return;
        }

        // Show loading state
        const submitButton = e.target.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showSuccessMessage();
            e.target.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);

        console.log('Contact form submitted:', data);
    }

    validateContactForm(data) {
        const requiredFields = ['name', 'email', 'company', 'role'];
        
        for (let field of requiredFields) {
            if (!data[field] || !data[field].trim()) {
                this.showErrorMessage(`Por favor, completa el campo ${field}`);
                return false;
            }
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showErrorMessage('Por favor, ingresa un email válido');
            return false;
        }

        return true;
    }

    showSuccessMessage() {
        this.showNotification('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.', 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366ff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            animation: slideInNotification 0.3s ease-out;
            max-width: 400px;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutNotification 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Mobile Menu Toggle
    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        
        if (navMenu && hamburger) {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }
    }

    // Handle modal clicks
    handleModalClick(e) {
        const modal = document.getElementById('demoModal');
        if (e.target === modal) {
            this.closeDemo();
        }
    }

    // Handle navigation clicks
    handleNavigation(e) {
        if (e.target.closest('.btn-demo, .btn-primary')) {
            if (e.target.textContent.includes('Demo') || e.target.textContent.includes('Comenzar')) {
                e.preventDefault();
                this.openDemo();
            }
        }

        if (e.target.closest('.btn-secondary')) {
            if (e.target.textContent.includes('Ver')) {
                e.preventDefault();
                this.playDemoVideo();
            }
        }
    }

    playDemoVideo() {
        // Simulate video modal (in real implementation, you'd show an actual video)
        this.showNotification('Video demo próximamente disponible', 'info');
    }

    // Intersection Observer for animations
    initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations based on element
                    if (entry.target.classList.contains('metric-card')) {
                        this.animateMetricCard(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToObserve = document.querySelectorAll('.metric-card, .value-card, .feature-card, .pricing-card');
        elementsToObserve.forEach(el => observer.observe(el));
    }

    animateMetricCard(card) {
        const progressBar = card.querySelector('.progress-bar[data-width]');
        if (progressBar) {
            const targetWidth = progressBar.getAttribute('data-width');
            setTimeout(() => {
                progressBar.style.width = targetWidth;
            }, 300);
        }
    }

    handleScrollAnimations() {
        // Parallax effect for gradient orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translateY(${rate * speed}px)`;
