/**
 * Maj Mob - Client Interactivity Script
 * Handlers for Navigation, Dynamic Schedule Filtering, Scroll Reveal, and Form Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case user loads page scrolled down

  // ==========================================================================
  // Mobile Hamburger Navigation Menu
  // ==========================================================================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    
    // Prevent background scrolling when menu is open on mobile
    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when links are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu if user clicks outside of nav area
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target) && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // ==========================================================================
  // Dynamic Events Schedule Filter
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      eventCards.forEach(card => {
        const cardLocation = card.getAttribute('data-location');
        
        // Setup simple fade transitions
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        if (filterValue === 'all' || cardLocation === filterValue) {
          // Show card
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          // Hide card
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px) scale(0.98)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================================================
  // Scroll Reveal Animation (Intersection Observer)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, {
      root: null,
      threshold: 0.12, // Trigger when 12% of element is in viewport
      rootMargin: '0px 0px -40px 0px' // Slightly offset bottom for a nicer trigger feel
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================================================
  // Smooth Scrolling for Anchors
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Add slightly larger offset to accommodate header spacing
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================================================
  // Interactive Contact Form Feedback
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Select submit button
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Update loading status
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';
      formStatus.className = 'form-feedback';
      formStatus.style.display = 'none';

      // Mock API call delay
      setTimeout(() => {
        // Reset submit button state
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Clear inputs
        contactForm.reset();
        
        // Show success status
        formStatus.textContent = 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
        formStatus.classList.add('success');
        formStatus.style.display = 'block';
        
        // Auto hide message after 8 seconds
        setTimeout(() => {
          formStatus.style.opacity = '0';
          setTimeout(() => {
            formStatus.style.display = 'none';
            formStatus.style.opacity = '1';
          }, 400);
        }, 8000);
        
      }, 1000);
    });
  }

});
