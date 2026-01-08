/**
 * Vitl Reset Method - Main JavaScript
 * Minimal, performance-focused interactions
 */

(function() {
  'use strict';

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
  // Video Placeholder Click Handler
  // ==========================================================================

  function initVideoPlaceholder() {
    const placeholder = document.getElementById('vsl-placeholder');
    if (!placeholder) return;

    placeholder.addEventListener('click', () => {
      // This is where Vturb player would be initialized
      // For now, just show a message or redirect to video
      console.log('Video placeholder clicked - Vturb player would load here');

      // Example: You could load the Vturb player dynamically here
      // const script = document.createElement('script');
      // script.src = 'https://scripts.converteai.net/YOUR_ID/players/YOUR_VIDEO_ID/player.js';
      // script.async = true;
      // placeholder.parentNode.appendChild(script);
      // placeholder.remove();
    });
  }

  // ==========================================================================
  // Initialize All
  // ==========================================================================

  function init() {
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initVideoPlaceholder();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
