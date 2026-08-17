/* ============================================
   PROJECTS OVERLAY - Toggle
   ============================================ */

function initProjects() {
  const projectsBtn = document.getElementById('nav-projects-btn');
  const projectsOverlay = document.getElementById('projects-overlay');
  const projectsClose = document.getElementById('projects-close');
  const projectsScroll = document.getElementById('projects-scroll');
  const projectsHeaderBg = document.getElementById('projects-header-bg');
  const aboutOverlay = document.getElementById('about-overlay');
  const experienceOverlay = document.getElementById('experience-overlay');
  const contactOverlay = document.getElementById('contact-overlay');

  if (projectsBtn && projectsOverlay) {
    projectsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (aboutOverlay) aboutOverlay.classList.remove('active');
      if (experienceOverlay) experienceOverlay.classList.remove('active');
      if (contactOverlay) contactOverlay.classList.remove('active');
      projectsOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (projectsScroll) projectsScroll.scrollTop = 0;
    });

    if (projectsClose) {
      projectsClose.addEventListener('click', () => {
        projectsOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (projectsHeaderBg) projectsHeaderBg.classList.remove('visible');
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectsOverlay.classList.contains('active')) {
        if (projectsClose) projectsClose.click();
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
