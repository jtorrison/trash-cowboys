// ─── PROMO STRIP HEIGHT ───────────────────────────────────────
const promoStrip = document.querySelector('.promo-strip');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── SCROLL REVEAL ───────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── MOBILE MENU ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ─── SMOOTH SCROLL ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    const off = navbar.offsetHeight + 12;
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' });
  });
});

// ─── PHONE FORMATTING ────────────────────────────────────────
const ph = document.getElementById('phone');
if (ph) {
  ph.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '').substring(0, 10);
    if (v.length >= 6) v = `(${v.slice(0,3)}) ${v.slice(3,6)}-${v.slice(6)}`;
    else if (v.length >= 3) v = `(${v.slice(0,3)}) ${v.slice(3)}`;
    e.target.value = v;
  });
}

// ─── FAQ ACCORDION ────────────────────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ─── PHOTO UPLOAD ─────────────────────────────────────────────
const zone    = document.getElementById('uploadZone');
const input   = document.getElementById('photos');
const preview = document.getElementById('uploadPreview');
let files     = [];

function refreshPreview() {
  preview.innerHTML = '';
  const old = zone.querySelector('.upload-count');
  if (old) old.remove();
  if (!files.length) { zone.classList.remove('has-files'); return; }
  zone.classList.add('has-files');
  files.forEach((f, i) => {
    const thumb = document.createElement('div'); thumb.className = 'preview-thumb';
    const img = document.createElement('img'); img.src = URL.createObjectURL(f); img.alt = f.name;
    const rm = document.createElement('button'); rm.className = 'preview-remove'; rm.type = 'button'; rm.innerHTML = '✕';
    rm.onclick = e => { e.stopPropagation(); files.splice(i, 1); refreshPreview(); };
    thumb.append(img, rm); preview.appendChild(thumb);
  });
  const cnt = document.createElement('span'); cnt.className = 'upload-count';
  cnt.textContent = `${files.length} photo${files.length > 1 ? 's' : ''} attached`;
  zone.appendChild(cnt);
}

input.addEventListener('change', () => {
  Array.from(input.files).forEach(f => { if (files.length < 5 && f.size <= 10 * 1024 * 1024) files.push(f); });
  refreshPreview(); input.value = '';
});
zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
zone.addEventListener('drop', e => {
  e.preventDefault(); zone.classList.remove('dragover');
  Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')).forEach(f => {
    if (files.length < 5 && f.size <= 10 * 1024 * 1024) files.push(f);
  });
  refreshPreview();
});

// ─── QUOTE FORM ───────────────────────────────────────────────
const form    = document.getElementById('quoteForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  btn.textContent = '🤠 Sending your rope...';
  btn.disabled = true;
  const data = new FormData(form);
  files.forEach((f, i) => data.append(`photo_${i + 1}`, f, f.name));
  try {
    const res = await fetch('https://formspree.io/f/xrergvwe', {
      method: 'POST', body: data, headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      form.style.display = 'none'; success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      btn.textContent = '⚠️ Something went wrong — call us at (303) 555-0199'; btn.disabled = false;
    }
  } catch {
    btn.textContent = '⚠️ Connection error — call (303) 555-0199'; btn.disabled = false;
  }
});
