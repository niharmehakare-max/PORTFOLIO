/* ============================================
   MANUSCRIPT BLUEPRINT MAP (Inspired by art-design-portfolio.vercel.app)
   Interactive torn-parchment architectural blueprint with pushpins
   ============================================ */

function initBlueprintMap() {
  const mapModal = document.getElementById('manuscript-map-modal');
  const mapBackdrop = document.getElementById('map-backdrop');
  const mapCloseBtn = document.getElementById('map-close-btn');
  const navMapBtn = document.getElementById('nav-map-btn');
  const mobNavMapBtn = document.getElementById('mob-nav-map-btn');

  if (!mapModal) return;

  function openMap() {
    mapModal.classList.add('active');
    mapModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Update active node state based on open overlays
    updateCurrentLocationNode();

    // Trigger scholar achievement if available
    if (window.achievementsManager) {
      window.achievementsManager.unlock('scholar');
    }

    if (window.playClickSound) window.playClickSound(480);
  }

  function closeMap() {
    mapModal.classList.remove('active');
    mapModal.setAttribute('aria-hidden', 'true');
    // Only restore body scroll if no other overlay is open
    const hasActiveOverlay = document.querySelector('.about-overlay.active, .quick-cmd-hud.active, .achievements-drawer.active');
    if (!hasActiveOverlay) {
      document.body.style.overflow = '';
    }
  }

  function updateCurrentLocationNode() {
    const nodes = mapModal.querySelectorAll('.map-node-card');
    nodes.forEach(n => n.classList.remove('current-location'));

    let activeId = 'hero';
    if (document.getElementById('about-overlay')?.classList.contains('active')) {
      activeId = 'about';
    } else if (document.getElementById('projects-overlay')?.classList.contains('active')) {
      // Check if studio lab section is visible or in view
      const studioSec = document.getElementById('studio-lab-section');
      const projectsScroll = document.getElementById('projects-scroll');
      if (studioSec && projectsScroll && projectsScroll.scrollTop > studioSec.offsetTop - 200) {
        activeId = 'studio';
      } else {
        activeId = 'projects';
      }
    } else if (document.getElementById('experience-overlay')?.classList.contains('active')) {
      activeId = 'experience';
    } else if (document.getElementById('contact-overlay')?.classList.contains('active')) {
      activeId = 'contact';
    }

    const currentCard = mapModal.querySelector(`[data-map-dest="${activeId}"]`);
    if (currentCard) {
      currentCard.classList.add('current-location');
    }
  }

  // Bind Open/Close
  if (navMapBtn) {
    navMapBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openMap();
    });
  }

  if (mobNavMapBtn) {
    mobNavMapBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (typeof window.closeMobileNav === 'function') window.closeMobileNav();
      openMap();
    });
  }

  if (mapCloseBtn) {
    mapCloseBtn.addEventListener('click', () => closeMap());
  }

  if (mapBackdrop) {
    mapBackdrop.addEventListener('click', () => closeMap());
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mapModal.classList.contains('active')) {
      closeMap();
    }
  });

  // Wire Map Destination Nodes
  const destinationCards = mapModal.querySelectorAll('.map-node-card');
  destinationCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const dest = card.getAttribute('data-map-dest');
      closeMap();

      setTimeout(() => {
        switch (dest) {
          case 'hero':
            if (typeof window.closeAbout === 'function') window.closeAbout();
            if (typeof window.closeProjects === 'function') window.closeProjects();
            if (typeof window.closeExperience === 'function') window.closeExperience();
            if (typeof window.closeContact === 'function') window.closeContact();
            break;
          case 'about':
            if (typeof window.openAbout === 'function') window.openAbout();
            break;
          case 'projects':
            if (typeof window.openProjects === 'function') window.openProjects();
            break;
          case 'studio':
            if (typeof window.openProjects === 'function') {
              window.openProjects();
              setTimeout(() => {
                const studioEl = document.getElementById('studio-lab-section');
                if (studioEl) {
                  studioEl.scrollIntoView({ behavior: 'smooth' });
                }
              }, 300);
            }
            break;
          case 'experience':
            if (typeof window.openExperience === 'function') window.openExperience();
            break;
          case 'gaming':
            if (typeof window.openGamingOverlay === 'function') window.openGamingOverlay();
            else if (typeof window.openGamingSection === 'function') window.openGamingSection();
            break;
          case 'spotify':
            if (typeof window.openSpotifyOverlay === 'function') window.openSpotifyOverlay();
            else if (typeof window.openSpotifySection === 'function') window.openSpotifySection();
            break;
          case 'contact':
            if (typeof window.openContact === 'function') window.openContact();
            break;
        }

        if (window.spatialWorld && typeof window.spatialWorld.navigateToZone === 'function') {
          window.spatialWorld.navigateToZone(dest);
        }

        if (window.achievementsManager) {
          window.achievementsManager.unlock('explorer');
        }
      }, 250);
    });
  });

  window.openBlueprintMap = openMap;
  window.closeBlueprintMap = closeMap;
}

// Global initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlueprintMap);
} else {
  initBlueprintMap();
}
