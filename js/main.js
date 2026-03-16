// ============================================
// PORTFOLIO CRISTOPHER FRANÇA - MAIN.JS v1.4
// ============================================

// ==================== CONFIGURAÇÃO ====================
// 🟢 true = disponível | false = indisponível
const DISPONIVEL_PARA_TRABALHO = true;

// ==================== BADGE DISPONÍVEL ====================
document.addEventListener('DOMContentLoaded', () => {
    const badge = document.querySelector('.badge-disponivel');
    if (badge) {
        if (DISPONIVEL_PARA_TRABALHO) {
            badge.classList.add('visivel');
        }
    }
});

// ==================== MENU MOBILE ====================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav     = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMobileMenu() {
    const isOpen = mobileNav.classList.toggle('active');
    if (mobileOverlay) mobileOverlay.classList.toggle('active', isOpen);
    mobileMenuBtn.textContent = isOpen ? '✕' : '☰';
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
    mobileNav.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    mobileMenuBtn.textContent = '☰';
    document.body.style.overflow = '';
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

document.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMobileMenu();
});

// ==================== SCROLL SUAVE ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMobileMenu();
        }
    });
});

// ==================== ANIMAÇÕES DE SCROLL (FADE-IN) ====================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ==================== CONTADORES ANIMADOS ====================
function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start) + suffix;
        }
    }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '+';
            // só anima se ainda não animou
            if (el.dataset.animated) return;
            el.dataset.animated = 'true';
            animateCounter(el, target, suffix);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.numero-estatistica[data-target]').forEach(el => {
    // valor inicial
    el.textContent = '0';
    counterObserver.observe(el);
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a => {
                a.classList.toggle('ativo', a.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

// ==================== LOG ====================
console.log('%c🚀 Portfólio Cristopher França', 'color: #f59e0b; font-size: 20px; font-weight: bold;');
console.log('%c✨ v1.4 — HTML, CSS & JavaScript', 'color: #64748b; font-size: 14px;');
console.log('%c💼 Disponível para oportunidades!', 'color: #10b981; font-size: 14px;');