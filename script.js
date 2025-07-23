// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                    mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });

    // Counter animation for statistics
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = formatNumber(target) + suffix;
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(current)) + suffix;
            }
        }, 20);
    }

    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
        }
        return num.toString();
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate counters when they come into view
                if (entry.target.hasAttribute('data-target')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const suffix = entry.target.textContent.includes('%') ? '%' : 
                                  entry.target.textContent.includes('+') ? '+' : '';
                    animateCounter(entry.target, target, suffix);
                }
                
                // Animate dashboard metrics
                if (entry.target.classList.contains('metric-value') && entry.target.hasAttribute('data-target')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.stat-number, .trust-number, .metric-value[data-target], .feature-card, .pricing-card, .enterprise-card').forEach(element => {
        observer.observe(element);
    });

    // Pricing card interactions
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('featured') ? 
                'scale(1.05) translateY(-8px)' : 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('featured') ? 
                'scale(1.05)' : 'translateY(0)';
        });
    });

    // Feature card hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.05) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Enterprise card interactions
    document.querySelectorAll('.enterprise-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.borderColor = 'var(--accent-orange)';
            this.style.boxShadow = 'var(--shadow-orange)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = 'rgba(255, 107, 53, 0.1)';
            this.style.boxShadow = 'none';
        });
    });

    // Integration items hover effect
    document.querySelectorAll('.integration-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.color = 'var(--accent-orange)';
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.color = 'var(--gray-300)';
            this.style.transform = 'scale(1)';
        });
    });

    // Button loading states
    document.querySelectorAll('a[href*="calendly"], a[href*="mailto"]').forEach(button => {
        button.addEventListener('click', function() {
            if (this.href.includes('calendly')) {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
                this.style.pointerEvents = 'none';
                
                // Reset after 3 seconds (calendly should have opened by then)
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.pointerEvents = 'auto';
                }, 3000);
            }
        });
    });

    // Email copy to clipboard functionality
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copiado al portapapeles!');
                }).catch(() => {
                    // Fallback: open mailto link
                    window.location.href = this.href;
                });
            } else {
                // Fallback for older browsers
                window.location.href = this.href;
            }
        });
    });

    // Notification system
    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-orange);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            font-weight: 600;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add CSS for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(15, 12, 41, 0.98);
                flex-direction: column;
                padding: 2rem;
                gap: 1rem;
                border-top: 1px solid rgba(255, 107, 53, 0.2);
                backdrop-filter: blur(20px);
            }
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Parallax effect for hero section (optional, lightweight)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.hero::before');
        if (parallaxElement && scrolled < window.innerHeight) {
            const speed = scrolled * 0.5;
            // This would require CSS custom properties, keeping it simple for now
        }
    });

    // Track scroll depth for analytics (optional)
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > maxScroll) {
            maxScroll = Math.floor(scrollPercent);
            
            // Fire analytics events at certain milestones
            if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
                // gtag('event', 'scroll_depth', { scroll_depth: maxScroll });
                console.log(`Scroll depth: ${maxScroll}%`);
            }
        }
    });

    // Form validation (if contact forms are added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Keyboard navigation improvements
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.querySelector('i').classList.add('fa-bars');
            mobileMenuToggle.querySelector('i').classList.remove('fa-times');
        }
    });

    // Initialize everything
    console.log('Tricosense website initialized successfully');
});

// Additional utility functions
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential use in other scripts
window.TricosenseUtils = {
    debounce,
    throttle,
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};
