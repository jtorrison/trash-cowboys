// ============ TRASH COWBOYS · main.js ============

// Nav scroll-state (subtle shadow after scroll)
const nav = document.querySelector('.nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 8) {
    nav.style.boxShadow = '0 2px 12px rgba(26, 58, 46, 0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
  lastScroll = y;
});

// Photo upload preview
const fileInput = document.querySelector('input[type="file"]');
if (fileInput) {
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    const hint = fileInput.parentElement.querySelector('.file-hint');
    if (files.length > 0) {
      hint.textContent = `✓ ${files.length} photo${files.length > 1 ? 's' : ''} attached — we'll get a better quote to you faster.`;
      hint.style.color = '#7A8F5C';
      hint.style.fontWeight = '600';
    }
  });
}

// Form submission feedback
const form = document.querySelector('.quote-form');
if (form) {
  form.addEventListener('submit', (e) => {
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '🤠 Sending...';
    btn.disabled = true;
  });
}

// Smooth scroll for anchor links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href === '#' || href === '#top') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Reveal sections on scroll (subtle)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .how-card, .eco-step, .break-card, .review-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
