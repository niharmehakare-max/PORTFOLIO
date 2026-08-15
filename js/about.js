/* ============================================
   ABOUT OVERLAY - Toggle & Scroll
   ============================================ */

function initAbout() {
  const aboutBtn = document.getElementById('nav-about-btn');
  const aboutOverlay = document.getElementById('about-overlay');
  const aboutClose = document.getElementById('about-close');
  const aboutScroll = document.getElementById('about-scroll');
  const projectsOverlay = document.getElementById('projects-overlay');
  const experienceOverlay = document.getElementById('experience-overlay');

  if (aboutBtn && aboutOverlay) {
    aboutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (projectsOverlay) projectsOverlay.classList.remove('active');
      if (experienceOverlay) experienceOverlay.classList.remove('active');
      aboutOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (aboutScroll) aboutScroll.scrollTop = 0;
    });

    if (aboutClose) {
      aboutClose.addEventListener('click', () => {
        aboutOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && aboutOverlay.classList.contains('active')) {
        if (aboutClose) aboutClose.click();
      }
    });
  }
}
