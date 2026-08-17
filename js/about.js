/* ============================================
   ABOUT OVERLAY - Toggle & Interactive Skills Matrix
   ============================================ */

function initAbout() {
  const aboutBtn = document.getElementById('nav-about-btn');
  const aboutOverlay = document.getElementById('about-overlay');
  const aboutClose = document.getElementById('about-close');
  const aboutScroll = document.getElementById('about-scroll');
  const projectsOverlay = document.getElementById('projects-overlay');
  const experienceOverlay = document.getElementById('experience-overlay');
  const contactOverlay = document.getElementById('contact-overlay');

  function openAbout() {
    if (projectsOverlay) projectsOverlay.classList.remove('active');
    if (experienceOverlay) experienceOverlay.classList.remove('active');
    if (contactOverlay) contactOverlay.classList.remove('active');

    if (aboutOverlay) {
      aboutOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (aboutScroll) aboutScroll.scrollTop = 0;
    }
  }

  function closeAbout() {
    if (aboutOverlay) {
      aboutOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  if (aboutBtn && aboutOverlay) {
    aboutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openAbout();
    });

    if (aboutClose) {
      aboutClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeAbout();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && aboutOverlay.classList.contains('active')) {
        closeAbout();
      }
    });
  }

  // ============================================
  // INTERACTIVE SKILLS MATRIX (ALL RESUME SKILLS)
  // ============================================
  const skillsMatrixData = {
    "01": {
      num: "01",
      title: "Languages",
      subtitle: "The foundation of everything I build.",
      skills: [
        {
          name: "Java",
          dots: "● ● ● ● ○",
          desc: "Strong in OOP, Collections, Concurrency, and Java Ecosystem.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`
        },
        {
          name: "Python",
          dots: "● ● ● ● ○",
          desc: "Building ML, automation, and backend solutions.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><path d="M12 2C8.5 2 7 3.5 7 5.5V8h5v1.5H5.5C3.5 9.5 2 11 2 14.5S3.5 19.5 7 19.5h1.5v-2.5c0-1.8 1.5-3.5 3.5-3.5h5V12h-5c-2 0-3.5-1.5-3.5-3.5V5.5C8.5 3.5 10 2 12 2z"/></svg>`
        },
        {
          name: "SQL",
          dots: "● ● ● ● ○",
          desc: "Writing efficient queries, joins, and data modeling.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/><text x="12" y="14" font-size="5" text-anchor="middle" fill="#2c2825" font-family="sans-serif" font-weight="bold">SQL</text></svg>`
        },
        {
          name: "Rust",
          dots: "● ● ● ○ ○",
          desc: "Solana smart contracts, memory safety & on-chain programs.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polygon points="12 6 15 11 9 11"/></svg>`
        }
      ]
    },
    "02": {
      num: "02",
      title: "AI & Machine Learning",
      subtitle: "Designing intelligent and cognitive systems.",
      skills: [
        {
          name: "RAG Systems",
          dots: "● ● ● ● ○",
          desc: "Vector databases, semantic search & document retrieval pipelines.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><line x1="8.5" y1="7.5" x2="10" y2="15.5"/><line x1="15.5" y1="7.5" x2="14" y2="15.5"/></svg>`
        },
        {
          name: "LLMs & Prompting",
          dots: "● ● ● ● ○",
          desc: "Context engineering, summarization & agentic workflows.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><path d="M12 2a8 8 0 0 0-8 8c0 3 1.5 5.5 4 7v3h8v-3c2.5-1.5 4-4 4-7a8 8 0 0 0-8-8z"/><line x1="9" y1="21" x2="15" y2="21"/></svg>`
        },
        {
          name: "Semantic Search",
          dots: "● ● ● ● ○",
          desc: "Theme-based discovery & vector embedding indexing.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v6M8 11h6"/></svg>`
        },
        {
          name: "Computer Vision & OCR",
          dots: "● ● ● ○ ○",
          desc: "OpenCV pipelines & Tesseract OCR error extraction from CAD drawings.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`
        },
        {
          name: "NLP & Embeddings",
          dots: "● ● ● ○ ○",
          desc: "Text preprocessing, embeddings and context-aware responses.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
        },
        {
          name: "TensorFlow & Scikit-Learn",
          dots: "● ● ● ○ ○",
          desc: "Machine learning models for prediction, classification & diagnosis.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
        }
      ]
    },
    "03": {
      num: "03",
      title: "Backend Engineering",
      subtitle: "Building robust, scalable server architectures.",
      skills: [
        {
          name: "Spring Boot",
          dots: "● ● ● ● ○",
          desc: "REST APIs, dependency injection, and enterprise microservices.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`
        },
        {
          name: "Flask & FastAPI",
          dots: "● ● ● ● ○",
          desc: "Lightweight Python APIs, rapid routing & AI model serving.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><path d="M10 2v7.5L5 18a2.5 2.5 0 0 0 2.2 3.5h9.6A2.5 2.5 0 0 0 19 18l-5-8.5V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/></svg>`
        },
        {
          name: "REST APIs",
          dots: "● ● ● ● ●",
          desc: "Clean resource design, token authentication & payload validation.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><path d="M4 12h16"/><path d="M16 6l6 6-6 6"/><path d="M8 18l-6-6 6-6"/></svg>`
        },
        {
          name: "JWT Authentication",
          dots: "● ● ● ● ○",
          desc: "Role-based access control, secure tokens & session integrity.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
        }
      ]
    },
    "04": {
      num: "04",
      title: "Frontend Development",
      subtitle: "Crafting fluid, intuitive user interfaces.",
      skills: [
        {
          name: "React.js",
          dots: "● ● ● ○ ○",
          desc: "Component lifecycle, responsive state hooks & UI composition.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.5" fill="#2c2825"/></svg>`
        },
        {
          name: "JavaScript",
          dots: "● ● ● ● ○",
          desc: "Modern ES6+, DOM manipulation & asynchronous API pipelines.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M16 8v8a2 2 0 0 1-2 2h-1"/><path d="M8 15a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2"/></svg>`
        },
        {
          name: "HTML5 & CSS3",
          dots: "● ● ● ● ●",
          desc: "Semantic structure, responsive CSS Grid, and custom animations.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><polygon points="4 2 20 2 18 19 12 22 6 19"/></svg>`
        }
      ]
    },
    "05": {
      num: "05",
      title: "Databases & Cloud",
      subtitle: "Persistent storage, query tuning & cloud services.",
      skills: [
        {
          name: "MySQL",
          dots: "● ● ● ● ○",
          desc: "Schema design, relational indexes & structured querying.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`
        },
        {
          name: "PostgreSQL",
          dots: "● ● ● ● ○",
          desc: "Complex analytical queries, relational modeling & ACID safety.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>`
        },
        {
          name: "Firebase",
          dots: "● ● ● ○ ○",
          desc: "Realtime NoSQL database, auth integration & hosting.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><path d="M4 19L7 3l5 9 3-4 5 11z"/></svg>`
        },
        {
          name: "Neo4j",
          dots: "● ● ● ○ ○",
          desc: "Graph databases, Cypher query language & knowledge graph models.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><circle cx="5" cy="12" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="19" cy="18" r="3"/><line x1="8" y1="11" x2="16" y2="7"/><line x1="8" y1="13" x2="16" y2="17"/></svg>`
        }
      ]
    },
    "06": {
      num: "06",
      title: "Tools & DevOps",
      subtitle: "Version control, containerization & developer workflows.",
      skills: [
        {
          name: "Git & GitHub",
          dots: "● ● ● ● ○",
          desc: "Branching strategies, repository workflows & team collaboration.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="6" y1="9" x2="6" y2="15"/><path d="M18 15V9a6 6 0 0 0-6-6H6"/></svg>`
        },
        {
          name: "Docker",
          dots: "● ● ● ○ ○",
          desc: "Container image creation, multi-container compose & isolation.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><rect x="3" y="10" width="3" height="3"/><rect x="7" y="10" width="3" height="3"/><rect x="11" y="10" width="3" height="3"/><rect x="7" y="6" width="3" height="3"/><rect x="11" y="6" width="3" height="3"/><path d="M2 14c2 0 4 2 7 2s5-2 7-2 4 2 6 2v2c0 3-4 4-10 4S2 19 2 16z"/></svg>`
        },
        {
          name: "Postman",
          dots: "● ● ● ● ●",
          desc: "API endpoint testing, parameter validation & automated test suites.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polygon points="10 8 16 12 10 16"/></svg>`
        },
        {
          name: "Solana & Anchor",
          dots: "● ● ● ○ ○",
          desc: "Decentralized programs, IPFS decentralized storage & Web3 tooling.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><polyline points="4 6 20 6 16 10 0 10"/><polyline points="4 14 20 14 16 18 0 18"/></svg>`
        }
      ]
    },
    "07": {
      num: "07",
      title: "Core Computer Science",
      subtitle: "Academic fundamentals & foundational systems thinking.",
      skills: [
        {
          name: "Data Structures (DSA)",
          dots: "● ● ● ● ●",
          desc: "Trees, graphs, heaps, dynamic arrays & hash tables.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="8.5" y="14" width="7" height="7"/><line x1="6.5" y1="10" x2="12" y2="14"/><line x1="17.5" y1="10" x2="12" y2="14"/></svg>`
        },
        {
          name: "Algorithms",
          dots: "● ● ● ● ●",
          desc: "Searching, sorting, graph traversal & algorithmic complexity.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
        },
        {
          name: "OOP",
          dots: "● ● ● ● ●",
          desc: "Encapsulation, inheritance, polymorphism & design patterns.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="12" cy="12" r="4"/></svg>`
        },
        {
          name: "DBMS & OS",
          dots: "● ● ● ● ●",
          desc: "ACID properties, indexing, process scheduling & memory management.",
          icon: `<svg class="tech-icon-svg" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/></svg>`
        }
      ]
    }
  };

  const sheetNumEl = document.getElementById('sheet-num');
  const sheetTitleEl = document.getElementById('sheet-title');
  const sheetSubtitleEl = document.getElementById('sheet-subtitle');
  const sheetCardsGridEl = document.getElementById('sheet-cards-grid');
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn');

  function renderCategory(catKey) {
    const data = skillsMatrixData[catKey];
    if (!data) return;

    if (sheetNumEl) sheetNumEl.textContent = data.num;
    if (sheetTitleEl) sheetTitleEl.textContent = data.title;
    if (sheetSubtitleEl) sheetSubtitleEl.textContent = data.subtitle;

    if (sheetCardsGridEl) {
      sheetCardsGridEl.style.opacity = '0';
      sheetCardsGridEl.style.transform = 'translateY(8px)';
      sheetCardsGridEl.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

      setTimeout(() => {
        sheetCardsGridEl.innerHTML = data.skills.map(skill => `
          <div class="tech-detail-card">
            <div class="tech-icon-blob-wrapper">
              <div class="tech-watercolor-blob"></div>
              ${skill.icon}
            </div>
            <h5 class="tech-name">${skill.name}</h5>
            <div class="tech-dots-row">${skill.dots}</div>
            <p class="tech-desc">${skill.desc}</p>
          </div>
        `).join('');

        sheetCardsGridEl.style.opacity = '1';
        sheetCardsGridEl.style.transform = 'translateY(0)';
      }, 150);
    }
  }

  // Initial render (Category 01: Languages)
  renderCategory('01');

  // Tab button click events
  skillTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');
      renderCategory(cat);
    });
  });

  window.openAboutWithPageFlip = openAbout;
}
