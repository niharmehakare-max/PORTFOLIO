/* ============================================
   STUDIO LAB & CLOTHESLINE SHOWCASE (Inspired by art-design-portfolio.vercel.app)
   3D Cylindrical Retro Terminal Carousel & Swaying Clothesline Gallery
   ============================================ */

function initStudioLab() {
  // 1. 3D Cylindrical Retro Terminal Carousel
  const carouselTrack = document.getElementById('studio-carousel-track');
  const prevBtn = document.getElementById('studio-carousel-prev');
  const nextBtn = document.getElementById('studio-carousel-next');
  const carouselContainer = document.getElementById('studio-carousel-container');

  let currentRotation = 0;
  const numPanels = 4;
  const anglePerPanel = 360 / numPanels;
  let isDragging = false;
  let startX = 0;
  let startRotation = 0;

  function updateCarousel(angle) {
    if (!carouselTrack) return;
    currentRotation = angle;
    carouselTrack.style.transform = `rotateY(${currentRotation}deg)`;

    // Update active panel indicator
    const normalizedAngle = ((currentRotation % 360) + 360) % 360;
    const activeIndex = Math.round((360 - normalizedAngle) / anglePerPanel) % numPanels;

    const dots = document.querySelectorAll('.studio-dot-indicator');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === activeIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updateCarousel(currentRotation + anglePerPanel);
      if (window.achievementsManager) window.achievementsManager.unlock('director');
      if (window.playClickSound) window.playClickSound(380);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      updateCarousel(currentRotation - anglePerPanel);
      if (window.achievementsManager) window.achievementsManager.unlock('director');
      if (window.playClickSound) window.playClickSound(440);
    });
  }

  // Drag interaction for 3D Carousel
  if (carouselContainer) {
    const onPointerDown = (clientX) => {
      isDragging = true;
      startX = clientX;
      startRotation = currentRotation;
      carouselContainer.classList.add('is-dragging');
    };

    const onPointerMove = (clientX) => {
      if (!isDragging) return;
      const deltaX = clientX - startX;
      const sensitivity = 0.45;
      updateCarousel(startRotation + (deltaX * sensitivity));
      if (Math.abs(deltaX) > 40 && window.achievementsManager) {
        window.achievementsManager.unlock('director');
      }
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      carouselContainer.classList.remove('is-dragging');
      // Snap to nearest panel
      const snapped = Math.round(currentRotation / anglePerPanel) * anglePerPanel;
      updateCarousel(snapped);
    };

    carouselContainer.addEventListener('mousedown', (e) => onPointerDown(e.clientX));
    window.addEventListener('mousemove', (e) => onPointerMove(e.clientX));
    window.addEventListener('mouseup', onPointerUp);

    carouselContainer.addEventListener('touchstart', (e) => onPointerDown(e.touches[0].clientX), { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches[0]) onPointerMove(e.touches[0].clientX);
    }, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  }

  // Terminal Live Diagnostics Button Simulator
  const diagnosticBtns = document.querySelectorAll('.terminal-run-btn');
  diagnosticBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const termBody = btn.closest('.studio-monitor')?.querySelector('.terminal-screen-output');
      if (!termBody) return;

      btn.disabled = true;
      btn.textContent = 'RUNNING...';
      termBody.innerHTML = `<span class="term-blink">> INITIALIZING SYMBOLIC PROBE...</span>`;

      const lines = [
        '> AST Tree parsed: 1,420 nodes loaded.',
        '> Coupling density: 0.142 (Optimal)',
        '> Blast radius contained: 3 services.',
        '> Zero cycles detected. ARCHITECH STABLE ✓'
      ];

      lines.forEach((line, i) => {
        setTimeout(() => {
          const p = document.createElement('div');
          p.className = 'term-line-log';
          p.textContent = line;
          termBody.appendChild(p);
          termBody.scrollTop = termBody.scrollHeight;
          if (window.playClickSound) window.playClickSound(600 + (i * 80));

          if (i === lines.length - 1) {
            btn.disabled = false;
            btn.textContent = 'RE-RUN TEST ↺';
            if (window.achievementsManager) {
              window.achievementsManager.unlock('director');
            }
          }
        }, (i + 1) * 450);
      });
    });
  });

  // 2. Clothesline Hanging Artwork Interactions
  const clotheslineItems = document.querySelectorAll('.clothesline-item');
  clotheslineItems.forEach((item, index) => {
    // Alternate initial gentle sway angles
    const baseAngle = (index % 2 === 0 ? 1 : -1) * (1.2 + (index * 0.4));
    item.style.setProperty('--base-tilt', `${baseAngle}deg`);

    item.addEventListener('mouseenter', () => {
      item.classList.add('swinging-active');
      if (window.playPaperSound) window.playPaperSound();
    });

    item.addEventListener('mouseleave', () => {
      setTimeout(() => item.classList.remove('swinging-active'), 800);
    });

    // Clicking a clothesline project focuses that project in the list
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPrjId = item.getAttribute('data-target-prj');
      if (targetPrjId) {
        const targetEl = document.getElementById(targetPrjId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetEl.classList.add('highlight-pulse');
          setTimeout(() => targetEl.classList.remove('highlight-pulse'), 1800);
        }
      }
      if (window.achievementsManager) {
        window.achievementsManager.unlock('art_critic');
      }
    });
  });
}

// Global initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStudioLab);
} else {
  initStudioLab();
}
