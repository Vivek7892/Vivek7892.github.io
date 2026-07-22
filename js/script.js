// Font size control
const SIZES = [13, 14.5, 16, 18];
const savedSize = parseFloat(localStorage.getItem('fontSize')) || 14.5;
let sizeIdx = SIZES.indexOf(savedSize) !== -1 ? SIZES.indexOf(savedSize) : 1;
document.body.style.fontSize = SIZES[sizeIdx] + 'px';

const fsInc = document.getElementById('fsInc');
const fsDec = document.getElementById('fsDec');
if (fsInc) fsInc.addEventListener('click', () => {
  if (sizeIdx < SIZES.length - 1) {
    sizeIdx++;
    document.body.style.fontSize = SIZES[sizeIdx] + 'px';
    localStorage.setItem('fontSize', SIZES[sizeIdx]);
  }
});
if (fsDec) fsDec.addEventListener('click', () => {
  if (sizeIdx > 0) {
    sizeIdx--;
    document.body.style.fontSize = SIZES[sizeIdx] + 'px';
    localStorage.setItem('fontSize', SIZES[sizeIdx]);
  }
});

// Resume preview overlay
const resumeOverlay     = document.getElementById('resumeOverlay');
const resumeOverlayClose = document.getElementById('resumeOverlayClose');
const resumePreviewBtn  = document.getElementById('resumePreviewBtn');

function openResume(e) {
  e.preventDefault();
  resumeOverlay && resumeOverlay.classList.add('visible');
}
function closeResume() {
  resumeOverlay && resumeOverlay.classList.remove('visible');
}

if (resumePreviewBtn) resumePreviewBtn.addEventListener('click', openResume);
if (resumeOverlayClose) resumeOverlayClose.addEventListener('click', closeResume);
if (resumeOverlay) {
  resumeOverlay.addEventListener('click', e => { if (e.target === resumeOverlay) closeResume(); });
}

// Theme toggle
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;
const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);

toggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll nav links inside .content panel (not window)
const contentPanel = document.querySelector('.content');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu-links a[href^="#"], .footer-quick-links a[href^="#"]');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenuLinks = document.getElementById('mobileMenuLinks');

function closeMobileMenu() {
  if (!mobileMenuToggle || !mobileMenuLinks) return;
  mobileMenuToggle.setAttribute('aria-expanded', 'false');
  mobileMenuToggle.setAttribute('aria-label', 'Open section menu');
  mobileMenuLinks.classList.remove('open');
  document.body.classList.remove('mobile-menu-open');
}

if (mobileMenuToggle && mobileMenuLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    const isOpen = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mobileMenuToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileMenuToggle.setAttribute('aria-label', isOpen ? 'Open section menu' : 'Close section menu');
    mobileMenuLinks.classList.toggle('open', !isOpen);
    document.body.classList.toggle('mobile-menu-open', !isOpen);
  });

  mobileMenuLinks.addEventListener('click', e => {
    if (e.target === mobileMenuLinks) closeMobileMenu();
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target && contentPanel) {
      e.preventDefault();
      if (window.matchMedia('(max-width: 768px)').matches) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        contentPanel.scrollTo({ top: target.offsetTop - 32, behavior: 'smooth' });
      }
      closeMobileMenu();
    }
  });
});

const scrollTopBtn = document.getElementById('scrollTopBtn');

function getScrollTop() {
  if (window.matchMedia('(max-width: 768px)').matches) {
    return window.scrollY || document.documentElement.scrollTop;
  }
  return contentPanel ? contentPanel.scrollTop : 0;
}

function updateScrollTopBtn() {
  if (!scrollTopBtn) return;
  scrollTopBtn.classList.toggle('visible', getScrollTop() > 180);
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (contentPanel) {
      contentPanel.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  window.addEventListener('scroll', updateScrollTopBtn, { passive: true });
}

// Active nav highlight
const sections = contentPanel ? contentPanel.querySelectorAll('section[id]') : [];

if (contentPanel) {
  contentPanel.addEventListener('scroll', () => {
    updateScrollTopBtn();
    let current = '';
    sections.forEach(sec => {
      if (contentPanel.scrollTop >= sec.offsetTop - 60) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });
}

// Profile lightbox
const profilePic          = document.getElementById('profilePic');
const profileLightbox     = document.getElementById('profileLightbox');
const profileLightboxClose = document.getElementById('profileLightboxClose');

function openLightbox()  { profileLightbox && profileLightbox.classList.add('visible'); }
function closeLightbox() { profileLightbox && profileLightbox.classList.remove('visible'); }

if (profilePic) {
  profilePic.addEventListener('click', openLightbox);
  profilePic.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openLightbox(); });
}
if (profileLightboxClose) profileLightboxClose.addEventListener('click', closeLightbox);
if (profileLightbox) {
  profileLightbox.addEventListener('click', e => { if (e.target === profileLightbox) closeLightbox(); });
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeLightbox(); closeOverlay(); closeMobileMenu(); } });

