/* ==========================================================================
   MICRO-INTERACTIONS & CREATIVE PHYSICS ENGINE
   Inspired by: ollivere.webflow.io, danilodemarco.com, www.thibaut.cool,
                bulbs.simondupety.com, niccolomiranda.com, 2xa.studio, bleibtgleich.dev
   ========================================================================== */

function initMicroInteractions() {
  // ============================================
  // 1. WEB AUDIO AMBIANCE SYNTHESIZER (Bulbs style)
  // ============================================
  let audioCtx = null;
  let soundEnabled = false;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Acoustic Soroban / Mechanical Typewriter key clack
  function playClickSound(freq = 480) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.045);

      gain.gain.setValueAtTime(0.065, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.045);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.045);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Soft calligraphic brush glide / paper rustle
  function playHoverSound() {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(740, audioCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.018, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0008, audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.035);
    } catch (e) { }
  }

  // Fountain pen nib / typewriter carriage tick
  function playScrambleTick() {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(780 + Math.random() * 320, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.018);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.018);
    } catch (e) { }
  }

  // Shishi-Odoshi (Bamboo Water Drop / Ceramic Ring) for section opening transitions
  function playShishiOdoshiSound() {
    if (!soundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      // Primary resonance
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(520, now);
      osc1.frequency.exponentialRampToValueAtTime(320, now + 0.12);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(now + 0.12);

      // Ceramic harmonic shimmer
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1040, now);
      osc2.frequency.exponentialRampToValueAtTime(840, now + 0.08);
      gain2.gain.setValueAtTime(0.03, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start();
      osc2.stop(now + 0.08);
    } catch (e) { }
  }

  // Sound toggle button wiring
  const soundToggles = document.querySelectorAll('.sound-toggle');
  soundToggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      initAudioContext();
      soundEnabled = !soundEnabled;
      soundToggles.forEach(b => {
        b.classList.toggle('active', soundEnabled);
        const label = b.querySelector('.sound-label');
        if (label) label.textContent = soundEnabled ? 'SFX ON' : 'SFX';
      });
      if (soundEnabled) playClickSound(560);
      showHudOutput(soundEnabled ? '墨音 // Sound Synthesizer: ACTIVE' : '墨音 // Sound Synthesizer: MUTED');
    });
  });

  // ============================================
  // 2. KINETIC SUMI TEXT SCRAMBLE / CALLIGRAPHIC SHIMMER (Bulbs & 2xA style)
  // ============================================
  const GLYPHS = '知術道創墨印書気響龍零壱弐参肆伍陸漆捌玖拾・—/[]†‡§※★';

  function scrambleElement(el, targetText, duration = 650) {
    if (el._isScrambling) return;
    el._isScrambling = true;

    const originalText = targetText || el.dataset.scramble || el.textContent.trim();
    const length = originalText.length;
    const startTime = performance.now();

    function updateFrame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const revealedCount = Math.floor(progress * length);

      let output = '';
      for (let i = 0; i < length; i++) {
        if (originalText[i] === ' ' || originalText[i] === '\n') {
          output += originalText[i];
        } else if (i < revealedCount) {
          output += originalText[i];
        } else {
          output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      el.textContent = output;

      if (Math.random() < 0.25) {
        playScrambleTick();
      }

      if (progress < 1) {
        requestAnimationFrame(updateFrame);
      } else {
        el.textContent = originalText;
        el._isScrambling = false;
      }
    }

    requestAnimationFrame(updateFrame);
  }

  // IntersectionObserver to automatically trigger text scramble on scroll entry
  const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetText = el.dataset.scramble || el.textContent.trim();
        scrambleElement(el, targetText, 600);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.text-scramble, [data-scramble]').forEach(el => {
    scrambleObserver.observe(el);
    // Also scramble on hover for an interactive micro-delight
    el.addEventListener('mouseenter', () => {
      scrambleElement(el, el.dataset.scramble || el.textContent.trim(), 450);
      playHoverSound();
    });
  });

  // ============================================
  // 3. 3D CARD PERSPECTIVE TILT & SPECULAR GLARE (Thibaut Crépelle style)
  // ============================================
  const tiltSelectors = [
    '.paper-card',
    '.paper-project-card',
    '.project-card-body-grid',
    '.paper-skill-card',
    '.paper-lead-card',
    '.paper-edu-card',
    '.character-container',
    '.spotify-parchment-card',
    '.contact-right-hub',
    '.journey-next-card'
  ];

  const tiltCards = document.querySelectorAll(tiltSelectors.join(', '));

  tiltCards.forEach(card => {
    card.classList.add('has-glare');
    if (!card.querySelector('.specular-glare')) {
      const glare = document.createElement('div');
      glare.className = 'specular-glare';
      card.appendChild(glare);
    }

    let isHovered = false;

    card.addEventListener('mouseenter', () => {
      isHovered = true;
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.25s ease';
      playHoverSound();
    });

    card.addEventListener('mousemove', (e) => {
      if (!isHovered || window.innerWidth <= 1024) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltX = -y * 9; // degrees
      const tiltY = x * 9;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(4px)`;

      const glareX = ((x + 0.5) * 100).toFixed(1);
      const glareY = ((y + 0.5) * 100).toFixed(1);
      card.style.setProperty('--glare-x', `${glareX}%`);
      card.style.setProperty('--glare-y', `${glareY}%`);
    });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      card.style.transition = 'transform 0.5s var(--power-2-ease-out), box-shadow 0.3s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });

  // ============================================
  // 4. SCROLL-VELOCITY PHYSICS & INERTIA SKEW (Niccolò Miranda style)
  // ============================================
  const scrollContainers = [
    window,
    document.getElementById('about-scroll'),
    document.getElementById('projects-scroll'),
    document.getElementById('experience-scroll'),
    document.getElementById('contact-scroll')
  ].filter(Boolean);

  let accumulatedScroll = 0;
  let lastScrollTop = 0;
  let lastScrollTime = performance.now();
  let currentVelocity = 0;
  let targetVelocity = 0;
  let isScrollDecaying = false;

  const globalProgress = document.getElementById('global-scroll-progress');
  const navVelocity = document.getElementById('nav-velocity');
  const rotatingBadge = document.getElementById('rotating-scroll-badge');

  function updateScrollPhysics(scrollTop, scrollHeight, clientHeight) {
    const now = performance.now();
    const dt = Math.max(10, now - lastScrollTime);
    const delta = scrollTop - lastScrollTop;

    targetVelocity = (delta / dt) * 100; // px/sec equivalent
    accumulatedScroll += Math.abs(delta);

    lastScrollTop = scrollTop;
    lastScrollTime = now;

    // Progress bar calculation
    if (scrollHeight > clientHeight && globalProgress) {
      const progressPercent = Math.min(100, Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100));
      globalProgress.style.width = `${progressPercent.toFixed(1)}%`;
      document.documentElement.style.setProperty('--scroll-progress', `${progressPercent.toFixed(1)}%`);
    }

    // Rotating Stamp Badge (Niccolò Miranda style)
    if (rotatingBadge) {
      rotatingBadge.style.transform = `rotate(${(accumulatedScroll * 0.28).toFixed(1)}deg)`;
    }

    if (!isScrollDecaying) {
      isScrollDecaying = true;
      requestAnimationFrame(decayVelocity);
    }
  }

  function decayVelocity() {
    // Lerp velocity toward 0
    currentVelocity += (targetVelocity - currentVelocity) * 0.18;
    targetVelocity *= 0.88;

    // Clamp skew degrees (-1.4deg to +1.4deg)
    const skewDeg = Math.max(-1.4, Math.min(1.4, currentVelocity * 0.007));
    document.documentElement.style.setProperty('--scroll-velocity-skew', `${skewDeg.toFixed(2)}deg`);

    // Update nav velocity readout
    if (navVelocity) {
      const displayVel = Math.abs(Math.round(currentVelocity * 10));
      navVelocity.innerHTML = `<span class="telemetry-kanji">速</span> ${displayVel} px/s`;
    }

    // Accelerate calligraphic ribbon marquee with scroll velocity (Ollivere & Danilo style)
    const ribbonTrack = document.querySelector('.ribbon-track');
    if (ribbonTrack) {
      const baseDuration = 32;
      const speedMultiplier = Math.min(2.8, 1 + Math.abs(currentVelocity) * 0.06);
      ribbonTrack.style.animationDuration = `${(baseDuration / speedMultiplier).toFixed(1)}s`;
    }

    if (Math.abs(currentVelocity) > 0.05 || Math.abs(targetVelocity) > 0.05) {
      requestAnimationFrame(decayVelocity);
    } else {
      currentVelocity = 0;
      targetVelocity = 0;
      isScrollDecaying = false;
      document.documentElement.style.setProperty('--scroll-velocity-skew', '0deg');
      if (navVelocity) navVelocity.innerHTML = '<span class="telemetry-kanji">速</span> 0 px/s';
      if (ribbonTrack) ribbonTrack.style.animationDuration = '32s';
    }
  }

  // Bind scroll listeners
  scrollContainers.forEach(container => {
    if (container === window) {
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        updateScrollPhysics(scrollTop, scrollHeight, clientHeight);
      }, { passive: true });
    } else {
      container.addEventListener('scroll', () => {
        updateScrollPhysics(container.scrollTop, container.scrollHeight, container.clientHeight);
      }, { passive: true });
    }
  });

  // ============================================
  // 5. GLOBAL ADAPTIVE INK CURSOR (Miranda / Bleibtgleich style)
  // ============================================
  const inkDot = document.getElementById('ink-cursor-dot');
  const inkCircle = document.getElementById('ink-cursor-circle');
  const inkIcon = document.getElementById('ink-cursor-icon');

  if (inkDot && inkCircle && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100, mouseY = -100;
    let circleX = -100, circleY = -100;
    let activeMagneticTarget = null;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      inkDot.style.left = `${mouseX}px`;
      inkDot.style.top = `${mouseY}px`;
    }, { passive: true });

    function renderPaperCursor() {
      let targetX = mouseX;
      let targetY = mouseY;

      // Magnetic pull when hovering over primary buttons
      if (activeMagneticTarget) {
        const rect = activeMagneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        targetX = centerX + (mouseX - centerX) * 0.28;
        targetY = centerY + (mouseY - centerY) * 0.28;
      }

      circleX += (targetX - circleX) * 0.22;
      circleY += (targetY - circleY) * 0.22;
      inkCircle.style.left = `${circleX.toFixed(1)}px`;
      inkCircle.style.top = `${circleY.toFixed(1)}px`;

      requestAnimationFrame(renderPaperCursor);
    }
    requestAnimationFrame(renderPaperCursor);

    // Magnetic and Contextual Hover Events
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, [role="button"], .paper-card, .paper-project-card, .paper-skill-card, .paper-lead-card, .paper-edu-card, .journey-next-card, .spotify-track-row, .radial-badge, .rotating-scroll-badge');
      if (!target) return;

      if (target.matches('.nav-cta a, .nav-logo, .paper-close, .sound-toggle, .timeline-nav-btn, .nav-kbd-hint')) {
        activeMagneticTarget = target;
      }

      if (target.classList.contains('project-ext-link') || target.tagName === 'A' && target.target === '_blank') {
        inkCircle.className = 'ink-cursor-circle link';
        if (inkIcon) inkIcon.textContent = '印 EXPLORE ↗';
      } else if (target.closest('.journey-next-card')) {
        inkCircle.className = 'ink-cursor-circle link';
        if (inkIcon) inkIcon.textContent = '巻 TURN PAGE ↗';
      } else if (target.closest('.spotify-parchment-card') || target.closest('.paper-spotify-section') || target.classList.contains('spotify-track-row')) {
        inkCircle.className = 'ink-cursor-circle spotify';
        if (inkIcon) inkIcon.textContent = '聴 LISTEN ♬';
      } else if (target.closest('.paper-timeline-viewport')) {
        inkCircle.className = 'ink-cursor-circle drag';
        if (inkIcon) inkIcon.textContent = '頁 DRAG ⇄';
      } else if (target.closest('.rotating-scroll-badge')) {
        inkCircle.className = 'ink-cursor-circle active';
        if (inkIcon) inkIcon.textContent = '筆 DISPATCH';
      } else if (target.closest('.paper-skill-card')) {
        inkCircle.className = 'ink-cursor-circle active';
        if (inkIcon) inkIcon.textContent = '録 LEDGER';
      } else if (target.closest('.paper-project-card, .project-card-body-grid')) {
        inkCircle.className = 'ink-cursor-circle active';
        if (inkIcon) inkIcon.textContent = '墨 3D TILT';
      } else {
        inkCircle.className = 'ink-cursor-circle active';
        if (inkIcon) inkIcon.textContent = '';
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, [role="button"], .paper-card, .paper-project-card, .paper-skill-card, .paper-lead-card, .paper-edu-card, .journey-next-card, .spotify-track-row, .radial-badge, .rotating-scroll-badge');
      if (target) {
        activeMagneticTarget = null;
        inkCircle.className = 'ink-cursor-circle';
        if (inkIcon) inkIcon.textContent = '';
      }
    });

    // Japanese Hanko Vermilion Ink Click Ripple
    window.addEventListener('click', (e) => {
      playClickSound(480);
      const ripple = document.createElement('div');
      ripple.className = 'ink-click-ripple';
      ripple.style.position = 'fixed';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = '6px';
      ripple.style.height = '6px';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '99998';
      ripple.style.background = 'radial-gradient(circle, rgba(140,42,34,0.65) 0%, rgba(140,42,34,0.18) 45%, rgba(140,42,34,0) 75%)';
      ripple.style.transform = 'translate(-50%, -50%) scale(1)';
      ripple.style.transition = 'transform 0.45s var(--power-2-ease-out), opacity 0.45s ease';
      document.body.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(9)';
        ripple.style.opacity = '0';
      });

      setTimeout(() => ripple.remove(), 500);
    });
  }

  // ============================================
  // 6. LIVE COMPUTATIONAL WORLD CLOCK (2xA Studio style)
  // ============================================
  const navClock = document.getElementById('nav-clock');
  function updateWorldClock() {
    if (!navClock) return;
    try {
      const now = new Date();
      // Formatted in Indian Standard Time (IST)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      const [hh, mm, ss] = timeStr.split(':');
      navClock.innerHTML = `<span class="telemetry-kanji">印</span> PUNE ${hh}<span class="clock-colon">:</span>${mm}<span class="clock-colon">:</span>${ss} IST`;
    } catch (e) {
      navClock.innerHTML = '<span class="telemetry-kanji">印</span> PUNE 15:45 IST';
    }
  }
  updateWorldClock();
  setInterval(updateWorldClock, 1000);

  // ============================================
  // 7. SCHOLAR'S DISPATCH & MANUSCRIPT HUD (Bleibtgleich style / Washi Theme)
  // ============================================
  const cmdHud = document.getElementById('quick-cmd-hud');
  const cmdInput = document.getElementById('cmd-input');
  const cmdOutput = document.getElementById('cmd-output');
  const cmdBackdrop = document.getElementById('cmd-hud-backdrop');
  const cmdTriggerBtn = document.getElementById('nav-cmd-trigger');

  function openCommandHud() {
    if (!cmdHud) return;
    cmdHud.classList.add('active');
    cmdHud.setAttribute('aria-hidden', 'false');
    if (cmdInput) {
      cmdInput.value = '';
      setTimeout(() => cmdInput.focus(), 80);
    }
    playClickSound(520);
  }

  function closeCommandHud() {
    if (!cmdHud) return;
    cmdHud.classList.remove('active');
    cmdHud.setAttribute('aria-hidden', 'true');
    if (cmdInput) cmdInput.blur();
  }

  function showHudOutput(text) {
    if (!cmdOutput) return;
    cmdOutput.innerHTML = `<div><span style="color:#8c2a22; font-weight:700;">※ 墨記 ➔</span> ${text}</div>`;
  }

  function executeCommand(cmd) {
    const raw = cmd.trim().toLowerCase();
    playClickSound(480);

    if (raw === '/about' || raw === '/略歴' || raw === 'about') {
      closeCommandHud();
      const btn = document.getElementById('nav-about-btn');
      if (btn) btn.click();
    } else if (raw === '/projects' || raw === '/制作' || raw === 'projects') {
      closeCommandHud();
      const btn = document.getElementById('nav-projects-btn');
      if (btn) btn.click();
    } else if (raw === '/experience' || raw === '/経歴' || raw === 'experience') {
      closeCommandHud();
      const btn = document.getElementById('nav-experience-btn');
      if (btn) btn.click();
    } else if (raw === '/gaming' || raw === '/games' || raw === '/play' || raw === '/遊' || raw === 'gaming') {
      closeCommandHud();
      if (typeof window.openGamingSection === 'function') window.openGamingSection();
    } else if (raw === '/spotify' || raw === '/music' || raw === '/soundtrack' || raw === 'spotify') {
      closeCommandHud();
      if (typeof window.openSpotifySection === 'function') window.openSpotifySection();
    } else if (raw === '/instagram' || raw === '/ig') {
      closeCommandHud();
      window.open('https://instagram.com/nhr_092', '_blank');
    } else if (raw === '/telegram' || raw === '/tg') {
      closeCommandHud();
      window.open('https://t.me/nhr_091', '_blank');
    } else if (raw === '/contact' || raw === '/連絡' || raw === 'contact') {
      closeCommandHud();
      const btn = document.getElementById('nav-contact-btn');
      if (btn) btn.click();
    } else if (raw === '/sound' || raw === '/音') {
      const sToggle = document.getElementById('sound-toggle');
      if (sToggle) sToggle.click();
      showHudOutput(`墨音 // Sound Synthesizer: ${soundEnabled ? 'ACTIVE' : 'MUTED'}`);
    } else if (raw === '/matrix' || raw === '/墨') {
      showHudOutput('墨印展開 — Calligraphic Kanji shimmer initiated across manuscript chapters.');
      document.querySelectorAll('.text-scramble, [data-scramble]').forEach(el => {
        scrambleElement(el, el.dataset.scramble || el.textContent.trim(), 1200);
      });
      setTimeout(closeCommandHud, 400);
    } else if (raw.startsWith('/')) {
      showHudOutput(`Unknown chapter "${raw}". Chapters available: /about, /projects, /experience, /gaming, /spotify, /contact, /instagram, /telegram, /sound, /matrix`);
    } else if (raw.length > 0) {
      showHudOutput(`書簡記録: "${cmd}" — Dispatch inscribed in journal archives. Direct correspondence: niharmehakare@gmail.com`);
      if (cmdInput) cmdInput.value = '';
    }
  }

  if (cmdTriggerBtn) {
    cmdTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openCommandHud();
    });
  }

  if (rotatingBadge) {
    rotatingBadge.addEventListener('click', (e) => {
      e.stopPropagation();
      openCommandHud();
    });
  }

  if (cmdBackdrop) {
    cmdBackdrop.addEventListener('click', closeCommandHud);
  }

  document.querySelectorAll('.cmd-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const c = chip.dataset.cmd;
      if (c) executeCommand(c);
    });
  });

  if (cmdInput) {
    cmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(cmdInput.value);
      } else if (e.key === 'Escape') {
        closeCommandHud();
      }
    });
  }

  // Full Keyboard Shortcuts Deck (Bleibtgleich style)
  window.addEventListener('keydown', (e) => {
    // When in 3D exploration mode, NEVER intercept movement keys (WASD, arrows) or letters
    if (document.body.classList.contains('mode-3d-fullscreen')) {
      if (e.key === 'Escape') {
        const activeCloseBtn = document.querySelector('.about-overlay.active .about-close, .projects-overlay.active .projects-close, .experience-overlay.active .experience-close, .contact-overlay.active .contact-close, #diegetic-close-btn, #minimap-close-btn');
        if (activeCloseBtn) {
          playClickSound(420);
          activeCloseBtn.click();
        }
      }
      return;
    }

    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (e.key === 'Escape' && cmdHud && cmdHud.classList.contains('active')) {
        closeCommandHud();
      }
      return;
    }

    const key = e.key.toLowerCase();

    if (e.key === '/' || (e.ctrlKey && key === 'k')) {
      e.preventDefault();
      openCommandHud();
    } else if (key === '1') {
      e.preventDefault();
      playShishiOdoshiSound();
      const btn = document.getElementById('nav-about-btn');
      if (btn) btn.click();
    } else if (key === '2') {
      e.preventDefault();
      playShishiOdoshiSound();
      const btn = document.getElementById('nav-projects-btn');
      if (btn) btn.click();
    } else if (key === '3') {
      e.preventDefault();
      playShishiOdoshiSound();
      const btn = document.getElementById('nav-experience-btn');
      if (btn) btn.click();
    } else if (key === '4') {
      e.preventDefault();
      playShishiOdoshiSound();
      const btn = document.getElementById('nav-contact-btn');
      if (btn) btn.click();
    } else if (e.key === 'Escape') {
      if (cmdHud && cmdHud.classList.contains('active')) {
        closeCommandHud();
      } else {
        const activeCloseBtn = document.querySelector('.about-overlay.active .about-close, .projects-overlay.active .projects-close, .experience-overlay.active .experience-close, .contact-overlay.active .contact-close');
        if (activeCloseBtn) {
          playClickSound(420);
          activeCloseBtn.click();
        }
      }
    }
  });

  // ============================================
  // 8. HERO WHEEL SCROLL BRIDGE & JOURNEY NAVIGATION (Ollivere style)
  // ============================================
  const heroSection = document.getElementById('hero');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (heroSection) {
    // Wheel down on Hero transitions to About (strictly in 2D mode only)
    heroSection.addEventListener('wheel', (e) => {
      if (document.body.classList.contains('mode-3d-fullscreen')) return;
      if (e.deltaY > 60) {
        const noActiveOverlay = !document.querySelector('.about-overlay.active, .projects-overlay.active, .experience-overlay.active, .contact-overlay.active');
        if (noActiveOverlay) {
          playShishiOdoshiSound();
          const aboutBtn = document.getElementById('nav-about-btn');
          if (aboutBtn) aboutBtn.click();
        }
      }
    }, { passive: true });
  }

  if (scrollIndicator) {
    scrollIndicator.style.cursor = 'pointer';
    scrollIndicator.addEventListener('click', () => {
      playShishiOdoshiSound();
      const aboutBtn = document.getElementById('nav-about-btn');
      if (aboutBtn) aboutBtn.click();
    });
  }

  // Section-to-section journey cards with Shishi-Odoshi acoustic chime
  const journeyToProjects = document.getElementById('journey-to-projects');
  if (journeyToProjects) {
    journeyToProjects.addEventListener('click', () => {
      playShishiOdoshiSound();
      const btn = document.getElementById('nav-projects-btn');
      if (btn) btn.click();
    });
  }

  const journeyToExp = document.getElementById('journey-to-experience');
  if (journeyToExp) {
    journeyToExp.addEventListener('click', () => {
      playShishiOdoshiSound();
      const btn = document.getElementById('nav-experience-btn');
      if (btn) btn.click();
    });
  }

  const journeyToContact = document.getElementById('journey-to-contact');
  if (journeyToContact) {
    journeyToContact.addEventListener('click', () => {
      playShishiOdoshiSound();
      const btn = document.getElementById('nav-contact-btn');
      if (btn) btn.click();
    });
  }

  const journeyToHero = document.getElementById('journey-to-hero');
  if (journeyToHero) {
    journeyToHero.addEventListener('click', () => {
      playShishiOdoshiSound();
      document.querySelectorAll('.about-overlay').forEach(ov => ov.classList.remove('active'));
      document.body.style.overflow = '';
    });
  }

  // Bind acoustic chime to main navigation links
  ['nav-about-btn', 'nav-projects-btn', 'nav-experience-btn', 'nav-contact-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        playShishiOdoshiSound();
      });
    }
  });

  // ============================================
  // 9. ABOUT SECTION SPINE PROGRESS THREAD
  // ============================================
  const aboutScrollContainer = document.getElementById('about-scroll');
  const journalSections = document.querySelectorAll('.journal-section');

  if (aboutScrollContainer && journalSections.length > 0) {
    aboutScrollContainer.addEventListener('scroll', () => {
      const containerTop = aboutScrollContainer.getBoundingClientRect().top;

      journalSections.forEach((section) => {
        const secRect = section.getBoundingClientRect();
        const secRelativeTop = secRect.top - containerTop;

        if (secRelativeTop >= -100 && secRelativeTop <= 350) {
          section.classList.add('active-spine-sec');
        } else {
          section.classList.remove('active-spine-sec');
        }
      });
    }, { passive: true });
  }

  // ============================================
  // 10. SKILLS SECTION TECHNICAL TERMINAL TOGGLE
  // ============================================
  const skillCards = document.querySelectorAll('.paper-skill-card');
  const skillTerminalData = {
    "Languages": { status: "FREQUENTLY USED", tags: ["Java", "Python", "SQL"], level: "● ● ● ● ●" },
    "AI & Machine Learning": { status: "ACTIVELY BUILDING", tags: ["RAG", "LLMs", "Semantic Search", "NLP"], level: "● ● ● ● ○" },
    "Backend Engineering": { status: "FREQUENTLY USED", tags: ["Spring Boot", "Flask", "REST APIs"], level: "● ● ● ● ○" },
    "Frontend Development": { status: "USED IN PROJECTS", tags: ["React.js", "JavaScript", "HTML5"], level: "● ● ● ○ ○" },
    "Databases & Cloud": { status: "FREQUENTLY USED", tags: ["MySQL", "PostgreSQL", "Firebase"], level: "● ● ● ● ○" },
    "Tools & DevOps": { status: "USED IN PROJECTS", tags: ["Git", "GitHub", "Docker"], level: "● ● ● ○ ○" },
    "Core Computer Science": { status: "ACADEMIC FOUNDATION", tags: ["DSA", "OOP", "DBMS", "OS"], level: "● ● ● ● ●" }
  };

  skillCards.forEach((card) => {
    const titleEl = card.querySelector('.skill-cat-name');
    if (!titleEl) return;
    const catName = titleEl.textContent.trim();

    card.addEventListener('click', () => {
      const isTerminal = card.classList.toggle('terminal-mode');
      let readoutBox = card.querySelector('.terminal-readout-box');

      if (isTerminal) {
        playClickSound(480);
        if (!readoutBox) {
          const data = skillTerminalData[catName] || { status: "ACTIVELY BUILDING", level: "● ● ● ● ○" };
          readoutBox = document.createElement('div');
          readoutBox.className = 'terminal-readout-box';
          readoutBox.innerHTML = `
            <div class="terminal-line"><span>習熟度 // PROFICIENCY</span> <span class="terminal-dots">${data.level}</span></div>
            <div class="terminal-status-tag"><span>【印】</span> 現況 // ${data.status}</div>
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
  // 11. SPOTIFY PLAYER TOGGLE
  // ============================================
  const spotifyPauseBtn = document.querySelector('.pause-btn');
  const spotifyWaveform = document.querySelector('.equalizer-waveform');

  if (spotifyPauseBtn && spotifyWaveform) {
    let isPlaying = true;
    spotifyPauseBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playClickSound(600);
      if (isPlaying) {
        spotifyWaveform.classList.remove('paused');
        spotifyPauseBtn.textContent = '⏸';
      } else {
        spotifyWaveform.classList.add('paused');
        spotifyPauseBtn.textContent = '▶';
      }
    });
  }

  // Global Audio Bridge for Overlays & Cards
  window.playPortfolioClick = playClickSound;
  window.playPortfolioHover = playHoverSound;
  window.playShishiOdoshi = playShishiOdoshiSound;
}

