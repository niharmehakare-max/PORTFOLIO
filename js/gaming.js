/* ============================================
   GAMING DOJO OVERLAY MODULE (js/gaming.js)
   Standalone Parchment Overlay for Chapter 06
   ============================================ */

function initGaming() {
  const gamingOverlay = document.getElementById('gaming-overlay');
  const gamingCloseBtn = document.getElementById('gaming-close');
  const gamingReturn3dBtn = document.getElementById('gaming-return-3d');
  const navGamingBtn = document.getElementById('nav-gaming-btn');
  const journeyToSpotifyBtn = document.getElementById('journey-to-spotify');

  function openGaming() {
    // Close other overlays first for seamless transition
    const allOverlays = [
      document.getElementById('about-overlay'),
      document.getElementById('projects-overlay'),
      document.getElementById('experience-overlay'),
      document.getElementById('contact-overlay'),
      document.getElementById('spotify-overlay')
    ];
    allOverlays.forEach(ol => {
      if (ol && ol.classList.contains('active')) {
        ol.classList.remove('active');
      }
    });

    if (gamingOverlay) {
      gamingOverlay.classList.add('active');
      gamingOverlay.scrollTop = 0;
      const scrollCont = document.getElementById('gaming-scroll');
      if (scrollCont) scrollCont.scrollTop = 0;
    }

    // Sound effect
    if (window.audioEngine && typeof window.audioEngine.playPaperRustle === 'function') {
      window.audioEngine.playPaperRustle();
    } else if (typeof window.playFurinChime === 'function') {
      window.playFurinChime();
    }

    // Unlock achievement if available
    if (window.achievementsManager && typeof window.achievementsManager.unlock === 'function') {
      window.achievementsManager.unlock('gamer');
    }
  }

  function closeGaming() {
    if (gamingOverlay) {
      gamingOverlay.classList.remove('active');
    }
  }

  // Wire up button handlers
  if (navGamingBtn) {
    navGamingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openGaming();
    });
  }

  if (gamingCloseBtn) {
    gamingCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeGaming();
    });
  }

  if (gamingReturn3dBtn) {
    gamingReturn3dBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeGaming();
      if (window.spatialWorld && typeof window.spatialWorld.navigateToZone === 'function') {
        window.spatialWorld.navigateToZone('hero');
      }
    });
  }

  // Journey bridge to Spotify
  if (journeyToSpotifyBtn) {
    journeyToSpotifyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeGaming();
      setTimeout(() => {
        if (typeof window.openSpotifyOverlay === 'function') {
          window.openSpotifyOverlay();
        }
      }, 200);
    });
  }

  // Keyboard shortcut (ESC)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gamingOverlay && gamingOverlay.classList.contains('active')) {
      closeGaming();
    }
  });

  // Global exports
  window.openGamingOverlay = openGaming;
  window.closeGamingOverlay = closeGaming;
  window.openGamingSection = openGaming;
}

// Make initGaming available globally
window.initGaming = initGaming;
