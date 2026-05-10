'use strict';

/*DATA PROYEK (untuk Lightbox)*/
const projects = [
  {
    title:    'Digital Transformation',
    category: 'School Assignments',
    desc:     'CRUD Application (Create, Read, Update, Delete application)',
    tags:     ['Python', 'Xampp'],
    gradient: '--c1:#6c63ff;--c2:#3ecfcf',
    image:    'assets/images/projects/digital-transformationn.png',
    link:     'https://github.com/Rasya-Putri-R91006/college-assignments-/tree/master/Transformasi%20Digital',
  },
  {
    title:    'Algorithms and Programming',
    category: 'School Assignments',
    desc:     'Wedding Organization Booking.',
    tags:     ['Dev C++'],
    gradient: '--c1:#ff6584;--c2:#ff8e53',
    image:    'assets/images/projects/Algorithms-and-Programming.png',
    link:     'https://github.com/Rasya-Putri-R91006/college-assignments-/tree/master/Algoritma%20dan%20Pemrograman',
  },
  {
    title:    'Object Oriented Programming',
    category: 'School Assignments',
    desc:     'Store Management',
    tags:     ['PHP', 'Xampp'],
    gradient: '--c1:#43e97b;--c2:#38f9d7',
    image:    'assets/images/projects/Object-OrientedProgramming.png',
    link:     'https://github.com/Rasya-Putri-R91006/college-assignments-/tree/master/Pemrograman%20Berorientasi%20Objek',
  },
  {
    title:    'Indonesian Language Assignment',
    category: 'School Assignments',
    desc:     'Video editing assignment',
    tags:     ['Capcut'],
    gradient: '--c1:#f093fb;--c2:#f5576c',
    image:    'assets/images/projects/indonesia.png',
    link:     'https://youtu.be/naLWb0bbEKw?si=UcbMrxUywsW-O4yX',
  },
  {
    title:    'SOON',
    category: 'Internship Project',
    desc:     'SOON',
    tags:     ['SOON'],
    gradient: '--c1:#4facfe;--c2:#00f2fe',
    icon:     'fa-chart-line',
    link:     '#',
  },
  {
    title:    'SOON',
    category: 'Web App',
    desc:     'SOON',
    tags:     ['SOON'],
    gradient: '--c1:#fa709a;--c2:#fee140',
    icon:     'fa-pencil-ruler',
    link:     '#',
  },
];

/*PAGE LOADER*/
(function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;

  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 1700);
  });
})();

/*CUSTOM CURSOR*/
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Smooth follower
  function animate() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  // Hover state
  const hoverEls = document.querySelectorAll('a, button, .portfolio-card, .tech-icon, .filter-btn');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
  });
})();

/*DARK / LIGHT THEME TOGGLE*/
(function initTheme() {
  const html   = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Baca preferensi tersimpan atau default dark
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });
})();

/*HAMBURGER / MOBILE MENU*/
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Tutup menu saat link diklik
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });
})();

/*STICKY HEADER & ACTIVE NAV LINK*/
(function initHeader() {
  const header   = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!header) return;

  function onScroll() {
    // Sticky shadow
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); 
})();

/*SMOOTH SCROLLING*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/*COUNTER ANIMATION*/
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count);
    const duration = 1800;
    const step     = target / (duration / 16);
    let current    = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/*SKILL TABS*/
(function initSkillTabs() {
  const tabs   = document.querySelectorAll('.skill-tab');
  const panels = document.querySelectorAll('.skills-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tab aktif
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Tampilkan panel yg sesuai
      panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `tab-${target}`) {
          panel.classList.add('active');
          // Trigger skill bar animation
          animateBars(panel);
        }
      });
    });
  });

  // Animasi awal untuk tab pertama
  const firstPanel = document.querySelector('.skills-panel.active');
  if (firstPanel) {
    setTimeout(() => animateBars(firstPanel), 600);
  }

  function animateBars(panel) {
    const bars = panel.querySelectorAll('.skill-fill');
    bars.forEach(bar => {
      const width = bar.dataset.width;
      // Reset dulu supaya re-animasi bisa terjadi
      bar.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = width + '%';
        });
      });
    });
  }
})();

/*SCROLL REVEAL*/
(function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.portfolio-card, .timeline-item, .contact-item, .about-text, .about-stats, .tech-icon, .section-header'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));
})();

/*SKILL BAR ANIMATION*/
(function initSkillBarObserver() {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;

  let triggered = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        const activePanel = document.querySelector('.skills-panel.active');
        if (activePanel) {
          setTimeout(() => {
            activePanel.querySelectorAll('.skill-fill').forEach(bar => {
              bar.style.width = bar.dataset.width + '%';
            });
          }, 300);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(aboutSection);
})();

/*PORTFOLIO FILTER*/
(function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items      = document.querySelectorAll('.portfolio-item');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update tombol aktif
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach(item => {
        const category = item.dataset.category;
        const show     = filter === 'all' || category === filter;

        if (show) {
          item.classList.remove('hidden');
          item.style.opacity   = '0';
          item.style.transform = 'translateY(20px)';
          // Animasi masuk
          requestAnimationFrame(() => {
            setTimeout(() => {
              item.style.opacity   = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          });
        } else {
          item.style.opacity   = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => item.classList.add('hidden'), 350);
        }
      });
    });
  });

  // Set transisi pada item
  items.forEach(item => {
    item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  });
})();

