// assets/js/script.js
// ========== LOADING ANIMATION ==========
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-overlay');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 800);
});

// ========== DARK/LIGHT MODE ==========
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// ========== MOBILE MENU ==========
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if(href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if(target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== PORTFOLIO FILTER ==========
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        portfolioItems.forEach(item => {
            if(filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        // reset grid display
        document.querySelector('.portfolio-grid').style.display = 'grid';
    });
});

// ========== LIGHTBOX PREVIEW ==========
const modal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');
const closeModal = document.querySelector('.lightbox-close');

document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const imgSrc = trigger.dataset.img;
        const title = trigger.dataset.title;
        const desc = trigger.dataset.desc;
        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        modal.style.display = 'flex';
    });
});
closeModal.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', (e) => {
    if(e.target === modal) modal.style.display = 'none';
});

// ========== CONTACT FORM VALIDATION ==========
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    if(nameInput.value.trim() === '') {
        nameError.textContent = 'Nama harus diisi';
        isValid = false;
    }
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if(!emailRegex.test(emailInput.value.trim())) {
        emailError.textContent = 'Email tidak valid';
        isValid = false;
    }
    if(messageInput.value.trim() === '') {
        messageError.textContent = 'Pesan tidak boleh kosong';
        isValid = false;
    }
    if(isValid) {
        formStatus.textContent = 'Pesan terkirim! Terima kasih.';
        formStatus.style.color = '#10b981';
        contactForm.reset();
        setTimeout(() => formStatus.textContent = '', 3000);
    } else {
        formStatus.textContent = 'Harap periksa kembali form anda.';
        formStatus.style.color = '#ef4444';
    }
});

// ========== PROGRESS BAR ANIMATION ON VIEW ==========
const skillSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress-fill');
let animated = false;
const observer = new IntersectionObserver((entries) => {
    if(entries[0].isIntersecting && !animated) {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => { bar.style.width = width; }, 100);
        });
        animated = true;
    }
}, { threshold: 0.3 });
observer.observe(skillSection);

// ========== LAZY LOADING IMAGES (Native + Fallback) ==========
if('loading' in HTMLImageElement.prototype) {
    const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
    lazyImgs.forEach(img => img.loading = 'lazy');
} else {
    // fallback for older browsers
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}