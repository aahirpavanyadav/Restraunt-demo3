/**
 * Bella Cucina — Smart UI Controller
 * Pure Vanilla JavaScript · Zero Dependencies
 * Complete UI/UX Overhaul for Bella Cucina Ristorante Italiano
 */

document.addEventListener('DOMContentLoaded', () => {
  initSkipLink();
  initThemeToggle();
  initReadingProgress();
  initSmartNavbar();
  initMobileDrawer();
  initDropdownNav();
  initActiveNav();
  initScrollAnimations();
  initMenuFilter();
  initGalleryFilter();
  initLightbox();
  initAccordions();
  initGiftCardPreview();
  initTodayHighlight();
  initFormHandlers();
  initSmoothScroll();
  initLazyLoad();
});

/**
 * Utility: Debounce
 */
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Skip Link for Accessibility
 */
function initSkipLink() {
  if (document.querySelector('.skip-link')) return;

  const skip = document.createElement('a');
  skip.href = '#main-content';
  skip.className = 'skip-link';
  skip.textContent = 'Skip to main content';
  document.body.prepend(skip);

  // Add id to main element if missing
  const main = document.querySelector('main');
  if (main && !main.id) {
    main.id = 'main-content';
  }
}

/**
 * Dark/Light Mode Toggle with localStorage persistence and system-preference support
 */