/* LIGHTBOX */
(function initLightbox() {
  const lightbox    = document.getElementById('lightbox');
  const overlay     = document.getElementById('lightbox-overlay');
  const closeBtn    = document.getElementById('lightbox-close');
  const prevBtn     = document.getElementById('lightbox-prev');
  const nextBtn     = document.getElementById('lightbox-next');
  const contentArea = document.getElementById('lightbox-content');
  const viewBtns    = document.querySelectorAll('.view-btn');

  if (!lightbox) return;

  let currentIndex = 0;

  function renderLightbox(index) {
    const p = projects[index];
    if (!p) return;

    const tagsHTML = p.tags.map(t => `<span>${t}</span>`).join('');

    const previewHTML = p.image
      ? `<img 
          src="${p.image}" 
          alt="${p.title}" 
          style="width:100%; height:100%; object-fit:cover; display:block;"
         />`
      : `<div class="project-placeholder" style="${p.gradient}">
           <i class="fas ${p.icon}"></i>
         </div>`;

    contentArea.innerHTML = `
      <div class="lightbox-preview">
        ${previewHTML}
      </div>
      <div class="lightbox-details">
        <span class="project-cat">${p.category}</span>
        <h2>${p.title}</h2>
        <p>${p.desc}</p>
        <div class="lightbox-tags">${tagsHTML}</div>
        <a href="${p.link}" class="lightbox-link" target="_blank">
          Lihat Proyek <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    `;
  }

  function openLightbox(index) {
    currentIndex = index;
    renderLightbox(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    renderLightbox(currentIndex);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % projects.length;
    renderLightbox(currentIndex);
  }

  viewBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openLightbox(parseInt(btn.dataset.index));
    });
  });

  overlay .addEventListener('click', closeLightbox);
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn .addEventListener('click', showPrev);
  nextBtn .addEventListener('click', showNext);

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });
  lightbox.addEventListener('touchend', e => {
    const deltaX = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) showNext();
      else showPrev();
    }
  });
})();

/*CONTACT FORM VALIDASI*/
(function initContactForm() {
  const form      = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const success   = document.getElementById('form-success');
  if (!form) return;

  const fields = {
    name:    { el: document.getElementById('name'),    errEl: document.getElementById('name-error'),    rules: { required: true, minLen: 2 } },
    email:   { el: document.getElementById('email'),   errEl: document.getElementById('email-error'),   rules: { required: true, email: true } },
    subject: { el: document.getElementById('subject'), errEl: document.getElementById('subject-error'), rules: { required: true, minLen: 4 } },
    message: { el: document.getElementById('message'), errEl: document.getElementById('message-error'), rules: { required: true, minLen: 20 } },
  };

  /*Validasi satu field, return true jika valid*/
  function validateField(key) {
    const { el, errEl, rules } = fields[key];
    const val = el.value.trim();
    let error = '';

    if (rules.required && !val) {
      error = 'This field is required.';
    } else if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      error = 'Invalid email format.';
    } else if (rules.minLen && val.length < rules.minLen) {
      error = `Minimum ${rules.minLen} characters.`;
    }

    if (error) {
      errEl.textContent = error;
      el.classList.add('error');
      return false;
    } else {
      errEl.textContent = '';
      el.classList.remove('error');
      return true;
    }
  }

  // Validasi realtime saat input
  Object.keys(fields).forEach(key => {
    const el = fields[key].el;
    if (!el) return;
    el.addEventListener('input', () => validateField(key));
    el.addEventListener('blur',  () => validateField(key));
  });

  // Submit handler
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Validasi semua field
    const allValid = Object.keys(fields).map(validateField).every(v => v);
    if (!allValid) return;

    // Simulasi pengiriman
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const btnIcon    = submitBtn.querySelector('.btn-icon');

    submitBtn.disabled  = true;
    btnText.style.display    = 'none';
    btnLoading.style.display = 'inline-flex';
    if (btnIcon) btnIcon.style.display = 'none';

    // Simulasi async (ganti dengan fetch() ke backend asli)
    setTimeout(() => {
      submitBtn.disabled       = false;
      btnText.style.display    = 'inline';
      btnLoading.style.display = 'none';
      if (btnIcon) btnIcon.style.display = 'inline';

      // Tampilkan pesan sukses
      success.style.display = 'flex';
      form.reset();

      // Sembunyikan setelah 5 detik
      setTimeout(() => {
        success.style.display = 'none';
      }, 5000);
    }, 2000);
  });
})();

/*LAZY LOADING GAMBAR*/
(function initLazyLoad() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (!lazyImages.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  lazyImages.forEach(img => observer.observe(img));
})();

/*BACK TO TOP*/
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.style.opacity    = '1';
      btn.style.visibility = 'visible';
    } else {
      btn.style.opacity    = '0';
      btn.style.visibility = 'hidden';
    }
  }, { passive: true });

  // Initial hide
  btn.style.opacity    = '0';
  btn.style.visibility = 'hidden';
  btn.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
})();
