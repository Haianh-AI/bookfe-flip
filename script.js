// ===== MODAL SYSTEM =====

const overlays = document.querySelectorAll('.modal-overlay');

// Open modal
document.querySelectorAll('.link-modal').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.dataset.modal;
    const modal = document.getElementById(targetId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close via X button
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => closeAllModals());
});

// Close via overlay click
overlays.forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeAllModals();
  });
});

// Close via Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllModals();
});

function closeAllModals() {
  overlays.forEach(o => o.classList.remove('active'));
  document.body.style.overflow = '';
}


// ===== PAGE ANIMATIONS =====

// Reveal sections when they enter viewport
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// Tilt effect for the book cover image
const coverImage = document.querySelector('.book-cover img');
if (coverImage && window.matchMedia('(pointer:fine)').matches) {
  const maxTilt = 7;
  coverImage.addEventListener('mousemove', e => {
    const rect = coverImage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (0.5 - y) * maxTilt;
    const tiltY = (x - 0.5) * maxTilt;
    coverImage.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px) scale(1.02)`;
  });

  coverImage.addEventListener('mouseleave', () => {
    coverImage.style.transform = '';
  });
}

// Parallax shift for hero content on scroll
const heroContent = document.querySelector('.hero-content');
const hero = document.querySelector('.hero');
if (heroContent && hero) {
  window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollY = window.scrollY;
    if (scrollY > heroBottom) return;
    const offset = Math.min(scrollY * 0.14, 22);
    heroContent.style.transform = `translateY(${offset}px)`;
  }, { passive: true });
}


// ===== HERO BACKGROUND: try to use local sea image, fallback to gradient =====
(function setHeroBg() {
  // If a sea/ocean image is available locally you can reference it here
  // e.g.: document.querySelector('.hero').style.backgroundImage = "url('sea.jpg'), linear-gradient(...)";
  // For now the CSS gradient is used as default.
})();
