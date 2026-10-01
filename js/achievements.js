/* ============================================
   ACHIEVEMENTS SYSTEM (Inspired by art-design-portfolio.vercel.app)
   Gamified exploration milestones with parchment seals & toast notifications
   ============================================ */

const ACHIEVEMENTS_DEF = [
  {
    id: 'explorer',
    badge: '門',
    title: 'Explorer // 開巻',
    desc: 'Turn the page to any manuscript chapter or blueprint.',
    hint: 'Click About, Projects, Experience, or Contact.'
  },
  {
    id: 'wanderer',
    badge: '歩',
    title: 'Wanderer // 歴訪',
    desc: 'Journey through the experience timeline or dossier spine.',
    hint: 'Scroll through the About section or drag Experience timeline.'
  },
  {
    id: 'art_critic',
    badge: '鑑',
    title: 'Art Critic // 目利き',
    desc: 'Inspect a project architecture blueprint or code repository.',
    hint: 'Click a project card or inspect architectural recovery.'
  },
  {
    id: 'director',
    badge: '局',
    title: 'Studio Director // 工房主',
    desc: 'Drag to spin the 3D retro terminal carousel in the Lab.',
    hint: 'Drag horizontally across the Studio monitor carousel.'
  },
  {
    id: 'scholar',
    badge: '筆',
    title: 'Scholar // 記録者',
    desc: 'Summon the Scholar’s Dispatch HUD or explore the Blueprint Map.',
    hint: 'Press "/" or click the MAP / Blueprint button.'
  },
  {
    id: 'sociable',
    badge: '港',
    title: 'Sociable // 通信',
    desc: 'Visit the Contact Hub or discover direct correspondence channels.',
    hint: 'Open the Contact Hub or hover over radial communication nodes.'
  }
];

class AchievementsManager {
  constructor() {
    this.storageKey = 'nihar_portfolio_achievements_v1';
    this.unlocked = this.loadState();
    this.drawer = null;
    this.toastContainer = null;
  }

