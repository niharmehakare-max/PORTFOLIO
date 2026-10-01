/* ============================================
   CONTACT - Chapter 04 Parchment Overlay & Radial Hub
   ============================================ */

function initContact() {
  const contactBtn = document.getElementById('nav-contact-btn');
  const mobNavContact = document.getElementById('mob-nav-contact-btn');
  const contactOverlay = document.getElementById('contact-overlay');
  const contactClose = document.getElementById('contact-close');
  const contactScroll = document.getElementById('contact-scroll');
  const aboutOverlay = document.getElementById('about-overlay');
  const projectsOverlay = document.getElementById('projects-overlay');
  const experienceOverlay = document.getElementById('experience-overlay');
  const journeyToHero = document.getElementById('journey-to-hero');

  function openContact() {
    if (!contactOverlay) return;
    if (aboutOverlay) aboutOverlay.classList.remove('active');
    if (projectsOverlay) projectsOverlay.classList.remove('active');
    if (experienceOverlay) experienceOverlay.classList.remove('active');
    const gamingOverlay = document.getElementById('gaming-overlay');
    const spotifyOverlay = document.getElementById('spotify-overlay');
    if (gamingOverlay) gamingOverlay.classList.remove('active');
    if (spotifyOverlay) spotifyOverlay.classList.remove('active');
    contactOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (contactScroll) contactScroll.scrollTop = 0;
    if (window.spatialWorld && typeof window.spatialWorld.navigateToZone === 'function') {
      window.spatialWorld.navigateToZone('contact');
    }

    // Trigger title scramble effect if available
    const mainTitle = contactOverlay.querySelector('.contact-main-title');
    if (mainTitle && window.scrambleElement) {
      window.scrambleElement(mainTitle, mainTitle.dataset.scramble || mainTitle.textContent.trim(), 700);
    }
  }

  function closeContact() {
    if (!contactOverlay) return;
    contactOverlay.classList.remove('active');
    document.body.style.overflow = '';
    // Return seamlessly to 3D Ocean Dock zone!
    if (window.spatialWorld && typeof window.spatialWorld.navigateToZone === 'function') {
      window.spatialWorld.navigateToZone('contact');
      if (window.spatialWorld.audioEngine) {
        window.spatialWorld.audioEngine.playTempleGong(160);
      }
    }
  }

  window.openContact = openContact;
  window.closeContact = closeContact;
  window.toggleContactPopup = openContact; // Alias for backward compatibility

  if (contactBtn && contactOverlay) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openContact();
    });
  }

  const heroContactQuickBtn = document.getElementById('hero-contact-quick-btn');
  if (heroContactQuickBtn && contactOverlay) {
    heroContactQuickBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openContact();
    });
  }

  if (mobNavContact && contactOverlay) {
    mobNavContact.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.closeMobileNav === 'function') {
        window.closeMobileNav();
      }
      openContact();
    });
  }

  if (contactClose) {
    contactClose.addEventListener('click', (e) => {
      e.preventDefault();
      closeContact();
    });
  }

  const contactReturnBtn = document.getElementById('contact-return-3d');
  if (contactReturnBtn) {
    contactReturnBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeContact();
    });
  }

  if (journeyToHero) {
    journeyToHero.addEventListener('click', (e) => {
      e.preventDefault();
      closeContact();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactOverlay && contactOverlay.classList.contains('active')) {
      closeContact();
    }
  });

  // Micro-interaction hover magnetic wobble on radial nodes
  const radialBadges = contactOverlay ? contactOverlay.querySelectorAll('.radial-badge') : [];
  radialBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'scale(1.12)';
      badge.style.transition = 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = '';
    });
  });
}
