/**
 * SpeedOptima Demo Site JavaScript
 */

(function () {
    'use strict';

    // Demo Tab Navigation
    const navItems = document.querySelectorAll('.demo-nav-item');
    const tabs = document.querySelectorAll('.demo-tab');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active from all
            navItems.forEach(nav => nav.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));

            // Add active to clicked
            this.classList.add('active');

            const tabId = 'tab-' + this.dataset.tab;
            const targetTab = document.getElementById(tabId);
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });

    // Save Demo Button
    const saveBtn = document.getElementById('save-demo');
    const saveMessage = document.getElementById('save-message');

    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            const originalText = this.innerHTML;
            this.innerHTML = '⏳ Saving...';
            this.disabled = true;

            // Simulate save
            setTimeout(() => {
                this.innerHTML = '✓ Saved!';
                saveMessage.textContent = 'Changes saved successfully!';

                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    saveMessage.textContent = '';
                }, 2000);
            }, 1000);
        });
    }

    // Toggle Animations
    const toggles = document.querySelectorAll('.toggle input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function () {
            const row = this.closest('.setting-row');
            if (row) {
                row.style.opacity = this.checked ? '1' : '0.6';
            }
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Animate on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.style.width;
                progress.style.width = '0%';
                setTimeout(() => {
                    progress.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-value');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent;
                const isPercentage = finalValue.includes('%');
                const isPlus = finalValue.includes('+');
                const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));

                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        stat.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        let displayValue = Math.floor(current);
                        if (isPercentage) displayValue += '%';
                        if (isPlus) displayValue += '+';
                        stat.textContent = displayValue;
                    }
                }, 30);

                statsObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

})();
