// Liten ESM-modul för det som kräver JavaScript:
// färgtema, mobilmeny och diskret intoning. Sidan fungerar utan JS.

const root = document.documentElement;
const STORAGE_KEY = 'theme';
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

/* ---------- Färgtema ---------- */

function storedTheme() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  const button = document.querySelector('.theme-toggle');
  if (button) {
    const next = theme === 'dark' ? 'ljust' : 'mörkt';
    button.setAttribute('aria-label', `Byt till ${next} läge`);
    button.setAttribute('title', `Byt till ${next} läge`);
  }
}

applyTheme(storedTheme() ?? (darkQuery.matches ? 'dark' : 'light'));

document.querySelector('.theme-toggle')?.addEventListener('click', () => {
  const theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem(STORAGE_KEY, theme); } catch { /* t.ex. privat läge */ }
});

// Följ systemets inställning så länge användaren inte själv har valt.
darkQuery.addEventListener('change', (event) => {
  if (!storedTheme()) applyTheme(event.matches ? 'dark' : 'light');
});

/* ---------- Mobilmeny ---------- */

const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('huvudmeny');

function setNavOpen(open) {
  header.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Stäng meny' : 'Öppna meny');
}

if (header && navToggle && nav) {
  navToggle.addEventListener('click', () => {
    setNavOpen(navToggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setNavOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('nav-open')) {
      setNavOpen(false);
      navToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (header.classList.contains('nav-open') && !header.contains(event.target)) setNavOpen(false);
  });

  // Stäng menyn om fönstret blir brett nog för den vanliga navigeringen.
  window.matchMedia('(min-width: 900px)').addEventListener('change', (event) => {
    if (event.matches) setNavOpen(false);
  });
}

/* ---------- Diskret intoning (endast om rörelse är tillåten) ---------- */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion && 'IntersectionObserver' in window) {
  const targets = document.querySelectorAll('.section-head, .card, .steps li, .prep-card, .values li, .gallery-item, .contact-grid > *');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  for (const el of targets) {
    // Element som redan syns vid sidladdning tonas inte in.
    if (el.getBoundingClientRect().top < window.innerHeight) continue;
    el.classList.add('reveal');
    observer.observe(el);
  }
}
