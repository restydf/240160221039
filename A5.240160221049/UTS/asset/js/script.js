/**
 * script.js — Alex Ramadhan Portfolio
 * Features:
 *  - Page loading animation
 *  - Dark / Light mode toggle (persisted in localStorage)
 *  - Responsive navigation with burger menu
 *  - Header scroll effect
 *  - Typewriter effect (Hero)
 *  - Scroll-reveal animations (AOS-like, no library)
 *  - Skills progress bar animation
 *  - Portfolio filter with JS
 *  - Lightbox preview
 *  - Contact form with validation
 *  - Back-to-top button
 *  - Active nav link on scroll
 *  - Lazy loading images (IntersectionObserver)
 */

/* ============================================================
   1. LOADER
   ============================================================ */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Hide loader after page is fully loaded (or max 2.5 s)
  const hideLoader = () => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 600);
  };

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 1800);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 1800));
  }
})();


/* ============================================================
   2. DARK / LIGHT MODE TOGGLE
   ============================================================ */
(function initTheme() {
  const root       = document.documentElement;
  const btn        = document.getElementById('themeToggle');
  const icon       = document.getElementById('themeIcon');
  const STORAGE_KEY = 'portfolio-theme';

  /**
   * Apply a theme ('dark' | 'light') and update icon
   * @param {string} theme
   */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Restore saved theme or detect system preference
  const saved     = localStorage.getItem(STORAGE_KEY);
  const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  applyTheme(saved || preferred);

  // Toggle on button click
  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }
})();


/* ============================================================
   3. NAVIGATION — Burger + Scroll effects + Active link
   ============================================================ */
(function initNav() {
  const header  = document.getElementById('header');
  const burger  = document.getElementById('navBurger');
  const menu    = document.getElementById('navMenu');
  const links   = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('main section[id]');

  /* ---- 3a. Burger toggle ---- */
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on nav link click
    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!header.contains(e.target)) {
        menu.classList.remove('open');
        burger.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- 3b. Scroll: header background + active link ---- */
  function onScroll() {
    const scrollY = window.scrollY;

    // Header shadow on scroll
    if (header) header.classList.toggle('scrolled', scrollY > 60);

    // Back-to-top button
    const btt = document.getElementById('backToTop');
    if (btt) btt.classList.toggle('show', scrollY > 400);

    // Highlight active nav link based on visible section
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) current = section.getAttribute('id');
    });

    links.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


/* ============================================================
   4. SMOOTH SCROLL for all anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ============================================================
   5. TYPEWRITER EFFECT
   ============================================================ */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Web Developer 💻',
    'UI/UX Enthusiast 🎨',
    'Sistem Informasi Student 📚',
    'Problem Solver 🔧',
  ];

  let phraseIdx  = 0;
  let charIdx    = 0;
  let isDeleting = false;
  let pausing    = false;

  function type() {
    if (pausing) return;

    const phrase = phrases[phraseIdx];

    if (!isDeleting) {
      // Typing forward
      el.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) {
        // Pause before deleting
        pausing = true;
        setTimeout(() => { pausing = false; isDeleting = true; type(); }, 1800);
        return;
      }
    } else {
      // Deleting
      el.textContent = phrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
      }
    }

    setTimeout(type, isDeleting ? 55 : 90);
  }

  // Small delay before starting
  setTimeout(type, 800);
})();


/* ============================================================
   6. SCROLL-REVEAL (AOS-like, no external library)
   ============================================================ */
