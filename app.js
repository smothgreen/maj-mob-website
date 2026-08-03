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
  const navLinks = document.querySelectorAll('.nav-link, .nav-menu .btn');

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
  // Dynamic Events Schedule & Automatic Past Date Filter
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');
  const noEventsMsg = document.getElementById('no-events-msg');

  // Helper to parse ISO date string (YYYY-MM-DD) into local end-of-day Date object
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return null;
    return new Date(parts[0], parts[1] - 1, parts[2], 23, 59, 59);
  };

  const now = new Date(); // Current local time

  // 1. Hide individual past class rows and past registration buttons
  document.querySelectorAll('[data-date]').forEach(el => {
    const classDate = parseDate(el.getAttribute('data-date'));
    if (classDate && classDate < now) {
      el.style.display = 'none';
      el.classList.add('is-past-item');
    }
  });

  // 2. Hide entire event cards if all their classes have passed or end date is past
  const updateScheduleDisplay = (filterValue = 'all') => {
    let visibleCount = 0;

    eventCards.forEach(card => {
      const endDate = parseDate(card.getAttribute('data-end-date'));
      const cardLocation = card.getAttribute('data-location');
      
      // Check if all class rows in this card are past
      const dateRows = card.querySelectorAll('.event-row[data-date]');
      const allRowsPast = dateRows.length > 0 && Array.from(dateRows).every(row => {
        const d = parseDate(row.getAttribute('data-date'));
        return d && d < now;
      });

      const isPast = (endDate && endDate < now) || allRowsPast;

      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

      if (isPast) {
        card.style.display = 'none';
        card.classList.add('is-past-card');
      } else if (filterValue === 'all' || cardLocation === filterValue) {
        visibleCount++;
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px) scale(0.98)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });

    // Toggle "No upcoming events" fallback message
    if (noEventsMsg) {
      noEventsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  // Initial calculation on page load
  updateScheduleDisplay('all');

  // Handle location filter button clicks
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      updateScheduleDisplay(filterValue);
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
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - offset;

        // Use a short delay to let mobile menu close transitions & overflow reset complete
        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 50);
      }
    });
  });

  // ==========================================================================
  // Handle hash scrolling on page load (e.g. when coming from another page)
  // ==========================================================================
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      // Wait for page resources to fully load so scroll height is accurate
      window.addEventListener('load', () => {
        setTimeout(() => {
          const offset = 90;
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 200);
      });
    }
  }

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

  // ==========================================================================
  // Free Taste of Mini Mahj Registration Form
  // ==========================================================================
  const freeTasteForm = document.getElementById('free-taste-form');
  const freeTasteStatus = document.getElementById('free-taste-status');

  if (freeTasteForm) {
    freeTasteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = freeTasteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Reserving Spot...';
      freeTasteStatus.className = 'form-feedback';
      freeTasteStatus.style.display = 'none';

      // Mock API call delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Clear inputs
        freeTasteForm.reset();
        
        // Show success status
        freeTasteStatus.textContent = 'Success! Your free spot is reserved for Wednesday, July 15 at 1:00 PM at Kiddywampus West End. We will email you confirmation details shortly!';
        freeTasteStatus.classList.add('success');
        freeTasteStatus.style.display = 'block';
        freeTasteStatus.style.backgroundColor = 'rgba(12, 69, 36, 0.08)';
        freeTasteStatus.style.border = '1px solid rgba(12, 69, 36, 0.2)';
        freeTasteStatus.style.color = '#0c4524';
        
        // Auto hide message after 10 seconds
        setTimeout(() => {
          freeTasteStatus.style.opacity = '0';
          setTimeout(() => {
            freeTasteStatus.style.display = 'none';
            freeTasteStatus.style.opacity = '1';
          }, 400);
        }, 10000);
        
      }, 1000);
    });
  }

});

