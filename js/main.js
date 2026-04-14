// ─── SCROLL REVEAL ───────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ─── NAVBAR SCROLL EFFECT ────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── MOBILE MENU ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ─── QUOTE FORM (Formspree) ───────────────────────────────────
const form = document.getElementById('quoteForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  btn.textContent = '🤠 Sending your rope...';
  btn.disabled = true;

  const data = new FormData(form);

  try {
    const res = await fetch('https://formspree.io/f/xrergvwe', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.style.display = 'none';
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      btn.textContent = '⚠️ Something went wrong — call us instead!';
      btn.disabled = false;
    }
  } catch (err) {
    btn.textContent = '⚠️ Connection error — call (303) 555-0199';
    btn.disabled = false;
  }
});

// ─── SMOOTH ANCHOR OFFSET (for fixed nav) ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 12;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── PHONE NUMBER FORMATTING ──────────────────────────────────
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 10);
    if (val.length >= 6) {
      val = `(${val.slice(0,3)}) ${val.slice(3,6)}-${val.slice(6)}`;
    } else if (val.length >= 3) {
      val = `(${val.slice(0,3)}) ${val.slice(3)}`;
    }
    e.target.value = val;
  });
}