// Topbar "Get in touch" button opens contact overlay
const topbarBtn = document.getElementById('topbarContactBtn');
if (topbarBtn) topbarBtn.addEventListener('click', openOverlay);

// Contact form overlay
const overlay  = document.getElementById('contactOverlay');
const closeBtn = document.getElementById('contactClose');
sessionStorage.removeItem('overlayShown');

function openOverlay()  { overlay && overlay.classList.add('visible'); }
function closeOverlay() { overlay && overlay.classList.remove('visible'); }

(function () {
  if (sessionStorage.getItem('overlayShown')) return;

  function getScrollPct() {
    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      var total = document.body.scrollHeight - window.innerHeight;
      return total > 0 ? (window.scrollY / total) * 100 : 0;
    }
    if (!contentPanel) return 0;
    var total = contentPanel.scrollHeight - contentPanel.clientHeight;
    return total > 0 ? (contentPanel.scrollTop / total) * 100 : 0;
  }

  function check() {
    if (getScrollPct() >= 25) {
      openOverlay();
      sessionStorage.setItem('overlayShown', '1');
      window.removeEventListener('scroll', check);
      if (contentPanel) contentPanel.removeEventListener('scroll', check);
    }
  }

  window.addEventListener('scroll', check, { passive: true });
  if (contentPanel) contentPanel.addEventListener('scroll', check, { passive: true });
})();

if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

if (overlay) {
  overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
}

// Expose closeOverlay so emailjs-config.js can close the card on success
window.closeContactOverlay = closeOverlay;

// ============================================
// Draggable column resizers
// ============================================
function initResizer(resizerId, colLeftId, colRightId, isLeft) {
  const resizer  = document.getElementById(resizerId);
  const colLeft  = document.getElementById(colLeftId);
  const colRight = document.getElementById(colRightId);
  const layout   = document.getElementById('layout');
  if (!resizer || !colLeft || !colRight || !layout) return;

  let startX, startLeftW, startRightW;

  resizer.addEventListener('mousedown', e => {
    startX      = e.clientX;
    startLeftW  = colLeft.getBoundingClientRect().width;
    startRightW = colRight.getBoundingClientRect().width;
    resizer.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    function onMove(e) {
      const dx = e.clientX - startX;
      const newLeft  = Math.max(180, startLeftW  + dx);
      const newRight = Math.max(180, startRightW - dx);
      // rebuild grid columns: sidebar 4px content 4px blog
      const cols = layout.style.gridTemplateColumns.split(' ');
      if (isLeft) {
        cols[0] = newLeft + 'px';
        cols[2] = newRight + 'px';
      } else {
        cols[2] = newLeft + 'px';
        cols[4] = newRight + 'px';
      }
      layout.style.gridTemplateColumns = cols.join(' ');
    }

    function onUp() {
      resizer.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

initResizer('resizerLeft',  'colSidebar', 'colContent', true);
initResizer('resizerRight', 'colContent', 'colBlog',    false);

// ============================================
// Scroll progress bar
// ============================================
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress && contentPanel) {
  contentPanel.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = contentPanel;
    const pct = scrollHeight <= clientHeight ? 0 : (scrollTop / (scrollHeight - clientHeight)) * 100;
    scrollProgress.style.width = pct + '%';
  }, { passive: true });
}

// ============================================
// Typing animation for hero role
// ============================================
(function () {
  const el = document.getElementById('heroRole');
  if (!el) return;
  const roles = [
    'Full Stack Developer',
    'Mobile App Developer',
    'Flutter Developer',
    'AI / ML Engineer',
  ];
  let ri = 0, ci = 0, deleting = false;
  el.classList.add('typing-cursor');

  function tick() {
    const current = roles[ri];
    if (!deleting) {
      el.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 55 : 90);
  }
  setTimeout(tick, 800);
})();

// ============================================
// Section fade-in on scroll (IntersectionObserver)
// ============================================
(function () {
  if (!('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.content section, .content article, .content .featured-project');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('section-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(t => obs.observe(t));
})();
