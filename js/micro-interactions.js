/* ============================================
   MICRO-INTERACTIONS - Ink Cursor, Terminal Toggle, Equalizer
   ============================================ */

function initMicroInteractions() {
  // ============================================
  // 1. GLOBAL PAPER INK CURSOR
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
      // Smooth imperfect linear interpolation (lerp)
      circleX += (paperMouseX - circleX) * 0.18;
      circleY += (paperMouseY - circleY) * 0.18;

      inkCircle.style.left = `${circleX}px`;
      inkCircle.style.top = `${circleY}px`;

      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Attach Hover Triggers dynamically
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, .paper-card, .paper-project-card, .paper-skill-card, .paper-lead-card, .paper-edu-card, .hobby-col, .spotify-link, .project-ext-link, .spotify-track-row');
      if (target) {
        if (target.classList.contains('project-ext-link') || target.tagName === 'A' && target.getAttribute('target') === '_blank') {
          inkCircle.classList.add('link');
          inkCircle.classList.remove('spotify', 'active');
          if (inkIcon) inkIcon.textContent = '↗';
        } else if (target.closest('.spotify-parchment-card') || target.closest('.paper-spotify-section') || target.classList.contains('spotify-track-row') || target.classList.contains('spotify-link')) {
          inkCircle.classList.add('spotify');
          inkCircle.classList.remove('link', 'active');
          if (inkIcon) inkIcon.textContent = '♪';
        } else {
          inkCircle.classList.add('active');
          inkCircle.classList.remove('link', 'spotify');
          if (inkIcon) inkIcon.textContent = '';
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, .paper-card, .paper-project-card, .paper-skill-card, .paper-lead-card, .paper-edu-card, .hobby-col, .spotify-link, .project-ext-link, .spotify-track-row');
      if (target) {
        inkCircle.classList.remove('active', 'link', 'spotify');
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
        if (!readoutBox) {
          const data = skillTerminalData[catName] || { status: "ACTIVELY BUILDING", level: "● ● ● ● ○" };
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
}
