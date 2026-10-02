/* ============================================
   MAIN - DOMContentLoaded Shell
   Optimized with Lazy & Deferred Section Modular Loading
   for high-efficiency Mobile Chrome performance
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Critical Above-The-Fold Path: Hero, Micro-Interactions, and About
  if (typeof initHero === 'function') initHero();
  if (typeof initMicroInteractions === 'function') initMicroInteractions();
  if (typeof initAbout === 'function') initAbout();

  // 2. Secondary Modules: Defer execution to idle time or first user interaction
  let deferredLoaded = false;
  function initDeferredModules() {
    if (deferredLoaded) return;
    deferredLoaded = true;

    if (typeof initProjects === 'function') initProjects();
    if (typeof initExperience === 'function') initExperience();
    if (typeof initContact === 'function') initContact();
    if (typeof initGaming === 'function') initGaming();
    if (typeof initSpotify === 'function') initSpotify();
    if (typeof initAchievements === 'function') initAchievements();
    if (typeof initBlueprintMap === 'function') initBlueprintMap();
    if (typeof initStudioLab === 'function') initStudioLab();
  }

  // Pre-emptively initialize if user taps any nav trigger before idle fires
  const navTriggers = [
    '#nav-projects-btn', '#mob-nav-projects-btn',
    '#nav-experience-btn', '#mob-nav-experience-btn',
    '#nav-contact-btn', '#mob-nav-contact-btn',
    '#nav-gaming-btn', '#nav-spotify-btn',
    '#nav-achievements-btn', '#nav-map-btn', '#nav-studio-btn'
  ];

  function onFirstNavInteraction(e) {
    if (e.target.closest(navTriggers.join(','))) {
      initDeferredModules();
      document.removeEventListener('pointerdown', onFirstNavInteraction, true);
    }
  }
  document.addEventListener('pointerdown', onFirstNavInteraction, true);

  // Initialize during browser idle time so main thread remains 100% fluid
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => initDeferredModules(), { timeout: 1800 });
  } else {
    setTimeout(initDeferredModules, 800);
  }
});