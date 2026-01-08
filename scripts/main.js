/**
 * Vitl Reset Method - Main JavaScript
 * Minimal, performance-focused interactions
 */

(function() {
  'use strict';

  // ==========================================================================
  // Internationalization (i18n)
  // ==========================================================================

  const SUPPORTED_LANGS = ['en', 'sv'];
  const DEFAULT_LANG = 'en';
  const STORAGE_KEY = 'vitl_lang';

  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // Storage not available
    }
  }

  function detectBrowserLang() {
    const browserLang = navigator.language || navigator.userLanguage || '';
    const shortLang = browserLang.split('-')[0].toLowerCase();
    return SUPPORTED_LANGS.includes(shortLang) ? shortLang : DEFAULT_LANG;
  }

  function getCurrentLang() {
    const stored = getStoredLang();
    if (stored && SUPPORTED_LANGS.includes(stored)) {
      return stored;
    }
    return detectBrowserLang();
  }

  function applyTranslations(lang) {
    if (typeof translations === 'undefined') return;

    const langData = translations[lang] || translations[DEFAULT_LANG];
    if (!langData) return;

    // Update document lang attribute
    document.documentElement.lang = lang;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (langData[key]) {
        el.textContent = langData[key];
      }
    });

    // Update all elements with data-i18n-html attribute (for innerHTML)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (langData[key]) {
        el.innerHTML = langData[key];
      }
    });

    // Update active state on language switcher
    document.querySelectorAll('.lang-switcher__btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      btn.classList.toggle('is-active', btnLang === lang);
    });
  }

  function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    setStoredLang(lang);
    applyTranslations(lang);
  }

  function initI18n() {
    const currentLang = getCurrentLang();
    applyTranslations(currentLang);

    // Attach click handlers to language switcher buttons
    document.querySelectorAll('.lang-switcher__btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
      });
    });
  }

  // ==========================================================================
  // FAQ Accordion
  // ==========================================================================

  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        const expanded = question.getAttribute('aria-expanded') === 'true';

        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('is-open');
            const otherQuestion = otherItem.querySelector('.faq-question');
            if (otherQuestion) {
              otherQuestion.setAttribute('aria-expanded', 'false');
            }
          }
        });

        // Toggle current item
        item.classList.toggle('is-open');
        question.setAttribute('aria-expanded', !expanded);
      });
    });
  }

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ==========================================================================
  // Fade-in Animation on Scroll
  // ==========================================================================

  function initScrollAnimations() {
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) return;

    const animatedElements = document.querySelectorAll(
      '.problem-card, .pillar-item, .testimonial-card, .include-item'
    );

    // Add initial hidden state
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }

  // ==========================================================================
  // Meta Pixel Tracking
  // ==========================================================================

  function initMetaPixelTracking() {
    // Track CTA button clicks as InitiateCheckout
    document.querySelectorAll('.cta-button').forEach(button => {
      button.addEventListener('click', () => {
        if (typeof fbq !== 'undefined') {
          fbq('track', 'InitiateCheckout', {
            content_name: '21-Day Mental Reset',
            content_category: 'Digital Product',
            value: 47.00,
            currency: 'EUR'
          });
        }
      });
    });
  }

  // ==========================================================================
  // Initialize All
  // ==========================================================================

  function init() {
    initI18n();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initMetaPixelTracking();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
