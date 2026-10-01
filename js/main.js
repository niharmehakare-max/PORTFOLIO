/* ============================================
   MAIN - DOMContentLoaded Shell
   Loads all section modules
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHero();
  initAbout();
  initProjects();
  initExperience();
  initContact();
  if (typeof initGaming === 'function') initGaming();
  initSpotify();
  if (typeof initAchievements === 'function') initAchievements();
  if (typeof initBlueprintMap === 'function') initBlueprintMap();
  if (typeof initStudioLab === 'function') initStudioLab();
  initMicroInteractions();
});