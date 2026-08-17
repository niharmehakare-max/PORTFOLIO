/* ============================================
   HERO - Preloader, Character Intro, Ink System
   ============================================ */

function initHero() {
  // ---------- Loading Sequence ----------
  const loader = document.querySelector('.loader');
  const loaderFill = document.querySelector('.loader-bar-fill');
  const loaderPercent = document.querySelector('.loader-percent');
  let progress = 0;

  const loadInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;
    loaderFill.style.width = progress + '%';
    loaderPercent.textContent = Math.floor(progress) + '%';

    if (progress >= 100) {
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
        startIntroSequence();
      }, 400);
    }
  }, 200);

  // ============================================
  // DYNAMIC INK SPLATTER SYSTEM
  // ============================================
  const inkSystem = document.getElementById('ink-system');
  const heroRight = document.querySelector('.hero-right');
  let inkReady = false;

  // Utility: get the right panel's bounding box relative to viewport
  function getRightBounds() {
    return heroRight.getBoundingClientRect();
  }

  // ---- 1. Ink Blobs (organic floating shapes) ----
  function createInkBlobs() {
    const blobConfigs = [
      { w: 80, h: 70, x: '62%', y: '20%', opacity: 0.07, morph: 'blob-morph-1', float: 'blob-float', dur1: '8s', dur2: '12s' },
      { w: 50, h: 55, x: '72%', y: '65%', opacity: 0.05, morph: 'blob-morph-2', float: 'blob-float-reverse', dur1: '10s', dur2: '14s' },
      { w: 35, h: 30, x: '35%', y: '75%', opacity: 0.08, morph: 'blob-morph-1', float: 'blob-float-reverse', dur1: '7s', dur2: '11s' },
      { w: 100, h: 90, x: '68%', y: '40%', opacity: 0.04, morph: 'blob-morph-2', float: 'blob-float', dur1: '12s', dur2: '16s' },
      { w: 25, h: 28, x: '75%', y: '25%', opacity: 0.09, morph: 'blob-morph-1', float: 'blob-float', dur1: '6s', dur2: '9s' },
      { w: 45, h: 40, x: '30%', y: '45%', opacity: 0.06, morph: 'blob-morph-2', float: 'blob-float-reverse', dur1: '9s', dur2: '13s' },
      { w: 60, h: 65, x: '25%', y: '20%', opacity: 0.05, morph: 'blob-morph-1', float: 'blob-float', dur1: '11s', dur2: '15s' },
      { w: 20, h: 22, x: '45%', y: '80%', opacity: 0.1, morph: 'blob-morph-2', float: 'blob-float-reverse', dur1: '5s', dur2: '8s' },
    ];

    blobConfigs.forEach((cfg, i) => {
      const blob = document.createElement('div');
      blob.className = 'ink-blob';
      blob.style.width = cfg.w + 'px';
      blob.style.height = cfg.h + 'px';
      blob.style.left = cfg.x;
      blob.style.top = cfg.y;
      blob.style.animation = `${cfg.morph} ${cfg.dur1} ease-in-out infinite, ${cfg.float} ${cfg.dur2} ease-in-out infinite`;
      blob.style.animationDelay = `${i * 0.3}s`;
      inkSystem.appendChild(blob);

      // Staggered fade-in
      setTimeout(() => {
        blob.style.transition = 'opacity 1.5s ease';
        blob.style.opacity = cfg.opacity;
      }, 800 + i * 200);
    });
  }

  // ---- 2. Ink Burst (radial explosion on character reveal) ----
  function createInkBurst() {
    const centerX = window.innerWidth * 0.5;
    const centerY = window.innerHeight * 0.5;
    const count = 24;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'ink-burst-particle';
      const size = Math.random() * 6 + 2;
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.5;
      const distance = 80 + Math.random() * 180;
      const bx = Math.cos(angle) * distance;
      const by = Math.sin(angle) * distance;

      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      particle.style.setProperty('--bx', bx + 'px');
      particle.style.setProperty('--by', by + 'px');
      particle.style.animation = `burst-out ${1 + Math.random() * 0.8}s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
      particle.style.animationDelay = `${Math.random() * 0.2}s`;

      inkSystem.appendChild(particle);

      // Cleanup
      setTimeout(() => particle.remove(), 2500);
    }
  }

  // ---- 3. Recurring Ink Drops ----
  function startInkDrops() {
    function spawnDrop() {
      if (!inkReady) return;
      const drop = document.createElement('div');
      drop.className = 'ink-drop';
      const size = Math.random() * 8 + 3;
      drop.style.width = size + 'px';
      drop.style.height = size + 'px';
      // Scatter around the center of the screen
      drop.style.left = (25 + Math.random() * 50) + '%';
      drop.style.top = (5 + Math.random() * 85) + '%';
      drop.style.animation = `drop-appear ${1.5 + Math.random() * 2}s ease-out forwards`;

      inkSystem.appendChild(drop);

      const lifetime = 2000 + Math.random() * 2500;
      setTimeout(() => drop.remove(), lifetime);

      // Next drop
      setTimeout(spawnDrop, 600 + Math.random() * 1500);
    }
    spawnDrop();
  }

  // ---- 4. Ink Streaks ----
  function startInkStreaks() {
    function spawnStreak() {
      if (!inkReady) return;
      const streak = document.createElement('div');
      streak.className = 'ink-streak';
      const width = 30 + Math.random() * 80;
      const height = 1 + Math.random() * 2;
      const angle = (Math.random() - 0.5) * 40;

      streak.style.width = width + 'px';
      streak.style.height = height + 'px';
      streak.style.left = (20 + Math.random() * 60) + '%';
      streak.style.top = (10 + Math.random() * 80) + '%';
      streak.style.setProperty('--streak-angle', angle + 'deg');
      streak.style.animation = `streak-draw ${2 + Math.random() * 2}s ease-out forwards`;
      streak.style.borderRadius = '2px';

      inkSystem.appendChild(streak);

      setTimeout(() => streak.remove(), 4500);
      setTimeout(spawnStreak, 3000 + Math.random() * 5000);
    }
    spawnStreak();
  }

  // ---- 5. Ink Drips (gravity) ----
  function startInkDrips() {
    function spawnDrip() {
      if (!inkReady) return;
      const drip = document.createElement('div');
      drip.className = 'ink-drip';
      const height = 20 + Math.random() * 40;
      drip.style.height = height + 'px';
      drip.style.left = (30 + Math.random() * 40) + '%';
      drip.style.top = (15 + Math.random() * 50) + '%';
      drip.style.animation = `drip-fall ${2 + Math.random() * 1.5}s ease-in forwards`;

      inkSystem.appendChild(drip);

      setTimeout(() => drip.remove(), 4000);
      setTimeout(spawnDrip, 4000 + Math.random() * 6000);
    }
    spawnDrip();
  }

  // ---- 6. Splatter Rings (periodic) ----
  function startSplatterRings() {
    function spawnRing() {
      if (!inkReady) return;
      const ring = document.createElement('div');
      ring.className = 'splatter-ring';
      const size = 60 + Math.random() * 140;
      ring.style.width = size + 'px';
      ring.style.height = size + 'px';
      ring.style.left = (35 + Math.random() * 30) + '%';
      ring.style.top = (20 + Math.random() * 60) + '%';
      ring.style.animation = `ring-expand ${2 + Math.random() * 1}s ease-out forwards`;

      inkSystem.appendChild(ring);

      setTimeout(() => ring.remove(), 3500);
      setTimeout(spawnRing, 5000 + Math.random() * 8000);
    }
    spawnRing();
  }

  // ---- 7. Mouse-reactive Ink Drops ----
  let lastInkDrop = 0;
  document.addEventListener('mousemove', (e) => {
    if (!inkReady) return;
    const now = Date.now();
    if (now - lastInkDrop < 120) return; // Throttle

    const charImg = document.getElementById('character-img');
    if (!charImg) return;
    const bounds = charImg.getBoundingClientRect();
    
    // Only spawn when mouse is over or near the character image cutout
    if (e.clientX < bounds.left - 40 || e.clientX > bounds.right + 40) return;
    if (e.clientY < bounds.top - 40 || e.clientY > bounds.bottom + 40) return;

    lastInkDrop = now;

    const drop = document.createElement('div');
    drop.className = 'ink-mouse-drop';
    const size = 3 + Math.random() * 6;
    drop.style.width = size + 'px';
    drop.style.height = size + 'px';
    drop.style.left = e.clientX + 'px';
    drop.style.top = e.clientY + 'px';
    drop.style.transform = 'translate(-50%, -50%)';
    drop.style.animation = `mouse-drop-fade ${0.8 + Math.random() * 0.6}s ease-out forwards`;

    inkSystem.appendChild(drop);
    setTimeout(() => drop.remove(), 1600);
  });

  // ---- Master ink init (called from intro sequence) ----
  function initInkSystem() {
    inkReady = true;
    createInkBlobs();
    createInkBurst();

    // Stagger the recurring systems
    setTimeout(() => startInkDrops(), 500);
    setTimeout(() => startInkStreaks(), 1200);
    setTimeout(() => startInkDrips(), 2000);
    setTimeout(() => startSplatterRings(), 3000);
  }


  // ---------- Intro Animation Sequence ----------
  function startIntroSequence() {
    // Slice reveal
    const slices = document.querySelectorAll('.intro-overlay .slice');
    slices.forEach((slice, i) => {
      setTimeout(() => {
        slice.style.transition = `transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)`;
        slice.style.transform = 'scaleY(0)';
        slice.style.transformOrigin = i % 2 === 0 ? 'top' : 'bottom';
      }, i * 120);
    });

    // Center divider
    setTimeout(() => {
      const divider = document.querySelector('.center-divider');
      divider.style.transition = 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
      divider.style.transform = 'scaleY(1)';
    }, 400);

    // Cross decorations
    setTimeout(() => {
      document.querySelectorAll('.cross-deco').forEach((c, i) => {
        setTimeout(() => {
          c.style.transition = 'opacity 0.5s ease';
          c.style.opacity = '1';
        }, i * 100);
      });
    }, 800);

    // Navigation
    setTimeout(() => {
      const logo = document.querySelector('.nav-logo');
      logo.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      logo.style.opacity = '1';
      logo.style.transform = 'translateY(0)';
    }, 500);

    setTimeout(() => {
      document.querySelectorAll('.nav-links li').forEach((li, i) => {
        setTimeout(() => {
          li.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          li.style.opacity = '1';
          li.style.transform = 'translateY(0)';
        }, i * 80);
      });
    }, 600);

    setTimeout(() => {
      const cta = document.querySelector('.nav-cta');
      cta.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      cta.style.opacity = '1';
      cta.style.transform = 'translateY(0)';
    }, 900);

    // Character image
    setTimeout(() => {
      const img = document.querySelector('.character-img');
      img.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)';
      img.style.opacity = '0.55';
      img.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 600);

    // HUD corners
    setTimeout(() => {
      document.querySelectorAll('.hud-corner').forEach((c, i) => {
        setTimeout(() => {
          c.style.transition = 'opacity 0.5s ease';
          c.style.opacity = '1';
        }, i * 100);
      });
    }, 1000);

    // Stats
    setTimeout(() => {
      document.querySelectorAll('.stat-item').forEach((item, i) => {
        setTimeout(() => {
          item.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
          const numEl = item.querySelector('.stat-number');
          const target = parseInt(numEl.dataset.target);
          animateNumber(numEl, target);
        }, i * 150);
      });
    }, 800);

    // Title lines
    setTimeout(() => {
      document.querySelectorAll('.hero-title .line-inner').forEach((line, i) => {
        setTimeout(() => {
          line.style.transition = 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
          line.style.transform = 'translateY(0)';
        }, i * 120);
      });
    }, 900);

    // JP accent
    setTimeout(() => {
      const jp = document.querySelector('.jp-accent');
      jp.style.transition = 'opacity 1.5s ease';
      jp.style.opacity = '1';
    }, 1200);

    // Subtitle
    setTimeout(() => {
      const sub = document.querySelector('.hero-subtitle');
      sub.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      sub.style.opacity = '1';
      sub.style.transform = 'translateY(0)';
    }, 1300);

    // Role tag
    setTimeout(() => {
      const tag = document.querySelector('.role-tag');
      tag.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      tag.style.opacity = '1';
      tag.style.transform = 'translateY(0)';
    }, 1500);

    // Vertical label
    setTimeout(() => {
      const vl = document.querySelector('.vertical-label');
      vl.style.transition = 'opacity 1s ease';
      vl.style.opacity = '1';
    }, 1400);

    // BG text
    setTimeout(() => {
      const bg = document.querySelector('.bg-text');
      bg.style.transition = 'opacity 1.5s ease';
      bg.style.opacity = '1';
    }, 1200);

    // Character data overlay
    setTimeout(() => {
      const overlay = document.querySelector('.char-data-overlay');
      overlay.style.transition = 'opacity 0.8s ease';
      overlay.style.opacity = '1';

      setTimeout(() => {
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width;
        });
      }, 300);
    }, 1600);

    // Scan line
    setTimeout(() => {
      startScanLine();
    }, 2000);

    // Scroll indicator
    setTimeout(() => {
      const si = document.querySelector('.scroll-indicator');
      si.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      si.style.opacity = '1';
      si.style.transform = 'translateY(0)';
    }, 1800);

    // Year marker
    setTimeout(() => {
      const ym = document.querySelector('.year-marker');
      ym.style.transition = 'opacity 0.8s ease';
      ym.style.opacity = '1';
    }, 1600);

    // Sound toggle
    setTimeout(() => {
      const st = document.querySelector('.sound-toggle');
      st.style.transition = 'opacity 0.8s ease';
      st.style.opacity = '1';
    }, 2000);

    // Ink overlay (static)
    setTimeout(() => {
      const ink = document.querySelector('.ink-overlay');
      ink.style.transition = 'opacity 2s ease';
      ink.style.opacity = '1';
    }, 1500);

    // *** DYNAMIC INK SYSTEM â€” launch with character reveal ***
    setTimeout(() => {
      initInkSystem();
    }, 800);

    // Cursor follower
    setTimeout(() => {
      document.querySelector('.cursor-follower').classList.add('active');
    }, 1500);

    // Particles
    setTimeout(() => {
      initParticles();
    }, 1200);

    // Glitch effect
    setTimeout(() => {
      const title = document.querySelector('.hero-title');
      title.classList.add('glitch-active');
    }, 2500);

    // Typing effect for subtitle
    setTimeout(() => {
      initTypingEffect();
    }, 1800);
  }

  // ---------- Number Animation ----------
  function animateNumber(el, target) {
    let current = 0;
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      current = Math.floor(eased * target);

      const textNode = el.childNodes[el.childNodes.length - 1];
      if (textNode.nodeType === 3) {
        textNode.textContent = current;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // ---------- Scan Line Effect ----------
  function startScanLine() {
    const scanLine = document.querySelector('.scan-line');
    scanLine.style.opacity = '1';

    function runScan() {
      const heroR = document.querySelector('.hero-right');
      const height = heroR.offsetHeight;

      scanLine.style.transition = 'none';
      scanLine.style.top = '0';

      requestAnimationFrame(() => {
        scanLine.style.transition = `top 3s linear, opacity 0.3s ease`;
        scanLine.style.top = height + 'px';

        setTimeout(() => {
          scanLine.style.opacity = '0';
          setTimeout(() => {
            scanLine.style.opacity = '1';
            runScan();
          }, 2000 + Math.random() * 4000);
        }, 3000);
      });
    }

    runScan();
  }

  // ---------- Particles ----------
  function initParticles() {
    const container = document.querySelector('.particles');
    const count = 20;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = (50 + Math.random() * 50) + '%';
      p.style.top = Math.random() * 100 + '%';
      container.appendChild(p);

      animateParticle(p);
    }
  }

  function animateParticle(p) {
    const duration = 3000 + Math.random() * 5000;
    const delay = Math.random() * 2000;

    setTimeout(() => {
      p.style.transition = `opacity ${duration}ms ease, transform ${duration}ms ease`;
      p.style.opacity = (Math.random() * 0.3 + 0.1).toFixed(2);
      p.style.transform = `translate(${(Math.random() - 0.5) * 50}px, ${-Math.random() * 80 - 20}px)`;

      setTimeout(() => {
        p.style.opacity = '0';
        p.style.transform = 'translate(0, 0)';

        setTimeout(() => {
          p.style.top = Math.random() * 100 + '%';
          p.style.left = (50 + Math.random() * 50) + '%';
          animateParticle(p);
        }, 500);
      }, duration);
    }, delay);
  }

  // ---------- Mobile Navigation Drawer Controller ----------
  const navMobileToggle = document.getElementById('nav-mobile-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobNavAbout = document.getElementById('mob-nav-about-btn');
  const mobNavProjects = document.getElementById('mob-nav-projects-btn');
  const mobNavExperience = document.getElementById('mob-nav-experience-btn');
  const mobNavContact = document.getElementById('mob-nav-contact-btn');

  function openMobileNav() {
    if (navMobileToggle && mobileNavDrawer) {
      navMobileToggle.classList.add('active');
      navMobileToggle.setAttribute('aria-expanded', 'true');
      mobileNavDrawer.classList.add('active');
      mobileNavDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileNav() {
    if (navMobileToggle && mobileNavDrawer) {
      navMobileToggle.classList.remove('active');
      navMobileToggle.setAttribute('aria-expanded', 'false');
      mobileNavDrawer.classList.remove('active');
      mobileNavDrawer.setAttribute('aria-hidden', 'true');
      if (!document.querySelector('.about-overlay.active, .parchment-projects-overlay.active, .parchment-experience-overlay.active')) {
        document.body.style.overflow = '';
      }
    }
  }

  if (navMobileToggle) {
    navMobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileNavDrawer.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  // Hook mobile drawer buttons to trigger their respective overlays
  if (mobNavAbout) {
    mobNavAbout.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileNav();
      const aboutBtn = document.getElementById('nav-about-btn');
      if (aboutBtn) aboutBtn.click();
    });
  }

  if (mobNavProjects) {
    mobNavProjects.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileNav();
      const projBtn = document.getElementById('nav-projects-btn');
      if (projBtn) projBtn.click();
    });
  }

  if (mobNavExperience) {
    mobNavExperience.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileNav();
      const expBtn = document.getElementById('nav-experience-btn');
      if (expBtn) expBtn.click();
    });
  }

  window.closeMobileNav = closeMobileNav;

  // ---------- Mouse Follower ----------
  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function updateFollower() {
      if (follower) {
        followerX += (mouseX - followerX) * 0.08;
        followerY += (mouseY - followerY) * 0.08;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
      }
      requestAnimationFrame(updateFollower);
    }
    updateFollower();

    document.querySelectorAll('a, button, .stat-item, .role-tag').forEach(el => {
      el.addEventListener('mouseenter', () => follower && follower.classList.add('hovering'));
      el.addEventListener('mouseleave', () => follower && follower.classList.remove('hovering'));
    });
  }

  // ---------- Subtle Parallax on Mouse Move ----------
  document.addEventListener('mousemove', (e) => {
    if (!window.matchMedia('(pointer: fine)').matches || window.innerWidth <= 1024) return;

    const cx = (e.clientX / window.innerWidth - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;

    const charImg = document.querySelector('.character-img');
    if (charImg && charImg.style.opacity === '0.55' && window.innerWidth > 1024) {
      charImg.style.transform = `translate(calc(-50% + ${cx * 8}px), calc(-50% + ${cy * 5}px)) scale(1)`;
    }

    const jpAccent = document.querySelector('.jp-accent');
    if (jpAccent) {
      jpAccent.style.transform = `translate(${cx * -15}px, ${cy * -10}px)`;
    }

    const bgText = document.querySelector('.bg-text');
    if (bgText) {
      bgText.style.transform = `translateX(-50%) translate(${cx * 12}px, ${cy * 6}px)`;
    }

    // Parallax ink blobs slightly
    document.querySelectorAll('.ink-blob').forEach((blob, i) => {
      const factor = (i % 2 === 0 ? 1 : -1) * (3 + i);
      blob.style.marginLeft = (cx * factor) + 'px';
      blob.style.marginTop = (cy * factor * 0.6) + 'px';
    });
  });

  // ---------- Typing Effect for Role Tag ----------
  function initTypingEffect() {
    const roleText = document.querySelector('.role-tag-text');
    if (!roleText) return;
    const originalText = roleText.dataset.text || roleText.textContent;
    roleText.textContent = '';
    roleText.style.borderRight = '1px solid var(--gray-400)';

    let i = 0;
    const interval = setInterval(() => {
      roleText.textContent += originalText[i];
      i++;
      if (i >= originalText.length) {
        clearInterval(interval);
        setTimeout(() => {
          roleText.style.borderRight = 'none';
        }, 2000);
      }
    }, 60);
  }

  // ---------- Subtle Title Hover Distortion ----------
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
      heroTitle.style.transition = 'letter-spacing 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      heroTitle.style.letterSpacing = '-0.02em';
    });
    heroTitle.addEventListener('mouseleave', () => {
      heroTitle.style.letterSpacing = '-0.04em';
    });
  }

  // ---------- Stat hover micro-interactions ----------
  document.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transition = 'transform 0.3s ease';
      item.style.transform = 'translateY(-3px)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0)';
    });
  });
}
