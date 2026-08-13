/* ============================================
   PORTFOLIO HERO — GAME CHARACTER INTRO
   Animation & Interaction Controller
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

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
    const tl = new Timeline();

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

    // *** DYNAMIC INK SYSTEM — launch with character reveal ***
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

  // ---------- Mouse Follower ----------
  const follower = document.querySelector('.cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateFollower() {
    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(updateFollower);
  }
  updateFollower();

  document.querySelectorAll('a, button, .stat-item, .role-tag').forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
  });

  // ---------- Subtle Parallax on Mouse Move ----------
  document.addEventListener('mousemove', (e) => {
    const cx = (e.clientX / window.innerWidth - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;

    const charImg = document.querySelector('.character-img');
    if (charImg && charImg.style.opacity === '0.55') {
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
  heroTitle.addEventListener('mouseenter', () => {
    heroTitle.style.transition = 'letter-spacing 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    heroTitle.style.letterSpacing = '-0.02em';
  });
  heroTitle.addEventListener('mouseleave', () => {
    heroTitle.style.letterSpacing = '-0.04em';
  });

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
  // ============================================
  // ABOUT OVERLAY
  // ============================================
  const aboutBtn = document.getElementById('nav-about-btn');
  const aboutOverlay = document.getElementById('about-overlay');
  const aboutClose = document.getElementById('about-close');
  const aboutScroll = document.getElementById('about-scroll');
  const aboutPfp = document.getElementById('about-pfp-ring');
  const aboutName = document.querySelector('.about-name');
  const aboutNameLabel = document.querySelector('.about-name-label');
  const aboutBio = document.querySelector('.about-bio');
  const aboutDetails = document.querySelector('.about-details');
  const aboutScrollHint = document.getElementById('about-scroll-hint');
  const aboutStickyHeader = document.getElementById('about-sticky-header');
  const aboutHeaderBg = document.getElementById('about-header-bg');
  const aboutExtras = document.querySelectorAll('.about-extra');

  let pfpStartX, pfpStartY, nameStartX, nameStartY;
  let nameWidth;

  function calculateAboutInitialPositions() {
    if (!aboutPfp || !aboutName) return;
    
    // Temporarily ensure transform is reset to get accurate positions
    const prevPfpTransform = aboutPfp.style.transform;
    const prevNameTransform = aboutName.style.transform;
    aboutPfp.style.transform = '';
    aboutName.style.transform = '';

    const pfpRect = aboutPfp.getBoundingClientRect();
    const nameRect = aboutName.getBoundingClientRect();
    
    pfpStartX = pfpRect.left + pfpRect.width / 2;
    pfpStartY = pfpRect.top + pfpRect.height / 2;
    nameStartX = nameRect.left + nameRect.width / 2;
    nameStartY = nameRect.top + nameRect.height / 2;
    nameWidth = nameRect.width;

    // Restore transforms
    aboutPfp.style.transform = prevPfpTransform;
    aboutName.style.transform = prevNameTransform;
  }

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
        aboutClose.click();
      }
    });
  }

  // ============================================
  // PROJECTS OVERLAY
  // ============================================
  const projectsBtn = document.getElementById('nav-projects-btn');
  const projectsOverlay = document.getElementById('projects-overlay');
  const projectsClose = document.getElementById('projects-close');
  const projectsScroll = document.getElementById('projects-scroll');
  const projectsHeaderBg = document.getElementById('projects-header-bg');

  if (projectsBtn && projectsOverlay) {
    projectsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (aboutOverlay) aboutOverlay.classList.remove('active');
      if (experienceOverlay) experienceOverlay.classList.remove('active');
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
        projectsClose.click();
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

  // ============================================
  // PAPER PARCHMENT VINTAGE EXPERIENCE TIMELINE
  // (Dynamic Winding Curve Renderer)
  // ============================================
  const experienceBtn = document.getElementById('nav-experience-btn');
  const experienceOverlay = document.getElementById('experience-overlay');
  const experienceClose = document.getElementById('experience-close');
  const expViewport = document.getElementById('exp-timeline-viewport');
  const expTrack = document.getElementById('exp-timeline-track');
  const expSvg = document.getElementById('exp-timeline-svg');
  const expCardsContainer = document.getElementById('exp-timeline-cards');
  const expPrevBtn = document.getElementById('exp-prev-btn');
  const expNextBtn = document.getElementById('exp-next-btn');

  // Dynamic Experience Data Store — Keep only Nihar's actual resume experiences!
  const experiencesData = [
    {
      startDate: "July 2025",
      endDate: "December 2025",
      role: "AI Team Lead – Industry Sponsored",
      company: "Passion Info Tech – Pune",
      title: "RAG-Based Semantic Search System",
      bullets: [
        "Led a 5-member team in building a RAG-based semantic search system for religious sculptures, enabling theme-based queries and knowledge discovery.",
        "Designed retrieval pipeline using embeddings and vector search to fetch relevant verses from the Bhagavad Gita, Quran, and Bible.",
        "Integrated LLM-based summarization to generate concise, context-aware responses from retrieved content."
      ],
      tags: ["RAG System", "Vector Search", "Embeddings", "LLMs"]
    },
    {
      startDate: "January 2026",
      endDate: "May 2026",
      role: "AI Team Lead | Industry Sponsored",
      company: "Atlas CorpCo – Pune",
      title: "Full-Stack Alloy Identification Platform",
      bullets: [
        "Led team in developing a full-stack alloy identification platform that analyzes laboratory reports and recommends matching alloy grades.",
        "Developed backend APIs and business logic to extract chemical composition data from PDF reports, enabling effective matching against alloy databases.",
        "Implemented alloy ranking and query-processing workflows based on composition similarity."
      ],
      tags: ["Full-Stack", "PDF Composition Extraction", "Alloy Matching", "REST APIs"]
    },
    {
      startDate: "January 2026",
      endDate: "May 2026",
      role: "AI Team Lead | Industry Sponsored",
      company: "Atlas CorpCo – Pune",
      title: "CAD Drawing AI-Powered Error Logging Platform",
      bullets: [
        "Designed and implemented computer vision pipeline using OpenCV and Tesseract OCR for extracting annotations from technical drawings.",
        "Built backend workflow for automated error ingestion, classification, and severity-based prioritization dashboard.",
        "Led team in developing AI-powered error logging platform for CAD drawings, enhancing detection accuracy and streamlining workflows."
      ],
      tags: ["OpenCV", "Tesseract OCR", "Computer Vision", "Automated Error Ingestion"]
    }
  ];

  function renderPaperTimeline() {
    if (!expTrack || !expSvg || !expCardsContainer) return;

    // Reset container contents
    expSvg.innerHTML = '';
    expCardsContainer.innerHTML = '';

    const itemCount = experiencesData.length;
    const startX = 140;
    const spacingX = 340; // Horizontal spacing between nodes
    const trackHeight = 650; // Full track height
    const centerY = 340; // Baseline centerline for the wave
    const amplitude = 110; // Height of wave peaks and valleys

    // Calculate total track width dynamically
    const totalWidth = startX + (itemCount + 1) * spacingX + 260;
    expTrack.style.width = totalWidth + 'px';
    expSvg.setAttribute('viewBox', `0 0 ${totalWidth} ${trackHeight}`);

    // Build Node Coordinates Array
    // Node 0 = Start Node
    const nodes = [];
    nodes.push({ x: startX, y: centerY + 85, type: 'start' });

    // Nodes 1 to N = Experience items
    for (let i = 0; i < itemCount; i++) {
      const x = startX + (i + 1) * spacingX;
      // Alternate wave peak (Top) and valley (Bottom)
      const isTop = (i % 2 === 0);
      const y = isTop ? (centerY - amplitude) : (centerY + amplitude);
      nodes.push({ x, y, type: isTop ? 'top' : 'bottom', data: experiencesData[i], index: i });
    }

    // Final Node = Future Arrow Node
    const endX = startX + (itemCount + 1) * spacingX;
    const endY = centerY - amplitude - 30;
    nodes.push({ x: endX, y: endY, type: 'end' });

    // 1. Generate SVG Smooth Bezier Curve Path
    let pathD = `M ${nodes[0].x} ${nodes[0].y}`;
    for (let i = 0; i < nodes.length - 1; i++) {
      const p1 = nodes[i];
      const p2 = nodes[i + 1];
      const dx = (p2.x - p1.x) * 0.5;
      
      // Control points for smooth organic wave
      const cx1 = p1.x + dx;
      const cy1 = p1.y;
      const cx2 = p2.x - dx;
      const cy2 = p2.y;
      
      pathD += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p2.x} ${p2.y}`;
    }

    // Main Curve Path
    const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathEl.setAttribute('d', pathD);
    pathEl.setAttribute('stroke', '#2c2825');
    pathEl.setAttribute('stroke-width', '2.5');
    pathEl.setAttribute('fill', 'none');
    pathEl.setAttribute('stroke-linecap', 'round');
    expSvg.appendChild(pathEl);

    // Progressive Path Drawing Animation
    try {
      const pathLength = pathEl.getTotalLength();
      pathEl.style.strokeDasharray = pathLength;
      pathEl.style.strokeDashoffset = pathLength;
      pathEl.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)';
      setTimeout(() => {
        pathEl.style.strokeDashoffset = '0';
      }, 50);
    } catch(e) {}

    // End Arrow Head (pointing up-right)
    const arrowHead = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arrowHead.setAttribute('d', `M ${endX - 16} ${endY + 12} L ${endX} ${endY} L ${endX - 18} ${endY - 2}`);
    arrowHead.setAttribute('stroke', '#2c2825');
    arrowHead.setAttribute('stroke-width', '2.5');
    arrowHead.setAttribute('fill', 'none');
    arrowHead.setAttribute('stroke-linecap', 'round');
    arrowHead.setAttribute('stroke-linejoin', 'round');
    expSvg.appendChild(arrowHead);

    // 2. Render Node Dots, Dashed Connector Lines, and Experience Cards
    nodes.forEach((node) => {
      // Node Watercolor Ring Halo (SVG)
      const haloCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      haloCircle.setAttribute('cx', node.x);
      haloCircle.setAttribute('cy', node.y);
      haloCircle.setAttribute('r', '17');
      haloCircle.setAttribute('fill', 'rgba(44, 40, 37, 0.1)');
      haloCircle.style.cursor = node.data ? 'pointer' : 'default';
      expSvg.appendChild(haloCircle);

      const haloCircleInner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      haloCircleInner.setAttribute('cx', node.x);
      haloCircleInner.setAttribute('cy', node.y);
      haloCircleInner.setAttribute('r', '11');
      haloCircleInner.setAttribute('fill', 'rgba(44, 40, 37, 0.15)');
      haloCircleInner.style.cursor = node.data ? 'pointer' : 'default';
      expSvg.appendChild(haloCircleInner);

      // Node Inner Black Dot (SVG)
      const dotCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dotCircle.setAttribute('cx', node.x);
      dotCircle.setAttribute('cy', node.y);
      dotCircle.setAttribute('r', '5.5');
      dotCircle.setAttribute('fill', '#1c1a17');
      dotCircle.style.cursor = node.data ? 'pointer' : 'default';
      expSvg.appendChild(dotCircle);

      if (node.data) {
        const clickNode = () => openExpModal(node.data, node.index);
        haloCircle.addEventListener('click', clickNode);
        haloCircleInner.addEventListener('click', clickNode);
        dotCircle.addEventListener('click', clickNode);
      }

      // Handle Experience Item Nodes (Compact Preview Cards)
      if (node.type === 'top' || node.type === 'bottom') {
        const item = node.data;
        const isTop = node.type === 'top';
        
        // Compact Card vertical positioning (uncluttered, leaves curve 100% visible)
        const cardTopY = isTop ? (node.y - 120) : (node.y + 40);
        const dashedLineY2 = isTop ? (node.y - 35) : (node.y + 35);

        // Dashed Connector Line
        const dashedLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        dashedLine.setAttribute('x1', node.x);
        dashedLine.setAttribute('y1', node.y + (isTop ? -8 : 8));
        dashedLine.setAttribute('x2', node.x);
        dashedLine.setAttribute('y2', dashedLineY2);
        dashedLine.setAttribute('stroke', '#7a7266');
        dashedLine.setAttribute('stroke-dasharray', '3.5,3.5');
        dashedLine.setAttribute('stroke-width', '1.2');
        expSvg.appendChild(dashedLine);

        // Create Compact Card HTML Element
        const cardEl = document.createElement('div');
        cardEl.className = `paper-card ${isTop ? 'top' : 'bottom'}`;
        cardEl.style.left = `${node.x - 120}px`;
        cardEl.style.top = `${cardTopY}px`;

        cardEl.innerHTML = `
          <span class="paper-card-date">${item.startDate} – ${item.endDate}</span>
          <h3 class="paper-card-title">${item.title}</h3>
          <div class="paper-card-company">${item.company}</div>
          <div class="paper-card-click-hint">View details ↗</div>
        `;

        // Click compact card to open full details modal
        cardEl.addEventListener('click', () => openExpModal(item, node.index));

        expCardsContainer.appendChild(cardEl);
      }
    });

    // 3. Render Handwritten Annotations & Labels
    const startYear = experiencesData.length > 0 ? (experiencesData[0].startDate.match(/\d{4}/)?.[0] || '2025') : '2025';

    // Start Node Annotations
    const startNode = nodes[0];
    const startLabel = document.createElement('div');
    startLabel.className = 'paper-start-label';
    startLabel.style.left = `${startNode.x}px`;
    startLabel.style.top = `${startNode.y + 20}px`;
    startLabel.innerHTML = `
      <div class="paper-start-title">Start</div>
      <div class="paper-start-year">${startYear}</div>
    `;
    expCardsContainer.appendChild(startLabel);

    // "It all started here" Handwritten Note & Arrow
    const startNote = document.createElement('div');
    startNote.className = 'paper-handwriting-annotation';
    startNote.style.left = `${startNode.x - 130}px`;
    startNote.style.top = `${startNode.y - 95}px`;
    startNote.innerHTML = `
      <div>It all started here</div>
      <svg width="60" height="45" viewBox="0 0 60 45" style="margin-left: 25px; margin-top: 2px;">
        <path d="M 10 5 Q 35 15 42 35 M 32 30 L 42 35 L 44 24" stroke="#4a433a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      </svg>
    `;
    expCardsContainer.appendChild(startNote);

    // "Preparing for what's next" Handwritten Note
    const endNode = nodes[nodes.length - 1];
    const endNote = document.createElement('div');
    endNote.className = 'paper-handwriting-annotation';
    endNote.style.left = `${endNode.x - 140}px`;
    endNote.style.top = `${endNode.y - 55}px`;
    endNote.style.transform = 'rotate(-6deg)';
    endNote.innerHTML = `Preparing for<br>what's next`;
    expCardsContainer.appendChild(endNote);
  }

  // Experience Details Modal Controller
  function openExpModal(item, index) {
    const modal = document.getElementById('paper-exp-modal');
    if (!modal) return;

    document.getElementById('modal-badge').textContent = `EXP_0${index + 1}`;
    document.getElementById('modal-date').textContent = `${item.startDate} – ${item.endDate}`;
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-role').textContent = item.role;
    document.getElementById('modal-company').textContent = item.company;

    const bulletsList = document.getElementById('modal-bullets');
    bulletsList.innerHTML = item.bullets.map(b => `<li>${b}</li>`).join('');

    const tagsDiv = document.getElementById('modal-tags');
    tagsDiv.innerHTML = item.tags.map(t => `<span class="paper-tag">${t}</span>`).join('');

    modal.classList.add('active');
  }

  function closeExpModal() {
    const modal = document.getElementById('paper-exp-modal');
    if (modal) modal.classList.remove('active');
  }

  const modalCloseBtn = document.getElementById('paper-modal-close');
  const modalBackdrop = document.getElementById('paper-modal-backdrop');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeExpModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeExpModal);

  // Clash of Clans Cloud Matchmaking Transition Controller (3.5s Slow Cloud Sweep)
  const cocCloudOverlay = document.getElementById('coc-cloud-overlay');
  let isCloudAnimating = false;

  function triggerCloudTransition(onScreenSwitch) {
    if (!cocCloudOverlay || isCloudAnimating) {
      if (onScreenSwitch) onScreenSwitch();
      return;
    }
    isCloudAnimating = true;

    // Step 1: Roll clouds over screen (1.4s)
    cocCloudOverlay.classList.add('animating', 'clouds-closed');

    // Step 2: Switch screen at peak cloud cover (1.4s)
    setTimeout(() => {
      if (onScreenSwitch) onScreenSwitch();
    }, 1400);

    // Step 3: Part clouds away (2.1s)
    setTimeout(() => {
      cocCloudOverlay.classList.remove('clouds-closed');
    }, 2100);

    // Step 4: Complete transition (3.5s)
    setTimeout(() => {
      cocCloudOverlay.classList.remove('animating');
      isCloudAnimating = false;
    }, 3500);
  }

  // Interactivity — Navigation & Drag Scrolling
  if (experienceBtn && experienceOverlay) {
    experienceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      triggerCloudTransition(() => {
        if (aboutOverlay) aboutOverlay.classList.remove('active');
        if (projectsOverlay) projectsOverlay.classList.remove('active');
        experienceOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderPaperTimeline();
        if (expViewport) expViewport.scrollLeft = 0;
      });
    });

    if (experienceClose) {
      experienceClose.addEventListener('click', () => {
        triggerCloudTransition(() => {
          experienceOverlay.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && experienceOverlay.classList.contains('active')) {
        experienceClose.click();
      }
    });

    // Arrow Button Navigation
    if (expPrevBtn && expViewport) {
      expPrevBtn.addEventListener('click', () => {
        expViewport.scrollBy({ left: -360, behavior: 'smooth' });
      });
    }
    if (expNextBtn && expViewport) {
      expNextBtn.addEventListener('click', () => {
        expViewport.scrollBy({ left: 360, behavior: 'smooth' });
      });
    }

    // Drag-to-scroll functionality for mouse/touch
    if (expViewport) {
      let isDown = false;
      let startX;
      let scrollLeft;

      expViewport.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - expViewport.offsetLeft;
        scrollLeft = expViewport.scrollLeft;
      });

      expViewport.addEventListener('mouseleave', () => { isDown = false; });
      expViewport.addEventListener('mouseup', () => { isDown = false; });

      expViewport.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - expViewport.offsetLeft;
        const walk = (x - startX) * 1.5;
        expViewport.scrollLeft = scrollLeft - walk;
      });

      // Mouse wheel horizontal scrolling
      expViewport.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          expViewport.scrollLeft += e.deltaY;
        }
      }, { passive: false });
    }

    window.addEventListener('resize', () => {
      if (experienceOverlay.classList.contains('active')) {
        renderPaperTimeline();
      }
    });
  }

  // ============================================
  // INTERACTIVE RADIAL CONTACT POPUP
  // ============================================
  const contactBtn = document.getElementById('nav-contact-btn');
  const contactPopup = document.getElementById('contact-popup');
  const socialIcons = document.querySelectorAll('.contact-icon-wrapper');
  const popupRadius = 90; // distance in px from center

  if (contactBtn && contactPopup) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isActive = contactPopup.classList.contains('active');

      if (!isActive) {
        const btnRect = contactBtn.getBoundingClientRect();
        const centerX = btnRect.left + btnRect.width / 2;

        // Position popup centered just below the button
        contactPopup.style.left = centerX + 'px';
        contactPopup.style.top = (btnRect.bottom + 50) + 'px';

        contactPopup.classList.add('active');

        // Shoot out the social icons dynamically based on item count
        const count = socialIcons.length;
        socialIcons.forEach((icon, idx) => {
          // Evenly distribute icons around 360 degrees starting at -90 deg (top)
          const angleDeg = (360 / count) * idx - 90;
          const rad = angleDeg * (Math.PI / 180);
          const tx = Math.cos(rad) * popupRadius;
          const ty = Math.sin(rad) * popupRadius;

          icon.style.transitionDelay = `${idx * 0.04}s`;
          icon.style.transform = `translate(${tx}px, ${ty}px) scale(1)`;
          icon.style.opacity = '1';
        });
      } else {
        closeContactPopup();
      }
    });

    function closeContactPopup() {
      contactPopup.classList.remove('active');
      socialIcons.forEach((icon) => {
        icon.style.transitionDelay = '0s';
        icon.style.transform = 'translate(0, 0) scale(0)';
        icon.style.opacity = '0';
      });
    }

    // Dismiss on click outside
    document.addEventListener('click', (e) => {
      if (contactPopup.classList.contains('active') && !contactPopup.contains(e.target) && e.target !== contactBtn) {
        closeContactPopup();
      }
    });

    // Dismiss on scroll
    window.addEventListener('scroll', () => {
      if (contactPopup.classList.contains('active')) {
        closeContactPopup();
      }
    }, { passive: true });
  }

  // ============================================
  // SPOTIFY MUSIC INTEGRATION MANAGER (API Ready)
  // ============================================
  const spotifyData = {
    recentlyPlayed: [
      { title: "Another Love", artist: "Tom Odell", timeAgo: "8 min ago", cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=120" },
      { title: "Ivy", artist: "Frank Ocean", timeAgo: "42 min ago", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120" },
      { title: "The Night We Met", artist: "Lord Huron", timeAgo: "2 hr ago", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120" },
      { title: "Do I Wanna Know?", artist: "Arctic Monkeys", timeAgo: "3 hr ago", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120" },
      { title: "Choo Lo", artist: "The Local Train", timeAgo: "5 hr ago", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120" }
    ],
    topSongs: [
      { rank: "01", title: "Everything In Its Right Place", artist: "Radiohead", duration: "4:11", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120" },
      { rank: "02", title: "Night Changes", artist: "One Direction", duration: "3:46", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120" },
      { rank: "03", title: "Time", artist: "Pink Floyd", duration: "6:53", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120" },
      { rank: "04", title: "Stay With Me", artist: "Sam Smith", duration: "2:52", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120" },
      { rank: "05", title: "Sweater Weather", artist: "The Neighbourhood", duration: "4:00", cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=120" }
    ],
    currentlyPlaying: {
      title: "Everything In Its Right Place",
      artist: "Radiohead",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120",
      isPlaying: true
    }
  };

  // Helper method for future Spotify API fetch hookup
  window.loadSpotifyAPI = async function() {
    try {
      // In future: const res = await fetch('/api/spotify');
      // const data = await res.json();
      // updateSpotifyUI(data);
    } catch (err) {
      console.log('Spotify API ready for hookup:', err);
    }
  };

  // ============================================
  // 1. GLOBAL PAPER INK CURSOR TRACKER
  // ============================================
  const inkDot = document.getElementById('ink-cursor-dot');
  const inkCircle = document.getElementById('ink-cursor-circle');
  const inkIcon = document.getElementById('ink-cursor-icon');

  let paperMouseX = window.innerWidth / 2;
  let paperMouseY = window.innerHeight / 2;
  let circleX = paperMouseX;
  let circleY = paperMouseY;

  if (inkDot && inkCircle) {
    window.addEventListener('mousemove', (e) => {
      paperMouseX = e.clientX;
      paperMouseY = e.clientY;

      inkDot.style.left = `${paperMouseX}px`;
      inkDot.style.top = `${paperMouseY}px`;
    }, { passive: true });

    function renderCursor() {
      // Smooth linear interpolation (lerp) for circle lag
      circleX += (paperMouseX - circleX) * 0.2;
      circleY += (paperMouseY - circleY) * 0.2;

      inkCircle.style.left = `${circleX}px`;
      inkCircle.style.top = `${circleY}px`;

      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Attach Hover Triggers dynamically
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, .paper-card, .paper-project-card, .paper-skill-card, .paper-lead-card, .paper-edu-card, .hobby-col, .spotify-link, .project-ext-link');
      if (target) {
        if (target.classList.contains('project-ext-link') || target.classList.contains('spotify-link')) {
          inkCircle.classList.add('link');
          if (inkIcon) inkIcon.textContent = '↗';
        } else {
          inkCircle.classList.add('active');
          inkCircle.classList.remove('link');
          if (inkIcon) inkIcon.textContent = '';
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, .paper-card, .paper-project-card, .paper-skill-card, .paper-lead-card, .paper-edu-card, .hobby-col, .spotify-link, .project-ext-link');
      if (target) {
        inkCircle.classList.remove('active', 'link');
        if (inkIcon) inkIcon.textContent = '';
      }
    });
  }

  // ============================================
  // 2. ABOUT SECTION SCROLL PROGRESS THREAD
  // ============================================
  const aboutScrollContainer = document.getElementById('about-scroll');
  const journalSections = document.querySelectorAll('.journal-section');

  if (aboutScrollContainer && journalSections.length > 0) {
    aboutScrollContainer.addEventListener('scroll', () => {
      const containerTop = aboutScrollContainer.getBoundingClientRect().top;
      
      journalSections.forEach((section) => {
        const secRect = section.getBoundingClientRect();
        const secRelativeTop = secRect.top - containerTop;
        
        // Active threshold when section is near middle of viewport
        if (secRelativeTop >= -100 && secRelativeTop <= 350) {
          section.classList.add('active-spine-sec');
        } else {
          section.classList.remove('active-spine-sec');
        }
      });
    }, { passive: true });
  }

  // ============================================
  // 3. SKILLS SECTION TECHNICAL TERMINAL TOGGLE
  // ============================================
  const skillCards = document.querySelectorAll('.paper-skill-card');
  const skillTerminalData = {
    "Languages": { status: "FREQUENTLY USED", tags: ["Java", "Python", "SQL"], level: "●●●●●" },
    "AI & Machine Learning": { status: "ACTIVELY BUILDING", tags: ["RAG", "LLMs", "Semantic Search", "NLP"], level: "●●●●○" },
    "Backend Engineering": { status: "FREQUENTLY USED", tags: ["Spring Boot", "Flask", "REST APIs"], level: "●●●●○" },
    "Frontend Development": { status: "USED IN PROJECTS", tags: ["React.js", "JavaScript", "HTML5"], level: "●●●○○" },
    "Databases & Cloud": { status: "FREQUENTLY USED", tags: ["MySQL", "PostgreSQL", "Firebase"], level: "●●●●○" },
    "Tools & DevOps": { status: "USED IN PROJECTS", tags: ["Git", "GitHub", "Docker"], level: "●●●○○" },
    "Core Computer Science": { status: "ACADEMIC FOUNDATION", tags: ["DSA", "OOP", "DBMS", "OS"], level: "●●●●●" }
  };

  skillCards.forEach((card) => {
    const titleEl = card.querySelector('.skill-cat-name');
    if (!titleEl) return;
    const catName = titleEl.textContent.trim();

    card.addEventListener('click', () => {
      const isTerminal = card.classList.toggle('terminal-mode');
      let readoutBox = card.querySelector('.terminal-readout-box');

      if (isTerminal) {
        if (!readoutBox) {
          const data = skillTerminalData[catName] || { status: "ACTIVELY BUILDING", level: "●●●●○" };
          readoutBox = document.createElement('div');
          readoutBox.className = 'terminal-readout-box';
          readoutBox.innerHTML = `
            <div class="terminal-line"><span>PROFICIENCY</span> <span class="terminal-dots">${data.level}</span></div>
            <div class="terminal-status-tag">STATUS // ${data.status}</div>
          `;
          card.appendChild(readoutBox);
        } else {
          readoutBox.style.display = 'flex';
        }
      } else {
        if (readoutBox) readoutBox.style.display = 'none';
      }
    });
  });

  // ============================================
  // 4. SPOTIFY PLAYER TOGGLE (Pause / Play Equalizer)
  // ============================================
  const spotifyPauseBtn = document.querySelector('.pause-btn');
  const spotifyWaveform = document.querySelector('.equalizer-waveform');

  if (spotifyPauseBtn && spotifyWaveform) {
    let isPlaying = true;
    spotifyPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        spotifyWaveform.classList.remove('paused');
        spotifyPauseBtn.textContent = '⏸';
      } else {
        spotifyWaveform.classList.add('paused');
        spotifyPauseBtn.textContent = '▶';
      }
    });
  }

  // ---------- Placeholder Timeline class ----------
  class Timeline {
    constructor() { this.queue = []; }
  }

});
