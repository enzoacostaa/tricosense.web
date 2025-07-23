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
        });
    }

    handleResize() {
        // Recalculate animations on resize
        this.updateActiveNavLink();
        
        // Adjust mobile menu on desktop
        if (window.innerWidth > 768) {
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    }

    preloadImages() {
        // Preload critical images for better performance
        const imagesToPreload = [
            // Add image URLs here when you have actual images
        ];

        imagesToPreload.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Advanced Analytics Simulation
    initializeAdvancedAnalytics() {
        this.analyticsData = {
            dailyMetrics: this.generateDailyMetrics(),
            conversionFunnel: this.generateConversionFunnel(),
            productPerformance: this.generateProductPerformance(),
            customerSegments: this.generateCustomerSegments()
        };

        this.renderAnalyticsCharts();
    }

    generateDailyMetrics() {
        const days = 30;
        const data = [];
        
        for (let i = 0; i < days; i++) {
            data.push({
                date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000),
                conversions: Math.floor(Math.random() * 100) + 200,
                revenue: Math.floor(Math.random() * 5000) + 8000,
                diagnostics: Math.floor(Math.random() * 500) + 1500
            });
        }
        
        return data;
    }

    generateConversionFunnel() {
        return [
            { stage: 'Visitantes', count: 10000, percentage: 100 },
            { stage: 'Iniciaron Diagnóstico', count: 4200, percentage: 42 },
            { stage: 'Completaron Diagnóstico', count: 3360, percentage: 33.6 },
            { stage: 'Vieron Recomendaciones', count: 2688, percentage: 26.8 },
            { stage: 'Agregaron al Carrito', count: 1344, percentage: 13.4 },
            { stage: 'Compraron', count: 1075, percentage: 10.75 }
        ];
    }

    generateProductPerformance() {
        return [
            { category: 'Shampoos', sales: 2450, growth: 12.5, margin: 45 },
            { category: 'Tratamientos', sales: 1890, growth: 23.8, margin: 62 },
            { category: 'Acondicionadores', sales: 1654, growth: 8.3, margin: 38 },
            { category: 'Mascarillas', sales: 1230, growth: 34.2, margin: 58 },
            { category: 'Serums', sales: 980, growth: 45.6, margin: 72 }
        ];
    }

    generateCustomerSegments() {
        return [
            { segment: 'Cabello Graso', percentage: 32, avgOrder: 89, retention: 68 },
            { segment: 'Cabello Seco', percentage: 28, avgOrder: 94, retention: 72 },
            { segment: 'Cabello Mixto', percentage: 25, avgOrder: 87, retention: 65 },
            { segment: 'Problemas Específicos', percentage: 15, avgOrder: 112, retention: 78 }
        ];
    }

    renderAnalyticsCharts() {
        // In a real implementation, you would use a charting library like Chart.js
        // For now, we'll simulate chart rendering
        this.renderPerformanceChart();
        this.updateAnalyticsMetrics();
    }

    renderPerformanceChart() {
        const canvas = document.getElementById('performanceChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = this.analyticsData.dailyMetrics.slice(-7); // Last 7 days

        // Simple line chart simulation
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#6366FF';
        ctx.lineWidth = 3;
        ctx.beginPath();

        data.forEach((point, index) => {
            const x = (index / (data.length - 1)) * canvas.width;
            const y = canvas.height - (point.conversions / 300) * canvas.height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Add gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(99, 102, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(99, 102, 255, 0.05)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
    }

    updateAnalyticsMetrics() {
        // Update real-time metrics in the analytics section
        const metricsToUpdate = [
            { selector: '.diagnostic-count[data-target="1247"]', value: Math.floor(Math.random() * 200) + 1200 },
            { selector: '.diagnostic-count[data-target="986"]', value: Math.floor(Math.random() * 150) + 950 },
            { selector: '.diagnostic-count[data-target="654"]', value: Math.floor(Math.random() * 100) + 600 }
        ];

        metricsToUpdate.forEach(metric => {
            const element = document.querySelector(metric.selector);
            if (element) {
                this.animateValue(element, parseInt(element.textContent), metric.value, 1000);
            }
        });
    }

    animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Performance Monitoring
    initializePerformanceMonitoring() {
        // Monitor page performance
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = window.performance.timing;
                    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                    
                    console.log(`Page load time: ${loadTime}ms`);
                    
                    // Send to analytics (in real implementation)
                    this.trackPerformance({
                        loadTime,
                        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
                        firstPaint: perfData.responseEnd - perfData.navigationStart
                    });
                }, 0);
            });
        }
    }

    trackPerformance(data) {
        // In real implementation, send to analytics service
        console.log('Performance data:', data);
    }

    // A/B Testing Framework
    initializeABTesting() {
        // Simple A/B testing implementation
        this.abTests = {
            heroButton: {
                variants: ['Comenzar Demo', 'Ver Demo Gratis', 'Probar Ahora'],
                weights: [0.4, 0.3, 0.3]
            },
            pricingHighlight: {
                variants: ['Más Popular', 'Recomendado', 'Mejor Valor'],
                weights: [0.5, 0.25, 0.25]
            }
        };

        this.runABTests();
    }

    runABTests() {
        Object.keys(this.abTests).forEach(testName => {
            const test = this.abTests[testName];
            const variant = this.selectVariant(test.variants, test.weights);
            this.applyVariant(testName, variant);
        });
    }

    selectVariant(variants, weights) {
        const random = Math.random();
        let cumulativeWeight = 0;
        
        for (let i = 0; i < variants.length; i++) {
            cumulativeWeight += weights[i];
            if (random <= cumulativeWeight) {
                return variants[i];
            }
        }
        
        return variants[0];
    }

    applyVariant(testName, variant) {
        switch (testName) {
            case 'heroButton':
                const heroButton = document.querySelector('.btn-primary span');
                if (heroButton) heroButton.textContent = variant;
                break;
            case 'pricingHighlight':
                const planBadge = document.querySelector('.plan-badge');
                if (planBadge) planBadge.textContent = variant;
                break;
        }
        
        // Track variant selection
        this.trackABTest(testName, variant);
    }

    trackABTest(testName, variant) {
        // In real implementation, send to analytics
        console.log(`A/B Test - ${testName}: ${variant}`);
    }

    // Error Handling
    initializeErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            this.trackError({
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                stack: e.error?.stack
            });
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.trackError({
                type: 'unhandledrejection',
                reason: e.reason
            });
        });
    }

    trackError(errorData) {
        // In real implementation, send to error tracking service
        console.log('Error tracked:', errorData);
    }

    // Cleanup
    destroy() {
        if (this.activityInterval) {
            clearInterval(this.activityInterval);
        }
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
    }
}

// Global functions for HTML onclick handlers
window.openDemo = () => app.openDemo();
window.closeDemo = () => app.closeDemo();
window.nextStep = () => app.nextStep();
window.prevStep = () => app.prevStep();
window.scheduleDemo = () => app.scheduleDemo();
window.startDemo = () => app.openDemo();
window.watchVideo = () => app.playDemoVideo();

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInNotification {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutNotification {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            transition: transform 0.3s ease-out;
            z-index: 999;
        }
        
        .nav-menu.active {
            transform: translateY(0);
        }
        
        .nav-link {
            padding: 1rem 0;
            font-size: 1.125rem;
            text-align: center;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .nav-link:last-child {
            border-bottom: none;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TricoSenseApp();
    
    // Initialize additional features
    app.initializeAdvancedAnalytics();
    app.initializePerformanceMonitoring();
    app.initializeABTesting();
    app.initializeErrorHandling();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TricoSenseApp;
}
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