  loadState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.unlocked));
    } catch (e) { }
  }

  init() {
    this.createDomElements();
    this.bindEvents();
    this.updateBadgeCount();
    this.renderList();
  }

  createDomElements() {
    // 1. Toast Notification Container
    if (!document.getElementById('achievement-toast-container')) {
      const toastCont = document.createElement('div');
      toastCont.id = 'achievement-toast-container';
      toastCont.className = 'achievement-toast-container';
      document.body.appendChild(toastCont);
      this.toastContainer = toastCont;
    } else {
      this.toastContainer = document.getElementById('achievement-toast-container');
    }

    // 2. Achievements Drawer Reference
    this.drawer = document.getElementById('achievements-drawer');
  }

  unlock(id) {
    if (this.unlocked[id]) return; // Already unlocked

    const def = ACHIEVEMENTS_DEF.find(a => a.id === id);
    if (!def) return;

    this.unlocked[id] = Date.now();
    this.saveState();
    this.updateBadgeCount();
    this.renderList();
    this.showToast(def);

    // Audio chime
    if (window.playShishiOdoshiSound) {
      window.playShishiOdoshiSound();
    }
  }

  showToast(def) {
    if (!this.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'achievement-toast paper-parchment-toast';
    toast.innerHTML = `
      <div class="toast-seal-badge">${def.badge}</div>
      <div class="toast-body">
        <div class="toast-tag">🏆 ACHIEVEMENT UNLOCKED // 探索皆伝</div>
        <h4 class="toast-title">${def.title}</h4>
        <p class="toast-desc">${def.desc}</p>
      </div>
      <button class="toast-close" aria-label="Dismiss">✕</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      toast.classList.add('dismissing');
      setTimeout(() => toast.remove(), 400);
    });

    this.toastContainer.appendChild(toast);

    // Auto-remove after 6 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('dismissing');
        setTimeout(() => toast.remove(), 400);
      }
    }, 6000);
  }

  updateBadgeCount() {
    const total = ACHIEVEMENTS_DEF.length;
    const count = Object.keys(this.unlocked).length;
    const countBadge = document.getElementById('achievements-count');
    if (countBadge) {
      countBadge.textContent = `${count}/${total}`;
      if (count > 0) {
        countBadge.classList.add('has-unlocked');
      }
    }
    const countBar = document.getElementById('achievements-progress-fill');
    if (countBar) {
      const pct = (count / total) * 100;
      countBar.style.width = `${pct}%`;
    }
  }

  renderList() {
    const listEl = document.getElementById('achievements-list');
    if (!listEl) return;

    listEl.innerHTML = '';
    ACHIEVEMENTS_DEF.forEach(def => {
      const isDone = !!this.unlocked[def.id];
      const item = document.createElement('div');
      item.className = `achievement-item ${isDone ? 'unlocked' : 'locked'}`;
      item.innerHTML = `
        <div class="ach-seal-icon">
          ${isDone ? `<span class="ach-hanko-seal">${def.badge}</span>` : '<span class="ach-lock-icon">🔒</span>'}
        </div>
        <div class="ach-info">
          <div class="ach-header-row">
            <h4 class="ach-title">${def.title}</h4>
            <span class="ach-status-tag">${isDone ? '済 UNLOCKED' : 'LOCKED'}</span>
          </div>
          <p class="ach-desc">${def.desc}</p>
          ${!isDone ? `<span class="ach-hint">※ Hint: ${def.hint}</span>` : '<span class="ach-completed-stamp">印 探索完了</span>'}
        </div>
      `;
      listEl.appendChild(item);
    });
  }

  openDrawer() {
    if (!this.drawer) return;
    this.drawer.classList.add('active');
    this.drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    this.renderList();
    if (window.playClickSound) window.playClickSound(520);
  }

  closeDrawer() {
    if (!this.drawer) return;
    this.drawer.classList.remove('active');
    this.drawer.setAttribute('aria-hidden', 'true');
    if (!document.querySelector('.about-overlay.active, .quick-cmd-hud.active, .manuscript-map-modal.active')) {
      document.body.style.overflow = '';
    }
  }

  toggleDrawer() {
    if (!this.drawer) return;
    if (this.drawer.classList.contains('active')) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  bindEvents() {
    const triggerBtn = document.getElementById('nav-achievements-btn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleDrawer();
      });
    }

    const closeBtn = document.getElementById('achievements-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    const backdrop = document.getElementById('achievements-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.closeDrawer());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.drawer && this.drawer.classList.contains('active')) {
        this.closeDrawer();
      }
    });

    // Wire automatic unlock triggers across site:
    // 1. Explorer: Opening any overlay
    ['nav-about-btn', 'nav-projects-btn', 'nav-experience-btn', 'nav-contact-btn'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', () => this.unlock('explorer'));
      }
    });

    // 2. Scholar: Opening HUD or typing commands
    const cmdTrigger = document.getElementById('nav-cmd-trigger');
    if (cmdTrigger) {
      cmdTrigger.addEventListener('click', () => this.unlock('scholar'));
    }

    // 3. Art Critic: Clicking project cards
    document.addEventListener('click', (e) => {
      if (e.target.closest('.paper-project-card, .project-plate-card, .clothesline-card')) {
        this.unlock('art_critic');
      }
      if (e.target.closest('#nav-contact-btn, .radial-badge, #journey-to-contact')) {
        this.unlock('sociable');
      }
    });

    // 4. Wanderer: Scrolling in About or Experience
    const aboutScroll = document.getElementById('about-scroll');
    if (aboutScroll) {
      aboutScroll.addEventListener('scroll', () => {
        if (aboutScroll.scrollTop > 300) this.unlock('wanderer');
      }, { passive: true });
    }
    const expViewport = document.getElementById('exp-timeline-viewport');
    if (expViewport) {
      expViewport.addEventListener('scroll', () => {
        if (expViewport.scrollLeft > 200) this.unlock('wanderer');
      }, { passive: true });
    }
  }
}

// Global instance
window.achievements = new AchievementsManager();
window.achievementsManager = window.achievements;

function initAchievements() {
  window.achievements.init();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAchievements);
} else {
  initAchievements();
}
