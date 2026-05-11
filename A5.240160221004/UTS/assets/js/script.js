const projects = [
    {
        id: 1,
        title: "Web Flexilibrary",
        description: "Website ebook berbasis PHP dengan tampilan modern untuk akses dan download buku digital secara mudah",
        category: "web",
        image: "assets/images/flexilibrary.jpeg",
        lightboxImage: "assets/images/flexilibrary.jpeg"
    },
    {
        id: 2,
        title: "Aplikasi Kelola Mahasiswa",
        description: "Aplikasi manajemen mahasiswa berbasis Python untuk pengolahan data akademik secara efisienWebsite yang menampilkan profil, skill, dan hasil project pribadi",
        category: "web",
        image: "assets/images/kelola mahasiswa.jpeg",
        lightboxImage: "assets/images/kelola mahasiswa.jpeg"
    },
     {
        id: 3,
        title: "Portofolio Pribadi",
        description: "Website yang menampilkan profil, skill, dan hasil project pribadi",
        category: "web",
        image: "assets/images/portofolio.jpeg",
        lightboxImage: "assets/images/portofolio.jpeg"
    },
    {
        id: 4,
        title: "Aplikasi Penjadwalan & Pengingat Perkuliahan",
        description: "Prototype halaman login aplikasi perkuliahan dengan desain modern di Figma",
        category: "design",
        image: "assets/images/login.jpeg",
        lightboxImage: "assets/images/login.jpeg"
    },
    {
        id: 5,
        title: "Sistem Informasi Toko",
        description: "Website sistem informasi toko yang dirancang untuk mempermudah manajemen stok, penjualan, dan data pelanggan",
        category: "web",
        image: "assets/images/sistem informasi toko.jpeg",
        lightboxImage: "assets/images/sistem informasi toko.jpeg"
    },
    {
        id: 6,
        title: "Agenda Perjalanan Dinas",
        description: "Membuat & microsoftenyusun agenda perjalanan dinas pimpinan",
        category: "microsoft office",
        image: "assets/images/agenda dinas.jpeg",
        lightboxImage: "assets/images/agenda dinas.jpeg"
    }
];

window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            const navLinksMenu = document.querySelector('.nav-links');
            if (navLinksMenu) {
                navLinksMenu.classList.remove('active');
            }
            document.body.style.overflow = 'auto';
        }
    });
});


function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); 

const themeToggle = document.querySelector('.theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentThemeValue = document.documentElement.getAttribute('data-theme');
        if (currentThemeValue === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

const hamburger = document.querySelector('.hamburger');
const navLinksMenu = document.querySelector('.nav-links');

if (hamburger && navLinksMenu) {
    hamburger.addEventListener('click', () => {
        navLinksMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinksMenu.contains(e.target)) {
            navLinksMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

function renderPortfolioItems(filter = 'all') {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);
    
    portfolioGrid.innerHTML = filteredProjects.map(project => `
        <div class="portfolio-item" data-category="${project.category}" data-id="${project.id}">
            <div class="portfolio-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            </div>
            <div class="portfolio-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="portfolio-category">${getCategoryLabel(project.category)}</span>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.portfolio-overlay') || e.target.closest('.portfolio-category')) {
                const projectId = parseInt(item.dataset.id);
                const project = projects.find(p => p.id === projectId);
                if (project) {
                    openLightbox(project.lightboxImage, project.title);
                }
            } else {
                const projectId = parseInt(item.dataset.id);
                const project = projects.find(p => p.id === projectId);
                if (project) {
                    openLightbox(project.lightboxImage, project.title);
                }
            }
        });
    });
}

function getCategoryLabel(category) {
    const labels = {
        'web': 'Web Development',
        'mobile': 'Mobile App',
        'design': 'UI/UX Design'
    };
    return labels[category] || category;
}

function setupPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            renderPortfolioItems(filterValue);
        });
    });
}

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeLightbox = document.querySelector('.close-lightbox');

function openLightbox(imageSrc, caption) {
    if (lightbox && lightboxImage && lightboxCaption) {
        lightboxImage.src = imageSrc;
        lightboxCaption.textContent = caption;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeLightboxModal() {
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

if (closeLightbox) {
    closeLightbox.addEventListener('click', closeLightboxModal);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.style.display === 'block') {
        closeLightboxModal();
    }
});

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all fields', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        if (message.length < 10) {
            showFormMessage('Message must be at least 10 characters', 'error');
            return;
        }
        
        showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
        contactForm.reset();
        
        setTimeout(() => {
            if (formMessage) {
                formMessage.style.display = 'none';
            }
        }, 5000);
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    if (!progressBars.length) return;
    
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight - 100;
    
    progressBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        if (barPosition < triggerPoint) {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
}

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

const style = document.createElement('style');
style.textContent = `
    img[loading="lazy"] {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    img[loading="lazy"].loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    renderPortfolioItems('all');
    setupPortfolioFilters();
    initLazyLoading();
    
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length && 'IntersectionObserver' in window) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillItems.forEach(item => skillObserver.observe(item));
    }
});

const skillStyle = document.createElement('style');
skillStyle.textContent = `
    .skill-item {
        opacity: 0;
        transform: translateX(-20px);
        transition: all 0.5s ease;
    }
    .skill-item.animate {
        opacity: 1;
        transform: translateX(0);
    }
`;
document.head.appendChild(skillStyle);

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

window.addEventListener('scroll', throttle(() => {
    updateActiveNav();
    animateProgressBars();
}, 100));

function preloadImages() {
    const criticalImages = [
        'https://via.placeholder.com/400x400/4A90E2/ffffff?text=Professional+Photo'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

window.addEventListener('load', preloadImages);

const revealElements = document.querySelectorAll('.about-content, .education, .portfolio-grid, .contact-content');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });
}

const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyle);

console.log('Portfolio website loaded successfully!');