function initThemeToggle() {
  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  function applyTheme(theme, animate = true) {
    if (!animate) {
      document.documentElement.style.transition = 'none';
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bc-theme', theme);
    if (!animate) {
      requestAnimationFrame(() => {
        document.documentElement.style.transition = '';
      });
    }
  }

  // Create the desktop toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.setAttribute('type', 'button');
  toggleBtn.setAttribute('aria-label', 'Toggle dark/light mode');
  toggleBtn.setAttribute('title', 'Toggle theme');
  toggleBtn.innerHTML = '<span class="icon-moon" aria-hidden="true">🌙</span><span class="icon-sun" aria-hidden="true">☀️</span>';

  // Insert before the mobile-toggle button in .header-actions
  const headerActions = document.querySelector('.header-actions');
  const mobileToggle = document.getElementById('mobileToggle') || document.querySelector('.mobile-toggle');
  if (headerActions && mobileToggle) {
    headerActions.insertBefore(toggleBtn, mobileToggle);
  } else if (headerActions) {
    headerActions.appendChild(toggleBtn);
  }

  // Also add to mobile drawer footer
  const drawerFooter = document.querySelector('.drawer-footer');
  if (drawerFooter) {
    const drawerToggle = document.createElement('button');
    drawerToggle.className = 'theme-toggle drawer-theme-toggle';
    drawerToggle.setAttribute('type', 'button');
    drawerToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    drawerToggle.setAttribute('title', 'Toggle theme');
    drawerToggle.style.marginBottom = '12px';
    drawerToggle.style.width = '100%';
    drawerToggle.style.borderRadius = '8px';
    drawerToggle.style.height = '42px';
    drawerToggle.innerHTML = '<span class="icon-moon" aria-hidden="true">🌙 Switch to Dark Mode</span><span class="icon-sun" aria-hidden="true">☀️ Switch to Light Mode</span>';
    drawerFooter.prepend(drawerToggle);
    drawerToggle.addEventListener('click', () => {
      applyTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('bc-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme, false); // false = no transition on initial load

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('bc-theme')) {
      applyTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  toggleBtn.addEventListener('click', () => {
    const current = getCurrentTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

/**
 * 1. Reading Progress Bar
 * Injects a thin terracotta progress bar at the very top of the page
 * and updates its width dynamically as the user scrolls.
 */
function initReadingProgress() {
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;

  // Only initialize on pages with sufficient scrollable content
  if (scrollHeight <= clientHeight * 1.4) return;

  let progressBar = document.getElementById('readingProgress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'readingProgress';
    document.body.prepend(progressBar);
  }

  const updateProgress = () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll <= 0) return;
    const progress = (window.scrollY / totalScroll) * 100;
    progressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * 2. Smart Navbar
 * - Transparent on hero pages before scroll
 * - Solid with shadow after 80px scroll
 * - Shrinks from 90px to 68px
 * - Hides on fast scroll-down (>300px), reveals on scroll-up
 */
function initSmartNavbar() {
  const header = document.getElementById('siteHeader') || document.querySelector('.site-header');
  if (!header) return;

  const isTransparentHero = header.dataset.transparent === 'true';
  let lastScrollY = window.scrollY;
  let ticking = false;

  if (isTransparentHero && lastScrollY < 80) {
    header.classList.add('transparent');
  }

  const onScroll = () => {
    const currentScrollY = window.scrollY;

    // 1. Scrolled state & transparency toggle
    if (currentScrollY > 80) {
      header.classList.add('scrolled');
      header.classList.remove('transparent');
    } else {
      header.classList.remove('scrolled');
      if (isTransparentHero) {
        header.classList.add('transparent');
      }
    }

    // 2. Hide on fast scroll-down / reveal on scroll-up (desktop only)
    if (window.innerWidth > 1080) {
      if (currentScrollY > 300) {
        const delta = currentScrollY - lastScrollY;
        if (delta > 6) {
          header.classList.add('nav-hidden');
        } else if (delta < -6) {
          header.classList.remove('nav-hidden');
        }
      } else {
        header.classList.remove('nav-hidden');
      }
    } else {
      header.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // On mobile/tablet resize, never hide navbar
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth <= 1080) {
      header.classList.remove('nav-hidden');
    }
  }, 150));

  // Initial check
  onScroll();
}

/**
 * 3. Mobile Navigation Drawer
 * Handles hamburger toggle, overlay, drawer opening/closing, body scroll lock,
 * and touch swipe-to-close.
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileToggle') || document.getElementById('navToggle');
  const drawer = document.getElementById('mobileDrawer') || document.getElementById('navMenu');
  const closeBtn = document.getElementById('drawerClose');
  const overlay = document.getElementById('drawerOverlay');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('visible');
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('visible');
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
  }

  // Close when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Touch swipe right to close drawer
  let touchStartX = 0;
  drawer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  drawer.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 60) {
      closeDrawer(); // swipe right = close
    }
  }, { passive: true });

  // Close when clicking any nav link inside the drawer
  const drawerLinks = drawer.querySelectorAll('.drawer-link, .btn-reserve, a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/**
 * 4. Desktop Dropdown Navigation
 * Handles hover, keyboard focus, and click behaviors for dropdowns.
 */
function initDropdownNav() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;

    // Desktop hover
    dropdown.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1080) {
        dropdown.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1080) {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Keyboard navigation (Tab/Shift+Tab)
    dropdown.addEventListener('focusin', () => {
      dropdown.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    });

    dropdown.addEventListener('focusout', (e) => {
      if (!dropdown.contains(e.relatedTarget)) {
        dropdown.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    // Click/Touch toggle
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dropdown.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // Click outside closes all dropdowns
  document.addEventListener('click', (e) => {
    dropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        const trigger = dropdown.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Escape key closes open dropdowns
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
        const trigger = dropdown.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/**
 * 5. Active Nav Highlighting
 * Highlights the active page link and marks its parent dropdown trigger.
 */
function initActiveNav() {
  const currentPath = window.location.pathname;
  let pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

  if (!pageName || pageName === '') {
    pageName = 'index.html';
  }

  // Primary desktop nav & drawer links
  const allNavLinks = document.querySelectorAll('.primary-nav a, .drawer-nav a');

  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const targetFile = href.split('/').pop().split('#')[0];

    if (targetFile === pageName) {
      link.classList.add('nav-active');

      // If link is inside a dropdown panel, highlight the parent dropdown trigger
      const dropdown = link.closest('.nav-dropdown');
      if (dropdown) {
        dropdown.classList.add('has-active');
        const trigger = dropdown.querySelector('.nav-dropdown-trigger');
        if (trigger) {
          trigger.classList.add('nav-active');
        }
      }
    }
  });
}

/**
 * 6. Scroll Animations with IntersectionObserver
 * Handles .fade-in, .fade-in-left, .fade-in-right, and staggered children.
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  if (!animatedElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    animatedElements.forEach(el => el.classList.add('visible'));
  }

  // Handle .stagger-children container
  const staggerContainers = document.querySelectorAll('.stagger-children');
  staggerContainers.forEach(container => {
    const children = container.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    children.forEach((child, idx) => {
      child.style.transitionDelay = `${(idx + 1) * 0.1}s`;
    });
  });
}

/**
 * 7. Menu Filtering (menu.html)
 * Filters dish cards by category with smooth transitions.
 */
function initMenuFilter() {
  const filterButtons = document.querySelectorAll('.filter-tabs .tab-btn[data-filter]');
  const dishCards = document.querySelectorAll('.menu-grid .dish-card');

  if (!filterButtons.length || !dishCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      dishCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          window.requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(14px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * 8. Gallery Category Filter (gallery.html)
 * Filters masonry gallery items by category.
 */
function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.gallery-tabs .tab-btn[data-gallery-filter], .gallery-tabs .tab-btn[data-filter]');
  const galleryItems = document.querySelectorAll('.masonry-grid .masonry-item');

  if (!filterButtons.length || !galleryItems.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-gallery-filter') || button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-gallery-category') || item.getAttribute('data-gallery-cat') || item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'flex';
          window.requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.96)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * 9. Lightbox Modal (gallery.html)
 * Displays enlarged preview with title and description upon clicking a masonry photo.
 */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.masonry-grid .masonry-item');
  const modal = document.getElementById('lightboxModal');
  if (!modal || !galleryItems.length) return;

  const modalClose = modal.querySelector('.lightbox-close') || document.getElementById('lightboxClose');
  const modalEmoji = modal.querySelector('.lightbox-emoji');
  const modalTitle = modal.querySelector('.lightbox-title');
  const modalDesc = modal.querySelector('.lightbox-desc');

  const openModal = (item) => {
    const emoji = item.getAttribute('data-emoji') || (item.querySelector('.masonry-emoji') ? item.querySelector('.masonry-emoji').textContent : '🖼️');
    const title = item.getAttribute('data-title') || (item.querySelector('.masonry-title') ? item.querySelector('.masonry-title').textContent : 'Bella Cucina Photo');
    const desc = item.getAttribute('data-desc') || (item.querySelector('p') ? item.querySelector('p').textContent : '');

    if (modalEmoji) modalEmoji.textContent = emoji;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => openModal(item));
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * 10. Smooth Accordion Groups
 * Uses max-height transition for smooth expansion and closes sibling panels.
 */
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  if (!headers.length) return;

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains('active');
      const parentAccordion = header.closest('.accordion');

      // Close sibling items in the same accordion group
      if (parentAccordion) {
        parentAccordion.querySelectorAll('.accordion-header').forEach(siblingHeader => {
          if (siblingHeader !== header) {
            siblingHeader.classList.remove('active');
            siblingHeader.setAttribute('aria-expanded', 'false');
            const siblingContent = siblingHeader.nextElementSibling;
            if (siblingContent) {
              siblingContent.style.maxHeight = '0px';
              siblingContent.classList.remove('show');
            }
          }
        });
      }

      if (isOpen) {
        header.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        if (content) {
          content.style.maxHeight = '0px';
          content.classList.remove('show');
        }
      } else {
        header.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        if (content) {
          content.classList.add('show');
          content.style.maxHeight = (content.scrollHeight + 40) + 'px';
        }
      }
    });
  });
}

/**
 * 11. Gift Card Live Preview (giftcards.html)
 * Updates the visual gift card mockup with real-time values.
 */
function initGiftCardPreview() {
  const amountButtons = document.querySelectorAll('.amount-buttons .amount-btn');
  const customAmountInput = document.getElementById('customAmountInput') || document.getElementById('customAmount');
  const displayAmount = document.getElementById('previewAmount');
  const recipientInput = document.getElementById('recipientNameInput') || document.getElementById('recipientName');
  const previewRecipient = document.getElementById('previewRecipient');

  if (!displayAmount) return;

  amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      amountButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (customAmountInput) customAmountInput.value = '';
      const val = btn.getAttribute('data-amount');
      displayAmount.textContent = `$${val}`;
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', (e) => {
      amountButtons.forEach(b => b.classList.remove('active'));
      const val = e.target.value.replace(/[^0-9]/g, '');
      if (val && parseInt(val, 10) > 0) {
        displayAmount.textContent = `$${val}`;
      } else {
        displayAmount.textContent = '$50';
      }
    });
  }

  if (recipientInput && previewRecipient) {
    recipientInput.addEventListener('input', (e) => {
      const name = e.target.value.trim();
      previewRecipient.textContent = name ? `For: ${name}` : 'For: Honored Guest';
    });
  }
}

/**
 * 12. Today Highlight in Location Hours Table (location.html)
 * Identifies current day of the week (0 = Sun, 1 = Mon, ..., 6 = Sat)
 * and highlights the corresponding table row with warm terracotta tint.
 */
function initTodayHighlight() {
  const hoursTable = document.querySelector('.hours-table');
  if (!hoursTable) return;

  const currentDay = new Date().getDay();
  const dayRow = hoursTable.querySelector(`tr[data-day="${currentDay}"]`);

  if (dayRow) {
    dayRow.classList.add('today-highlight', 'today-row');
  }
}

/**
 * 13. Interactive Form Handlers
 * Intercepts form submissions, shows styled .form-feedback box, resets fields,
 * and smoothly scrolls into view.
 */
function initFormHandlers() {
  const forms = [
    { id: 'reservationForm', message: '✨ Grazie! Your table reservation request has been received. Our hospitality host will confirm your booking via email.' },
    { id: 'contactForm', message: '✨ Thank you for reaching out to Bella Cucina. Our concierge team will reply within 24 hours.' },
    { id: 'eventInquiryForm', message: '✨ Inquiry received! Our Private Events Director will review your banquet details and provide a proposal shortly.' },
    { id: 'careerForm', message: '✨ Application received! Thank you for your interest in joining the Bella Cucina culinary family.' },
    { id: 'giftcardOrderForm', message: '✨ Order confirmed! Your personalized Bella Cucina digital gift card has been issued.' },
    { id: 'newsletterForm', message: '✨ Grazie! You have been successfully subscribed to Il Giornale di Bella Cucina.' }
  ];

  forms.forEach(({ id, message }) => {
    const form = document.getElementById(id);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let feedback = form.querySelector('.form-feedback');
      if (!feedback) {
        feedback = document.createElement('div');
        feedback.className = 'form-feedback';
        form.appendChild(feedback);
      }

      feedback.textContent = message;
      feedback.style.display = 'block';

      form.reset();

      setTimeout(() => {
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    });
  });
}

/**
 * 14. Smooth Scroll for Anchor Links & Scroll Indicator
 */
function initSmoothScroll() {
  // Smooth scroll for internal links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 75;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll indicator in hero
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const nextSection = document.querySelector('.hero-home + section') || document.querySelector('section:nth-of-type(2)');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: 600, behavior: 'smooth' });
      }
    });
  }
}

/**
 * 15. Lazy Load Performance Optimization
 */
function initLazyLoad() {
  if ('IntersectionObserver' in window) {
    const lazyEls = document.querySelectorAll('[data-lazy]');
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('lazy-loaded');
          lazyObserver.unobserve(el);
        }
      });
    }, { rootMargin: '200px 0px' });
    lazyEls.forEach(el => lazyObserver.observe(el));
  }
}