(function initScrollReveal() {
  const elements = document.querySelectorAll('[data-aos]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Respect delay attribute
          const delay = parseInt(entry.target.getAttribute('data-aos-delay') || 0);
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ============================================================
   7. SKILL BARS ANIMATION
   ============================================================ */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar   = entry.target;
          const width = bar.getAttribute('data-width') || '0';
          // Small stagger based on position
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach(bar => observer.observe(bar));
})();


/* ============================================================
   8. PORTFOLIO FILTER
   ============================================================ */
(function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      // Filter cards with animation
      cards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          // Trigger reflow for animation restart
          void card.offsetWidth;
          card.style.animation = 'cardFadeIn 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Inject keyframe for card filter animation
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes cardFadeIn {
      from { opacity: 0; transform: scale(0.95) translateY(10px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
  `;
  document.head.appendChild(styleEl);
})();


/* ============================================================
   9. LIGHTBOX
   ============================================================ */
(function initLightbox() {
  const lightbox   = document.getElementById('lightbox');
  const backdrop   = document.getElementById('lightboxBackdrop');
  const closeBtn   = document.getElementById('lightboxClose');
  const prevBtn    = document.getElementById('lightboxPrev');
  const nextBtn    = document.getElementById('lightboxNext');
  const imgEl      = document.getElementById('lightboxImg');
  const titleEl    = document.getElementById('lightboxTitle');
  const descEl     = document.getElementById('lightboxDesc');

  if (!lightbox) return;

  // Build data from project cards
  const cards = Array.from(document.querySelectorAll('.project-card'));
  const projects = cards.map(card => ({
    src:   card.querySelector('.project-card__img')?.src || '',
    alt:   card.querySelector('.project-card__img')?.alt || '',
    title: card.querySelector('.project-card__title')?.textContent || '',
    desc:  card.querySelector('.project-card__desc')?.textContent || '',
  }));

  let currentIdx = 0;

  /** Open lightbox at given index */
  function open(idx) {
    currentIdx = idx;
    update();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /** Close lightbox */
  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  /** Update image/info for currentIdx */
  function update() {
    const visible = cards.filter(c => !c.classList.contains('hidden'));
    const project = projects[currentIdx];
    if (!project) return;
    imgEl.src    = project.src;
    imgEl.alt    = project.alt;
    if (titleEl) titleEl.textContent = project.title;
    if (descEl)  descEl.textContent  = project.desc;
  }

  /** Navigate prev/next among visible cards */
  function navigate(dir) {
    const visibleIndices = cards
      .map((c, i) => ({ hidden: c.classList.contains('hidden'), i }))
      .filter(x => !x.hidden)
      .map(x => x.i);

    const pos    = visibleIndices.indexOf(currentIdx);
    const newPos = (pos + dir + visibleIndices.length) % visibleIndices.length;
    currentIdx   = visibleIndices[newPos];
    update();
  }

  // Attach click listeners to preview buttons
  document.querySelectorAll('.project-card__preview').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-id'));
      open(isNaN(idx) ? 0 : idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (backdrop) backdrop.addEventListener('click', close);
  if (prevBtn)  prevBtn.addEventListener('click', () => navigate(-1));
  if (nextBtn)  nextBtn.addEventListener('click', () => navigate(1));

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });
})();


/* ============================================================
   10. CONTACT FORM VALIDATION
   ============================================================ */
(function initContactForm() {
  const form      = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const spinner   = document.getElementById('btnSpinner');
  const success   = document.getElementById('formSuccess');

  if (!form) return;

  /**
   * Validate a single field
   * @param {HTMLElement} input
   * @param {HTMLElement} errorEl
   * @returns {boolean}
   */
  function validateField(input, errorEl) {
    const value = input.value.trim();
    let message = '';

    if (!value) {
      message = 'Field ini wajib diisi.';
    } else if (input.type === 'email') {
      // Simple email pattern
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        message = 'Format email tidak valid.';
      }
    } else if (input.id === 'name' && value.length < 3) {
      message = 'Nama harus minimal 3 karakter.';
    } else if (input.id === 'message' && value.length < 10) {
      message = 'Pesan harus minimal 10 karakter.';
    }

    if (errorEl) errorEl.textContent = message;
    input.parentElement.querySelector('input, textarea')?.classList.toggle('error', Boolean(message));

    return !message;
  }

  // Real-time validation on blur
  const fields = [
    { input: form.querySelector('#name'),    error: form.querySelector('#nameError') },
    { input: form.querySelector('#email'),   error: form.querySelector('#emailError') },
    { input: form.querySelector('#subject'), error: form.querySelector('#subjectError') },
    { input: form.querySelector('#message'), error: form.querySelector('#messageError') },
  ];

  fields.forEach(({ input, error }) => {
    if (!input) return;
    input.addEventListener('blur',  () => validateField(input, error));
    input.addEventListener('input', () => {
      // Clear error while typing after it was shown
      if (input.classList.contains('error')) validateField(input, error);
    });
  });

  // Submit
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate all fields
    let valid = true;
    fields.forEach(({ input, error }) => {
      if (input && !validateField(input, error)) valid = false;
    });

    if (!valid) return;

    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Mengirim...';
    }
    if (spinner) spinner.classList.add('show');

    // Simulate async send (replace with real fetch in production)
    setTimeout(() => {
      // Reset loading state
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Kirim Pesan';
      }
      if (spinner) spinner.classList.remove('show');

      // Show success message
      if (success) success.classList.add('show');

      // Reset form
      form.reset();

      // Hide success after 5 s
      setTimeout(() => {
        if (success) success.classList.remove('show');
      }, 5000);
    }, 1800);
  });
})();


/* ============================================================
   11. BACK TO TOP
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   12. LAZY LOADING IMAGES (Bonus — IntersectionObserver)
   ============================================================ */
(function initLazyLoad() {
  // Only applies to images that have loading="lazy" attribute
  // Modern browsers handle this natively; this is the polyfill fallback.
  if ('loading' in HTMLImageElement.prototype) return; // native support

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (!lazyImages.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          img.removeAttribute('loading');
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: '200px' }
  );

  lazyImages.forEach(img => observer.observe(img));
})();


/* ============================================================
   13. CURSOR TRAIL (Premium visual — optional decoration)
   ============================================================ */
(function initCursorGlow() {
  // Only on non-touch, non-reduced-motion devices
  if (window.matchMedia('(pointer: coarse)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 8px; height: 8px;
    background: var(--accent);
    border-radius: 50%;
    transition: transform 0.15s ease, opacity 0.3s;
    opacity: 0;
    mix-blend-mode: screen;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(dot);

  let raf;
  let tx = 0, ty = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    tx = e.clientX;
    ty = e.clientY;
    dot.style.opacity = '0.7';
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
  });

  function animate() {
    cx += (tx - cx) * 0.2;
    cy += (ty - cy) * 0.2;
    dot.style.left = cx + 'px';
    dot.style.top  = cy + 'px';
    raf = requestAnimationFrame(animate);
  }
  animate();
})();