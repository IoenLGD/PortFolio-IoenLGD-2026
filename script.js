'use strict';

/* ── Lang ── */
let lang = localStorage.getItem('lgd-lang') || 'fr';

function applyLang(l) {
  lang = l;
  localStorage.setItem('lgd-lang', l);
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = l === 'fr' ? 'EN' : 'FR';

  document.querySelectorAll('[data-fr]').forEach(el => {
    el.textContent = l === 'fr' ? el.dataset.fr : el.dataset.en;
  });
  document.querySelectorAll('[data-ph-fr]').forEach(el => {
    el.placeholder = l === 'fr' ? el.dataset.phFr : el.dataset.phEn;
  });
}

const langBtn = document.getElementById('langBtn');
if (langBtn) langBtn.addEventListener('click', () => applyLang(lang === 'fr' ? 'en' : 'fr'));
applyLang(lang);

/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.querySelector('.nav-pill').style.background =
    window.scrollY > 30 ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.58)';
}, { passive: true });

/* ── Burger ── */
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
if (burger && drawer) {
  burger.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
  });
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      burger.classList.remove('open');
    });
  });
}

/* ── iOS-style scroll animation ── */
const ioEls = document.querySelectorAll('.ios-anim');
if (ioEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delay = parseInt(entry.target.dataset.d || '0', 10);
      setTimeout(() => entry.target.classList.add('in'), delay);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1 });
  ioEls.forEach(el => observer.observe(el));
}

/* ── Skill bars ── */
const skillCards = document.querySelectorAll('.skill-card');
if (skillCards.length) {
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.bar-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, i * 100);
      });
      skillObs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  skillCards.forEach(c => skillObs.observe(c));
}

/* ── Active nav link ── */
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-a');
if (sections.length && navAs.length) {
  const secObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => secObs.observe(s));
}

/* ── Contact form ── */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if (form && status) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const msg   = document.getElementById('fmsg').value.trim();
    if (!name || !email || !msg) return;
    const sub  = encodeURIComponent('Contact Portfolio – ' + name);
    const body = encodeURIComponent('De : ' + name + ' <' + email + '>\n\n' + msg);
    window.location.href = 'mailto:legourlayioen.pro@outlook.com?subject=' + sub + '&body=' + body;
    status.textContent = lang === 'fr' ? '✓ Votre client mail va s\'ouvrir…' : '✓ Your mail client will open…';
    form.reset();
    setTimeout(() => { status.textContent = ''; }, 5000);
  });
}