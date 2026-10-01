/* ============================================
   PROJECTS OVERLAY - Toggle
   ============================================ */

function initProjects() {
  const projectsBtn = document.getElementById('nav-projects-btn');
  const mobNavProjects = document.getElementById('mob-nav-projects-btn');
  const projectsOverlay = document.getElementById('projects-overlay');
  const projectsClose = document.getElementById('projects-close');
  const projectsScroll = document.getElementById('projects-scroll');
  const projectsHeaderBg = document.getElementById('projects-header-bg');
  const aboutOverlay = document.getElementById('about-overlay');
  const experienceOverlay = document.getElementById('experience-overlay');
  const contactOverlay = document.getElementById('contact-overlay');

  function openProjects() {
    if (!projectsOverlay) return;
    if (aboutOverlay) aboutOverlay.classList.remove('active');
    if (experienceOverlay) experienceOverlay.classList.remove('active');
    if (contactOverlay) contactOverlay.classList.remove('active');
    const gamingOverlay = document.getElementById('gaming-overlay');
    const spotifyOverlay = document.getElementById('spotify-overlay');
    if (gamingOverlay) gamingOverlay.classList.remove('active');
    if (spotifyOverlay) spotifyOverlay.classList.remove('active');
    projectsOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (projectsScroll) projectsScroll.scrollTop = 0;
    const projectsReturn3D = document.getElementById('projects-return-3d');

    if (window.spatialWorld && typeof window.spatialWorld.navigateToZone === 'function') {
      window.spatialWorld.navigateToZone('projects');
    }
  }

  function closeProjects() {
    if (!projectsOverlay) return;
    projectsOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (projectsHeaderBg) projectsHeaderBg.classList.remove('visible');
    // Return seamlessly to 3D Clothesline Gallery zone!
    if (window.spatialWorld && typeof window.spatialWorld.navigateToZone === 'function') {
      window.spatialWorld.navigateToZone('projects');
      if (window.spatialWorld.audioEngine) {
        window.spatialWorld.audioEngine.playTempleGong(150);
      }
    }
  }

  window.openProjects = openProjects;
  window.closeProjects = closeProjects;

  if (projectsBtn && projectsOverlay) {
    projectsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openProjects();
    });

    if (mobNavProjects) {
      mobNavProjects.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof window.closeMobileNav === 'function') window.closeMobileNav();
        openProjects();
      });
    }

    if (projectsClose) {
      projectsClose.addEventListener('click', (e) => {
        e.preventDefault();
        closeProjects();
      });
    }

    const prjReturnBtn = document.getElementById('projects-return-3d');
    if (prjReturnBtn) {
      prjReturnBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeProjects();
      });
    }

    // Journey Next Button: About -> Projects
    const journeyToProjects = document.getElementById('journey-to-projects');
    if (journeyToProjects) {
      journeyToProjects.addEventListener('click', (e) => {
        e.preventDefault();
        openProjects();
      });
    }

    // Journey Next Button: Projects -> Experience
    const journeyToExperience = document.getElementById('journey-to-experience');
    if (journeyToExperience) {
      journeyToExperience.addEventListener('click', (e) => {
        e.preventDefault();
        closeProjects();
        if (typeof window.openExperience === 'function') {
          window.openExperience();
        } else {
          const expBtn = document.getElementById('nav-experience-btn');
          if (expBtn) expBtn.click();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectsOverlay.classList.contains('active')) {
        closeProjects();
      }
    });

    if (projectsScroll && projectsHeaderBg) {
      projectsScroll.addEventListener('scroll', () => {
        if (projectsScroll.scrollTop > 50) {
          projectsHeaderBg.classList.add('visible');
        } else {
          projectsHeaderBg.classList.remove('visible');
        }
      });
    }
  }
}
