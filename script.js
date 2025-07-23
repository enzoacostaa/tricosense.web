// TricoSense - Versión Corregida y Optimizada
class TricoSenseApp {
    constructor() {
        this.isLoaded = false;
        this.currentDemoStep = 1;
        this.metricsAnimated = false;
        this.activityInterval = null;
        this.init();
    }

    init() {
        try {
            this.setupEventListeners();
            this.initializeLoadingScreen();
            this.initializeNavigation();
            this.initializeMetrics();
            this.initializeActivityFeed();
            this.initializeTabs();
            this.initializeBackToTop();
            this.initializeIntersectionObserver();
        } catch (error) {
            console.error('Initialization error:', error);
            this.forceShowContent();
        }
    }

    // SOLUCIÓN 1: Loading Screen con Failsafe
    initializeLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        // Failsafe: Forzar mostrar contenido después de 1 segundo máximo
        const failsafeTimeout = setTimeout(() => {
            console.warn('Loading screen failsafe activated');
            this.forceShowContent();
        }, 1000);
        
        // Loading normal más rápido
        setTimeout(() => {
            clearTimeout(failsafeTimeout);
            this.hideLoadingScreen();
        }, 800); // Reducido de 2000ms a 800ms
    }

    forceShowContent() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        document.body.style.overflow = 'auto';
        this.isLoaded = true;
        this.startInitialAnimations();
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                this.isLoaded = true;
                this.startInitialAnimations();
            }, 300);
        } else {
            // Si no existe loading screen, continuar normalmente
            this.isLoaded = true;
            this.startInitialAnimations();
        }
    }

    setupEventListeners() {
        try {
            // Window events con error handling
            window.addEventListener('load', () => this.handlePageLoad());
            window.addEventListener('scroll', () => this.handleScroll());
            window.addEventListener('resize', () => this.handleResize());
            
            // Navigation events
            document.addEventListener('click', (e) => this.handleNavigation(e));

            // Form events con verificación
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
        } catch (error) {
            console.error('Event listener setup error:', error);
        }
    }

    startInitialAnimations() {
        try {
            this.animateCounters();
            this.animateProgressBars();
            this.startActivityFeed();
        } catch (error) {
            console.error('Animation error:', error);
        }
    }

    // SOLUCIÓN 2: Animación de contadores más robusta
    animateCounters() {
        if (this.metricsAnimated) return;

        try {
            const counters = document.querySelectorAll('[data-target]');
            
            if (counters.length === 0) {
                console.warn('No counters found, skipping animation');
                return;
            }
            
            counters.forEach((counter, index) => {
                try {
                    const target = parseFloat(counter.getAttribute('data-target'));
                    if (isNaN(target)) return;
                    
                    const duration = 1500; // Reducido para mejor performance
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        try {
                            if (current < target) {
                                current += increment;
                                if (current > target) current = target;
                                
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
                        } catch (error) {
                            console.error('Counter update error:', error);
                        }
                    };

                    // Stagger delay
                    const delay = index * 100;
                    setTimeout(updateCounter, delay);
                } catch (error) {
                    console.error('Counter animation error:', error);
                }
            });

            this.metricsAnimated = true;
        } catch (error) {
            console.error('Counter animation setup error:', error);
        }
    }

    // SOLUCIÓN 3: Progress bars con verificación
    animateProgressBars() {
        try {
            const progressBars = document.querySelectorAll('.progress-bar[data-width]');
            
            progressBars.forEach((bar, index) => {
                try {
                    const targetWidth = bar.getAttribute('data-width');
                    if (targetWidth) {
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, index * 200);
                    }
                } catch (error) {
                    console.error('Progress bar animation error:', error);
                }
            });

            const channelBars = document.querySelectorAll('.bar-fill[data-width]');
            channelBars.forEach((bar, index) => {
                try {
                    const targetWidth = bar.getAttribute('data-width');
                    if (targetWidth) {
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, index * 300 + 400);
                    }
                } catch (error) {
                    console.error('Channel bar animation error:', error);
                }
            });
        } catch (error) {
            console.error('Progress bar setup error:', error);
        }
    }

    // SOLUCIÓN 4: Activity feed más seguro
    initializeActivityFeed() {
        try {
            this.activityData = [
                { name: 'María G.', action: 'completó diagnóstico capilar', time: 'hace 2 min', avatar: 'MG' },
                { name: 'Carlos R.', action: 'compró rutina completa ($127)', time: 'hace 5 min', avatar: 'CR' },
                { name: 'Ana L.', action: 'inició consulta tricológica', time: 'hace 8 min', avatar: 'AL' },
                { name: 'Diego M.', action: 'recomendó producto', time: 'hace 12 min', avatar: 'DM' },
                { name: 'Sofia P.', action: 'completó diagnóstico', time: 'hace 15 min', avatar: 'SP' }
            ];
        } catch (error) {
            console.error('Activity feed initialization error:', error);
        }
    }

    startActivityFeed() {
        try {
            const activityList = document.getElementById('activity-list');
            if (!activityList || !this.activityData) return;

            let currentIndex = 0;

            const addActivity = () => {
                try {
                    const activity = this.activityData[currentIndex % this.activityData.length];
                    const activityElement = this.createActivityElement(activity);
                    
                    activityList.insertBefore(activityElement, activityList.firstChild);
                    
                    // Limitar a 4 elementos
                    if (activityList.children.length > 4) {
                        activityList.removeChild(activityList.lastChild);
                    }
                    
                    currentIndex++;
                } catch (error) {
                    console.error('Activity add error:', error);
                }
            };

            // Agregar actividades iniciales
            for (let i = 0; i < 3; i++) {
                addActivity();
            }

            // Continuar agregando cada 6 segundos (más lento para mejor performance)
            this.activityInterval = setInterval(addActivity, 6000);
        } catch (error) {
            console.error('Activity feed start error:', error);
        }
    }

    createActivityElement(activity) {
        try {
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
        } catch (error) {
            console.error('Activity element creation error:', error);
            return document.createElement('div');
        }
    }

    // SOLUCIÓN 5: Navigation más robusta
    initializeNavigation() {
        try {
            const navLinks = document.querySelectorAll('.nav-link');

            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    try {
                        e.preventDefault();
                        const href = link.getAttribute('href');
                        if (href && href.startsWith('#')) {
                            const targetId = href.substring(1);
                            const targetElement = document.getElementById(targetId);
                            
                            if (targetElement) {
                                targetElement.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }
                        }
                    } catch (error) {
                        console.error('Navigation click error:', error);
                    }
                });
            });
        } catch (error) {
            console.error('Navigation initialization error:', error);
        }
    }

    handleScroll() {
        try {
            this.updateNavbarAppearance();
            this.updateBackToTopVisibility();
        } catch (error) {
            console.error('Scroll handling error:', error);
        }
    }

    updateNavbarAppearance() {
        try {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        } catch (error) {
            console.error('Navbar update error:', error);
        }
    }

    initializeTabs() {
        try {
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabContents = document.querySelectorAll('.tab-content');

            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    try {
                        const targetTab = button.getAttribute('data-tab');
                        
                        tabButtons.forEach(btn => btn.classList.remove('active'));
                        tabContents.forEach(content => content.classList.remove('active'));
                        
                        button.classList.add('active');
                        const targetContent = document.getElementById(targetTab);
                        if (targetContent) {
                            targetContent.classList.add('active');
                        }
                    } catch (error) {
                        console.error('Tab click error:', error);
                    }
                });
            });
        } catch (error) {
            console.error('Tabs initialization error:', error);
        }
    }

    initializeBackToTop() {
        try {
            const backToTop = document.getElementById('backToTop');
            if (backToTop) {
                backToTop.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }
        } catch (error) {
            console.error('Back to top initialization error:', error);
        }
    }

    updateBackToTopVisibility() {
        try {
            const backToTop = document.getElementById('backToTop');
            if (backToTop) {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
        } catch (error) {
            console.error('Back to top visibility error:', error);
        }
    }

    // Demo Modal Functions
    openDemo() {
        try {
            const modal = document.getElementById('demoModal');
            if (modal) {
                modal.classList.add('active');
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                this.currentDemoStep = 1;
                this.showDemoStep(1);
            }
        } catch (error) {
            console.error('Demo open error:', error);
        }
    }

    closeDemo() {
        try {
            const modal = document.getElementById('demoModal');
            if (modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    this.resetDemoForm();
                }, 300);
            }
        } catch (error) {
            console.error('Demo close error:', error);
        }
    }

    showDemoStep(stepNumber) {
        try {
            const steps = document.querySelectorAll('.demo-step');
            steps.forEach((step, index) => {
                step.classList.toggle('active', index + 1 === stepNumber);
            });
        } catch (error) {
            console.error('Demo step show error:', error);
        }
    }

    nextStep() {
        try {
            if (this.validateCurrentStep()) {
                this.currentDemoStep++;
                this.showDemoStep(this.currentDemoStep);
            }
        } catch (error) {
            console.error('Next step error:', error);
        }
    }

    prevStep() {
        try {
            this.currentDemoStep--;
            this.showDemoStep(this.currentDemoStep);
        } catch (error) {
            console.error('Previous step error:', error);
        }
    }

    validateCurrentStep() {
        try {
            const currentStep = document.querySelector(`#step${this.currentDemoStep}`);
            if (!currentStep) return true;
            
            const inputs = currentStep.querySelectorAll('input[required], select[required]');
            
            for (let input of inputs) {
                if (!input.value.trim()) {
                    input.focus();
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.error('Validation error:', error);
            return true;
        }
    }

    scheduleDemo() {
        try {
            if (this.validateCurrentStep()) {
                this.showDemoStep(3);
            }
        } catch (error) {
            console.error('Schedule demo error:', error);
        }
    }

    toggleMobileMenu() {
        try {
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            
            if (navMenu) navMenu.classList.toggle('active');
            if (hamburger) hamburger.classList.toggle('active');
        } catch (error) {
            console.error('Mobile menu toggle error:', error);
        }
    }

    handleNavigation(e) {
        try {
            if (e.target.closest('.btn-demo, .btn-primary')) {
                const text = e.target.textContent;
                if (text.includes('Demo') || text.includes('Comenzar')) {
                    e.preventDefault();
                    this.openDemo();
                }
            }
        } catch (error) {
            console.error('Navigation handling error:', error);
        }
    }

    handleModalClick(e) {
        try {
            const modal = document.getElementById('demoModal');
            if (e.target === modal) {
                this.closeDemo();
            }
        } catch (error) {
            console.error('Modal click handling error:', error);
        }
    }

    handleContactSubmit(e) {
        try {
            e.preventDefault();
            alert('Formulario enviado correctamente. Nos pondremos en contacto pronto.');
            e.target.reset();
        } catch (error) {
            console.error('Contact submit error:', error);
        }
    }

    handlePageLoad() {
        try {
            console.log('Page loaded successfully');
        } catch (error) {
            console.error('Page load handling error:', error);
        }
    }

    handleResize() {
        try {
            if (window.innerWidth > 768) {
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        } catch (error) {
            console.error('Resize handling error:', error);
        }
    }

    initializeIntersectionObserver() {
        try {
            if (!('IntersectionObserver' in window)) {
                console.warn('IntersectionObserver not supported');
                return;
            }

            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    try {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-in');
                        }
                    } catch (error) {
                        console.error('Observer entry error:', error);
                    }
                });
            }, observerOptions);

            const elementsToObserve = document.querySelectorAll('.metric-card, .value-card, .feature-card');
            elementsToObserve.forEach(el => {
                try {
                    observer.observe(el);
                } catch (error) {
                    console.error('Observer observe error:', error);
                }
            });
        } catch (error) {
            console.error('Intersection observer setup error:', error);
        }
    }

    resetDemoForm() {
        try {
            const form = document.querySelector('.demo-form');
            if (form) {
                const inputs = form.querySelectorAll('input, select');
                inputs.forEach(input => {
                    input.value = '';
                });
            }
            this.currentDemoStep = 1;
        } catch (error) {
            console.error('Demo form reset error:', error);
        }
    }

    destroy() {
        try {
            if (this.activityInterval) {
                clearInterval(this.activityInterval);
            }
        } catch (error) {
            console.error('Destroy error:', error);
        }
    }
}

// Global functions para HTML
window.openDemo = function() {
    if (window.app) window.app.openDemo();
};

window.closeDemo = function() {
    if (window.app) window.app.closeDemo();
};

window.nextStep = function() {
    if (window.app) window.app.nextStep();
};

window.prevStep = function() {
    if (window.app) window.app.prevStep();
};

window.scheduleDemo = function() {
    if (window.app) window.app.scheduleDemo();
};

window.startDemo = function() {
    if (window.app) window.app.openDemo();
};

window.watchVideo = function() {
    alert('Video demo próximamente disponible');
};

// Inicialización con error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        window.app = new TricoSenseApp();
        console.log('TricoSense App initialized successfully');
    } catch (error) {
        console.error('Failed to initialize TricoSense App:', error);
        
        // Failsafe: ocultar loading screen aunque falle la inicialización
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000);
        }
    }
});

// Failsafe adicional por si DOMContentLoaded no funciona
setTimeout(function() {
    if (!window.app) {
        try {
            window.app = new TricoSenseApp();
        } catch (error) {
            console.error('Fallback initialization failed:', error);
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            }
        }
    }
}, 2000);
