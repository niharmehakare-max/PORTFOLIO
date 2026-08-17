/* ============================================
   EXPERIENCE - Timeline Renderer, Cloud Transition, Modal
   ============================================ */

function initExperience() {
  const aboutOverlay = document.getElementById('about-overlay');
  const projectsOverlay = document.getElementById('projects-overlay');
  const experienceBtn = document.getElementById('nav-experience-btn');
  const experienceOverlay = document.getElementById('experience-overlay');
  const experienceClose = document.getElementById('experience-close');
  const expViewport = document.getElementById('exp-timeline-viewport');
  const expTrack = document.getElementById('exp-timeline-track');
  const expSvg = document.getElementById('exp-timeline-svg');
  const expCardsContainer = document.getElementById('exp-timeline-cards');
  const expPrevBtn = document.getElementById('exp-prev-btn');
  const expNextBtn = document.getElementById('exp-next-btn');

  // Dynamic Experience Data Store — Nihar's actual resume experiences
  const experiencesData = [
    {
      startDate: "July 2025",
      endDate: "December 2025",
      role: "AI Team Lead – Industry Sponsored",
      company: "Passion Info Tech – Pune",
      title: "RAG-Based Semantic Search System",
      annotation: "learned & delivered →",
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
      annotation: "shipped to production →",
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
      annotation: "actively building →",
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
    const nodes = [];
    nodes.push({ x: startX, y: centerY + 85, type: 'start' });

    for (let i = 0; i < itemCount; i++) {
      const x = startX + (i + 1) * spacingX;
      const isTop = (i % 2 === 0);
      const y = isTop ? (centerY - amplitude) : (centerY + amplitude);
      nodes.push({ x, y, type: isTop ? 'top' : 'bottom', data: experiencesData[i], index: i });
    }

    const endX = startX + (itemCount + 1) * spacingX;
    const endY = centerY - amplitude - 30;
    nodes.push({ x: endX, y: endY, type: 'end' });

    // 1. Generate SVG Smooth Bezier Curve Path
    let pathD = `M ${nodes[0].x} ${nodes[0].y}`;
    for (let i = 0; i < nodes.length - 1; i++) {
      const p1 = nodes[i];
      const p2 = nodes[i + 1];
      const dx = (p2.x - p1.x) * 0.5;
      
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
      pathEl.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
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
    nodes.forEach((node, nodeIdx) => {
      // Node Watercolor Ring Halo (SVG)
      const haloCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      haloCircle.setAttribute('cx', node.x);
      haloCircle.setAttribute('cy', node.y);
      haloCircle.setAttribute('r', '17');
      haloCircle.setAttribute('fill', 'rgba(44, 40, 37, 0.1)');
      haloCircle.style.cursor = node.data ? 'pointer' : 'default';
      haloCircle.style.transition = 'all 0.25s ease';
      expSvg.appendChild(haloCircle);

      const haloCircleInner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      haloCircleInner.setAttribute('cx', node.x);
      haloCircleInner.setAttribute('cy', node.y);
      haloCircleInner.setAttribute('r', '11');
      haloCircleInner.setAttribute('fill', 'rgba(44, 40, 37, 0.15)');
      haloCircleInner.style.cursor = node.data ? 'pointer' : 'default';
      haloCircleInner.style.transition = 'all 0.25s ease';
      expSvg.appendChild(haloCircleInner);

      // Node Inner Black Dot (SVG)
      const dotCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dotCircle.setAttribute('cx', node.x);
      dotCircle.setAttribute('cy', node.y);
      dotCircle.setAttribute('r', '5.5');
      dotCircle.setAttribute('fill', '#1c1a17');
      dotCircle.style.cursor = node.data ? 'pointer' : 'default';
      dotCircle.style.transition = 'all 0.25s ease';
      expSvg.appendChild(dotCircle);

      // Ink Stamp Ripple on Node Hover
      const onNodeHover = () => {
        dotCircle.setAttribute('r', '7.5');
        dotCircle.setAttribute('fill', '#0a0a0a');
        haloCircleInner.setAttribute('r', '14');
        haloCircleInner.setAttribute('fill', 'rgba(44, 40, 37, 0.25)');
        haloCircle.setAttribute('r', '22');
      };
      const onNodeLeave = () => {
        dotCircle.setAttribute('r', '5.5');
        dotCircle.setAttribute('fill', '#1c1a17');
        haloCircleInner.setAttribute('r', '11');
        haloCircleInner.setAttribute('fill', 'rgba(44, 40, 37, 0.15)');
        haloCircle.setAttribute('r', '17');
      };

      haloCircle.addEventListener('mouseenter', onNodeHover);
      haloCircle.addEventListener('mouseleave', onNodeLeave);

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
        cardEl.style.opacity = '0';
        cardEl.style.transform = 'translateY(12px)';
        cardEl.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

        // Staggered Reveal: Path (0s) -> Node (0.4s) -> Card (0.6s + idx * 0.25s)
        setTimeout(() => {
          cardEl.style.opacity = '1';
          cardEl.style.transform = 'translateY(0)';
        }, 450 + nodeIdx * 200);

        cardEl.innerHTML = `
          <div class="scratched-annotation">${item.annotation || 'building →'}</div>
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
        const contactOverlay = document.getElementById('contact-overlay');
        if (contactOverlay) contactOverlay.classList.remove('active');
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
        if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          expViewport.scrollLeft += e.deltaY;
        }
      }, { passive: false });

      // Touch drag gestures for mobile / tablet
      let touchStartX = 0;
      let touchScrollLeft = 0;
      let isTouching = false;

      expViewport.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          isTouching = true;
          touchStartX = e.touches[0].pageX - expViewport.offsetLeft;
          touchScrollLeft = expViewport.scrollLeft;
        }
      }, { passive: true });

      expViewport.addEventListener('touchmove', (e) => {
        if (!isTouching || e.touches.length !== 1) return;
        const x = e.touches[0].pageX - expViewport.offsetLeft;
        const walk = (x - touchStartX) * 1.2;
        expViewport.scrollLeft = touchScrollLeft - walk;
      }, { passive: true });

      expViewport.addEventListener('touchend', () => {
        isTouching = false;
      }, { passive: true });
    }

    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (experienceOverlay.classList.contains('active')) {
          renderPaperTimeline();
        }
      }, 100);
    });
  }

}
