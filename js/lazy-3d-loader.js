/* ==========================================================================
   LAZY 3D WORLD ENGINE LOADER (js/lazy-3d-loader.js)
   Drastically cuts initial mobile page payload by ~1,000 KB and defers
   Three.js + OrbitControls + SpatialWorld3D execution until requested.
   ========================================================================== */

(function () {
  const isMobile =
    window.innerWidth <= 768 ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.maxTouchPoints > 1 && window.innerWidth <= 1024);

  window.__3dEngineStatus = 'idle'; // 'idle', 'loading', 'loaded'
  const pendingCallbacks = [];

  function getLoadingIndicator() {
    let el = document.getElementById('spatial-lazy-indicator');
    if (!el) {
      el = document.createElement('div');
      el.id = 'spatial-lazy-indicator';
      el.className = 'spatial-lazy-indicator';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = `
        <div class="lazy-badge-card">
          <span class="lazy-badge-kanji">⛩️</span>
          <div class="lazy-badge-body">
            <span class="lazy-badge-title">INITIALIZING 3D WORLD</span>
            <span class="lazy-badge-sub">Loading Spatial Assets...</span>
          </div>
          <div class="lazy-badge-spinner"></div>
        </div>
      `;
      document.body.appendChild(el);
    }
    return el;
  }

  function showLoadingIndicator(show) {
    const el = getLoadingIndicator();
    if (show) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      // Check if already injected
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === 'true') {
          resolve();
          return;
        }
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)));
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => {
        script.dataset.loaded = 'true';
        resolve();
      };
      script.onerror = (e) => reject(new Error(`Failed to load ${src}`));
      document.body.appendChild(script);
    });
  }

  window.loadSpatial3DEngine = function (callback) {
    if (window.spatialWorld) {
      if (typeof callback === 'function') callback(window.spatialWorld);
      return;
    }

    if (typeof callback === 'function') {
      pendingCallbacks.push(callback);
    }

    if (window.__3dEngineStatus === 'loading') {
      return;
    }

    window.__3dEngineStatus = 'loading';
    showLoadingIndicator(true);

    // Sequentially load Three.js -> OrbitControls -> world3d.js
    loadScript('js/three.min.js')
      .then(() => loadScript('js/OrbitControls.js'))
      .then(() => loadScript('js/world3d.js'))
      .then(() => {
        window.__3dEngineStatus = 'loaded';
        showLoadingIndicator(false);

        // Ensure SpatialWorld3D instance is created
        if (!window.spatialWorld && typeof SpatialWorld3D !== 'undefined') {
          window.spatialWorld = new SpatialWorld3D();
        }

        while (pendingCallbacks.length > 0) {
          const cb = pendingCallbacks.shift();
          try {
            cb(window.spatialWorld);
          } catch (err) {
            console.error('Error executing 3D callback:', err);
          }
        }
      })
      .catch((err) => {
        console.error('Error loading 3D spatial engine:', err);
        window.__3dEngineStatus = 'idle';
        showLoadingIndicator(false);
      });
  };

  // Intercept 3D trigger buttons so they trigger on-demand loading
  function bind3DTriggers() {
    const triggerSelectors = [
      '#nav-3d-toggle',
      '#mob-nav-3d-btn',
      '#hero-3d-enter-btn',
      '.return-to-3d-btn'
    ];

    document.addEventListener(
      'click',
      (e) => {
        const target = e.target.closest(triggerSelectors.join(','));
        if (!target) return;

        if (!window.spatialWorld) {
          e.preventDefault();
          e.stopPropagation();

          window.loadSpatial3DEngine((world) => {
            if (world) {
              if (target.id === 'about-return-3d') {
                world.toggleFull3DMode();
                world.navigateToZone('about');
              } else if (target.id === 'projects-return-3d') {
                world.toggleFull3DMode();
                world.navigateToZone('projects');
              } else if (target.id === 'experience-return-3d') {
                world.toggleFull3DMode();
                world.navigateToZone('experience');
              } else if (target.id === 'contact-return-3d') {
                world.toggleFull3DMode();
                world.navigateToZone('contact');
              } else if (target.id === 'gaming-return-3d') {
                world.toggleFull3DMode();
                world.navigateToZone('gaming');
              } else if (target.id === 'spotify-return-3d') {
                world.toggleFull3DMode();
                world.navigateToZone('spotify');
              } else {
                world.toggleFull3DMode();
              }
            }
          });
        }
      },
      true
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind3DTriggers);
  } else {
    bind3DTriggers();
  }

  // Desktop idle background prefetch:
  // On desktop, load in background after page is fully idle so hero 2.5D works seamlessly
  // On mobile, NEVER load in background to save battery, GPU, and cellular data!
  if (!isMobile) {
    window.addEventListener('load', () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => window.loadSpatial3DEngine(), { timeout: 3500 });
      } else {
        setTimeout(() => window.loadSpatial3DEngine(), 2500);
      }
    });
  }
})();
