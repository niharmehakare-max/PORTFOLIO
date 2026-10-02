/* ==========================================================================
   TRUE 3D SPATIAL WORLD ENGINE (Three.js WebGL Spatial Atelier)
   Aesthetic: Japanese Sumi-e Ink, Sukiya-zukuri Architecture, Echizen Washi Paper
   Features: Grand Weeping Sakura, Bamboo Grove, Stone Pagoda, Tsukubai Basin,
             Sukiya Pavilion with Tatami & Kakejiku, Shimenawa & Torii Gate,
             Clothesline Blueprint Gallery, Retro CRT Lab with Mechanical Keyboard & Steam,
             Zen Garden with Sanzon Ishigumi & Shishi-odoshi Splash,
             Curved Vermilion Moon Bridge (Taiko-bashi) & Swimming Koi Fish,
             Carved Wooden Guideposts (Michishirube) & Path Energy Beacons,
             Real-time Spatial Compass Rose (方位磁石) & Azimuth Tracking,
             Diegetic In-Scene Inspection Modal (Seamless in-world dossier preview),
             Day / Dusk / Night Illumination Atmosphere Switcher,
             Procedural Web Audio Synthesizer (Temple Bell, Bamboo Clack, Furin, Washi),
             OrbitControls 360°, WASD 6-DOF Flight, Scroll Flythrough, Auto-Tour
   ========================================================================== */

/* ============================================
   1. PROCEDURAL SPATIAL AUDIO SYNTHESIZER
   ============================================ */
class ProceduralSpatialAudio {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('spatial_audio_enabled') !== 'false';
  }

  ensureContext() {
    if (!this.ctx && typeof AudioContext !== 'undefined') {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('spatial_audio_enabled', this.enabled ? 'true' : 'false');
    const sBtn = document.getElementById('webgl-sound-btn');
    if (sBtn) {
      const icon = sBtn.querySelector('.sound-icon');
      const label = sBtn.querySelector('.sound-label');
      if (this.enabled) {
        if (icon) icon.textContent = '🔊';
        if (label) label.textContent = 'SOUND';
        sBtn.classList.remove('muted');
        this.playTempleGong(130);
      } else {
        if (icon) icon.textContent = '🔇';
        if (label) label.textContent = 'MUTED';
        sBtn.classList.add('muted');
      }
    }
    return this.enabled;
  }

  // Sacred Temple Bell (Bonshō 梵鐘)
  playTempleGong(freq = 110) {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const harmonics = [1.0, 1.98, 3.02, 4.05];
      const gains = [0.55, 0.22, 0.12, 0.06];

      harmonics.forEach((h, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq * h, now);
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

        gain.gain.setValueAtTime(gains[i] * 0.38, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 3.2);
      });
    } catch (e) { }
  }

  // Acoustic Bamboo Clack (Shishi-odoshi)
  playBambooClack() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(460, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.09);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) { }
  }

  // Crystalline Wind Chime (Fūrin 風鈴)
  playFurinChime() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [880, 987, 1046, 1318, 1396, 1760];
      const pitch = notes[Math.floor(Math.random() * notes.length)];
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.8);
    } catch (e) { }
  }

  // Breathy Paper Rustle (Washi Swish)
  playPaperRustle() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(1.5, now);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch (e) { }
  }

  // Retro Terminal Chirp
  playTerminalBeep() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(960, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) { }
  }

  // Dynamic Spatial Footstep on Surfaces
  playFootstep(surface = 'wood') {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      if (surface === 'wood') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110 + (Math.random() - 0.5) * 20, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (surface === 'stone') {
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.06);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200 + (Math.random() - 0.5) * 200, now);
        filter.Q.setValueAtTime(3.0, now);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(now);
      } else if (surface === 'water') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(480 + (Math.random() - 0.5) * 80, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.09);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch (e) { }
  }

  // Cast Iron Tea Kettle Boil & Sizzle
  playKettleSizzle() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 1.2);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - (i / bufferSize) * 0.8);
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.frequency.exponentialRampToValueAtTime(1800, now + 1.2);
      filter.Q.setValueAtTime(4.0, now);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);

      const whistle = this.ctx.createOscillator();
      const wGain = this.ctx.createGain();
      whistle.type = 'sine';
      whistle.frequency.setValueAtTime(880, now);
      whistle.frequency.linearRampToValueAtTime(940, now + 0.8);
      wGain.gain.setValueAtTime(0.001, now);
      wGain.gain.linearRampToValueAtTime(0.06, now + 0.3);
      wGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
      whistle.connect(wGain);
      wGain.connect(this.ctx.destination);
      whistle.start(now + 0.1);
      whistle.stop(now + 1.2);
    } catch (e) { }
  }

  // Zen Meditation Singing Bowl (Rin 鈴)
  playSingingBowl(freq = 432) {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [1.0, 2.01, 3.03].forEach((mult, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * mult, now);
        osc.detune.setValueAtTime((Math.random() - 0.5) * 4, now);
        const initialGain = 0.28 / (idx + 1);
        gain.gain.setValueAtTime(initialGain, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 4.0);
      });
    } catch (e) { }
  }

  // Crystalline Water Drop
  playWaterDrop() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) { }
  }

  // Retro 8-Bit Arcade Synthesizer Arpeggio
  playArcadeChirp() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.5];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + idx * 0.035);
        gain.gain.setValueAtTime(0.09, now + idx * 0.035);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.035 + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.035);
        osc.stop(now + idx * 0.035 + 0.065);
      });
    } catch (e) { }
  }

  // Warm Analog Vinyl Minor-7th Chord & Needle Needle Drop
  playVinylChord() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Gentle vinyl needle dust pop
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.04);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
      const pop = this.ctx.createBufferSource();
      pop.buffer = buffer;
      const pGain = this.ctx.createGain();
      pGain.gain.setValueAtTime(0.12, now);
      pGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      pop.connect(pGain);
      pGain.connect(this.ctx.destination);
      pop.start(now);

      // Lush Lo-Fi D Minor 7th chord (D3, F3, A3, C4)
      const freqs = [146.83, 174.61, 220.00, 261.63, 349.23];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + 0.02);
        osc.detune.setValueAtTime((Math.random() - 0.5) * 6, now + 0.02);
        const gVal = 0.16 / (idx + 1);
        gain.gain.setValueAtTime(0.001, now + 0.02);
        gain.gain.linearRampToValueAtTime(gVal, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + 0.02);
        osc.stop(now + 2.8);
      });
    } catch (e) { }
  }

  // Shimmering Golden Grace Bell Chime (Elden Ring Site of Grace)
  playGraceChime() {
    if (!this.enabled) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const goldenFreqs = [528, 792, 1056, 1584, 2112];
      goldenFreqs.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);
        osc.detune.setValueAtTime((i - 2) * 5, now);
        const amp = 0.22 / (i + 1);
        gain.gain.setValueAtTime(amp, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 3.8);
      });
    } catch (e) { }
  }
}

// Global audio helper bindings
window.spatialAudio = new ProceduralSpatialAudio();
window.playPaperSound = () => window.spatialAudio.playPaperRustle();
window.playSorobanBead = () => window.spatialAudio.playBambooClack();
window.playTempleGong = (f) => window.spatialAudio.playTempleGong(f);
window.playArcadeChirp = () => window.spatialAudio.playArcadeChirp();
window.playVinylChord = () => window.spatialAudio.playVinylChord();
window.playGraceChime = () => window.spatialAudio.playGraceChime();

/* ============================================
   2. MAIN 3D SPATIAL WORLD CLASS
   ============================================ */
class SpatialWorld3D {
  constructor() {
    this.container = document.getElementById('webgl-container');
    this.canvas = document.getElementById('webgl-canvas');
    if (!this.canvas || typeof THREE === 'undefined') {
      console.warn('Three.js or WebGL canvas not found. Retrying on load.');
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-1000, -1000);
    this.normalizedMouse = { x: 0, y: 0 };
    
    // Mobile Detection & Render Throttling
    this.isMobile =
      window.innerWidth <= 768 ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && window.innerWidth <= 1024);
    this.isPaused = this.isMobile ? true : false;
    this.animationFrameId = null;
    this.isHeroInView = true;

    // Spatial Zones & Waypoints
    this.zoneOrder = ['hero', 'about', 'projects', 'gaming', 'studio', 'spotify', 'experience', 'contact'];
    this.waypoints = {
      hero: { pos: new THREE.Vector3(0, 1.85, 18), look: new THREE.Vector3(0, 1.65, 0), zone: 'ENTRANCE // 門・玄関' },
      about: { pos: new THREE.Vector3(-22, 1.85, -12), look: new THREE.Vector3(-28, 1.65, -16), zone: 'ATELIER DESK // 略・書斎' },
      projects: { pos: new THREE.Vector3(22, 1.85, -12), look: new THREE.Vector3(28, 1.65, -16), zone: 'CLOTHESLINE GALLERY // 廊・画廊' },
      gaming: { pos: new THREE.Vector3(44, 1.85, -22.5), look: new THREE.Vector3(44, 1.55, -29), zone: 'GAMING DOJO // 遊・電脳道場' },
      studio: { pos: new THREE.Vector3(30, 1.85, -42), look: new THREE.Vector3(36, 1.65, -48), zone: 'RETRO TERMINAL LAB // 工・工房' },
      spotify: { pos: new THREE.Vector3(-42, 1.85, -22.5), look: new THREE.Vector3(-42, 1.55, -29), zone: 'SPOTIFY SOUND PAVILION // 音・音響閣' },
      experience: { pos: new THREE.Vector3(-28, 1.85, -42), look: new THREE.Vector3(-34, 1.65, -48), zone: 'CHRONICLE GARDEN // 歴・庭園' },
      contact: { pos: new THREE.Vector3(-0.45, 1.82, -76.8), look: new THREE.Vector3(0.85, 1.55, -84.2), zone: 'OCEAN DOCK & BOAT // 港・船着場' }
    };

    this.currentZone = 'hero';
    this.targetCameraPos = this.waypoints.hero.pos.clone();
    this.targetCameraLook = this.waypoints.hero.look.clone();
    this.currentCameraLook = this.waypoints.hero.look.clone();
    this.isTransitioning = false;
    this.transitionProgress = 1.0;

    // 3D Interactive State
    this.doorsOpen = false;
    this.leftDoor = null;
    this.rightDoor = null;
    this.isFull3DMode = false;
    this.autoTourActive = false;
    this.autoTourTimer = 0;
    this.autoTourIndex = 0;
    this.timeOfDay = 'day'; // 'day', 'dusk', 'night'
    this.audioEngine = window.spatialAudio;

    // Keyboard Ground Movement Controls (WASD & Arrows)
    this.keys = {
      KeyW: false, KeyS: false, KeyA: false, KeyD: false,
      ShiftLeft: false, ShiftRight: false,
      ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false
    };
    this.flightVelocity = new THREE.Vector3();

    // Interactive 3D Objects & Dynamic Groups
    this.clickableObjects = [];
    this.hangingCanvases = [];
    this.crtMonitors = [];
    this.sakuraParticles = null;
    this.hotaruParticles = null;
    this.incenseSmoke = null;
    this.coffeeSteam = null;
    this.waterSplash = null;
    this.waterMesh = null;
    this.connectBoat = null;
    this.origamiBoat = null;
    this.origamiCrane = null;
    this.floatingLanterns = [];
    this.floatingKanjis = [];
    this.orbitingPolyhedra = [];
    this.windChimes = [];
    this.norenCurtains = [];
    this.bambooCulms = [];
    this.shideStreamers = [];
    this.ribbons = [];
    this.koiFish = [];
    this.pathBeacons = [];
    this.shishiOdoshi = null;
    this.oscilloscope = null;
    this.candleLights = [];
    this.ambientLight = null;
    this.sunLight = null;

    // Dynamic 3D Elements for Spotify Sound Pavilion & Gaming Dojo
    this.spotifyEqualizerBars = [];
    this.spinningVinyl = null;
    this.holographicVinyl = null;
    this.floatingMusicNotes = [];
    this.pulsingWoofers = [];
    this.tubeFilaments = [];
    this.arcadeCRT = null;
    this.valorantSpike = null;
    this.spikeCrystals = [];
    this.eldenGraceParticles = null;
    this.cyberpunkHolo = null;
    this.gamingNeonRings = [];
    this.procTextures = {};

    // Advanced Detailing & Spatial Connectivity Elements
    this.waypointPortals = [];
    this.tapeReels = [];
    this.blinkingLeds = [];
    this.craneFlock = [];
    this.hangingBronzeLanterns = [];
    this.teaSteam = null;
    this.minimapActive = false;
    this.stepTimer = 0;

    // Scroll throttle
    this.lastScrollTime = 0;

    // Animation & Clock
    this.clock = new THREE.Clock();
    this.isInitialized = false;

    this.init();
  }

  init() {
    this.setupRenderer();
    this.setupScene();
    this.setupLights();
    this.setupControls();

    // Procedural 3D Japanese Architectural World
    this.buildGroundAndEngawa();
    this.buildEntranceDoors();
    this.buildSenbonToriiCorridor();
    this.buildGrandSakuraTree();
    this.buildBambooGroves();
    this.buildAtelierPavilionAndDesk();
    this.buildTsukubaiWaterBasin();
    this.buildMountainStreamAndAqueduct();
    this.buildConnectingBoardwalks();
    this.buildAzumayaTeaGazebo();
    this.buildTeaHearthAndBrazier();
    this.buildClotheslineGallery();
    this.buildSpotifySoundPavilion();
    this.buildGamingDojo();
    this.buildRetroTerminalLab();
    this.buildZenChronicleGarden();
    this.buildStonePagoda();
    this.buildTaikoBridgeAndKoi();
    this.buildKasugaLanternTrails();
    this.buildSakuraAndPineGroves();
    this.buildGuideposts();
    this.buildWaypointPortals();
    this.buildContactWaterDock();
    this.buildHorizonCranes();

    // Dynamic Particle FX & Physical Connectivity
    this.buildSakuraParticles();
    this.buildHotaruParticles();
    this.buildIncenseSmokeParticles();
    this.buildCoffeeSteamParticles();
    this.buildTeaSteamParticles();
    this.buildWaterSplashParticles();
    this.buildEldenGraceParticles();
    this.buildPathEnergyBeacons();

    this.bindEvents();
    this.isPaused = false;
    this.animate();
    if (this.isMobile && !this.isFull3DMode) {
      this.pauseAnimation();
    }
    this.isInitialized = true;
    console.log('✓ SpatialWorld3D: Museum-Grade Connected Japanese Atelier Engine Ready.');
  }

  /* ============================================
     PROCEDURAL PBR TEXTURE GENERATION SUITE
     Ultra-fine materials: Hinoki, Walnut, Yakisugi, Vinyl Grooves,
     Acoustic Grill, Brushed Brass/Steel, Arcade Side-Art, Volcanic Rock, Cyberpunk HUDs
     ============================================ */
  getHinokiWoodTexture() {
    if (this.procTextures['hinoki']) return this.procTextures['hinoki'];
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Base warm honey Hinoki wood tone
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0.0, '#78563c');
    grad.addColorStop(0.25, '#8e694b');
    grad.addColorStop(0.5, '#7e5b3e');
    grad.addColorStop(0.75, '#9a7352');
    grad.addColorStop(1.0, '#78563c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Fine organic wood grain waves
    for (let y = 0; y < 512; y += 2) {
      const wave = Math.sin(y * 0.08) * 8 + Math.sin(y * 0.02) * 16;
      const alpha = 0.04 + Math.sin(y * 0.15) * 0.03;
      ctx.strokeStyle = `rgba(50, 30, 16, ${alpha})`;
      ctx.lineWidth = 1 + (y % 6 === 0 ? 1.5 : 0.5);
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= 512; x += 16) {
        const ny = y + Math.sin((x + wave) * 0.04) * 3 + Math.sin(x * 0.1) * 1.5;
        ctx.lineTo(x, ny);
      }
      ctx.stroke();
    }

    // Micro wood fibers / pores
    ctx.fillStyle = 'rgba(40, 24, 12, 0.035)';
    for (let i = 0; i < 1800; i++) {
      const rx = Math.random() * 512;
      const ry = Math.random() * 512;
      ctx.fillRect(rx, ry, Math.random() * 8 + 4, 1);
    }

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(2, 2);

    // Bump Map
    const bCanvas = document.createElement('canvas');
    bCanvas.width = 256;
    bCanvas.height = 256;
    const bctx = bCanvas.getContext('2d');
    bctx.fillStyle = '#808080';
    bctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 4) {
      bctx.strokeStyle = y % 8 === 0 ? '#555555' : '#aaaaaa';
      bctx.lineWidth = 1;
      bctx.beginPath();
      bctx.moveTo(0, y);
      bctx.lineTo(256, y);
      bctx.stroke();
    }
    const bumpMap = new THREE.CanvasTexture(bCanvas);
    bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(2, 2);

    const res = { map, bumpMap };
    this.procTextures['hinoki'] = res;
    return res;
  }

  getWalnutWoodTexture() {
    if (this.procTextures['walnut']) return this.procTextures['walnut'];
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Rich dark chocolate / umber walnut base
    ctx.fillStyle = '#3a2216';
    ctx.fillRect(0, 0, 512, 512);

    // Flowing cathedral grain arches
    for (let i = 0; i < 40; i++) {
      const yCenter = (i * 24) % 600 - 50;
      const alpha = 0.08 + (i % 3) * 0.04;
      ctx.strokeStyle = `rgba(24, 12, 6, ${alpha})`;
      ctx.lineWidth = 2 + (i % 4);
      ctx.beginPath();
      for (let x = 0; x <= 512; x += 8) {
        const dx = (x - 256) / 256;
        const arch = (1 - dx * dx) * 45;
        const wave = Math.sin(x * 0.05 + i) * 6;
        const y = yCenter + arch + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Warm amber grain highlights
    for (let i = 0; i < 20; i++) {
      const y = (i * 32) % 512;
      ctx.strokeStyle = 'rgba(165, 108, 62, 0.06)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y + Math.sin(y * 0.05) * 12);
      ctx.stroke();
    }

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(1.5, 1.5);

    const bCanvas = document.createElement('canvas');
    bCanvas.width = 256;
    bCanvas.height = 256;
    const bctx = bCanvas.getContext('2d');
    bctx.fillStyle = '#808080';
    bctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 4) {
      bctx.strokeStyle = y % 6 === 0 ? '#444' : '#999';
      bctx.lineWidth = 1;
      bctx.beginPath();
      bctx.moveTo(0, y);
      bctx.lineTo(256, y);
      bctx.stroke();
    }
    const bumpMap = new THREE.CanvasTexture(bCanvas);
    bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(1.5, 1.5);

    const res = { map, bumpMap };
    this.procTextures['walnut'] = res;
    return res;
  }

  getYakisugiTexture() {
    if (this.procTextures['yakisugi']) return this.procTextures['yakisugi'];
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Deep charred obsidian carbon base
    ctx.fillStyle = '#0e0d11';
    ctx.fillRect(0, 0, 512, 512);

    // Alligator crackle grid blocks
    const cellW = 32;
    const cellH = 16;
    for (let y = 0; y < 512; y += cellH) {
      for (let x = 0; x < 512; x += cellW) {
        const jitterX = (Math.random() - 0.5) * 4;
        const jitterY = (Math.random() - 0.5) * 3;
        const shade = Math.floor(14 + Math.random() * 12);
        ctx.fillStyle = `rgb(${shade}, ${shade - 2}, ${shade + 4})`;
        ctx.fillRect(x + 1 + jitterX, y + 1 + jitterY, cellW - 2, cellH - 2);

        // Crack fissure borders
        ctx.strokeStyle = '#050406';
        ctx.lineWidth = 2;
        ctx.strokeRect(x + jitterX, y + jitterY, cellW, cellH);

        // Subtle burnt amber glimmer deep in the fissure
        if (Math.random() < 0.12) {
          ctx.strokeStyle = 'rgba(215, 95, 30, 0.28)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x + jitterX, y + jitterY);
          ctx.lineTo(x + jitterX + cellW * 0.5, y + jitterY + cellH);
          ctx.stroke();
        }
      }
    }

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(3, 3);

    // High-contrast crackle bump map
    const bCanvas = document.createElement('canvas');
    bCanvas.width = 256;
    bCanvas.height = 256;
    const bctx = bCanvas.getContext('2d');
    bctx.fillStyle = '#999999';
    bctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 8) {
      for (let x = 0; x < 256; x += 16) {
        bctx.fillStyle = '#333333';
        bctx.strokeRect(x, y, 16, 8);
      }
    }
    const bumpMap = new THREE.CanvasTexture(bCanvas);
    bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(3, 3);

    const res = { map, bumpMap };
    this.procTextures['yakisugi'] = res;
    return res;
  }

  getSpeakerGrillTexture() {
    if (this.procTextures['speaker_grill']) return this.procTextures['speaker_grill'];
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#141416';
    ctx.fillRect(0, 0, 256, 256);

    // Acoustic cross-hatch fabric weave
    for (let y = 0; y < 256; y += 4) {
      for (let x = 0; x < 256; x += 4) {
        if ((x + y) % 8 === 0) {
          ctx.fillStyle = '#222226';
          ctx.fillRect(x, y, 3, 3);
        } else {
          ctx.fillStyle = '#101012';
          ctx.fillRect(x, y, 3, 3);
        }
      }
    }

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(4, 4);
    this.procTextures['speaker_grill'] = map;
    return map;
  }

  getBrushedMetalTexture(type = 'brass') {
    const key = `metal_${type}`;
    if (this.procTextures[key]) return this.procTextures[key];

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    let baseColor = '#c89e43';
    let highlightColor = 'rgba(255, 245, 180, 0.12)';
    let shadowColor = 'rgba(100, 70, 20, 0.15)';

    if (type === 'steel') {
      baseColor = '#9fa4ab';
      highlightColor = 'rgba(255, 255, 255, 0.14)';
      shadowColor = 'rgba(50, 55, 60, 0.15)';
    } else if (type === 'gunmetal') {
      baseColor = '#24272c';
      highlightColor = 'rgba(120, 130, 140, 0.15)';
      shadowColor = 'rgba(10, 12, 15, 0.25)';
    }

    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 512, 256);

    // Fine linear horizontal brush striations
    for (let y = 0; y < 256; y++) {
      const isHigh = Math.random() > 0.5;
      ctx.strokeStyle = isHigh ? highlightColor : shadowColor;
      ctx.lineWidth = Math.random() * 1.5 + 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    this.procTextures[key] = map;
    return map;
  }

  getVinylRecordTexture() {
    if (this.procTextures['vinyl_record']) return this.procTextures['vinyl_record'];
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Deep high-sheen black vinyl disc
    ctx.fillStyle = '#080808';
    ctx.beginPath();
    ctx.arc(512, 512, 506, 0, Math.PI * 2);
    ctx.fill();

    // 1. Dual Anisotropic Butterfly Specular Sheen (45° and 225°)
    const angles = [Math.PI / 4, (5 * Math.PI) / 4];
    angles.forEach(baseAngle => {
      const aGrad = ctx.createRadialGradient(512, 512, 140, 512, 512, 500);
      aGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      aGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      aGrad.addColorStop(1, 'rgba(255, 255, 255, 0.01)');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(512, 512);
      ctx.arc(512, 512, 500, baseAngle - 0.35, baseAngle + 0.35);
      ctx.closePath();
      ctx.fillStyle = aGrad;
      ctx.fill();
      ctx.restore();
    });

    // 2. Over 140 micro-groove tracks with dynamic track separation bands
    for (let r = 165; r < 496; r += 2) {
      const isGap = (r > 260 && r < 268) || (r > 360 && r < 368) || (r > 430 && r < 436);
      if (isGap) {
        ctx.strokeStyle = 'rgba(20, 20, 20, 0.8)';
        ctx.lineWidth = 1.5;
      } else {
        const sheen = (r % 14 === 0) ? 0.22 : ((r % 4 === 0) ? 0.08 : 0.03);
        ctx.strokeStyle = `rgba(255, 255, 255, ${sheen})`;
        ctx.lineWidth = (r % 14 === 0) ? 1.2 : 0.6;
      }
      ctx.beginPath();
      ctx.arc(512, 512, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Outer lead-in groove
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(512, 512, 500, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Spotify Emerald Center Paper Label with Gold Foil Trim
    ctx.fillStyle = '#1db954';
    ctx.beginPath();
    ctx.arc(512, 512, 160, 0, Math.PI * 2);
    ctx.fill();

    // Outer gold foil ring
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(512, 512, 156, 0, Math.PI * 2);
    ctx.stroke();

    // Inner gold accent ring
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(512, 512, 148, 0, Math.PI * 2);
    ctx.stroke();

    // Label Typography
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('NIHAR ATELIER', 512, 440);

    ctx.font = 'bold 20px monospace';
    ctx.fillStyle = '#0a0a0a';
    ctx.fillText('HI-FI ANALOG // 33⅓ RPM', 512, 475);

    ctx.font = '15px monospace';
    ctx.fillStyle = '#121212';
    ctx.fillText('PARANOID ANDROID · MASTER RES', 512, 508);

    // Calligraphy Seal "音"
    ctx.font = 'bold 54px serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('音', 512, 580);

    // Spindle hole with brass rim
    ctx.strokeStyle = '#c99b42';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(512, 512, 24, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.arc(512, 512, 22, 0, Math.PI * 2);
    ctx.fill();

    const map = new THREE.CanvasTexture(canvas);
    map.generateMipmaps = true;

    // Bump Map for grooves
    const bCanvas = document.createElement('canvas');
    bCanvas.width = 512;
    bCanvas.height = 512;
    const bctx = bCanvas.getContext('2d');
    bctx.fillStyle = '#808080';
    bctx.fillRect(0, 0, 512, 512);
    for (let r = 80; r < 250; r += 2) {
      bctx.strokeStyle = r % 4 === 0 ? '#b0b0b0' : '#505050';
      bctx.lineWidth = 1;
      bctx.beginPath();
      bctx.arc(256, 256, r, 0, Math.PI * 2);
      bctx.stroke();
    }
    const bumpMap = new THREE.CanvasTexture(bCanvas);

    const res = { map, bumpMap };
    this.procTextures['vinyl_record'] = res;
    return res;
  }

  getArcadeSideArtTexture(side = 'left') {
    const key = `arcade_side_${side}`;
    if (this.procTextures[key]) return this.procTextures[key];

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Deep dark cyber gradient base
    const grad = ctx.createLinearGradient(0, 0, 512, 1024);
    grad.addColorStop(0, '#0c0d18');
    grad.addColorStop(0.5, '#07080e');
    grad.addColorStop(1, '#05060a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 1024);

    // Carbon-fiber micro-grid background pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
    for (let y = 0; y < 1024; y += 8) {
      for (let x = 0; x < 512; x += 8) {
        if ((x + y) % 16 === 0) ctx.fillRect(x, y, 4, 4);
      }
    }

    // High-voltage diagonal neon cyber speed stripes
    ctx.save();
    ctx.rotate(-0.25);
    const stripeGrad = ctx.createLinearGradient(0, 0, 500, 0);
    stripeGrad.addColorStop(0, '#00f0ff');
    stripeGrad.addColorStop(0.5, '#ff007f');
    stripeGrad.addColorStop(1, '#ffd700');
    ctx.fillStyle = stripeGrad;
    ctx.fillRect(-100, 420, 800, 24);
    ctx.fillRect(-100, 460, 800, 10);
    ctx.fillRect(-100, 480, 800, 4);
    ctx.restore();

    // Geometric circuit traces & cyber shards
    ctx.strokeStyle = side === 'left' ? 'rgba(0, 240, 255, 0.45)' : 'rgba(255, 0, 127, 0.45)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(40, 120);
    ctx.lineTo(180, 120);
    ctx.lineTo(240, 180);
    ctx.lineTo(440, 180);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(80, 880);
    ctx.lineTo(220, 880);
    ctx.lineTo(280, 820);
    ctx.lineTo(460, 820);
    ctx.stroke();

    if (side === 'left') {
      ctx.fillStyle = '#00f0ff';
      ctx.font = '900 130px "Yu Mincho", "Hiragino Mincho ProN", serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 24;
      ctx.fillText('昇', 256, 320);
      ctx.fillText('格', 256, 460);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px monospace';
      ctx.fillText('ASCENDANT 1', 256, 540);

      ctx.font = '16px monospace';
      ctx.fillStyle = '#ff007f';
      ctx.fillText('VALORANT CLUTCH PROTOCOL', 256, 580);

      ctx.font = '14px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('TACTICAL 240Hz ESPORTS DOJO', 256, 610);
      ctx.fillText('NHR // TOKYO CYBERWORKS', 256, 640);
    } else {
      ctx.fillStyle = '#ff007f';
      ctx.font = '900 130px "Yu Mincho", "Hiragino Mincho ProN", serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#ff007f';
      ctx.shadowBlur = 24;
      ctx.fillText('不', 256, 320);
      ctx.fillText('敗', 256, 460);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px monospace';
      ctx.fillText('IMMORTAL MIND', 256, 540);

      ctx.font = '16px monospace';
      ctx.fillStyle = '#00f0ff';
      ctx.fillText('1,400+ HRS COMPETITIVE', 256, 580);

      ctx.font = '14px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('SPLIT-SECOND UTILITY TIMING', 256, 610);
      ctx.fillText('HESITATION IS DEFEAT // 2026', 256, 640);
    }

    // Outer neon border
    ctx.strokeStyle = side === 'left' ? '#00f0ff' : '#ff007f';
    ctx.lineWidth = 12;
    ctx.strokeRect(6, 6, 500, 1012);

    const tex = new THREE.CanvasTexture(canvas);
    this.procTextures[key] = tex;
    return tex;
  }

  getArcadeControlPanelTexture() {
    if (this.procTextures['arcade_panel']) return this.procTextures['arcade_panel'];
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Carbon-fiber weave deck
    ctx.fillStyle = '#121318';
    ctx.fillRect(0, 0, 512, 256);

    for (let y = 0; y < 256; y += 6) {
      for (let x = 0; x < 512; x += 6) {
        ctx.fillStyle = ((x / 6 + y / 6) % 2 === 0) ? '#1a1b22' : '#0c0d12';
        ctx.fillRect(x, y, 6, 6);
      }
    }

    // Player 1 (Cyan) Section
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 220, 216);

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('PLAYER 1 // 1P', 40, 52);
    ctx.font = '11px monospace';
    ctx.fillText('CLUTCH STICK', 40, 72);

    ctx.beginPath();
    ctx.arc(85, 145, 36, 0, Math.PI * 2);
    ctx.stroke();

    // Player 2 (Magenta) Section
    ctx.strokeStyle = '#ff007f';
    ctx.lineWidth = 3;
    ctx.strokeRect(272, 20, 220, 216);

    ctx.fillStyle = '#ff007f';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('PLAYER 2 // 2P', 292, 52);
    ctx.font = '11px monospace';
    ctx.fillText('RIVAL STICK', 292, 72);

    ctx.beginPath();
    ctx.arc(337, 145, 36, 0, Math.PI * 2);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    this.procTextures['arcade_panel'] = tex;
    return tex;
  }

  getVolcanicRockTexture() {
    if (this.procTextures['volcanic_rock']) return this.procTextures['volcanic_rock'];
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Volcanic basalt charcoal base
    ctx.fillStyle = '#262426';
    ctx.fillRect(0, 0, 512, 512);

    // Dark porous pits and ash mottling
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = Math.random() * 3.5 + 0.5;
      const isDark = Math.random() > 0.3;
      ctx.fillStyle = isDark ? 'rgba(12, 10, 14, 0.45)' : 'rgba(80, 75, 70, 0.25)';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Weathered fissures
    for (let i = 0; i < 14; i++) {
      ctx.strokeStyle = 'rgba(10, 8, 12, 0.6)';
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.beginPath();
      let cx = Math.random() * 512;
      let cy = Math.random() * 512;
      ctx.moveTo(cx, cy);
      for (let s = 0; s < 6; s++) {
        cx += (Math.random() - 0.5) * 60;
        cy += (Math.random() - 0.5) * 60;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;

    // Bump Map
    const bCanvas = document.createElement('canvas');
    bCanvas.width = 256;
    bCanvas.height = 256;
    const bctx = bCanvas.getContext('2d');
    bctx.fillStyle = '#808080';
    bctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 1500; i++) {
      bctx.fillStyle = Math.random() > 0.5 ? '#555555' : '#aaaaaa';
      bctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
    }
    const bumpMap = new THREE.CanvasTexture(bCanvas);
    bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;

    const res = { map, bumpMap };
    this.procTextures['volcanic_rock'] = res;
    return res;
  }

  getCyberpunkMonitorTexture(index = 0) {
    const key = `cyber_mon_${index}`;
    if (this.procTextures[key]) return this.procTextures[key];

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');

    // Deep terminal background
    ctx.fillStyle = '#060810';
    ctx.fillRect(0, 0, 512, 320);

    // Subtle scanlines
    ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
    for (let y = 0; y < 320; y += 3) {
      ctx.fillRect(0, y, 512, 1);
    }

    if (index === 0) {
      // Main Display: Neovim / VSCode High-Performance WebGL Engine
      ctx.fillStyle = '#0f1322';
      ctx.fillRect(0, 0, 512, 28);
      ctx.fillStyle = '#00f0ff';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('● main.rs [NVIM]  |  VIT PUNE CS & AI ATELIER', 14, 19);

      // File Tree Sidebar
      ctx.fillStyle = '#0a0d18';
      ctx.fillRect(0, 28, 110, 292);
      ctx.font = '10px monospace';
      ctx.fillStyle = '#64748b';
      ctx.fillText('▾ src/', 10, 50);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('  ▸ engine.rs', 10, 68);
      ctx.fillStyle = '#4ade80';
      ctx.fillText('  ▸ shader.glsl', 10, 86);
      ctx.fillStyle = '#f43f5e';
      ctx.fillText('  ▸ neural.cu', 10, 104);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText('  ▸ audio.ts', 10, 122);

      // Code editor area with syntax highlighting
      const codeLines = [
        { text: 'pub struct SpatialWorld {', color: '#c084fc' },
        { text: '    renderer: Arc<WebGLRenderer>,', color: '#38bdf8' },
        { text: '    sanctuary: JapaneseAtelier,', color: '#38bdf8' },
        { text: '    fps_target: u32 = 165,', color: '#f59e0b' },
        { text: '}', color: '#c084fc' },
        { text: 'impl SpatialWorld {', color: '#c084fc' },
        { text: '    pub fn render_frame(&mut self) {', color: '#4ade80' },
        { text: '        self.simulate_radiant_spike();', color: '#38bdf8' },
        { text: '        self.audio.stream_spotify_hifi();', color: '#4ade80' },
        { text: '        self.draw_vector_minimap();', color: '#38bdf8' },
        { text: '    }', color: '#c084fc' },
        { text: '}', color: '#c084fc' }
      ];

      ctx.font = '11px monospace';
      codeLines.forEach((cl, i) => {
        ctx.fillStyle = '#334155';
        ctx.fillText(`${i + 1}`, 120, 50 + i * 18);
        ctx.fillStyle = cl.color;
        ctx.fillText(cl.text, 142, 50 + i * 18);
      });

      // Terminal Footer
      ctx.fillStyle = '#020617';
      ctx.fillRect(110, 275, 402, 45);
      ctx.fillStyle = '#22c55e';
      ctx.font = '11px monospace';
      ctx.fillText('✓ BUILD PASSING // Latency: 0.4ms // 0 Errors // VRAM: 14.2 GB', 125, 302);
    } else {
      // Secondary Display: Night City Wireframe & Neural Telemetry
      ctx.fillStyle = '#0f1322';
      ctx.fillRect(0, 0, 512, 28);
      ctx.fillStyle = '#ff007f';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('NIGHT CITY TELEMETRY // SECTOR 04 PROTOCOL', 14, 19);

      // 3D Wireframe Grid Perspective
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
      ctx.lineWidth = 1;
      for (let x = 30; x < 240; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 240);
        ctx.lineTo(135 + (x - 135) * 0.25, 90);
        ctx.stroke();
      }
      for (let y = 90; y <= 240; y += 22) {
        ctx.beginPath();
        ctx.moveTo(30, y);
        ctx.lineTo(240, y);
        ctx.stroke();
      }

      // Glowing Map Nodes
      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.arc(135, 150, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = 'bold 11px monospace';
      ctx.fillText('● CLUTCH RADAR', 50, 80);

      // System Performance Diagnostics (Right Column)
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(265, 40, 230, 260);

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('RIG HARDWARE TELEMETRY', 280, 68);

      const metrics = [
        { label: 'GPU ENGINE', val: 'RTX 4090 24GB', color: '#22c55e' },
        { label: 'RAY TRACING', val: 'OVERDRIVE ON', color: '#38bdf8' },
        { label: 'FRAME RATE', val: '165.2 FPS AVG', color: '#4ade80' },
        { label: 'GPU TEMP', val: '43.8°C COOLED', color: '#06b6d4' },
        { label: 'AUDIO BITRATE', val: '320 KBPS MASTER', color: '#a855f7' },
        { label: 'REFLEX LATENCY', val: '1.4 MS ULTRALOW', color: '#f59e0b' }
      ];

      metrics.forEach((m, i) => {
        ctx.font = '10px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(m.label, 280, 102 + i * 32);
        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = m.color;
        ctx.fillText(m.val, 280, 118 + i * 32);
      });
    }

    // Outer cyber bezel glow
    ctx.strokeStyle = index === 0 ? '#00f0ff' : '#ff007f';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 508, 316);

    const tex = new THREE.CanvasTexture(canvas);
    this.procTextures[key] = tex;
    return tex;
  }

  getTatamiTexture() {
    if (this.procTextures['tatami']) return this.procTextures['tatami'];
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Natural Igusa rush straw green/straw base
    ctx.fillStyle = '#c7b282';
    ctx.fillRect(0, 0, 512, 512);

    // Fine woven rushes
    for (let y = 0; y < 512; y += 3) {
      const varCol = Math.sin(y * 0.1) * 15;
      const r = Math.floor(190 + varCol);
      const g = Math.floor(175 + varCol);
      const b = Math.floor(125 + varCol * 0.8);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(0, y, 512, 2);

      for (let x = (y % 6 === 0 ? 0 : 3); x < 512; x += 6) {
        ctx.fillStyle = 'rgba(70, 60, 35, 0.18)';
        ctx.fillRect(x, y, 2, 2);
      }
    }

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(4, 4);

    const bCanvas = document.createElement('canvas');
    bCanvas.width = 256;
    bCanvas.height = 256;
    const bctx = bCanvas.getContext('2d');
    bctx.fillStyle = '#808080';
    bctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 3) {
      bctx.fillStyle = y % 6 === 0 ? '#555' : '#aaa';
      bctx.fillRect(0, y, 256, 1);
    }
    const bumpMap = new THREE.CanvasTexture(bCanvas);
    bumpMap.wrapS = bumpMap.wrapT = THREE.RepeatWrapping;
    bumpMap.repeat.set(4, 4);

    const res = { map, bumpMap };
    this.procTextures['tatami'] = res;
    return res;
  }

  getJapaneseRoofTileTexture() {
    if (this.procTextures['roof_tiles']) return this.procTextures['roof_tiles'];
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Charcoal ceramic glaze base
    ctx.fillStyle = '#1c1b22';
    ctx.fillRect(0, 0, 512, 512);

    // Scalloped Kawara tile rows
    const rowH = 32;
    for (let y = 0; y < 512; y += rowH) {
      for (let x = 0; x < 512; x += 32) {
        const tGrad = ctx.createLinearGradient(x, 0, x + 32, 0);
        tGrad.addColorStop(0, '#100f14');
        tGrad.addColorStop(0.5, '#353340');
        tGrad.addColorStop(1, '#100f14');
        ctx.fillStyle = tGrad;
        ctx.fillRect(x, y, 32, rowH - 3);

        ctx.fillStyle = '#08080a';
        ctx.fillRect(x, y + rowH - 3, 32, 3);
      }
    }

    const map = new THREE.CanvasTexture(canvas);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(4, 4);

    const res = { map };
    this.procTextures['roof_tiles'] = res;
    return res;
  }

  /* ============================================
     RENDERER & SCENE SETUP
     ============================================ */
  setupRenderer() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 950);
    this.camera.position.copy(this.waypoints.hero.pos);
    this.camera.lookAt(this.waypoints.hero.look);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !this.isMobile,
      alpha: true,
      powerPreference: this.isMobile ? 'default' : 'high-performance',
      precision: this.isMobile ? 'mediump' : 'highp'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(
      this.isMobile ? Math.min(window.devicePixelRatio, 1.25) : Math.min(window.devicePixelRatio, 2)
    );
    if (!this.isMobile) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } else {
      this.renderer.shadowMap.enabled = false;
    }
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
  }

  setupScene() {
    this.scene = new THREE.Scene();
    // Warm Echizen Washi Paper Fog with majestic landscape draw distance
    this.scene.fog = new THREE.FogExp2(0xf6ede0, 0.0075);
  }

  setupLights() {
    // 1. Ambient Warm Diffuse
    this.ambientLight = new THREE.AmbientLight(0xfcf6eb, 0.95);
    this.scene.add(this.ambientLight);

    // 2. Sunlight with Expanded Soft Shadows over Full Estate
    this.sunLight = new THREE.DirectionalLight(0xfff5e4, 1.35);
    this.sunLight.position.set(40, 60, 30);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 280;
    this.sunLight.shadow.camera.left = -70;
    this.sunLight.shadow.camera.right = 70;
    this.sunLight.shadow.camera.top = 70;
    this.sunLight.shadow.camera.bottom = -70;
    this.sunLight.shadow.bias = -0.0004;
    this.scene.add(this.sunLight);

    // 3. Torii Entrance Warm Point Light
    const entranceLight = new THREE.PointLight(0xe85338, 2.4, 25, 1.2);
    entranceLight.position.set(0, 4.0, 1.0);
    this.scene.add(entranceLight);

    // 4. Lab CRT Green Phosphor Point Light
    const crtLight = new THREE.PointLight(0x4ee068, 2.2, 22, 1.4);
    crtLight.position.set(36, 3.2, -47);
    this.scene.add(crtLight);

    // 5. Atelier Golden Reading Lamp Spotlight
    const deskSpot = new THREE.SpotLight(0xffea9f, 2.5, 18, Math.PI / 4, 0.4);
    deskSpot.position.set(-28, 5.0, -16);
    deskSpot.target.position.set(-28, 1.4, -16);
    this.scene.add(deskSpot);
    this.scene.add(deskSpot.target);

    // 6. Ocean Dock Cyan Moonlight
    const dockLight = new THREE.PointLight(0x64b5f6, 2.0, 30, 1.2);
    dockLight.position.set(0, 3.2, -76);
    this.scene.add(dockLight);
  }

  setupControls() {
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.055;
      this.controls.maxPolarAngle = Math.PI / 2 + 0.02;
      this.controls.minPolarAngle = Math.PI / 4;
      this.controls.minDistance = 0.5;
      this.controls.maxDistance = 120.0;
      this.controls.target.copy(this.waypoints.hero.look);
      this.controls.enabled = false; // Initially false so 2D hero interactions are never blocked!
    }
  }

  /* ============================================
     PROCEDURAL PROCEDURES: ARCHITECTURE & GROUNDS
     ============================================ */
  buildGroundAndEngawa() {
    // 1. Large Ground Plane with subtle Washi grain
    const groundGeo = new THREE.PlaneGeometry(360, 360, 48, 48);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xede4d3,
      roughness: 0.94,
      metalness: 0.04
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0, -0.01, -30);
    ground.receiveShadow = true;
    this.scene.add(ground);

    // 2. Sumi-e Courtyard Concentric Rings
    for (let r = 12; r <= 88; r += 14) {
      const ringGeo = new THREE.RingGeometry(r, r + 0.16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x3c3228,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.set(0, 0.01, -30);
      this.scene.add(ring);
    }

    // 3. Sukiya Engawa Grand Promenade (Walkway from z=18 to z=-78)
    const cedarMat = new THREE.MeshStandardMaterial({ color: 0x362b22, roughness: 0.75 });
    const walkwayGeo = new THREE.BoxGeometry(3.8, 0.12, 96);
    const walkway = new THREE.Mesh(walkwayGeo, cedarMat);
    walkway.position.set(0, 0.06, -30);
    walkway.receiveShadow = true;
    this.scene.add(walkway);

    // Individual wooden deck planks along the grand promenade
    for (let z = 18; z >= -78; z -= 0.6) {
      const plankGeo = new THREE.BoxGeometry(3.75, 0.02, 0.55);
      const plank = new THREE.Mesh(plankGeo, cedarMat);
      plank.position.set(0, 0.13, z);
      plank.receiveShadow = true;
      this.scene.add(plank);
    }

    // 4. TOBI-ISHI (飛び石) NATURAL STEPPING STONE PATHWAYS
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x5a544b, roughness: 0.92 });
    const mossRimMat = new THREE.MeshStandardMaterial({ color: 0x3b5a20, roughness: 0.95 });

    const createSteppingStone = (x, z, radius = 0.48, rotation = 0) => {
      const g = new THREE.Group();
      g.position.set(x, 0, z);

      const slab = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * 1.15, 0.1, 8), stoneMat);
      slab.position.y = 0.05;
      slab.rotation.y = rotation;
      slab.receiveShadow = true;
      g.add(slab);

      const moss = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.95, 0.04, 5, 8, Math.PI), mossRimMat);
      moss.rotation.x = Math.PI / 2;
      moss.rotation.z = rotation + 0.4;
      moss.position.y = 0.06;
      g.add(moss);

      return g;
    };

    // Pathway 1: Grand Walkway -> Atelier Pavilion ([-28, 0, -16])
    const pathEntranceToAtelier = [
      [-2.4, 4.0], [-4.8, 2.0], [-7.5, 0.0], [-10.8, -2.2], [-14.5, -4.8],
      [-18.2, -7.5], [-21.8, -10.5], [-25.2, -13.5], [-27.5, -15.5]
    ];
    pathEntranceToAtelier.forEach(([x, z], i) => {
      this.scene.add(createSteppingStone(x, z, 0.45 + (i % 3) * 0.04, i * 0.5));
    });

    // Pathway 2: Grand Walkway -> Clothesline Gallery ([28, 0, -16])
    const pathEntranceToGallery = [
      [2.4, 4.0], [4.8, 2.0], [7.5, 0.0], [10.8, -2.2], [14.5, -4.8],
      [18.2, -7.5], [21.8, -10.5], [25.2, -13.5], [27.5, -15.5]
    ];
    pathEntranceToGallery.forEach(([x, z], i) => {
      this.scene.add(createSteppingStone(x, z, 0.46 + (i % 2) * 0.04, i * 0.7));
    });

    // Pathway 3: Clothesline Gallery -> Retro CRT Lab ([36, 0, -48])
    const pathGalleryToLab = [
      [28.5, -18.5], [29.8, -22.0], [31.2, -26.0], [32.6, -30.5],
      [33.8, -35.0], [34.8, -39.5], [35.5, -44.0]
    ];
    pathGalleryToLab.forEach(([x, z], i) => {
      this.scene.add(createSteppingStone(x, z, 0.48, i * 0.6));
    });

    // Pathway 4: Atelier Pavilion -> Chronicle Garden ([-34, 0, -48])
    const pathAtelierToGarden = [
      [-28.5, -18.5], [-29.8, -22.0], [-31.0, -26.0], [-32.0, -30.5],
      [-32.8, -35.0], [-33.4, -39.5], [-33.8, -44.0]
    ];
    pathAtelierToGarden.forEach(([x, z], i) => {
      this.scene.add(createSteppingStone(x, z, 0.48, i * 0.4));
    });

    // Pathway 5: Zen Garden -> Ocean Dock ([0, 0, -78])
    const pathGardenToDock = [
      [-31.0, -52.0], [-26.5, -57.0], [-21.5, -62.0], [-16.0, -66.5],
      [-10.5, -70.5], [-5.5, -74.0], [-2.4, -76.5]
    ];
    pathGardenToDock.forEach(([x, z], i) => {
      this.scene.add(createSteppingStone(x, z, 0.48, i * 0.5));
    });

    // Pathway 6: Retro CRT Lab -> Ocean Dock ([0, 0, -78])
    const pathLabToDock = [
      [33.0, -52.0], [28.5, -57.0], [23.5, -62.0], [18.0, -66.5],
      [12.5, -70.5], [6.5, -74.0], [2.4, -76.5]
    ];
    pathLabToDock.forEach(([x, z], i) => {
      this.scene.add(createSteppingStone(x, z, 0.48, i * 0.7));
    });

    // Pathway 7: Grand Walkway / Azumaya -> Spotify Sound Pavilion ([-42, 0, -29])
    const pathGazeboToSpotify = [
      [-2.8, -24.0], [-6.5, -24.8], [-11.0, -25.5], [-16.0, -26.2],
      [-21.0, -26.8], [-26.0, -27.4], [-31.0, -27.9], [-36.0, -28.3], [-40.0, -28.7]
    ];
    pathGazeboToSpotify.forEach(([x, z], i) => {
      this.scene.add(createSteppingStone(x, z, 0.48 + (i % 2) * 0.04, i * 0.55));
    });

    // Pathway 8: Grand Walkway / Azumaya -> Gaming Dojo ([44, 0, -29])
    const pathGazeboToGaming = [
      [2.8, -24.0], [6.5, -24.8], [11.0, -25.5], [16.0, -26.2],
      [21.0, -26.8], [26.0, -27.4], [31.0, -27.9], [36.0, -28.3], [41.0, -28.7]
    ];
    pathGazeboToGaming.forEach(([x, z], i) => {
      this.scene.add(createSteppingStone(x, z, 0.48 + (i % 2) * 0.04, i * 0.65));
    });

    // 5. ORGANIC MOSS MOUNDS (Tsukiyama 築山)
    const mossPalette = [0x2d4a1d, 0x3b5a20, 0x4f772d];
    const moundLocations = [
      [-38.0, -52.0, 3.2, 0.9], [-42.5, -45.0, 2.8, 0.8], // Zen Pagoda Flank
      [-12.5, 8.0, 3.4, 0.9], [-8.0, 12.0, 2.6, 0.7],     // Entrance Sakura Base
      [32.5, -14.0, 3.0, 0.8], [24.5, -18.0, 2.5, 0.6],    // Gallery Poles
      [-32.5, -14.0, 2.9, 0.8],                            // Atelier Border
      [42.0, -46.0, 3.1, 0.9],                             // CRT Lab Flank
      [-46.0, -32.0, 3.2, 0.9], [-44.0, -24.0, 2.7, 0.8], // Spotify Sound Pavilion Border
      [48.0, -32.0, 3.2, 0.9], [46.0, -24.0, 2.7, 0.8],   // Gaming Dojo Flank
      [-6.0, -42.0, 2.8, 0.7], [6.0, -42.0, 2.8, 0.7],     // Azumaya surroundings
      [-6.0, -62.0, 2.6, 0.6], [6.0, -62.0, 2.6, 0.6]      // Dock approach
    ];

    moundLocations.forEach(([x, z, radius, height], idx) => {
      const mat = new THREE.MeshStandardMaterial({
        color: mossPalette[idx % mossPalette.length],
        roughness: 0.96
      });
      const mound = new THREE.Mesh(new THREE.SphereGeometry(radius, 10, 8), mat);
      mound.scale.set(1.4, height / radius, 1.2);
      mound.position.set(x, 0, z);
      mound.receiveShadow = true;
      this.scene.add(mound);
    });
  }

  /* ============================================
     GRAND WEEPING SAKURA TREE (Entrance)
     ============================================ */
  buildGrandSakuraTree() {
    const treeGroup = new THREE.Group();
    treeGroup.position.set(-6.5, 0, 4.5);

    const barkMat = new THREE.MeshStandardMaterial({ color: 0x3b2d22, roughness: 0.9 });
    const petalMat1 = new THREE.MeshStandardMaterial({ color: 0xf2a7b3, roughness: 0.85 });
    const petalMat2 = new THREE.MeshStandardMaterial({ color: 0xfce4ec, roughness: 0.85 });
    const petalMat3 = new THREE.MeshStandardMaterial({ color: 0xe88892, roughness: 0.88 });

    // Gnarled Trunk with Buttress Roots
    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.2, 1.6, -0.1),
      new THREE.Vector3(-0.3, 3.2, 0.2),
      new THREE.Vector3(0.1, 4.6, 0)
    ]);
    const trunkGeo = new THREE.TubeGeometry(trunkCurve, 20, 0.45, 10, false);
    const trunk = new THREE.Mesh(trunkGeo, barkMat);
    trunk.castShadow = true;
    treeGroup.add(trunk);

    // Root buttresses
    for (let i = 0; i < 5; i++) {
      const ang = (i * Math.PI * 2) / 5 + 0.2;
      const root = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.24, 1.6, 6), barkMat);
      root.position.set(Math.cos(ang) * 0.6, 0.35, Math.sin(ang) * 0.6);
      root.rotation.z = Math.PI / 4;
      treeGroup.add(root);
    }

    // Arching Branches extending toward Torii
    const branchCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.1, 4.2, 0),
      new THREE.Vector3(1.6, 4.9, -0.4),
      new THREE.Vector3(3.2, 4.6, -0.8)
    ]);
    const branch1 = new THREE.Mesh(new THREE.TubeGeometry(branchCurve1, 12, 0.16, 6, false), barkMat);
    treeGroup.add(branch1);

    const branchCurve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.1, 4.0, 0.1),
      new THREE.Vector3(-1.8, 4.5, 0.8),
      new THREE.Vector3(-2.8, 3.8, 1.2)
    ]);
    const branch2 = new THREE.Mesh(new THREE.TubeGeometry(branchCurve2, 12, 0.15, 6, false), barkMat);
    treeGroup.add(branch2);

    // Billowing Cherry Blossom Foliage Clouds
    const foliageClouds = [
      { x: 0, y: 5.2, z: 0, rx: 2.0, ry: 1.2, rz: 2.0, mat: petalMat1 },
      { x: -1.4, y: 4.6, z: 0.9, rx: 1.6, ry: 1.0, rz: 1.5, mat: petalMat2 },
      { x: 1.8, y: 4.8, z: -0.7, rx: 1.8, ry: 1.1, rz: 1.7, mat: petalMat1 },
      { x: 3.2, y: 4.5, z: -0.9, rx: 1.4, ry: 0.9, rz: 1.3, mat: petalMat3 },
      { x: 0.5, y: 6.2, z: 0.3, rx: 1.5, ry: 0.9, rz: 1.4, mat: petalMat2 }
    ];

    foliageClouds.forEach(fc => {
      const cloud = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 10), fc.mat);
      cloud.position.set(fc.x, fc.y, fc.z);
      cloud.scale.set(fc.rx, fc.ry, fc.rz);
      cloud.castShadow = true;
      treeGroup.add(cloud);
    });

    // Fallen Sakura Petals Carpet (Hanaikada 花筏)
    const fallenPetalCount = 45;
    for (let i = 0; i < fallenPetalCount; i++) {
      const pr = 0.4 + Math.random() * 2.8;
      const pa = Math.random() * Math.PI * 2;
      const petal = new THREE.Mesh(new THREE.CircleGeometry(0.06 + Math.random() * 0.05, 5), petalMat1);
      petal.rotation.x = -Math.PI / 2;
      petal.rotation.z = Math.random() * Math.PI;
      petal.position.set(Math.cos(pa) * pr, 0.02, Math.sin(pa) * pr);
      treeGroup.add(petal);
    }

    this.scene.add(treeGroup);
  }

  /* ============================================
     BAMBOO GROVES (Chikurin 竹林)
     ============================================ */
  buildBambooGroves() {
    const bambooGroup = new THREE.Group();
    const bambooGreenMat = new THREE.MeshStandardMaterial({ color: 0x4f772d, roughness: 0.65 });
    const jointMat = new THREE.MeshStandardMaterial({ color: 0x31572c, roughness: 0.5 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x90a955, roughness: 0.8, side: THREE.DoubleSide });

    const culmPositions = [
      [-17, -14], [-18, -17], [-16.5, -20], [-19, -23], [-17.5, -26], [-19.5, -29], [-16, -32],
      [-15, -12], [-14, -15],
      [-10, -32], [-6, -33], [-2, -34], [4, -34], [8, -33], [12, -32],
      [19, -14], [21, -17], [18.5, -21], [21.5, -25], [19, -29], [22, -32],
      [17, -12], [20, -15]
    ];

    culmPositions.forEach(([x, z], idx) => {
      const height = 7.5 + Math.random() * 3.5;
      const culm = new THREE.Group();
      culm.position.set(x + (Math.random() - 0.5) * 0.8, 0, z + (Math.random() - 0.5) * 0.8);

      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, height, 8), bambooGreenMat);
      stem.position.y = height / 2;
      stem.castShadow = true;
      culm.add(stem);

      // Segmented Node Rings
      for (let y = 1.0; y < height; y += 1.2) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.015, 6, 12), jointMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = y;
        culm.add(ring);
      }

      // Branching Top Leaves
      const leafCluster = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.4, 4), leafMat);
      leafCluster.position.set(0, height + 0.5, 0);
      leafCluster.rotation.y = Math.random() * Math.PI;
      culm.add(leafCluster);

      bambooGroup.add(culm);
      this.bambooCulms.push({ group: culm, baseAngle: 0, phase: idx * 0.45 });
    });

    this.scene.add(bambooGroup);
  }

  /* ============================================
     TSUKUBAI STONE WATER BASIN (蹲踞)
     ============================================ */
  buildTsukubaiWaterBasin() {
    const basinGroup = new THREE.Group();
    basinGroup.position.set(-6.2, 0, -7.5);

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x5a544b, roughness: 0.95 });
    const bambooMat = new THREE.MeshStandardMaterial({ color: 0x606c38, roughness: 0.7 });
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x283618, roughness: 0.15, metalness: 0.8 });

    // Hollowed Stone Basin
    const basinOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.5, 12), stoneMat);
    basinOuter.position.y = 0.25;
    basinOuter.receiveShadow = true;
    basinGroup.add(basinOuter);

    // Reflective Water Pool Inside
    const waterSurface = new THREE.Mesh(new THREE.CircleGeometry(0.42, 16), waterMat);
    waterSurface.rotation.x = -Math.PI / 2;
    waterSurface.position.y = 0.46;
    basinGroup.add(waterSurface);

    // Bamboo Ladle (Hishaku) balanced across rim
    const ladle = new THREE.Group();
    ladle.position.set(0, 0.52, 0);
    ladle.rotation.y = 0.4;

    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.9, 8), bambooMat);
    handle.rotation.z = Math.PI / 2;
    ladle.add(handle);

    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 12), bambooMat);
    cup.position.x = 0.42;
    cup.position.y = 0.04;
    ladle.add(cup);

    basinGroup.add(ladle);
    this.scene.add(basinGroup);
  }

  /* ============================================
     CONNECTING FEATURE 1: MOUNTAIN STREAM & BAMBOO AQUEDUCT (小川 & 筧)
     ============================================ */
  buildMountainStreamAndAqueduct() {
    const streamGroup = new THREE.Group();

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x3d7ecc,
      roughness: 0.1,
      metalness: 0.85,
      transparent: true,
      opacity: 0.72
    });
    const riverbedMat = new THREE.MeshStandardMaterial({ color: 0x2e2924, roughness: 0.95 });
    const pebblePalette = [0x42382f, 0x5a4e42, 0x383028, 0x6e6052];
    const bambooGreenMat = new THREE.MeshStandardMaterial({ color: 0x4f772d, roughness: 0.65 });
    const cedarMat = new THREE.MeshStandardMaterial({ color: 0x3d3027, roughness: 0.8 });

    // 1. Natural Winding Stream Path Curves (Tsukubai -> Courtyard -> Koi Pond)
    const streamPoints = [
      new THREE.Vector3(-6.2, 0.05, -7.5),
      new THREE.Vector3(-4.8, 0.04, -11.0),
      new THREE.Vector3(-3.2, 0.03, -15.5),
      new THREE.Vector3(-2.0, 0.03, -20.0),
      new THREE.Vector3(-3.5, 0.03, -25.0),
      new THREE.Vector3(-5.5, 0.04, -29.5)
    ];
    const streamCurve = new THREE.CatmullRomCurve3(streamPoints);

    // Riverbed trench lining
    const bedGeo = new THREE.TubeGeometry(streamCurve, 40, 0.75, 8, false);
    const bedMesh = new THREE.Mesh(bedGeo, riverbedMat);
    bedMesh.scale.set(1.4, 0.25, 1.0);
    bedMesh.position.y = -0.05;
    bedMesh.receiveShadow = true;
    streamGroup.add(bedMesh);

    // Reflective Water Stream Surface
    const waterGeo = new THREE.TubeGeometry(streamCurve, 40, 0.55, 8, false);
    const waterStreamMesh = new THREE.Mesh(waterGeo, waterMat);
    waterStreamMesh.scale.set(1.3, 0.15, 1.0);
    waterStreamMesh.position.y = 0.02;
    streamGroup.add(waterStreamMesh);

    // River Pebbles along Stream Banks
    for (let u = 0; u <= 1.0; u += 0.04) {
      const pt = streamCurve.getPoint(u);
      const tangent = streamCurve.getTangent(u);
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      [-1, 1].forEach(side => {
        const offsetDist = 0.65 + Math.random() * 0.45;
        const px = pt.x + normal.x * side * offsetDist;
        const pz = pt.z + normal.z * side * offsetDist;
        const rad = 0.08 + Math.random() * 0.14;
        const pMat = new THREE.MeshStandardMaterial({
          color: pebblePalette[Math.floor(Math.random() * pebblePalette.length)],
          roughness: 0.9
        });
        const pebble = new THREE.Mesh(new THREE.SphereGeometry(rad, 6, 5), pMat);
        pebble.scale.set(1.2, 0.5, 1.0);
        pebble.position.set(px, 0.03, pz);
        pebble.receiveShadow = true;
        streamGroup.add(pebble);
      });
    }

    // 2. Bamboo Aqueduct (筧 Kakehi Network)
    const kakehiRunners = [
      { start: new THREE.Vector3(-10.5, 1.6, -11.5), end: new THREE.Vector3(-6.2, 0.8, -8.0) },
      { start: new THREE.Vector3(-6.2, 0.75, -8.0), end: new THREE.Vector3(-5.0, 0.5, -10.5) }
    ];

    kakehiRunners.forEach(k => {
      const dir = new THREE.Vector3().subVectors(k.end, k.start);
      const len = dir.length();
      const mid = new THREE.Vector3().addVectors(k.start, k.end).multiplyScalar(0.5);

      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, len, 8), bambooGreenMat);
      pipe.position.copy(mid);
      pipe.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      streamGroup.add(pipe);

      // Bamboo A-frame tripod support
      const aFrameY = (k.start.y + k.end.y) * 0.5;
      [-0.18, 0.18].forEach(side => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.03, aFrameY * 1.15, 6), bambooGreenMat);
        leg.position.set(mid.x + side, aFrameY * 0.5, mid.z);
        leg.rotation.z = side * 0.35;
        streamGroup.add(leg);
      });
    });

    // 3. Miniature Arched Wooden Stream Footbridge (橋 Hashi) at [-2.6, 0, -17.5]
    const miniBridgeGroup = new THREE.Group();
    miniBridgeGroup.position.set(-2.6, 0, -17.5);
    miniBridgeGroup.rotation.y = -0.4;

    const bArchCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-1.4, 0.08, 0),
      new THREE.Vector3(0, 0.42, 0),
      new THREE.Vector3(1.4, 0.08, 0)
    );
    const bArch = new THREE.Mesh(new THREE.TubeGeometry(bArchCurve, 16, 0.06, 6, false), cedarMat);
    miniBridgeGroup.add(bArch);

    for (let i = 0; i <= 10; i++) {
      const u = i / 10;
      const pt = bArchCurve.getPoint(u);
      const plank = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 1.2), cedarMat);
      plank.position.set(pt.x, pt.y + 0.04, 0);
      plank.castShadow = true;
      plank.receiveShadow = true;
      miniBridgeGroup.add(plank);
    }

    [-0.58, 0.58].forEach(oz => {
      const mRailCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-1.4, 0.48, oz),
        new THREE.Vector3(0, 0.82, oz),
        new THREE.Vector3(1.4, 0.48, oz)
      );
      const mRail = new THREE.Mesh(new THREE.TubeGeometry(mRailCurve, 12, 0.025, 6, false), cedarMat);
      miniBridgeGroup.add(mRail);
    });

    streamGroup.add(miniBridgeGroup);
    this.scene.add(streamGroup);
  }

  /* ============================================
     CONNECTING FEATURE 2: PERIMETER BOARDWALKS & HANGING LANTERNS (環状回廊)
     ============================================ */
  buildConnectingBoardwalks() {
    const boardwalkGroup = new THREE.Group();
    const cedarMat = new THREE.MeshStandardMaterial({ color: 0x362b22, roughness: 0.76 });
    const bronzeMat = new THREE.MeshStandardMaterial({ color: 0x382f27, metalness: 0.6, roughness: 0.4 });

    // 1. West Branch: Grand Promenade -> Atelier Pavilion (z = -16)
    for (let x = -1.9; x >= -26.0; x -= 0.6) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.02, 2.6), cedarMat);
      plank.position.set(x, 0.13, -16);
      plank.receiveShadow = true;
      boardwalkGroup.add(plank);
    }
    const westBeams = new THREE.Mesh(new THREE.BoxGeometry(24.2, 0.1, 2.5), cedarMat);
    westBeams.position.set(-14.0, 0.06, -16);
    westBeams.receiveShadow = true;
    boardwalkGroup.add(westBeams);

    // 2. East Branch: Grand Promenade -> Clothesline Gallery (z = -16)
    for (let x = 1.9; x <= 26.0; x += 0.6) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.02, 2.6), cedarMat);
      plank.position.set(x, 0.13, -16);
      plank.receiveShadow = true;
      boardwalkGroup.add(plank);
    }
    const eastBeams = new THREE.Mesh(new THREE.BoxGeometry(24.2, 0.1, 2.5), cedarMat);
    eastBeams.position.set(14.0, 0.06, -16);
    eastBeams.receiveShadow = true;
    boardwalkGroup.add(eastBeams);

    // 3. Hanging Bronze Temple Lanterns (Tsuridōrō 吊灯籠) along Walkways
    const lanternCoords = [
      { x: -7.5, y: 2.4, z: -17.2 },
      { x: -16.0, y: 2.4, z: -17.2 },
      { x: -24.0, y: 2.4, z: -17.2 },
      { x: 7.5, y: 2.4, z: -17.2 },
      { x: 16.0, y: 2.4, z: -17.2 },
      { x: 24.0, y: 2.4, z: -17.2 },
      { x: 0, y: 2.4, z: -25.0 },
      { x: 0, y: 2.4, z: -44.0 }
    ];

    lanternCoords.forEach((lc) => {
      const lGroup = new THREE.Group();
      lGroup.position.set(lc.x, lc.y, lc.z);

      // Support Post & Arm
      const lPost = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 2.4, 6), cedarMat);
      lPost.position.set(0, -1.0, 0);
      lGroup.add(lPost);

      const lArm = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.04, 0.04), cedarMat);
      lArm.position.set(0.18, 0, 0);
      lGroup.add(lArm);

      // Hanging Bronze Lantern Hexagon Housing
      const hHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.28, 6), bronzeMat);
      hHousing.position.set(0.35, -0.22, 0);
      lGroup.add(hHousing);

      // Hexagonal Pagoda Roof Cap
      const hRoof = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.12, 6), bronzeMat);
      hRoof.position.set(0.35, -0.06, 0);
      lGroup.add(hRoof);

      // Amber Candle Point Light Inside
      const lLight = new THREE.PointLight(0xffa834, 1.4, 8, 1.4);
      lLight.position.set(0.35, -0.22, 0);
      lGroup.add(lLight);
      this.candleLights.push(lLight);

      boardwalkGroup.add(lGroup);
      this.hangingBronzeLanterns.push(lGroup);
    });

    this.scene.add(boardwalkGroup);
  }

  /* ============================================
     AZUMAYA REST GAZEBO / TEA PAVILION (東屋 - Central Crossroads)
     ============================================ */
  buildAzumayaTeaGazebo() {
    const gazeboGroup = new THREE.Group();
    gazeboGroup.position.set(0, 0, -34);

    const cedarMat = new THREE.MeshStandardMaterial({ color: 0x3d3027, roughness: 0.82 });
    const darkCedarMat = new THREE.MeshStandardMaterial({ color: 0x251e18, roughness: 0.88 });
    const roofSlateMat = new THREE.MeshStandardMaterial({ color: 0x1a1918, roughness: 0.75 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x5a544b, roughness: 0.95 });
    const bronzeMat = new THREE.MeshStandardMaterial({ color: 0x6e583e, metalness: 0.7, roughness: 0.4 });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xb58d3d, metalness: 0.8, roughness: 0.3 });

    // 1. Hexagonal Stone & Cedar Deck
    const deckGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.3, 6);
    const deck = new THREE.Mesh(deckGeo, cedarMat);
    deck.position.y = 0.15;
    deck.receiveShadow = true;
    gazeboGroup.add(deck);

    // Stone Steps leading up to Gazebo
    [-3.2, 3.2].forEach(oz => {
      const step = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 0.6), stoneMat);
      step.position.set(0, 0.06, oz > 0 ? 3.6 : -3.6);
      step.receiveShadow = true;
      gazeboGroup.add(step);
    });

    // 2. 6 Upright Weathered Cedar Posts
    const postGeo = new THREE.CylinderGeometry(0.12, 0.14, 3.2, 8);
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const px = Math.cos(angle) * 3.1;
      const pz = Math.sin(angle) * 3.1;
      const post = new THREE.Mesh(postGeo, darkCedarMat);
      post.position.set(px, 1.75, pz);
      post.castShadow = true;
      gazeboGroup.add(post);

      // Low wooden perimeter railing / bench between posts (open on north/south for passage)
      if (i !== 0 && i !== 3) {
        const nextAngle = ((i + 1) / 6) * Math.PI * 2;
        const nx = Math.cos(nextAngle) * 3.1;
        const nz = Math.sin(nextAngle) * 3.1;
        const mx = (px + nx) / 2;
        const mz = (pz + nz) / 2;
        const dist = Math.sqrt((nx - px) * (nx - px) + (nz - pz) * (nz - pz));
        const rotY = Math.atan2(nx - px, nz - pz);

        const bench = new THREE.Mesh(new THREE.BoxGeometry(dist * 0.95, 0.08, 0.35), cedarMat);
        bench.position.set(mx, 0.55, mz);
        bench.rotation.y = rotY;
        bench.receiveShadow = true;
        gazeboGroup.add(bench);
      }
    }

    // 3. Grand Hexagonal Hipped Pagoda Roof with Turned-Up Eaves
    const roofGeo = new THREE.ConeGeometry(4.6, 2.2, 6);
    const roof = new THREE.Mesh(roofGeo, roofSlateMat);
    roof.position.y = 4.3;
    roof.castShadow = true;
    gazeboGroup.add(roof);

    // Eaves border trim
    const eavesGeo = new THREE.CylinderGeometry(4.7, 4.9, 0.12, 6);
    const eaves = new THREE.Mesh(eavesGeo, darkCedarMat);
    eaves.position.y = 3.25;
    gazeboGroup.add(eaves);

    // Jewel Finial (Hōju) on Apex
    const hoju = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), brassMat);
    hoju.position.y = 5.55;
    gazeboGroup.add(hoju);

    // 4. Central Sunken Fire Hearth (Irori 囲炉裏)
    const irori = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 1.2), stoneMat);
    irori.position.set(0, 0.35, 0);
    gazeboGroup.add(irori);

    const ash = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 0.9), new THREE.MeshStandardMaterial({ color: 0x4a433d, roughness: 0.95 }));
    ash.position.set(0, 0.42, 0);
    gazeboGroup.add(ash);

    // Cast Iron Teakettle (Chagama 茶釜) with Jizai-kagi Hanging Hook
    const kettle = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.36, 12), bronzeMat);
    kettle.position.set(0, 0.65, 0);
    kettle.castShadow = true;
    kettle.userData = { isTeaKettle: true, label: 'Inspect Boiling Chagama Teakettle' };
    gazeboGroup.add(kettle);
    this.clickableObjects.push(kettle);

    // Bamboo hanging rod (Jizai-kagi)
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.6, 6), darkCedarMat);
    rod.position.set(0, 2.15, 0);
    gazeboGroup.add(rod);

    // Glowing Charcoal Ember Point Light
    const emberLight = new THREE.PointLight(0xff6622, 1.5, 6, 1.5);
    emberLight.position.set(0, 0.5, 0);
    gazeboGroup.add(emberLight);
    this.candleLights.push(emberLight);

    // Hanging Bronze Chōchin Lantern inside Gazebo
    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.55, 8), new THREE.MeshStandardMaterial({
      color: 0xfff0dd,
      emissive: 0xffaa44,
      emissiveIntensity: 0.85
    }));
    lantern.position.set(0, 2.7, 0);
    gazeboGroup.add(lantern);

    const gazeboLight = new THREE.PointLight(0xffa834, 1.8, 10, 1.2);
    gazeboLight.position.set(0, 2.6, 0);
    gazeboGroup.add(gazeboLight);
    this.candleLights.push(gazeboLight);

    // 5. Water Basin (Tsukubai) with Bamboo Kakehi outside Gazebo
    const basin = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 0.55, 8), stoneMat);
    basin.position.set(-2.8, 0.28, 2.4);
    basin.castShadow = true;
    gazeboGroup.add(basin);

    const kakehi = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.85, 6), new THREE.MeshStandardMaterial({ color: 0x4f772d, roughness: 0.7 }));
    kakehi.rotation.z = Math.PI / 3;
    kakehi.position.set(-3.2, 0.65, 2.4);
    gazeboGroup.add(kakehi);

    this.scene.add(gazeboGroup);
  }

  /* ============================================
     CONNECTING FEATURE 3: TRADITIONAL TEA HEARTH & BRAZIER (囲炉裏・茶釜)
     ============================================ */
  buildTeaHearthAndBrazier() {
    const hearthGroup = new THREE.Group();
    hearthGroup.position.set(0, 0.13, -7.5);

    const yakisugiMat = new THREE.MeshStandardMaterial({ color: 0x1e1915, roughness: 0.85 });
    const ashMat = new THREE.MeshStandardMaterial({ color: 0x7a746c, roughness: 0.95 });
    const castIronMat = new THREE.MeshStandardMaterial({ color: 0x221e1a, roughness: 0.6, metalness: 0.7 });
    const feltMat = new THREE.MeshStandardMaterial({ color: 0x961a14, roughness: 0.9 });
    const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f0eb, roughness: 0.3 });
    const matchaMat = new THREE.MeshStandardMaterial({ color: 0x4f772d, roughness: 0.9 });

    // 1. Sunken Square Yakisugi Cedar Hearth Frame (1.6m x 1.6m)
    const frameGeo = new THREE.BoxGeometry(1.6, 0.12, 1.6);
    const frameMesh = new THREE.Mesh(frameGeo, yakisugiMat);
    frameMesh.receiveShadow = true;
    hearthGroup.add(frameMesh);

    // Inner Ash Bed
    const ashGeo = new THREE.BoxGeometry(1.25, 0.08, 1.25);
    const ashMesh = new THREE.Mesh(ashGeo, ashMat);
    ashMesh.position.y = 0.03;
    hearthGroup.add(ashMesh);

    // 2. Glowing Charcoal Briquettes (Sumi 炭)
    const charcoalGroup = new THREE.Group();
    charcoalGroup.position.set(0, 0.08, 0);

    const emberMat = new THREE.MeshStandardMaterial({
      color: 0x221108,
      emissive: 0xff3300,
      emissiveIntensity: 0.85,
      roughness: 0.9
    });

    [[-0.12, -0.08], [0.10, -0.10], [-0.06, 0.12], [0.12, 0.08], [0, 0]].forEach(([cx, cz], ci) => {
      const ember = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 0.14), emberMat);
      ember.position.set(cx, 0, cz);
      ember.rotation.y = ci * 0.5;
      charcoalGroup.add(ember);
    });

    const hearthFlameLight = new THREE.PointLight(0xff5511, 1.8, 6, 1.4);
    hearthFlameLight.position.set(0, 0.2, 0);
    charcoalGroup.add(hearthFlameLight);
    this.candleLights.push(hearthFlameLight);
    hearthGroup.add(charcoalGroup);

    // 3. Iron Trivet (Gotoku 五徳)
    const trivetMat = new THREE.MeshStandardMaterial({ color: 0x181512, metalness: 0.8, roughness: 0.4 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.02, 6, 16), trivetMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.18;
    hearthGroup.add(ring);

    for (let t = 0; t < 3; t++) {
      const tang = (t * Math.PI * 2) / 3;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.18, 6), trivetMat);
      leg.position.set(Math.cos(tang) * 0.22, 0.09, Math.sin(tang) * 0.22);
      hearthGroup.add(leg);
    }

    // 4. Authentic Cast-Iron Tea Kettle (Tetsubin 鉄瓶)
    const kettleGroup = new THREE.Group();
    kettleGroup.position.set(0, 0.28, 0);

    const kBody = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), castIronMat);
    kBody.scale.set(1.1, 0.85, 1.1);
    kettleGroup.add(kBody);

    const kLid = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.12, 0.04, 12), castIronMat);
    kLid.position.y = 0.16;
    kettleGroup.add(kLid);

    const kKnob = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), new THREE.MeshStandardMaterial({ color: 0xb58d3d, metalness: 0.9 }));
    kKnob.position.y = 0.20;
    kettleGroup.add(kKnob);

    const kHandle = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.018, 6, 16, Math.PI), castIronMat);
    kHandle.position.y = 0.16;
    kettleGroup.add(kHandle);

    const kSpout = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.14, 8), castIronMat);
    kSpout.rotation.z = -Math.PI / 3;
    kSpout.position.set(0.18, 0.10, 0);
    kettleGroup.add(kSpout);

    kettleGroup.userData = { isTeaKettle: true, label: 'Brew Matcha Tea // 囲炉裏' };
    hearthGroup.add(kettleGroup);
    this.clickableObjects.push(kettleGroup);

    // 5. Low Cedar Tea Bench with Scarlet Wool Runner (Mōsen 毛氈)
    const benchGroup = new THREE.Group();
    benchGroup.position.set(0, 0, 1.35);

    const bench = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 0.65), yakisugiMat);
    bench.position.y = 0.12;
    benchGroup.add(bench);

    const mosen = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.02, 0.62), feltMat);
    mosen.position.y = 0.19;
    benchGroup.add(mosen);

    // Two Ceramic Matcha Tea Bowls (Chawan 茶碗)
    [-0.45, 0.45].forEach(bx => {
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.04, 0.07, 10), ceramicMat);
      bowl.position.set(bx, 0.24, 0);
      benchGroup.add(bowl);

      const matcha = new THREE.Mesh(new THREE.CircleGeometry(0.06, 10), matchaMat);
      matcha.rotation.x = -Math.PI / 2;
      matcha.position.set(bx, 0.265, 0);
      benchGroup.add(matcha);
    });

    hearthGroup.add(benchGroup);
    this.scene.add(hearthGroup);
  }

  /* ============================================
     5-TIER STONE PAGODA (Gojūnotō 五重塔)
     ============================================ */
  buildStonePagoda() {
    const pagodaGroup = new THREE.Group();
    pagodaGroup.position.set(-16, 0, -27);

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x696054, roughness: 0.92 });
    const darkLatticeMat = new THREE.MeshBasicMaterial({ color: 0x26221c });

    // Foundation Base
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.4, 1.8), stoneMat);
    base.position.y = 0.2;
    base.receiveShadow = true;
    pagodaGroup.add(base);

    // 5 Diminishing Tiers with carved windows
    let currentY = 0.4;
    for (let tier = 0; tier < 5; tier++) {
      const scale = 1.0 - (tier * 0.14);

      // Core Block
      const core = new THREE.Mesh(new THREE.BoxGeometry(0.72 * scale, 0.58 * scale, 0.72 * scale), stoneMat);
      core.position.y = currentY + (0.29 * scale);
      core.castShadow = true;
      pagodaGroup.add(core);

      // Arched Katōmado Window Recesses
      const winFront = new THREE.Mesh(new THREE.PlaneGeometry(0.22 * scale, 0.32 * scale), darkLatticeMat);
      winFront.position.set(0, currentY + (0.29 * scale), 0.37 * scale);
      pagodaGroup.add(winFront);

      // Flared Hip Roof (Kawara)
      const roof = new THREE.Mesh(new THREE.ConeGeometry(1.3 * scale, 0.38 * scale, 4), stoneMat);
      roof.position.y = currentY + (0.68 * scale);
      roof.rotation.y = Math.PI / 4;
      roof.castShadow = true;
      pagodaGroup.add(roof);

      currentY += (0.78 * scale);
    }

    // Sōrin Spire Finial at Top (9 Rings)
    const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.08, 0.9, 8), stoneMat);
    spire.position.y = currentY + 0.45;
    pagodaGroup.add(spire);

    // Jewel finial sphere (Hōju)
    const hoju = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), stoneMat);
    hoju.position.y = currentY + 0.95;
    pagodaGroup.add(hoju);

    this.scene.add(pagodaGroup);
  }

  /* ============================================
     CURVED VERMILION MOON BRIDGE & SWIMMING KOI FISH (太鼓橋 & 錦鯉)
     ============================================ */
  buildTaikoBridgeAndKoi() {
    const bridgeGroup = new THREE.Group();
    bridgeGroup.position.set(0, 0, -50.0);

    const vermilionMat = new THREE.MeshStandardMaterial({ color: 0x961a14, roughness: 0.6, metalness: 0.2 });
    const cedarMat = new THREE.MeshStandardMaterial({ color: 0x3d3027, roughness: 0.8 });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xc49a45, metalness: 0.8, roughness: 0.3 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x5a544b, roughness: 0.95 });

    // 0. Reflective Koi Pond River Crossing under Bridge
    const riverGeo = new THREE.PlaneGeometry(48, 14, 24, 12);
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x2d6b9f,
      roughness: 0.12,
      metalness: 0.88,
      transparent: true,
      opacity: 0.78
    });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.rotation.x = -Math.PI / 2;
    river.position.set(0, 0.04, 0);
    bridgeGroup.add(river);

    // River stone borders along banks
    [-6.8, 6.8].forEach(bz => {
      for (let bx = -22; bx <= 22; bx += 2.2) {
        const stone = new THREE.Mesh(
          new THREE.SphereGeometry(0.35 + (Math.sin(bx * 3) * 0.12), 6, 5),
          stoneMat
        );
        stone.scale.set(1.4, 0.6, 1.2);
        stone.position.set(bx + (Math.cos(bx) * 0.4), 0.08, bz + (Math.sin(bx) * 0.3));
        bridgeGroup.add(stone);
      }
    });

    // 1. Arched Vermilion Support Beams along Promenade
    const leftArchCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0.12, 4.8),
      new THREE.Vector3(0, 1.65, 0),
      new THREE.Vector3(0, 0.12, -4.8)
    );

    const leftArch = new THREE.Mesh(new THREE.TubeGeometry(leftArchCurve, 28, 0.14, 8, false), vermilionMat);
    leftArch.position.x = -1.92;
    leftArch.castShadow = true;
    bridgeGroup.add(leftArch);

    const rightArch = new THREE.Mesh(new THREE.TubeGeometry(leftArchCurve, 28, 0.14, 8, false), vermilionMat);
    rightArch.position.x = 1.92;
    rightArch.castShadow = true;
    bridgeGroup.add(rightArch);

    // 2. Stepped Cedar Deck Planks along Arch
    const plankCount = 26;
    for (let i = 0; i <= plankCount; i++) {
      const u = i / plankCount;
      const pt = leftArchCurve.getPoint(u);
      const tangent = leftArchCurve.getTangent(u);
      const angle = Math.atan2(tangent.y, Math.abs(tangent.z)) * (tangent.z < 0 ? -1 : 1);

      const plank = new THREE.Mesh(new THREE.BoxGeometry(3.72, 0.07, 0.38), cedarMat);
      plank.position.set(0, pt.y + 0.08, pt.z);
      plank.rotation.x = angle;
      plank.castShadow = true;
      plank.receiveShadow = true;
      bridgeGroup.add(plank);
    }

    // 3. Arched Handrails & Giboshi Onion-Bulb Post Caps
    [-1.95, 1.95].forEach(ox => {
      const railCurve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(ox, 0.95, 4.8),
        new THREE.Vector3(ox, 2.45, 0),
        new THREE.Vector3(ox, 0.95, -4.8)
      );
      const rail = new THREE.Mesh(new THREE.TubeGeometry(railCurve, 24, 0.05, 8, false), vermilionMat);
      bridgeGroup.add(rail);

      // Baluster Posts with Giboshi Finials
      [0.05, 0.25, 0.5, 0.75, 0.95].forEach(u => {
        const pt = railCurve.getPoint(u);
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.85, 8), vermilionMat);
        post.position.set(ox, pt.y - 0.42, pt.z);
        bridgeGroup.add(post);

        const giboshi = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), brassMat);
        giboshi.position.set(ox, pt.y + 0.065, pt.z);
        bridgeGroup.add(giboshi);
      });
    });

    // 4. Four Kasuga Stone Lanterns at Bridge Approaches
    const addBridgeLantern = (bx, bz) => {
      const g = new THREE.Group();
      g.position.set(bx, 0, bz);
      const bBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.32, 0.3, 6), stoneMat);
      bBase.position.y = 0.15;
      g.add(bBase);
      const bCol = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.8, 6), stoneMat);
      bCol.position.y = 0.7;
      g.add(bCol);
      const bBox = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.38), new THREE.MeshBasicMaterial({ color: 0xffaa44 }));
      bBox.position.y = 1.25;
      g.add(bBox);
      const bRoof = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.3, 6), stoneMat);
      bRoof.position.y = 1.6;
      g.add(bRoof);
      const bLight = new THREE.PointLight(0xffa033, 1.2, 6, 1.4);
      bLight.position.set(0, 1.25, 0);
      g.add(bLight);
      this.candleLights.push(bLight);
      return g;
    };
    bridgeGroup.add(addBridgeLantern(-2.6, 5.4));
    bridgeGroup.add(addBridgeLantern(2.6, 5.4));
    bridgeGroup.add(addBridgeLantern(-2.6, -5.4));
    bridgeGroup.add(addBridgeLantern(2.6, -5.4));

    this.scene.add(bridgeGroup);

    // 5. ANIMATED SWIMMING KOI FISH (Nishikigoi 錦鯉)
    const koiPondCenter = new THREE.Vector3(0, 0.12, -50.0);
    const koiColors = [
      { body: 0xffffff, patch: 0xd84315 }, // Kohaku
      { body: 0xffffff, patch: 0xc8102e }, // Kohaku Red
      { body: 0xffb300, patch: 0xffe082 }, // Yamabuki Ogon (Gold)
      { body: 0x212121, patch: 0xd84315 }, // Showa
      { body: 0xffffff, patch: 0x1a1a1a }, // Shiro Utsuri
      { body: 0xff9800, patch: 0xffffff }  // Orenji Ogon
    ];

    koiColors.forEach((kc, kIdx) => {
      const koiGroup = new THREE.Group();
      const fishMat = new THREE.MeshStandardMaterial({ color: kc.body, roughness: 0.4 });
      const patchMat = new THREE.MeshStandardMaterial({ color: kc.patch, roughness: 0.4 });

      // Torpedo Fish Body
      const bodyGeo = new THREE.ConeGeometry(0.12, 0.65, 8);
      bodyGeo.rotateX(Math.PI / 2);
      const body = new THREE.Mesh(bodyGeo, fishMat);
      koiGroup.add(body);

      // Color Patch on Back
      const patch = new THREE.Mesh(new THREE.SphereGeometry(0.10, 6, 6), patchMat);
      patch.scale.set(1.1, 0.4, 1.4);
      patch.position.set(0, 0.05, 0.05);
      koiGroup.add(patch);

      // Pectoral Side Fins
      [-0.12, 0.12].forEach(fx => {
        const fin = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.08), patchMat);
        fin.position.set(fx, -0.02, 0.1);
        fin.rotation.z = (fx > 0 ? 1 : -1) * 0.4;
        koiGroup.add(fin);
      });

      // Swishing Tail Fin
      const tailFin = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.22), fishMat);
      tailFin.position.set(0, 0, -0.4);
      tailFin.rotation.y = Math.PI / 2;
      koiGroup.add(tailFin);

      this.scene.add(koiGroup);
      this.koiFish.push({
        group: koiGroup,
        tail: tailFin,
        radiusX: 3.2 + (kIdx * 0.8),
        radiusZ: 2.2 + (kIdx * 0.6),
        speed: 0.42 + (kIdx * 0.1),
        phase: kIdx * 1.05,
        center: koiPondCenter
      });
    });
  }

  /* ============================================
     KASUGA & YUKIMI STONE LANTERN TRAILS (春日灯籠 & 雪見灯籠)
     ============================================ */
  buildKasugaLanternTrails() {
    const lanternGroup = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x5a544b, roughness: 0.94 });
    const fireboxMat = new THREE.MeshBasicMaterial({ color: 0xffaa44 });

    const createKasugaLantern = (x, z) => {
      const g = new THREE.Group();
      g.position.set(x, 0, z);

      // Octagonal Base Plinth
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.38, 0.25, 8), stoneMat);
      base.position.y = 0.125;
      base.receiveShadow = true;
      g.add(base);

      // Slender Column
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.9, 8), stoneMat);
      col.position.y = 0.7;
      col.castShadow = true;
      g.add(col);

      // Middle Platform
      const mid = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.22, 0.15, 8), stoneMat);
      mid.position.y = 1.22;
      g.add(mid);

      // Firebox with Glowing Washi Paper
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.36, 0.34), fireboxMat);
      box.position.y = 1.48;
      g.add(box);

      // Flared Pagoda Roof with Turned-Up Tips
      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.32, 6), stoneMat);
      roof.position.y = 1.82;
      roof.castShadow = true;
      g.add(roof);

      // Jewel Finial (Hōju)
      const hoju = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), stoneMat);
      hoju.position.y = 2.04;
      g.add(hoju);

      // Warm Amber Candle Point Light
      const light = new THREE.PointLight(0xffa033, 1.2, 7, 1.4);
      light.position.set(0, 1.48, 0);
      g.add(light);
      this.candleLights.push(light);

      return g;
    };

    // 1. Lantern Pairs along Central Promenade (z = 16 to z = -76)
    const promenadeZ = [16, 8, 0, -8, -16, -24, -32, -42, -58, -68, -76];
    promenadeZ.forEach(z => {
      lanternGroup.add(createKasugaLantern(-2.4, z));
      lanternGroup.add(createKasugaLantern(2.4, z));
    });

    // 2. Lanterns along West & East Cross Boardwalks (z = -16)
    [-8, -14, -20].forEach(x => lanternGroup.add(createKasugaLantern(x, -14.2)));
    [8, 14, 20].forEach(x => lanternGroup.add(createKasugaLantern(x, -14.2)));

    this.scene.add(lanternGroup);
  }

  /* ============================================
     SAKURA & JAPANESE BLACK PINE GROVES (黒松 & 枝垂桜 庭園)
     ============================================ */
  buildSakuraAndPineGroves() {
    const groveGroup = new THREE.Group();

    const pineBarkMat = new THREE.MeshStandardMaterial({ color: 0x221a14, roughness: 0.95 });
    const pineNeedleMat = new THREE.MeshStandardMaterial({ color: 0x1d3822, roughness: 0.85 });
    const sakuraBarkMat = new THREE.MeshStandardMaterial({ color: 0x3d2e24, roughness: 0.9 });
    const petalMat1 = new THREE.MeshStandardMaterial({ color: 0xf2a7b3, roughness: 0.85 });
    const petalMat2 = new THREE.MeshStandardMaterial({ color: 0xfce4ec, roughness: 0.85 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x5a544b, roughness: 0.95 });

    // 1. Procedural Japanese Black Pine (Kuromatsu 黒松) Builder
    const createBlackPine = (x, z, scale = 1.0, rotY = 0) => {
      const g = new THREE.Group();
      g.position.set(x, 0, z);
      g.scale.set(scale, scale, scale);
      g.rotation.y = rotY;

      // Curved Gnarled Trunk
      const trunkCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.3, 1.5, 0.1),
        new THREE.Vector3(-0.2, 3.2, 0.4),
        new THREE.Vector3(0.4, 4.8, 0.2)
      ]);
      const trunk = new THREE.Mesh(new THREE.TubeGeometry(trunkCurve, 16, 0.32, 8, false), pineBarkMat);
      trunk.castShadow = true;
      g.add(trunk);

      // Layered Horizontal Foliage Pads (Matsu Needle Clouds)
      const padConfigs = [
        { x: 1.2, y: 3.5, z: 0.6, r: 1.3 },
        { x: -1.4, y: 4.2, z: 0.2, r: 1.5 },
        { x: 0.8, y: 5.0, z: -0.4, r: 1.4 },
        { x: 0.1, y: 5.8, z: 0.3, r: 1.6 }
      ];

      padConfigs.forEach(pc => {
        // Horizontal support branch
        const bCurve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(0, pc.y - 0.4, 0),
          new THREE.Vector3(pc.x * 0.5, pc.y - 0.1, pc.z * 0.5),
          new THREE.Vector3(pc.x, pc.y, pc.z)
        );
        const bMesh = new THREE.Mesh(new THREE.TubeGeometry(bCurve, 8, 0.1, 6, false), pineBarkMat);
        g.add(bMesh);

        // Tiered flattened needle cushion
        const padMesh = new THREE.Mesh(new THREE.CylinderGeometry(pc.r, pc.r * 1.15, 0.28, 8), pineNeedleMat);
        padMesh.position.set(pc.x, pc.y + 0.1, pc.z);
        padMesh.scale.set(1.2, 1.0, 0.85);
        padMesh.castShadow = true;
        g.add(padMesh);
      });

      return g;
    };

    // 2. Procedural Sakura Tree Builder
    const createSakura = (x, z, scale = 1.0, rotY = 0) => {
      const g = new THREE.Group();
      g.position.set(x, 0, z);
      g.scale.set(scale, scale, scale);
      g.rotation.y = rotY;

      const trunkCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-0.2, 1.4, 0.2),
        new THREE.Vector3(0.3, 3.0, -0.1),
        new THREE.Vector3(0, 4.4, 0)
      ]);
      const trunk = new THREE.Mesh(new THREE.TubeGeometry(trunkCurve, 14, 0.26, 8, false), sakuraBarkMat);
      trunk.castShadow = true;
      g.add(trunk);

      // Canopy Spheres
      const clouds = [
        { x: 0, y: 5.0, z: 0, rx: 1.8, ry: 1.1, rz: 1.8, mat: petalMat1 },
        { x: -1.2, y: 4.4, z: 0.6, rx: 1.4, ry: 0.9, rz: 1.3, mat: petalMat2 },
        { x: 1.4, y: 4.5, z: -0.5, rx: 1.5, ry: 1.0, rz: 1.4, mat: petalMat1 },
        { x: 0.3, y: 5.8, z: 0.2, rx: 1.3, ry: 0.8, rz: 1.2, mat: petalMat2 }
      ];

      clouds.forEach(c => {
        const m = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), c.mat);
        m.position.set(c.x, c.y, c.z);
        m.scale.set(c.rx, c.ry, c.rz);
        m.castShadow = true;
        g.add(m);
      });

      return g;
    };

    // 3. Zen Rock Arrangement (Sanzon Ishigumi 三尊石組)
    const createZenRockCluster = (x, z, rotY = 0) => {
      const g = new THREE.Group();
      g.position.set(x, 0, z);
      g.rotation.y = rotY;

      // Raked Sand Circle
      const sand = new THREE.Mesh(
        new THREE.CircleGeometry(2.4, 16),
        new THREE.MeshStandardMaterial({ color: 0xe8dfcf, roughness: 0.96 })
      );
      sand.rotation.x = -Math.PI / 2;
      sand.position.y = 0.02;
      sand.receiveShadow = true;
      g.add(sand);

      // Tall Central Stone (Shutaiseki)
      const tall = new THREE.Mesh(new THREE.ConeGeometry(0.42, 1.4, 6), stoneMat);
      tall.position.set(0, 0.65, 0);
      tall.castShadow = true;
      g.add(tall);

      // Flanking Lower Stones (Kentaiseki)
      const flank1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.38, 0), stoneMat);
      flank1.scale.set(1.0, 1.4, 0.8);
      flank1.position.set(-0.65, 0.35, 0.2);
      g.add(flank1);

      const flank2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.32, 0), stoneMat);
      flank2.scale.set(0.9, 1.2, 0.9);
      flank2.position.set(0.65, 0.3, -0.15);
      g.add(flank2);

      return g;
    };

    // Populate Open Landscape Meadows
    // Northwest Meadow (Between Entrance and Atelier)
    groveGroup.add(createBlackPine(-12, 6, 1.1, 0.4));
    groveGroup.add(createSakura(-17, 0, 1.15, 1.2));
    groveGroup.add(createBlackPine(-22, 5, 0.95, 2.1));
    groveGroup.add(createZenRockCluster(-14, -4, 0.6));

    // Northeast Meadow (Between Entrance and Gallery)
    groveGroup.add(createBlackPine(12, 6, 1.1, -0.4));
    groveGroup.add(createSakura(17, 0, 1.15, -1.2));
    groveGroup.add(createBlackPine(22, 5, 0.95, -2.1));
    groveGroup.add(createZenRockCluster(14, -4, -0.6));

    // West Sanctuary (Between Atelier and Zen Chronicle Garden)
    groveGroup.add(createBlackPine(-18, -28, 1.2, 0.8));
    groveGroup.add(createBlackPine(-25, -34, 1.05, 1.9));
    groveGroup.add(createSakura(-14, -38, 1.1, 2.5));
    groveGroup.add(createZenRockCluster(-22, -26, 1.4));

    // East Sanctuary (Between Gallery and CRT Lab)
    groveGroup.add(createBlackPine(18, -28, 1.2, -0.8));
    groveGroup.add(createBlackPine(25, -34, 1.05, -1.9));
    groveGroup.add(createSakura(14, -38, 1.1, -2.5));
    groveGroup.add(createZenRockCluster(22, -26, -1.4));

    // South Garden Flanks (Approaching the Taiko Bridge & Ocean Dock)
    groveGroup.add(createBlackPine(-10, -64, 1.1, 1.1));
    groveGroup.add(createBlackPine(10, -64, 1.1, -1.1));
    groveGroup.add(createSakura(-18, -68, 1.0, 0.5));
    groveGroup.add(createSakura(18, -68, 1.0, -0.5));

    // Lake bank willows / pines flanking the river
    groveGroup.add(createBlackPine(-8, -46, 0.85, 0.3));
    groveGroup.add(createBlackPine(8, -46, 0.85, -0.3));

    this.scene.add(groveGroup);
  }

  /* ============================================
     CARVED WOODEN GUIDEPOST SIGNS (Michishirube 道標)
     ============================================ */
  buildGuideposts() {
    const postGroup = new THREE.Group();
    postGroup.position.set(0, 0, -3.5);

    const darkCedarMat = new THREE.MeshStandardMaterial({ color: 0x3d3027, roughness: 0.85 });

    // Upright Cedar Pillar
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 2.4, 8), darkCedarMat);
    pillar.position.y = 1.2;
    pillar.castShadow = true;
    postGroup.add(pillar);

    // Kasuga Cap on Guidepost
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.18, 4), darkCedarMat);
    cap.position.y = 2.45;
    cap.rotation.y = Math.PI / 4;
    postGroup.add(cap);

    // 6 Directional Pointer Arms with Carved Kanji & English
    const armConfigs = [
      { text: '← 略 ATELIER', dest: 'about', y: 2.25, rotY: Math.PI / 2, ox: -0.65 },
      { text: '→ 廊 GALLERY', dest: 'projects', y: 1.95, rotY: -Math.PI / 2, ox: 0.65 },
      { text: '↖ 音 SPOTIFY', dest: 'spotify', y: 1.65, rotY: Math.PI / 3, ox: -0.55, oz: -0.35 },
      { text: '↗ 遊 GAMING', dest: 'gaming', y: 1.35, rotY: -Math.PI / 3, ox: 0.55, oz: -0.35 },
      { text: '↑ 港 DOCK', dest: 'contact', y: 1.05, rotY: 0, ox: 0, oz: -0.65 },
      { text: '↘ 工 CRT LAB', dest: 'studio', y: 0.75, rotY: -3 * Math.PI / 4, ox: 0.45, oz: 0.45 }
    ];

    armConfigs.forEach(arm => {
      const aCanvas = document.createElement('canvas');
      aCanvas.width = 256;
      aCanvas.height = 64;
      const actx = aCanvas.getContext('2d');
      actx.fillStyle = '#221d18';
      actx.fillRect(0, 0, 256, 64);
      actx.strokeStyle = '#c49a45';
      actx.lineWidth = 3;
      actx.strokeRect(3, 3, 250, 58);
      actx.fillStyle = '#f8f3e6';
      actx.font = 'bold 22px serif';
      actx.textAlign = 'center';
      actx.textBaseline = 'middle';
      actx.fillText(arm.text, 128, 32);

      const armMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.22, 0.06), new THREE.MeshStandardMaterial({
        map: new THREE.CanvasTexture(aCanvas),
        roughness: 0.8
      }));
      armMesh.position.set(arm.ox || 0, arm.y, arm.oz || 0);
      armMesh.rotation.y = arm.rotY;
      armMesh.userData = { targetChapter: arm.dest, isGuidepost: true, label: `Go to ${arm.text.replace(/^[←→↑↗↖↘\s]+/, '')}` };

      postGroup.add(armMesh);
      this.clickableObjects.push(armMesh);
    });

    this.scene.add(postGroup);
  }

  /* ============================================
     CONNECTING FEATURE 4: INTERACTIVE WAYPOINT PORTALS (転送石 Waypoint Stele)
     ============================================ */
  buildWaypointPortals() {
    const portalConfigs = [
      { id: 'hero', kanji: '門', title: 'ENTRANCE', subtitle: '玄関', pos: [0, 0.04, 16.0], color: '#e85338' },
      { id: 'about', kanji: '略', title: 'ATELIER', subtitle: '書斎', pos: [-22.0, 0.04, -12.0], color: '#d4af37' },
      { id: 'projects', kanji: '廊', title: 'GALLERY', subtitle: '画廊', pos: [22.0, 0.04, -12.0], color: '#c8102e' },
      { id: 'gaming', kanji: '遊', title: 'GAMING', subtitle: '道場', pos: [38.0, 0.04, -24.0], color: '#ff007f' },
      { id: 'studio', kanji: '工', title: 'CRT LAB', subtitle: '工房', pos: [30.0, 0.04, -42.0], color: '#4ee068' },
      { id: 'spotify', kanji: '音', title: 'SPOTIFY', subtitle: '音響', pos: [-35.0, 0.04, -24.0], color: '#1db954' },
      { id: 'experience', kanji: '歴', title: 'GARDEN', subtitle: '庭園', pos: [-28.0, 0.04, -42.0], color: '#8c2a22' },
      { id: 'contact', kanji: '港', title: 'DOCK', subtitle: '船着場', pos: [0, 0.04, -72.0], color: '#3d7ecc' }
    ];

    const stoneBaseMat = new THREE.MeshStandardMaterial({ color: 0x4a433a, roughness: 0.92 });

    portalConfigs.forEach(p => {
      const pGroup = new THREE.Group();
      pGroup.position.set(p.pos[0], p.pos[1], p.pos[2]);

      // Polished Circular Granite Plinth
      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.95, 0.08, 24), stoneBaseMat);
      plinth.receiveShadow = true;
      pGroup.add(plinth);

      // Engraved Calligraphy & Gold Disc Canvas Texture
      const dCanvas = document.createElement('canvas');
      dCanvas.width = 256;
      dCanvas.height = 256;
      const dctx = dCanvas.getContext('2d');

      dctx.fillStyle = '#221d18';
      dctx.beginPath();
      dctx.arc(128, 128, 124, 0, Math.PI * 2);
      dctx.fill();

      dctx.strokeStyle = '#c49a45';
      dctx.lineWidth = 3;
      dctx.stroke();

      dctx.strokeStyle = 'rgba(196, 154, 69, 0.35)';
      dctx.lineWidth = 1;
      dctx.beginPath();
      dctx.arc(128, 128, 105, 0, Math.PI * 2);
      dctx.stroke();

      dctx.fillStyle = '#f8f3e6';
      dctx.font = 'bold 88px serif';
      dctx.textAlign = 'center';
      dctx.textBaseline = 'middle';
      dctx.fillText(p.kanji, 128, 110);

      dctx.fillStyle = p.color;
      dctx.font = 'bold 22px monospace';
      dctx.fillText(p.title, 128, 185);

      dctx.font = '14px serif';
      dctx.fillStyle = '#a69a85';
      dctx.fillText(p.subtitle, 128, 215);

      const discMat = new THREE.MeshStandardMaterial({
        map: new THREE.CanvasTexture(dCanvas),
        roughness: 0.75
      });
      const disc = new THREE.Mesh(new THREE.CircleGeometry(0.82, 24), discMat);
      disc.rotation.x = -Math.PI / 2;
      disc.position.y = 0.045;
      disc.receiveShadow = true;
      pGroup.add(disc);

      // Orbiting Golden Energy Ring
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xffcc44,
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(new THREE.RingGeometry(0.88, 0.94, 32), ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = 0.05;
      pGroup.add(ringMesh);

      pGroup.userData = {
        isWaypointPortal: true,
        targetChapter: p.id,
        label: `Fast Travel // ${p.kanji} ${p.title} (${p.subtitle})`
      };

      this.scene.add(pGroup);
      this.clickableObjects.push(disc);
      this.waypointPortals.push({ group: pGroup, ring: ringMesh, color: p.color, id: p.id });
    });
  }

  /* ============================================
     CONNECTING FEATURE 5: FLYING SACRED CRANES (飛翔の丹頂鶴)
     ============================================ */
  buildHorizonCranes() {
    const craneFlockGroup = new THREE.Group();
    craneFlockGroup.position.set(0, 16, -55);

    const bodyMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const wingMat = new THREE.MeshBasicMaterial({ color: 0x1f1f1f, side: THREE.DoubleSide });
    const crownMat = new THREE.MeshBasicMaterial({ color: 0xd8261c });

    for (let c = 0; c < 3; c++) {
      const craneGroup = new THREE.Group();
      craneGroup.position.set(-6 + c * 6, c * 1.5, c * 4);

      // Slender crane fuselage
      const body = new THREE.Mesh(new THREE.ConeGeometry(0.25, 1.8, 5), bodyMat);
      body.rotation.x = Math.PI / 2;
      craneGroup.add(body);

      // Red crown on head
      const crown = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), crownMat);
      crown.position.set(0, 0.22, 0.9);
      craneGroup.add(crown);

      // Articulated Left & Right Wings for Flapping
      const leftWing = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.65), wingMat);
      leftWing.position.set(-0.85, 0.05, 0);
      craneGroup.add(leftWing);

      const rightWing = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.65), wingMat);
      rightWing.position.set(0.85, 0.05, 0);
      craneGroup.add(rightWing);

      craneFlockGroup.add(craneGroup);
      this.craneFlock.push({
        group: craneGroup,
        leftWing,
        rightWing,
        baseAngle: c * 0.8,
        speed: 0.18 + c * 0.04
      });
    }

    this.scene.add(craneFlockGroup);
  }

  /* ============================================
     PARTICLE FX: TEA HEARTH STEAM PARTICLES
     ============================================ */
  buildTeaSteamParticles() {
    const count = 28;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0.18 + (Math.random() - 0.5) * 0.08;
      pos[i * 3 + 1] = 0.52 + Math.random() * 0.9;
      pos[i * 3 + 2] = -7.5 + (Math.random() - 0.5) * 0.08;
      speeds[i] = 0.008 + Math.random() * 0.012;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const steamMat = new THREE.PointsMaterial({
      size: 0.18,
      color: 0xefede6,
      transparent: true,
      opacity: 0.32,
      depthWrite: false
    });

    this.teaSteam = new THREE.Points(geo, steamMat);
    this.teaSteam.userData = { speeds };
    this.scene.add(this.teaSteam);
  }

  /* ============================================
     PATHWAY ENERGY BEACONS (Guidance Light)
     ============================================ */
  buildPathEnergyBeacons() {
    const beaconCoords = [
      [-1.8, 1.2], [-3.8, -1.2], [-6.4, -4.2], [-8.6, -7.6], // to Atelier
      [1.8, 1.2], [4.2, -1.2], [7.4, -4.0], [10.4, -7.2],   // to Gallery
      [12.8, -14.2], [14.0, -18.8],                          // to Lab
      [-10.8, -14.8], [-11.4, -19.6],                        // to Garden
      [-5.5, -29.0], [-1.2, -33.5]                           // to Dock
    ];

    const beaconGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffcc44 });

    beaconCoords.forEach(([x, z], bIdx) => {
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(x, 0.12, z);
      this.scene.add(beacon);
      this.pathBeacons.push({ mesh: beacon, phase: bIdx * 0.4 });
    });
  }

  /* ============================================
     ZONE 0: 3D ENTRANCE TORII, SHIMENAWA & FURIN
     ============================================ */
  buildEntranceDoors() {
    const entranceGroup = new THREE.Group();
    entranceGroup.position.set(0, 0, 0);

    const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x221d18, roughness: 0.85, metalness: 0.15 });
    const vermilionMat = new THREE.MeshStandardMaterial({ color: 0x961a14, roughness: 0.65, metalness: 0.2 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x766c60, roughness: 0.92 });
    const roofSlateMat = new THREE.MeshStandardMaterial({ color: 0x1a1918, roughness: 0.8 });
    const shimenawaStrawMat = new THREE.MeshStandardMaterial({ color: 0xc4a36e, roughness: 0.9 });

    // Torii Gate Columns
    const postGeo = new THREE.CylinderGeometry(0.24, 0.28, 5.4, 16);
    const leftPost = new THREE.Mesh(postGeo, vermilionMat);
    leftPost.position.set(-2.4, 2.7, 0);
    leftPost.castShadow = true;
    entranceGroup.add(leftPost);

    const rightPost = new THREE.Mesh(postGeo, vermilionMat);
    rightPost.position.set(2.4, 2.7, 0);
    rightPost.castShadow = true;
    entranceGroup.add(rightPost);

    // Torii Top Lintel Beams (Kasagi & Shimaki)
    const lintelGeo = new THREE.BoxGeometry(6.4, 0.42, 0.48);
    const lintel = new THREE.Mesh(lintelGeo, vermilionMat);
    lintel.position.set(0, 5.3, 0);
    lintel.castShadow = true;
    entranceGroup.add(lintel);

    // Japanese Curved Kawara Roof Ridge on Torii
    const roofRidgeGeo = new THREE.BoxGeometry(6.8, 0.2, 0.7);
    const roofRidge = new THREE.Mesh(roofRidgeGeo, roofSlateMat);
    roofRidge.position.set(0, 5.55, 0);
    entranceGroup.add(roofRidge);

    const subLintelGeo = new THREE.BoxGeometry(5.4, 0.25, 0.35);
    const subLintel = new THREE.Mesh(subLintelGeo, darkWoodMat);
    subLintel.position.set(0, 4.8, 0);
    entranceGroup.add(subLintel);

    // GAKU CALLIGRAPHY TABLET (額)
    const gakuCanvas = document.createElement('canvas');
    gakuCanvas.width = 256;
    gakuCanvas.height = 128;
    const gctx = gakuCanvas.getContext('2d');
    gctx.fillStyle = '#1c1815';
    gctx.fillRect(0, 0, 256, 128);
    gctx.strokeStyle = '#d4af37';
    gctx.lineWidth = 6;
    gctx.strokeRect(6, 6, 244, 116);
    gctx.fillStyle = '#961a14';
    gctx.font = 'bold 38px serif';
    gctx.textAlign = 'center';
    gctx.fillText('知行合一', 128, 76);

    const gakuMesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 0.08), new THREE.MeshStandardMaterial({
      map: new THREE.CanvasTexture(gakuCanvas),
      roughness: 0.5
    }));
    gakuMesh.position.set(0, 5.05, 0.25);
    entranceGroup.add(gakuMesh);

    // SHIMENAWA (注連縄) SACRED TWISTED RICE ROPE
    const shimenawaCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-2.4, 4.6, 0.15),
      new THREE.Vector3(0, 4.25, 0.2),
      new THREE.Vector3(2.4, 4.6, 0.15)
    );
    const shimenawaGeo = new THREE.TubeGeometry(shimenawaCurve, 30, 0.065, 8, false);
    const shimenawaMesh = new THREE.Mesh(shimenawaGeo, shimenawaStrawMat);
    entranceGroup.add(shimenawaMesh);

    // 4 SHIDE (紙垂) ZIGZAG PAPER STREAMERS
    [-1.5, -0.5, 0.5, 1.5].forEach((ox, sIdx) => {
      const u = (ox + 2.4) / 4.8;
      const pt = shimenawaCurve.getPoint(u);

      const shideGroup = new THREE.Group();
      shideGroup.position.copy(pt);

      const sCanvas = document.createElement('canvas');
      sCanvas.width = 64;
      sCanvas.height = 192;
      const sctx = sCanvas.getContext('2d');
      sctx.fillStyle = '#fdfbf7';
      sctx.fillRect(0, 0, 64, 192);
      sctx.fillStyle = '#e8d8c3';
      sctx.fillRect(0, 40, 32, 20);
      sctx.fillRect(32, 100, 32, 20);

      const shideMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.6), new THREE.MeshStandardMaterial({
        map: new THREE.CanvasTexture(sCanvas),
        roughness: 0.95,
        side: THREE.DoubleSide
      }));
      shideMesh.position.y = -0.3;
      shideGroup.add(shideMesh);
      entranceGroup.add(shideGroup);

      this.shideStreamers.push({ group: shideGroup, phase: sIdx * 0.9 });
    });

    // Bronze Wind Chime (Fūrin 風鈴)
    const furinGroup = new THREE.Group();
    furinGroup.position.set(0, 4.65, 0.15);

    const bellMesh = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.2, 12), new THREE.MeshStandardMaterial({ color: 0xa87d3b, metalness: 0.8, roughness: 0.3 }));
    furinGroup.add(bellMesh);

    // Tanzaku Fluttering Washi Paper Strip
    const tanzakuCanvas = document.createElement('canvas');
    tanzakuCanvas.width = 64;
    tanzakuCanvas.height = 256;
    const tctx = tanzakuCanvas.getContext('2d');
    tctx.fillStyle = '#fbf6ea';
    tctx.fillRect(0, 0, 64, 256);
    tctx.font = 'bold 36px serif';
    tctx.fillStyle = '#8c2a22';
    tctx.fillText('風', 16, 70);
    tctx.fillText('鈴', 16, 150);

    const tanzakuMat = new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(tanzakuCanvas), side: THREE.DoubleSide });
    const tanzaku = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 0.65), tanzakuMat);
    tanzaku.position.set(0, -0.45, 0);
    furinGroup.add(tanzaku);
    this.windChimes.push({ group: furinGroup, tanzaku });
    entranceGroup.add(furinGroup);

    // Stone Pedestals at Column Bases
    const stoneGeo = new THREE.BoxGeometry(0.72, 0.5, 0.72);
    const leftStone = new THREE.Mesh(stoneGeo, stoneMat);
    leftStone.position.set(-2.4, 0.25, 0);
    entranceGroup.add(leftStone);

    const rightStone = new THREE.Mesh(stoneGeo, stoneMat);
    rightStone.position.set(2.4, 0.25, 0);
    entranceGroup.add(rightStone);

    // KASUGA STONE LANTERNS (春日灯籠) with Flickering Firebox
    const buildKasugaLantern = (x, z) => {
      const g = new THREE.Group();
      g.position.set(x, 0, z);

      const base1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.18, 0.8), stoneMat);
      base1.position.y = 0.09;
      g.add(base1);
      const base2 = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 0.24, 6), stoneMat);
      base2.position.y = 0.3;
      g.add(base2);

      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 1.3, 8), stoneMat);
      pillar.position.y = 1.05;
      g.add(pillar);

      const chudai = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.24, 0.22, 6), stoneMat);
      chudai.position.y = 1.8;
      g.add(chudai);

      const firebox = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.56, 0.56), new THREE.MeshBasicMaterial({ color: 0xffaa44 }));
      firebox.position.y = 2.18;
      g.add(firebox);

      const candleLight = new THREE.PointLight(0xff9933, 1.4, 7, 1.5);
      candleLight.position.set(0, 2.18, 0);
      g.add(candleLight);
      this.candleLights.push(candleLight);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(0.85, 0.42, 6), stoneMat);
      roof.position.y = 2.68;
      g.add(roof);

      const hoju = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), stoneMat);
      hoju.position.y = 2.96;
      g.add(hoju);

      return g;
    };
    entranceGroup.add(buildKasugaLantern(-3.6, 1.5));
    entranceGroup.add(buildKasugaLantern(3.6, 1.5));

    // 3D Sliding Shoji Doors with Kumiko Lattice Grid
    const doorWidth = 2.15;
    const doorHeight = 4.3;

    const createShojiDoor = (isLeft) => {
      const doorGroup = new THREE.Group();
      const outerFrame = new THREE.Mesh(new THREE.BoxGeometry(doorWidth, doorHeight, 0.09), darkWoodMat);
      outerFrame.castShadow = true;
      doorGroup.add(outerFrame);

      // Translucent Washi Paper Core with Red Hanko Markings
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#faf4ea';
      ctx.fillRect(0, 0, 512, 1024);
      ctx.fillStyle = 'rgba(180, 160, 130, 0.25)';
      for (let i = 0; i < 400; i++) {
        ctx.fillRect(Math.random() * 512, Math.random() * 1024, 2, 4);
      }
      ctx.font = 'bold 160px serif';
      ctx.fillStyle = '#1c1916';
      ctx.textAlign = 'center';
      ctx.fillText(isLeft ? '知' : '門', 256, 480);

      ctx.strokeStyle = '#961a14';
      ctx.lineWidth = 10;
      ctx.strokeRect(176, 540, 160, 160);
      ctx.font = 'bold 70px serif';
      ctx.fillStyle = '#961a14';
      ctx.fillText(isLeft ? '印' : '開', 256, 650);

      const paperTex = new THREE.CanvasTexture(canvas);
      const paperMesh = new THREE.Mesh(new THREE.PlaneGeometry(doorWidth - 0.12, doorHeight - 0.12), new THREE.MeshStandardMaterial({
        map: paperTex,
        roughness: 0.9,
        transparent: true,
        opacity: 0.92,
        side: THREE.DoubleSide
      }));
      paperMesh.position.z = 0.01;
      doorGroup.add(paperMesh);

      // Fine Kumiko Geometric Lattice Grid
      for (let y = -doorHeight / 2 + 0.35; y < doorHeight / 2; y += 0.38) {
        const hBar = new THREE.Mesh(new THREE.BoxGeometry(doorWidth - 0.14, 0.03, 0.04), darkWoodMat);
        hBar.position.set(0, y, 0.03);
        doorGroup.add(hBar);
      }
      for (let x = -doorWidth / 2 + 0.3; x < doorWidth / 2; x += 0.35) {
        const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.03, doorHeight - 0.14, 0.04), darkWoodMat);
        vBar.position.set(x, 0, 0.03);
        doorGroup.add(vBar);
      }

      // Wooden Handle
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.65, 0.06), vermilionMat);
      handle.position.set(isLeft ? doorWidth / 2 - 0.28 : -doorWidth / 2 + 0.28, 0, 0.05);
      doorGroup.add(handle);

      return doorGroup;
    };

    this.leftDoor = createShojiDoor(true);
    this.leftDoor.position.set(-1.08, 2.2, 0);
    this.leftDoor.userData = { isDoor: true, label: 'Slide Open Shoji Doors' };
    entranceGroup.add(this.leftDoor);

    this.rightDoor = createShojiDoor(false);
    this.rightDoor.position.set(1.08, 2.2, -0.05);
    this.rightDoor.userData = { isDoor: true, label: 'Slide Open Shoji Doors' };
    entranceGroup.add(this.rightDoor);

    this.clickableObjects.push(this.leftDoor, this.rightDoor);
    this.scene.add(entranceGroup);
  }

  /* ============================================
     SENBON TORII CORRIDOR (千本鳥居 - Kyoto Shrine Passage)
     ============================================ */
  buildSenbonToriiCorridor() {
    const toriiGroup = new THREE.Group();
    const vermilionMat = new THREE.MeshStandardMaterial({ color: 0x961a14, roughness: 0.62, metalness: 0.2 });
    const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x221d18, roughness: 0.85 });
    const stoneBaseMat = new THREE.MeshStandardMaterial({ color: 0x5a544b, roughness: 0.92 });

    const kanjiPlaques = ['知', '創', '道', '深', '技', '心', '真', '幽'];
    const zPositions = [15.5, 13.5, 11.5, 9.5, 7.5, 5.5, 3.8, 2.2];

    zPositions.forEach((zPos, idx) => {
      const g = new THREE.Group();
      g.position.set(0, 0, zPos);

      // Stone plinths
      [-2.1, 2.1].forEach(px => {
        const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.25, 0.5), stoneBaseMat);
        plinth.position.set(px, 0.125, 0);
        plinth.receiveShadow = true;
        g.add(plinth);
      });

      // Upright vermilion columns
      const colGeo = new THREE.CylinderGeometry(0.18, 0.22, 4.2, 12);
      const leftCol = new THREE.Mesh(colGeo, vermilionMat);
      leftCol.position.set(-2.1, 2.2, 0);
      leftCol.castShadow = true;
      g.add(leftCol);

      const rightCol = new THREE.Mesh(colGeo, vermilionMat);
      rightCol.position.set(2.1, 2.2, 0);
      rightCol.castShadow = true;
      g.add(rightCol);

      // Black lacquer column base cuffs (Kamebara / Daiishi)
      [-2.1, 2.1].forEach(px => {
        const cuff = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.24, 0.35, 12), darkWoodMat);
        cuff.position.set(px, 0.4, 0);
        g.add(cuff);
      });

      // Lower tie beam (Nuki)
      const nuki = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.16, 0.24), vermilionMat);
      nuki.position.set(0, 3.4, 0);
      nuki.castShadow = true;
      g.add(nuki);

      // Upper curved lintel beam (Kasagi)
      const kasagi = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.32, 0.36), vermilionMat);
      kasagi.position.set(0, 4.2, 0);
      kasagi.castShadow = true;
      g.add(kasagi);

      // Black slate roof ridge on lintel
      const roofCap = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.1, 0.44), darkWoodMat);
      roofCap.position.set(0, 4.4, 0);
      g.add(roofCap);

      // Central tablet (Gaku) with gold kanji plaque
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#1c1815';
      ctx.fillRect(0, 0, 128, 128);
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.strokeRect(3, 3, 122, 122);
      ctx.fillStyle = '#f8f3e6';
      ctx.font = 'bold 74px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(kanjiPlaques[idx % kanjiPlaques.length], 64, 64);

      const tabletMat = new THREE.MeshStandardMaterial({
        map: new THREE.CanvasTexture(canvas),
        roughness: 0.75
      });
      const tablet = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.48, 0.08), tabletMat);
      tablet.position.set(0, 3.8, 0.14);
      g.add(tablet);

      toriiGroup.add(g);
    });

    this.scene.add(toriiGroup);
  }

  /* ============================================
     ZONE 1: SUKIYA PAVILION, ATELIER DESK & BONSAI (About)
     ============================================ */
  buildAtelierPavilionAndDesk() {
    const atelierGroup = new THREE.Group();
    atelierGroup.position.set(-28, 0, -16);

    const darkCedarMat = new THREE.MeshStandardMaterial({ color: 0x382c23, roughness: 0.78 });
    const goldLeafMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.45, metalness: 0.75 });
    const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xfbfbfb, roughness: 0.2, metalness: 0.1 });
    const bronzeMat = new THREE.MeshStandardMaterial({ color: 0x4a3b2c, roughness: 0.4, metalness: 0.7 });
    const inkMat = new THREE.MeshStandardMaterial({ color: 0x0f0e0c, roughness: 0.3 });
    const bambooMat = new THREE.MeshStandardMaterial({ color: 0x606c38, roughness: 0.7 });

    // 1. Sukiya Pavilion Timber Framework & Tile Roof
    const pavilionGroup = new THREE.Group();
    const pillarPositions = [[-3.4, -2.4], [3.4, -2.4], [-3.4, 2.4], [3.4, 2.4]];
    pillarPositions.forEach(([x, z]) => {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 4.6, 10), darkCedarMat);
      pillar.position.set(x, 2.3, z);
      pillar.castShadow = true;
      pavilionGroup.add(pillar);
    });

    const bBeam = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.2, 0.2), darkCedarMat);
    bBeam.position.set(0, 4.5, -2.4);
    pavilionGroup.add(bBeam);
    const fBeam = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.2, 0.2), darkCedarMat);
    fBeam.position.set(0, 4.5, 2.4);
    pavilionGroup.add(fBeam);

    const pRoof = new THREE.Mesh(new THREE.ConeGeometry(5.4, 1.4, 4), new THREE.MeshStandardMaterial({ color: 0x1d1b19, roughness: 0.8 }));
    pRoof.position.set(0, 5.2, 0);
    pRoof.rotation.y = Math.PI / 4;
    pRoof.scale.set(1.2, 0.8, 1.0);
    pRoof.castShadow = true;
    pavilionGroup.add(pRoof);

    // 2. Hanging Indigo Noren Curtains (暖簾)
    const createNorenPanel = (text, ox) => {
      const nCanvas = document.createElement('canvas');
      nCanvas.width = 128;
      nCanvas.height = 256;
      const nctx = nCanvas.getContext('2d');
      nctx.fillStyle = '#1c2833';
      nctx.fillRect(0, 0, 128, 256);
      nctx.font = 'bold 70px serif';
      nctx.fillStyle = '#fdfefe';
      nctx.textAlign = 'center';
      nctx.fillText(text, 64, 140);

      const nMat = new THREE.MeshStandardMaterial({
        map: new THREE.CanvasTexture(nCanvas),
        roughness: 0.9,
        side: THREE.DoubleSide
      });
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 1.6), nMat);
      panel.position.set(ox, 3.6, 2.4);
      return panel;
    };

    const norenLeft = createNorenPanel('匠', -0.55);
    const norenRight = createNorenPanel('創', 0.55);
    pavilionGroup.add(norenLeft, norenRight);
    this.norenCurtains.push(norenLeft, norenRight);

    atelierGroup.add(pavilionGroup);

    // 3. AUTHENTIC TATAMI FLOOR (Shūjiki-shiki 祝儀敷き 6-Mat Layout)
    const tatamiPlatform = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.16, 5.2), new THREE.MeshStandardMaterial({ color: 0x221d18 }));
    tatamiPlatform.position.set(0, 0.08, 0);
    tatamiPlatform.receiveShadow = true;
    atelierGroup.add(tatamiPlatform);

    const tatamiPBR = this.getTatamiTexture();
    const tatamiMatTex = new THREE.MeshStandardMaterial({
      map: tatamiPBR.map,
      bumpMap: tatamiPBR.bumpMap,
      bumpScale: 0.04,
      roughness: 0.88
    });
    const heriMat = new THREE.MeshBasicMaterial({ color: 0x141a14 });

    const tatamiCoords = [
      { x: -1.75, z: -1.3, w: 3.4, l: 1.7 },
      { x: -1.75, z: 1.3, w: 3.4, l: 1.7 },
      { x: 1.75, z: -1.3, w: 3.4, l: 1.7 },
      { x: 1.75, z: 1.3, w: 3.4, l: 1.7 }
    ];
    tatamiCoords.forEach(t => {
      const matMesh = new THREE.Mesh(new THREE.BoxGeometry(t.w - 0.08, 0.03, t.l - 0.08), tatamiMatTex);
      matMesh.position.set(t.x, 0.17, t.z);
      atelierGroup.add(matMesh);

      const h1 = new THREE.Mesh(new THREE.BoxGeometry(t.w, 0.035, 0.06), heriMat);
      h1.position.set(t.x, 0.175, t.z - t.l / 2 + 0.03);
      atelierGroup.add(h1);
      const h2 = new THREE.Mesh(new THREE.BoxGeometry(t.w, 0.035, 0.06), heriMat);
      h2.position.set(t.x, 0.175, t.z + t.l / 2 - 0.03);
      atelierGroup.add(h2);
    });

    // 4. HANGING KAKEJIKU (掛け軸) SILK CALLIGRAPHY WALL SCROLL
    const kakejikuGroup = new THREE.Group();
    kakejikuGroup.position.set(0, 3.2, -2.3);

    const kCanvas = document.createElement('canvas');
    kCanvas.width = 256;
    kCanvas.height = 512;
    const kctx = kCanvas.getContext('2d');
    kctx.fillStyle = '#3a4454';
    kctx.fillRect(0, 0, 256, 512);
    kctx.fillStyle = '#f8f3e6';
    kctx.fillRect(24, 60, 208, 380);
    kctx.fillStyle = '#222';
    kctx.font = 'bold 28px serif';
    kctx.textAlign = 'center';
    kctx.fillText('虚心坦懐', 128, 120);
    kctx.font = '16px serif';
    kctx.fillStyle = '#666';
    kctx.fillText('OPEN-MINDED CRAFT', 128, 150);
    kctx.fillStyle = 'rgba(40,40,40,0.7)';
    kctx.beginPath();
    kctx.moveTo(40, 380);
    kctx.lineTo(128, 240);
    kctx.lineTo(216, 380);
    kctx.fill();
    kctx.fillStyle = '#961a14';
    kctx.fillRect(116, 400, 24, 24);

    const kakejikuMat = new THREE.MeshStandardMaterial({
      map: new THREE.CanvasTexture(kCanvas),
      roughness: 0.85
    });
    const kakejiku = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.8), kakejikuMat);
    kakejikuGroup.add(kakejiku);

    const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.5, 10), darkCedarMat);
    roller.rotation.z = Math.PI / 2;
    roller.position.y = -1.4;
    kakejikuGroup.add(roller);

    atelierGroup.add(kakejikuGroup);

    // 5. 4-Panel Gold Foil Folding Screen (Byōbu 屏風)
    const byobuGroup = new THREE.Group();
    byobuGroup.position.set(0, 0, -2.1);
    const panelW = 1.35;
    const panelH = 3.6;
    for (let i = 0; i < 4; i++) {
      const angle = (i % 2 === 0 ? 1 : -1) * 0.18;
      const panel = new THREE.Mesh(new THREE.BoxGeometry(panelW, panelH, 0.04), goldLeafMat);
      panel.position.set(-2.0 + (i * panelW * 0.98), panelH / 2, 0);
      panel.rotation.y = angle;
      panel.castShadow = true;
      byobuGroup.add(panel);
    }
    atelierGroup.add(byobuGroup);

    // 6. Cedar Desk Top & Legs
    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.18, 2.6), darkCedarMat);
    deskTop.position.set(0, 1.4, 0);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    atelierGroup.add(deskTop);

    const legGeo = new THREE.BoxGeometry(0.16, 1.4, 0.16);
    [[-2.2, -1.1], [2.2, -1.1], [-2.2, 1.1], [2.2, 1.1]].forEach(([x, z]) => {
      const leg = new THREE.Mesh(legGeo, darkCedarMat);
      leg.position.set(x, 0.7, z);
      atelierGroup.add(leg);
    });

    // 7. SUB-SECTION 1 (WHO I AM // 概要): Unrolled Washi Scroll with Philosophy Calligraphy
    const scrollCanvas = document.createElement('canvas');
    scrollCanvas.width = 512;
    scrollCanvas.height = 256;
    const sctx = scrollCanvas.getContext('2d');
    sctx.fillStyle = '#f8f2e4';
    sctx.fillRect(0, 0, 512, 256);
    sctx.strokeStyle = '#c5ba8e';
    sctx.lineWidth = 6;
    sctx.strokeRect(8, 8, 496, 240);
    sctx.font = 'bold 34px serif';
    sctx.fillStyle = '#1c1916';
    sctx.fillText('知行合一 // WHO I AM', 32, 60);
    sctx.font = 'bold 22px serif';
    sctx.fillStyle = '#4a423a';
    sctx.fillText('Profile Summary & Systems Philosophy', 32, 104);
    sctx.font = '18px monospace';
    sctx.fillStyle = '#6a6052';
    sctx.fillText('VIT Pune CSE (AI & ML) // Nihar Mehakare', 32, 145);
    sctx.fillStyle = '#961a14';
    sctx.font = 'bold 20px serif';
    sctx.fillText('【印】EXPLORE WHO I AM // 概要を読む →', 32, 205);

    const scrollMesh = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.02, 1.5), new THREE.MeshStandardMaterial({
      map: new THREE.CanvasTexture(scrollCanvas),
      roughness: 0.88
    }));
    scrollMesh.position.set(0, 1.5, 0.1);
    scrollMesh.userData = { targetChapter: 'about', subSection: 'journal-sec-1', label: 'Who I Am // 概要 (Profile & Philosophy)' };
    atelierGroup.add(scrollMesh);
    this.clickableObjects.push(scrollMesh);

    // Brass Paperweights (Bunchin 文鎮)
    const bunchinMat = new THREE.MeshStandardMaterial({ color: 0xcca033, metalness: 0.9, roughness: 0.2 });
    [-0.65, 0.65].forEach(oz => {
      const bunchin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.03, 0.08), bunchinMat);
      bunchin.position.set(0, 1.52, 0.1 + oz);
      atelierGroup.add(bunchin);
    });

    // 8. SUB-SECTION 2 (SKILLS ARSENAL // 技能): Katana-kake / Weapon & Scroll Stand (刀掛け・巻物棚)
    const skillsRackGroup = new THREE.Group();
    skillsRackGroup.position.set(-2.6, 0.17, 0.4);
    skillsRackGroup.rotation.y = 0.22;

    // Upright curved lacquer stands
    const rackWoodMat = new THREE.MeshStandardMaterial({ color: 0x221812, roughness: 0.6, metalness: 0.1 });
    const rackBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.6), rackWoodMat);
    skillsRackGroup.add(rackBase);

    [-0.55, 0.55].forEach(ox => {
      const armCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(ox, 0.04, -0.15),
        new THREE.Vector3(ox, 0.45, 0),
        new THREE.Vector3(ox, 0.95, -0.05),
        new THREE.Vector3(ox, 1.35, -0.18)
      ]);
      const arm = new THREE.Mesh(new THREE.TubeGeometry(armCurve, 16, 0.045, 6, false), rackWoodMat);
      arm.castShadow = true;
      skillsRackGroup.add(arm);
    });

    // 3 Tiered Glowing Scroll Canisters (Languages, AI/ML, Backend & Cloud)
    const scrollTiers = [
      { y: 0.45, z: 0.04, color: 0xd4af37, label: 'LANGUAGES: Java · Python · SQL · C++', cap: 0xd4af37 },
      { y: 0.85, z: -0.02, color: 0xa82820, label: 'AI & ML: PyTorch · RAG · LLMs · Vision', cap: 0xa82820 },
      { y: 1.25, z: -0.12, color: 0x2a9d8f, label: 'SYSTEMS: Spring Boot · Solana · Cloud', cap: 0x2a9d8f }
    ];

    scrollTiers.forEach((tier) => {
      const tubeMat = new THREE.MeshStandardMaterial({ color: 0x1a1614, roughness: 0.3, metalness: 0.2 });
      const capMat = new THREE.MeshStandardMaterial({ color: tier.cap, roughness: 0.35, metalness: 0.8 });
      const bandMat = new THREE.MeshBasicMaterial({ color: tier.color });

      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 1.45, 12), tubeMat);
      tube.rotation.z = Math.PI / 2;
      tube.position.set(0, tier.y, tier.z);
      skillsRackGroup.add(tube);

      [-0.72, 0.72].forEach(cx => {
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.08, 12), capMat);
        cap.rotation.z = Math.PI / 2;
        cap.position.set(cx, tier.y, tier.z);
        skillsRackGroup.add(cap);
      });

      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.22, 12), bandMat);
      band.rotation.z = Math.PI / 2;
      band.position.set(0, tier.y, tier.z);
      skillsRackGroup.add(band);
    });

    // Washi Calligraphy Plaque for Skills Stand
    const rackCanvas = document.createElement('canvas');
    rackCanvas.width = 256;
    rackCanvas.height = 96;
    const rctx = rackCanvas.getContext('2d');
    rctx.fillStyle = '#f8f2e4';
    rctx.fillRect(0, 0, 256, 96);
    rctx.strokeStyle = '#961a14';
    rctx.lineWidth = 4;
    rctx.strokeRect(4, 4, 248, 88);
    rctx.fillStyle = '#1c1916';
    rctx.font = 'bold 28px serif';
    rctx.textAlign = 'center';
    rctx.fillText('技能 // SKILLS ARSENAL', 128, 42);
    rctx.font = 'bold 14px monospace';
    rctx.fillStyle = '#961a14';
    rctx.fillText('CLICK TO INSPECT MATRIX [ ↗ ]', 128, 72);

    const rackSignMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.85, 0.32),
      new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(rackCanvas), roughness: 0.9 })
    );
    rackSignMesh.position.set(0, 1.55, -0.15);
    skillsRackGroup.add(rackSignMesh);

    skillsRackGroup.userData = {
      targetChapter: 'about',
      subSection: 'journal-sec-3',
      label: 'Skills Arsenal // 技能 (Languages, AI & Systems)'
    };
    atelierGroup.add(skillsRackGroup);
    this.clickableObjects.push(rackSignMesh, rackBase);

    // 9. SUB-SECTION 3 (ACADEMICS & EDUCATION // 学歴): Tokonoma Alcove Diploma Stele (床の間・免状座)
    const eduAlcoveGroup = new THREE.Group();
    eduAlcoveGroup.position.set(2.5, 0.17, -1.8);
    eduAlcoveGroup.rotation.y = -0.32;

    // Raised polished cedar dais
    const daisMat = new THREE.MeshStandardMaterial({ color: 0x2e2017, roughness: 0.7 });
    const dais = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.16, 1.1), daisMat);
    dais.position.y = 0.08;
    dais.receiveShadow = true;
    eduAlcoveGroup.add(dais);

    // Granite & Gold Leaf Diploma Tablet
    const eduCanvas = document.createElement('canvas');
    eduCanvas.width = 256;
    eduCanvas.height = 340;
    const ectx = eduCanvas.getContext('2d');
    ectx.fillStyle = '#1d1916';
    ectx.fillRect(0, 0, 256, 340);
    ectx.strokeStyle = '#d4af37';
    ectx.lineWidth = 6;
    ectx.strokeRect(8, 8, 240, 324);
    ectx.fillStyle = '#d4af37';
    ectx.font = 'bold 30px serif';
    ectx.textAlign = 'center';
    ectx.fillText('学歴 // CREDENTIALS', 128, 56);
    ectx.fillStyle = '#ffffff';
    ectx.font = 'bold 18px serif';
    ectx.fillText('VIT PUNE', 128, 105);
    ectx.font = '14px serif';
    ectx.fillStyle = '#c5ba8e';
    ectx.fillText('B.Tech CSE (AI & ML)', 128, 138);
    ectx.font = 'bold 22px monospace';
    ectx.fillStyle = '#ffcc00';
    ectx.fillText('9.13 CGPA', 128, 195);
    ectx.font = '13px monospace';
    ectx.fillStyle = '#9e9585';
    ectx.fillText('TOP PERCENTILE', 128, 225);
    ectx.fillStyle = '#961a14';
    ectx.font = 'bold 22px serif';
    ectx.fillText('【優等免状】', 128, 280);

    const eduTablet = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 1.35, 0.08),
      new THREE.MeshStandardMaterial({
        map: new THREE.CanvasTexture(eduCanvas),
        roughness: 0.4,
        metalness: 0.3
      })
    );
    eduTablet.position.set(0, 0.82, 0);
    eduTablet.castShadow = true;
    eduAlcoveGroup.add(eduTablet);

    // Celadon porcelain vase with cherry blossom branch
    const vaseMat = new THREE.MeshStandardMaterial({ color: 0x81b29a, roughness: 0.2, metalness: 0.1 });
    const vase = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.08, 0.45, 12), vaseMat);
    vase.position.set(0.55, 0.38, 0.25);
    eduAlcoveGroup.add(vase);

    const branchCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.55, 0.6, 0.25),
      new THREE.Vector3(0.68, 0.95, 0.3),
      new THREE.Vector3(0.6, 1.25, 0.22)
    ]);
    const branch = new THREE.Mesh(new THREE.TubeGeometry(branchCurve, 10, 0.02, 6, false), darkCedarMat);
    eduAlcoveGroup.add(branch);

    const blossomMat = new THREE.MeshStandardMaterial({ color: 0xf2a7b3, roughness: 0.8 });
    [[0.68, 0.95, 0.3], [0.6, 1.25, 0.22], [0.64, 1.1, 0.26]].forEach(([bx, by, bz]) => {
      const blo = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), blossomMat);
      blo.position.set(bx, by, bz);
      eduAlcoveGroup.add(blo);
    });

    eduAlcoveGroup.userData = {
      targetChapter: 'about',
      subSection: 'journal-sec-2',
      label: 'Academic Credentials // 学歴 (VIT Pune 9.13 CGPA)'
    };
    atelierGroup.add(eduAlcoveGroup);
    this.clickableObjects.push(eduTablet, dais);

    // 10. SUB-SECTION 4 (LEADERSHIP & MANIFESTO // 理念): Artisan Bronze Hanko Seal Pedestal (印章台・理念碑)
    const manifestoPedestal = new THREE.Group();
    manifestoPedestal.position.set(2.4, 0.17, 0.8);
    manifestoPedestal.rotation.y = -0.25;

    // Octagonal red lacquer pedestal
    const pedestalMat = new THREE.MeshStandardMaterial({ color: 0x781216, roughness: 0.35, metalness: 0.2 });
    const pedCol = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 1.05, 8), pedestalMat);
    pedCol.position.y = 0.525;
    pedCol.castShadow = true;
    manifestoPedestal.add(pedCol);

    // Sculpted Bronze Hanko artisan seal stamp (印)
    const hankoGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.4, 8);
    const hankoMesh = new THREE.Mesh(hankoGeo, bronzeMat);
    hankoMesh.position.set(0, 1.25, 0);
    hankoMesh.castShadow = true;
    manifestoPedestal.add(hankoMesh);

    // Silk cushion under seal
    const cushionMat = new THREE.MeshStandardMaterial({ color: 0xcca033, roughness: 0.75 });
    const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.06, 0.45), cushionMat);
    cushion.position.set(0, 1.07, 0);
    manifestoPedestal.add(cushion);

    // Inscribed Washi Tablet with Leadership & Manifesto
    const manCanvas = document.createElement('canvas');
    manCanvas.width = 256;
    manCanvas.height = 160;
    const mctx = manCanvas.getContext('2d');
    mctx.fillStyle = '#f8f2e4';
    mctx.fillRect(0, 0, 256, 160);
    mctx.strokeStyle = '#961a14';
    mctx.lineWidth = 4;
    mctx.strokeRect(4, 4, 248, 152);
    mctx.fillStyle = '#1c1916';
    mctx.font = 'bold 22px serif';
    mctx.textAlign = 'center';
    mctx.fillText('統率・理念 // LEADERSHIP', 128, 38);
    mctx.font = '14px serif';
    mctx.fillStyle = '#4a423a';
    mctx.fillText('SIH Finalist · Industry AI Team Lead', 128, 72);
    mctx.fillText('Engineering Manifesto & Mentorship', 128, 102);
    mctx.font = 'bold 13px monospace';
    mctx.fillStyle = '#961a14';
    mctx.fillText('READ MANIFESTO [ ↗ ]', 128, 138);

    const manSignMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.75, 0.48),
      new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(manCanvas), roughness: 0.9 })
    );
    manSignMesh.position.set(0, 0.58, 0.49);
    manifestoPedestal.add(manSignMesh);

    // Eternal warm oil lamp flame light
    const lampLight = new THREE.PointLight(0xffa834, 1.2, 5, 1.5);
    lampLight.position.set(0, 1.5, 0);
    manifestoPedestal.add(lampLight);
    this.candleLights.push(lampLight);

    manifestoPedestal.userData = {
      targetChapter: 'about',
      subSection: 'journal-sec-4',
      label: 'Leadership & Manifesto // 理念 (AI Lead & SIH Finalist)'
    };
    atelierGroup.add(manifestoPedestal);
    this.clickableObjects.push(manSignMesh, hankoMesh);

    // 11. Miniature Pine Bonsai Tree in Glazed Ceramic Bowl
    const bonsaiGroup = new THREE.Group();
    bonsaiGroup.position.set(1.6, 1.5, -0.6);

    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.32, 0.2, 16), ceramicMat);
    pot.position.y = 0.1;
    bonsaiGroup.add(pot);

    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.2, 0),
      new THREE.Vector3(-0.15, 0.6, 0.1),
      new THREE.Vector3(0.18, 1.0, -0.05),
      new THREE.Vector3(0.05, 1.35, 0)
    ]);
    const trunkMesh = new THREE.Mesh(new THREE.TubeGeometry(trunkCurve, 20, 0.065, 8, false), darkCedarMat);
    bonsaiGroup.add(trunkMesh);

    const pineGreenMat = new THREE.MeshStandardMaterial({ color: 0x1d4a2d, roughness: 0.9 });
    const foliageCoords = [[-0.2, 0.85, 0.12, 0.28], [0.25, 1.1, -0.08, 0.34], [0.05, 1.45, 0, 0.42]];
    foliageCoords.forEach(([x, y, z, rad]) => {
      const foliage = new THREE.Mesh(new THREE.SphereGeometry(rad, 12, 8), pineGreenMat);
      foliage.scale.set(1.4, 0.6, 1.2);
      foliage.position.set(x, y, z);
      bonsaiGroup.add(foliage);
    });
    bonsaiGroup.userData = { targetChapter: 'about', subSection: 'journal-sec-1', label: 'Inspect Bonsai & Philosophy // 禅' };
    atelierGroup.add(bonsaiGroup);
    this.clickableObjects.push(bonsaiGroup);

    // 12. Ceramic Brush Rest (Fudeoki), Fude Brush & Suzuri Inkstone
    const rest = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.5, 3), ceramicMat);
    rest.rotation.z = Math.PI / 2;
    rest.position.set(-0.9, 1.54, 0.7);
    atelierGroup.add(rest);

    const brush = new THREE.Group();
    brush.position.set(-0.9, 1.58, 0.7);
    const brushHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.7, 8), bambooMat);
    brushHandle.rotation.x = Math.PI / 2;
    brush.add(brushHandle);
    const brushTip = new THREE.Mesh(new THREE.ConeGeometry(0.025, 0.12, 8), inkMat);
    brushTip.rotation.x = -Math.PI / 2;
    brushTip.position.z = 0.4;
    brush.add(brushTip);
    atelierGroup.add(brush);

    const suzuri = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.85), inkMat);
    suzuri.position.set(-1.2, 1.53, 0.35);
    atelierGroup.add(suzuri);

    // Bronze Incense Burner (Kōro 香炉) with Pierced Lid
    const koro = new THREE.Group();
    koro.position.set(-1.7, 1.5, 0.7);
    const koroBowl = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 8), bronzeMat);
    koroBowl.position.y = 0.1;
    koro.add(koroBowl);
    const koroLid = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.06, 12), bronzeMat);
    koroLid.position.y = 0.24;
    koro.add(koroLid);
    atelierGroup.add(koro);

    // Ceramic Matcha Teacup (Chawan) & Bamboo Whisk (Chasen)
    const teacup = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.10, 0.18, 12), ceramicMat);
    teacup.position.set(0.9, 1.58, 0.7);
    atelierGroup.add(teacup);

    const matchaLiquid = new THREE.Mesh(new THREE.CircleGeometry(0.12, 12), new THREE.MeshBasicMaterial({ color: 0x4a7c2a }));
    matchaLiquid.rotation.x = -Math.PI / 2;
    matchaLiquid.position.set(0.9, 1.66, 0.7);
    atelierGroup.add(matchaLiquid);

    const chasen = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.14, 8), bambooMat);
    chasen.position.set(1.15, 1.58, 0.75);
    atelierGroup.add(chasen);

    // Andon Lantern
    const andon = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.1, 0.65), new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xffaa44,
      emissiveIntensity: 0.82
    }));
    andon.position.set(-1.8, 2.05, -0.7);
    atelierGroup.add(andon);

    const andonLight = new THREE.PointLight(0xff9922, 1.5, 7, 1.4);
    andonLight.position.set(-1.8, 2.05, -0.7);
    atelierGroup.add(andonLight);
    this.candleLights.push(andonLight);

    // 13. Floating 3D Kanji Sculptures (`知`, `創`, `道`, `技`)
    const kanjiChars = ['知', '創', '道', '技'];
    kanjiChars.forEach((k, idx) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      ctx.font = 'bold 76px serif';
      ctx.fillStyle = '#961a14';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(k, 64, 64);

      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, opacity: 0.9 }));
      sprite.position.set(-1.5 + (idx * 1.0), 2.8 + (idx % 2 * 0.3), -0.2);
      sprite.scale.set(0.85, 0.85, 1);
      atelierGroup.add(sprite);
      this.floatingKanjis.push(sprite);
    });

    this.scene.add(atelierGroup);
  }

  /* ============================================
     ZONE 2: HANGING CLOTHESLINE BLUEPRINT GALLERY (Projects)
     ============================================ */
  buildClotheslineGallery() {
    const galleryGroup = new THREE.Group();
    galleryGroup.position.set(28, 0, -16);

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3a2c20, roughness: 0.85 });
    const pegMat = new THREE.MeshStandardMaterial({ color: 0xc49a45, roughness: 0.5 });
    const ribbonMat = new THREE.MeshStandardMaterial({ color: 0x961a14, roughness: 0.6, side: THREE.DoubleSide });

    // 1. Two Wooden Upright Masts with Cross Braces
    const mastGeo = new THREE.CylinderGeometry(0.12, 0.16, 5.0, 12);
    const leftMast = new THREE.Mesh(mastGeo, woodMat);
    leftMast.position.set(-4.5, 2.5, 0);
    leftMast.castShadow = true;
    galleryGroup.add(leftMast);

    const rightMast = new THREE.Mesh(mastGeo, woodMat);
    rightMast.position.set(4.5, 2.5, 0);
    rightMast.castShadow = true;
    galleryGroup.add(rightMast);

    // Fluttering Vermilion Silk Ribbons tied to Masts
    const createRibbon = (x, y) => {
      const rib = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.8), ribbonMat);
      rib.position.set(x, y, 0.15);
      galleryGroup.add(rib);
      this.ribbons.push(rib);
    };
    createRibbon(-4.5, 4.0);
    createRibbon(4.5, 4.0);

    // Hanging Chōchin Paper Lantern on Mast
    const chochin = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.28, 0.7, 12), new THREE.MeshStandardMaterial({
      color: 0xfff0dd,
      emissive: 0xffaa44,
      emissiveIntensity: 0.8
    }));
    chochin.position.set(-4.5, 4.3, 0.4);
    galleryGroup.add(chochin);

    // 2. Catenary Sagging Rope Curve
    const ropeCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-4.5, 4.2, 0),
      new THREE.Vector3(0, 3.4, 0),
      new THREE.Vector3(4.5, 4.2, 0)
    );
    const ropeGeo = new THREE.TubeGeometry(ropeCurve, 40, 0.024, 8, false);
    const ropeMesh = new THREE.Mesh(ropeGeo, new THREE.MeshStandardMaterial({ color: 0xd8c29d, roughness: 0.9 }));
    galleryGroup.add(ropeMesh);

    // 3. 4 Detailed Architectural Blueprints with Technical Schematics
    const projects = [
      { id: 'architech', num: 'PRJ_01', title: 'ARCHITECH', desc: 'AST Knowledge Graph', kanji: '構' },
      { id: 'eventix', num: 'PRJ_02', title: 'EVENTIX', desc: 'Solana NFT Protocol', kanji: '券' },
      { id: 'agrisaksham', num: 'PRJ_03', title: 'AGRISAKSHAM', desc: 'Crop Pathology Vision', kanji: '農' },
      { id: 'agentswarm', num: 'PRJ_04', title: 'AGENT SWARM', desc: 'Autonomous Reasoning', kanji: '群' }
    ];

    projects.forEach((prj, i) => {
      const u = (i + 1) / 5;
      const pointOnRope = ropeCurve.getPoint(u);

      const canvasGroup = new THREE.Group();
      canvasGroup.position.copy(pointOnRope);

      // Wooden Clothespins (2 clips per sheet)
      [-0.35, 0.35].forEach(ox => {
        const peg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.07), pegMat);
        peg.position.set(ox, 0, 0);
        canvasGroup.add(peg);
      });

      // Canvas Texture Rendering Blueprint Drawing
      const c = document.createElement('canvas');
      c.width = 384;
      c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#faf6ed';
      ctx.fillRect(0, 0, 384, 512);

      // Blueprint Millimeter Grid
      ctx.strokeStyle = 'rgba(26, 26, 26, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 384; x += 24) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 512); ctx.stroke(); }
      for (let y = 0; y < 512; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(384, y); ctx.stroke(); }

      ctx.fillStyle = '#961a14';
      ctx.font = 'bold 22px monospace';
      ctx.fillText(prj.num, 24, 48);

      // Japanese Corner Seal
      ctx.strokeStyle = '#961a14';
      ctx.lineWidth = 2;
      ctx.strokeRect(310, 24, 48, 48);
      ctx.fillStyle = '#961a14';
      ctx.font = 'bold 26px serif';
      ctx.textAlign = 'center';
      ctx.fillText(prj.kanji, 334, 58);
      ctx.textAlign = 'left';

      ctx.fillStyle = '#1c1916';
      ctx.font = '900 32px serif';
      ctx.fillText(prj.title, 24, 110);

      ctx.font = '16px monospace';
      ctx.fillStyle = '#666';
      ctx.fillText(prj.desc, 24, 150);

      // Technical Schematic Custom Diagram for Each Project
      ctx.strokeStyle = '#961a14';
      ctx.lineWidth = 2;
      ctx.strokeRect(32, 190, 320, 190);

      if (prj.id === 'architech') {
        ctx.fillStyle = '#1c1916';
        ctx.beginPath();
        ctx.arc(192, 230, 14, 0, Math.PI * 2);
        ctx.arc(120, 300, 10, 0, Math.PI * 2);
        ctx.arc(264, 300, 10, 0, Math.PI * 2);
        ctx.arc(80, 350, 8, 0, Math.PI * 2);
        ctx.arc(160, 350, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(192, 230); ctx.lineTo(120, 300);
        ctx.moveTo(192, 230); ctx.lineTo(264, 300);
        ctx.moveTo(120, 300); ctx.lineTo(80, 350);
        ctx.moveTo(120, 300); ctx.lineTo(160, 350);
        ctx.stroke();
      } else if (prj.id === 'eventix') {
        ctx.beginPath();
        ctx.moveTo(50, 360);
        ctx.quadraticCurveTo(200, 350, 320, 220);
        ctx.stroke();
        ctx.font = '12px monospace';
        ctx.fillStyle = '#961a14';
        ctx.fillText('SOL::DEVNET 0x7e8a...3f', 60, 230);
      } else if (prj.id === 'agrisaksham') {
        ctx.strokeStyle = '#4f772d';
        ctx.strokeRect(90, 230, 204, 120);
        ctx.beginPath();
        ctx.arc(192, 290, 36, 0, Math.PI * 2);
        ctx.stroke();
        ctx.font = '12px monospace';
        ctx.fillStyle = '#4f772d';
        ctx.fillText('CONFIDENCE: 98.4%', 110, 250);
      } else {
        ctx.beginPath();
        ctx.arc(192, 285, 50, 0, Math.PI * 2);
        ctx.stroke();
        for (let a = 0; a < 6; a++) {
          const ang = (a * Math.PI) / 3;
          ctx.fillStyle = '#961a14';
          ctx.beginPath();
          ctx.arc(192 + Math.cos(ang) * 50, 285 + Math.sin(ang) * 50, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.fillStyle = '#1c1916';
      ctx.font = 'bold 16px monospace';
      ctx.fillText('INSPECT [ ↗ ]', 24, 440);

      const canvasTexture = new THREE.CanvasTexture(c);
      const sheetGeo = new THREE.BoxGeometry(1.25, 1.68, 0.025);
      const sheetMat = new THREE.MeshStandardMaterial({
        map: canvasTexture,
        roughness: 0.9,
        side: THREE.DoubleSide
      });
      const sheetMesh = new THREE.Mesh(sheetGeo, sheetMat);
      sheetMesh.position.y = -0.88;
      sheetMesh.castShadow = true;
      sheetMesh.userData = { targetChapter: 'projects', targetProject: prj.id, label: `Inspect ${prj.title}` };

      canvasGroup.add(sheetMesh);
      galleryGroup.add(canvasGroup);

      this.hangingCanvases.push({
        group: canvasGroup,
        baseAngle: (i % 2 === 0 ? 1 : -1) * 0.04,
        phase: i * 1.2
      });
      this.clickableObjects.push(sheetMesh);
    });

    this.scene.add(galleryGroup);
  }

  /* ============================================
     ZONE: SPOTIFY HIGH-FIDELITY SOUND PAVILION (音響閣・音楽神社)
     Aesthetic: Audiophile Hi-Fi, Vacuum Tube Glow, Vinyl Grooves, Sukiya Timber
     ============================================ */
  buildSpotifySoundPavilion() {
    const spotifyGroup = new THREE.Group();
    spotifyGroup.position.set(-42, 0, -29);

    const hinokiPBR = this.getHinokiWoodTexture();
    const walnutPBR = this.getWalnutWoodTexture();
    const speakerGrillTex = this.getSpeakerGrillTexture();
    const brushedBrassTex = this.getBrushedMetalTexture('brass');
    const brushedSteelTex = this.getBrushedMetalTexture('steel');
    const vinylPBR = this.getVinylRecordTexture();
    const roofTilesTex = this.getJapaneseRoofTileTexture();

    const hinokiMat = new THREE.MeshStandardMaterial({
      map: hinokiPBR.map,
      bumpMap: hinokiPBR.bumpMap,
      bumpScale: 0.05,
      roughness: 0.62
    });
    const darkCedarMat = new THREE.MeshStandardMaterial({
      map: hinokiPBR.map,
      color: 0x3d2c20,
      bumpMap: hinokiPBR.bumpMap,
      bumpScale: 0.04,
      roughness: 0.74
    });
    const roofSlateMat = new THREE.MeshStandardMaterial({
      map: roofTilesTex.map,
      roughness: 0.65
    });
    const brassMat = new THREE.MeshStandardMaterial({
      map: brushedBrassTex,
      color: 0xe6bb5e,
      metalness: 0.88,
      roughness: 0.22
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.18
    });
    const blackLacquerMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0c,
      roughness: 0.12,
      metalness: 0.5
    });
    const walnutMat = new THREE.MeshStandardMaterial({
      map: walnutPBR.map,
      bumpMap: walnutPBR.bumpMap,
      bumpScale: 0.06,
      roughness: 0.40
    });
    const speakerGrillMat = new THREE.MeshStandardMaterial({
      map: speakerGrillTex,
      roughness: 0.88
    });
    const speakerConeMat = new THREE.MeshStandardMaterial({
      map: brushedSteelTex,
      color: 0x18181b,
      roughness: 0.35,
      metalness: 0.6
    });
    const spotifyGreenMat = new THREE.MeshStandardMaterial({
      color: 0x1db954,
      emissive: 0x1db954,
      emissiveIntensity: 1.25,
      roughness: 0.22
    });

    // 1. Sukiya Architectural Timber Platform & Floor
    const stage = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.22, 5.6), hinokiMat);
    stage.position.y = 0.11;
    stage.receiveShadow = true;
    spotifyGroup.add(stage);

    // Hinoki acoustic deck planks
    for (let x = -3.1; x <= 3.1; x += 0.45) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 5.45), hinokiMat);
      plank.position.set(x, 0.225, 0);
      plank.receiveShadow = true;
      spotifyGroup.add(plank);
    }

    // 4 Corner Cedar Pillars
    const pillarPositions = [[-3.0, -2.5], [3.0, -2.5], [-3.0, 2.5], [3.0, 2.5]];
    pillarPositions.forEach(([px, pz]) => {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 4.4, 8), darkCedarMat);
      pillar.position.set(px, 2.2, pz);
      pillar.castShadow = true;
      spotifyGroup.add(pillar);

      // Stone plinth base
      const pBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.24, 8), new THREE.MeshStandardMaterial({ color: 0x5a544b, roughness: 0.92 }));
      pBase.position.set(px, 0.12, pz);
      spotifyGroup.add(pBase);
    });

    // Upper Tie Beams & Brackets
    const bBeam = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.18, 0.18), darkCedarMat);
    bBeam.position.set(0, 4.3, -2.5);
    spotifyGroup.add(bBeam);
    const fBeam = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.18, 0.18), darkCedarMat);
    fBeam.position.set(0, 4.3, 2.5);
    spotifyGroup.add(fBeam);
    const lBeam = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 5.2), darkCedarMat);
    lBeam.position.set(-3.0, 4.3, 0);
    spotifyGroup.add(lBeam);
    const rBeam = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 5.2), darkCedarMat);
    rBeam.position.set(3.0, 4.3, 0);
    spotifyGroup.add(rBeam);

    // Curved Hipped Sukiya Roof with Turned-Up Eaves
    const roof = new THREE.Mesh(new THREE.ConeGeometry(5.2, 1.6, 4), roofSlateMat);
    roof.position.set(0, 5.1, 0);
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(1.25, 0.85, 1.05);
    roof.castShadow = true;
    spotifyGroup.add(roof);

    // Weathered Copper Ridge Cap with Spotify Emerald Inlay
    const ridgeCap = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.1, 0.35), darkCedarMat);
    ridgeCap.position.set(0, 5.85, 0);
    spotifyGroup.add(ridgeCap);

    // Dual Hanging Spotify Chōchin Lanterns (`音` SOUND and `律` RHYTHM)
    const createSpotifyLantern = (lx, lz, kanji, title) => {
      const lGroup = new THREE.Group();
      lGroup.position.set(lx, 3.4, lz);

      const lCanvas = document.createElement('canvas');
      lCanvas.width = 128;
      lCanvas.height = 256;
      const lctx = lCanvas.getContext('2d');
      lctx.fillStyle = '#faf4ea';
      lctx.fillRect(0, 0, 128, 256);
      lctx.strokeStyle = '#1db954';
      lctx.lineWidth = 6;
      lctx.strokeRect(6, 6, 116, 244);
      lctx.fillStyle = '#1db954';
      lctx.font = 'bold 84px serif';
      lctx.textAlign = 'center';
      lctx.textBaseline = 'middle';
      lctx.fillText(kanji, 64, 110);
      lctx.fillStyle = '#1c1916';
      lctx.font = 'bold 20px monospace';
      lctx.fillText(title, 64, 185);

      const lMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.28, 0.75, 12),
        new THREE.MeshStandardMaterial({
          map: new THREE.CanvasTexture(lCanvas),
          roughness: 0.8,
          emissive: 0x1db954,
          emissiveIntensity: 0.45
        })
      );
      lGroup.add(lMesh);

      // Bronze caps
      [-0.4, 0.4].forEach(cy => {
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.05, 12), darkCedarMat);
        cap.position.y = cy;
        lGroup.add(cap);
      });

      // Spotify Green Point Light
      const spotLight = new THREE.PointLight(0x1db954, 1.8, 8, 1.4);
      spotLight.position.set(0, 0, 0);
      lGroup.add(spotLight);
      this.candleLights.push(spotLight);

      return lGroup;
    };
    spotifyGroup.add(createSpotifyLantern(-2.6, 2.5, '音', 'SOUND'));
    spotifyGroup.add(createSpotifyLantern(2.6, 2.5, '律', 'BEAT'));

    // 2. Heavy Walnut Audio Credenza Console Table with Cathedral Grain
    const credenza = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.18, 2.2), walnutMat);
    credenza.position.set(0, 1.35, 0);
    credenza.castShadow = true;
    credenza.receiveShadow = true;
    spotifyGroup.add(credenza);

    const cLegGeo = new THREE.BoxGeometry(0.16, 1.35, 0.16);
    [[-2.0, -0.9], [2.0, -0.9], [-2.0, 0.9], [2.0, 0.9]].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(cLegGeo, walnutMat);
      leg.position.set(lx, 0.675, lz);
      spotifyGroup.add(leg);
    });

    // 3. HIGH-END AUDIOPHILE VINYL TURNTABLE (レコードプレーヤー)
    const turntableGroup = new THREE.Group();
    turntableGroup.position.set(-0.85, 1.44, 0);

    // Gloss piano-black lacquered chassis with bevel
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.12, 1.35), blackLacquerMat);
    plinth.position.y = 0.06;
    plinth.castShadow = true;
    turntableGroup.add(plinth);

    // 4 Brass Vibration-Damping Feet
    [[-0.72, -0.55], [0.72, -0.55], [-0.72, 0.55], [0.72, 0.55]].forEach(([fx, fz]) => {
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.06, 12), brassMat);
      foot.position.set(fx, 0, fz);
      turntableGroup.add(foot);
    });

    // Heavy Spun-Brass Platter
    const platter = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.04, 32), brassMat);
    platter.position.set(-0.18, 0.14, 0);
    turntableGroup.add(platter);

    // Ultra-High Fidelity Anisotropic Vinyl Record (1024x1024 Micro-Grooves & Gold Trim)
    const vinylBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.52, 0.52, 0.015, 48),
      new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.22, metalness: 0.4 })
    );
    const vinylTop = new THREE.Mesh(
      new THREE.CircleGeometry(0.518, 48),
      new THREE.MeshStandardMaterial({
        map: vinylPBR.map,
        bumpMap: vinylPBR.bumpMap,
        bumpScale: 0.025,
        roughness: 0.16,
        metalness: 0.38,
        side: THREE.DoubleSide
      })
    );
    vinylTop.rotation.x = -Math.PI / 2;
    vinylTop.position.y = 0.008;
    vinylBase.add(vinylTop);
    vinylBase.position.set(-0.18, 0.165, 0);
    turntableGroup.add(vinylBase);
    this.spinningVinyl = vinylBase;

    // Brass Center Spindle Pin
    const spindle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.06, 12), brassMat);
    spindle.position.set(-0.18, 0.18, 0);
    turntableGroup.add(spindle);

    // Articulated S-shaped Tonearm & Headshell Cartridge
    const armBase = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.10, 0.14, 16), brassMat);
    armBase.position.set(0.52, 0.16, -0.42);
    turntableGroup.add(armBase);

    const tonearmCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.52, 0.22, -0.42),
      new THREE.Vector3(0.48, 0.22, -0.15),
      new THREE.Vector3(0.32, 0.20, 0.05),
      new THREE.Vector3(0.12, 0.18, 0.16)
    ]);
    const tonearmMesh = new THREE.Mesh(new THREE.TubeGeometry(tonearmCurve, 18, 0.012, 8, false), brassMat);
    turntableGroup.add(tonearmMesh);

    // Cartridge & Stylus resting on vinyl outer groove
    const cartridge = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.03, 0.08), goldMat);
    cartridge.position.set(0.12, 0.175, 0.16);
    cartridge.rotation.y = 0.6;
    turntableGroup.add(cartridge);

    // Counterweight at rear of tonearm
    const counterweight = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.08, 12), blackLacquerMat);
    counterweight.rotation.x = Math.PI / 2;
    counterweight.position.set(0.56, 0.22, -0.52);
    turntableGroup.add(counterweight);

    // Power switch & 33/45 RPM speed toggle buttons
    const speedBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.02, 10), brassMat);
    speedBtn.position.set(-0.65, 0.13, 0.52);
    turntableGroup.add(speedBtn);

    turntableGroup.userData = {
      targetChapter: 'spotify',
      targetProject: 'spotify_turntable',
      isTurntable: true,
      label: 'Play Hi-Fi Vinyl // Spotify Pavilion (♫)'
    };
    spotifyGroup.add(turntableGroup);
    this.clickableObjects.push(vinylBase, plinth);

    // 4. GLOWING VACUUM TUBE AMPLIFIER (真空管アンプ)
    const ampGroup = new THREE.Group();
    ampGroup.position.set(1.15, 1.44, 0);

    const ampBody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.26, 1.05), new THREE.MeshStandardMaterial({
      color: 0x221e1a,
      metalness: 0.8,
      roughness: 0.25
    }));
    ampBody.position.y = 0.13;
    ampBody.castShadow = true;
    ampGroup.add(ampBody);

    // Polished Brushed Faceplate
    const faceplate = new THREE.Mesh(new THREE.PlaneGeometry(1.36, 0.22), brassMat);
    faceplate.position.set(0, 0.13, 0.53);
    ampGroup.add(faceplate);

    // Dual Analog Backlit VU Meters
    [-0.32, 0.32].forEach(vx => {
      const vu = new THREE.Mesh(
        new THREE.PlaneGeometry(0.24, 0.14),
        new THREE.MeshBasicMaterial({ color: 0xfff3b0 })
      );
      vu.position.set(vx, 0.14, 0.535);
      ampGroup.add(vu);

      const vuNeedle = new THREE.Mesh(new THREE.PlaneGeometry(0.015, 0.11), new THREE.MeshBasicMaterial({ color: 0x961a14 }));
      vuNeedle.position.set(vx, 0.14, 0.538);
      vuNeedle.rotation.z = -0.35 + (vx > 0 ? 0.7 : 0);
      ampGroup.add(vuNeedle);
    });

    // Heavy Knurled Volume & Tone Knobs
    [-0.45, 0, 0.45].forEach(kx => {
      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 16), brassMat);
      knob.rotation.x = Math.PI / 2;
      knob.position.set(kx, 0.06, 0.54);
      ampGroup.add(knob);
    });

    // 4 Glowing Thermionic Vacuum Tubes (Thermatron Valves)
    [-0.42, -0.14, 0.14, 0.42].forEach((tx, ti) => {
      const tubeSocket = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.05, 12), brassMat);
      tubeSocket.position.set(tx, 0.28, -0.12);
      ampGroup.add(tubeSocket);

      // Glass Envelope
      const glass = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.065, 0.28, 12),
        new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.1,
          metalness: 0.1,
          transparent: true,
          opacity: 0.42
        })
      );
      glass.position.set(tx, 0.42, -0.12);
      ampGroup.add(glass);

      // Glowing Tungsten Filament Coil & Plate
      const filamentMat = new THREE.MeshStandardMaterial({
        color: 0xff5500,
        emissive: 0xff6600,
        emissiveIntensity: 1.8,
        roughness: 0.2
      });
      const filament = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 8), filamentMat);
      filament.position.set(tx, 0.42, -0.12);
      ampGroup.add(filament);

      // Warm Amber Cathode Point Light inside tube
      const tubeLight = new THREE.PointLight(0xff7711, 1.4, 4, 1.6);
      tubeLight.position.set(tx, 0.42, -0.12);
      ampGroup.add(tubeLight);
      this.tubeFilaments.push({ mesh: filament, light: tubeLight, phase: ti * 1.5 });
    });

    // Transformer Housing Cans at back of amplifier
    [-0.35, 0.35].forEach(tx => {
      const trans = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.35, 0.35), darkCedarMat);
      trans.position.set(tx, 0.42, -0.32);
      ampGroup.add(trans);
    });

    spotifyGroup.add(ampGroup);

    // 5. PAIR OF WALNUT AUDIOPHILE STUDIO MONITORS (スピーカー)
    [-2.6, 2.6].forEach((sx, si) => {
      const speakerGroup = new THREE.Group();
      speakerGroup.position.set(sx, 1.44, 0);

      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.15, 0.65), walnutMat);
      cabinet.position.y = 0.58;
      cabinet.castShadow = true;
      speakerGroup.add(cabinet);

      // Acoustic Fabric Front Baffle
      const baffle = new THREE.Mesh(new THREE.PlaneGeometry(0.66, 1.08), speakerGrillMat);
      baffle.position.set(0, 0.58, 0.326);
      speakerGroup.add(baffle);

      // Silk Dome Tweeter
      const tweeter = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), brassMat);
      tweeter.scale.set(1, 1, 0.5);
      tweeter.position.set(0, 0.92, 0.33);
      speakerGroup.add(tweeter);

      // Bass Woofer Cone with Copper Dustcap (Pumps with music beat)
      const wooferFrame = new THREE.Mesh(new THREE.TorusGeometry(0.20, 0.02, 6, 18), darkCedarMat);
      wooferFrame.position.set(0, 0.46, 0.33);
      speakerGroup.add(wooferFrame);

      const wooferCone = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.08, 16), speakerConeMat);
      wooferCone.rotation.x = Math.PI / 2;
      wooferCone.position.set(0, 0.46, 0.31);
      speakerGroup.add(wooferCone);

      const dustCap = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), brassMat);
      dustCap.position.set(0, 0.46, 0.34);
      speakerGroup.add(dustCap);

      this.pulsingWoofers.push({ cone: wooferCone, cap: dustCap, side: si });

      // Bass Reflex Port
      const port = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.05, 12), blackLacquerMat);
      port.rotation.x = Math.PI / 2;
      port.position.set(0, 0.18, 0.33);
      speakerGroup.add(port);

      spotifyGroup.add(speakerGroup);
    });

    // 6. ANIMATED 3D SPOTIFY EQUALIZER BARS (14 Columns in Sound Arc)
    const eqGroup = new THREE.Group();
    eqGroup.position.set(0, 1.44, -1.35);

    const eqCount = 14;
    for (let i = 0; i < eqCount; i++) {
      const x = -1.95 + (i * 0.3);
      const barGeo = new THREE.CylinderGeometry(0.04, 0.045, 1.0, 8);
      const barMesh = new THREE.Mesh(barGeo, spotifyGreenMat);
      barMesh.position.set(x, 0.5, 0);
      barMesh.castShadow = true;
      eqGroup.add(barMesh);

      const topGlow = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshBasicMaterial({ color: 0x1ed760 }));
      topGlow.position.set(x, 1.0, 0);
      eqGroup.add(topGlow);

      this.spotifyEqualizerBars.push({
        mesh: barMesh,
        cap: topGlow,
        x,
        baseScale: 0.3 + (i % 4) * 0.18,
        phase: i * 0.55,
        freqMult: 3.5 + (i % 5) * 1.2
      });
    }
    spotifyGroup.add(eqGroup);

    // 7. FLOATING HOLOGRAPHIC SPOTIFY CREST DISC (空中浮遊ホログラム)
    const holoCanvas = document.createElement('canvas');
    holoCanvas.width = 256;
    holoCanvas.height = 256;
    const hctx = holoCanvas.getContext('2d');
    hctx.clearRect(0, 0, 256, 256);

    // Emerald circle with translucent glow
    hctx.fillStyle = 'rgba(29, 185, 84, 0.88)';
    hctx.beginPath();
    hctx.arc(128, 128, 118, 0, Math.PI * 2);
    hctx.fill();

    // 3 Curved Soundwave Arcs (Official Spotify Iconography)
    hctx.strokeStyle = '#000000';
    hctx.lineCap = 'round';

    hctx.lineWidth = 18;
    hctx.beginPath();
    hctx.arc(128, 175, 100, Math.PI * 1.22, Math.PI * 1.78);
    hctx.stroke();

    hctx.lineWidth = 15;
    hctx.beginPath();
    hctx.arc(128, 170, 75, Math.PI * 1.23, Math.PI * 1.77);
    hctx.stroke();

    hctx.lineWidth = 12;
    hctx.beginPath();
    hctx.arc(128, 165, 50, Math.PI * 1.25, Math.PI * 1.75);
    hctx.stroke();

    const holoTex = new THREE.CanvasTexture(holoCanvas);
    const holoDisc = new THREE.Mesh(
      new THREE.CircleGeometry(0.75, 32),
      new THREE.MeshStandardMaterial({
        map: holoTex,
        transparent: true,
        opacity: 0.92,
        side: THREE.DoubleSide,
        emissive: 0x1db954,
        emissiveIntensity: 0.8
      })
    );
    holoDisc.position.set(0, 3.8, 0);
    spotifyGroup.add(holoDisc);
    this.holographicVinyl = holoDisc;

    // Glowing Orbiting Golden Ring around Hologram
    const holoRing = new THREE.Mesh(
      new THREE.RingGeometry(0.85, 0.92, 32),
      new THREE.MeshBasicMaterial({ color: 0x1ed760, side: THREE.DoubleSide, transparent: true, opacity: 0.75 })
    );
    holoRing.position.set(0, 3.8, 0);
    spotifyGroup.add(holoRing);

    // 8. WOODEN VINYL STORAGE CRATE & DISPLAY SLEEVES
    const crateGroup = new THREE.Group();
    crateGroup.position.set(-2.4, 0.22, 1.8);
    crateGroup.rotation.y = 0.35;

    const crateBox = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.45, 0.85), darkCedarMat);
    crateBox.position.y = 0.225;
    crateGroup.add(crateBox);

    // 3 Curated Album Art Jackets with Procedural Sumi-e Textures
    const createAlbumJacket = (title, subtitle, ox, oz, rotY, bgColor, accentColor) => {
      const aCanvas = document.createElement('canvas');
      aCanvas.width = 256;
      aCanvas.height = 256;
      const actx = aCanvas.getContext('2d');
      actx.fillStyle = bgColor;
      actx.fillRect(0, 0, 256, 256);

      // Artwork elements
      actx.strokeStyle = accentColor;
      actx.lineWidth = 4;
      actx.strokeRect(12, 12, 232, 232);

      actx.fillStyle = accentColor;
      actx.beginPath();
      actx.arc(128, 110, 48, 0, Math.PI * 2);
      actx.fill();

      actx.fillStyle = '#ffffff';
      actx.font = 'bold 20px serif';
      actx.textAlign = 'center';
      actx.fillText(title, 128, 195);
      actx.font = '12px monospace';
      actx.fillStyle = 'rgba(255,255,255,0.85)';
      actx.fillText(subtitle, 128, 220);

      const jacketMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.68, 0.02),
        new THREE.MeshStandardMaterial({
          map: new THREE.CanvasTexture(aCanvas),
          roughness: 0.85
        })
      );
      jacketMesh.position.set(ox, 0.48, oz);
      jacketMesh.rotation.y = rotY;
      jacketMesh.castShadow = true;
      jacketMesh.userData = { targetChapter: 'spotify', label: `Inspect Album: ${title}` };
      this.clickableObjects.push(jacketMesh);
      return jacketMesh;
    };

    crateGroup.add(createAlbumJacket('LO-FI RAIN', 'CHILL CODING // 穏やかな雨', -0.22, 0.05, -0.15, '#1e293b', '#38bdf8'));
    crateGroup.add(createAlbumJacket('CYBERPUNK', 'NIGHT CITY OST // 電脳都市', 0.05, 0.12, 0.05, '#3b0764', '#f43f5e'));
    crateGroup.add(createAlbumJacket('CITY POP', 'MIDNIGHT TOKYO // 都会の夜', 0.28, 0.18, 0.25, '#064e3b', '#10b981'));

    spotifyGroup.add(crateGroup);

    // 9. AUTHENTIC JAPANESE RIN BRONZE SINGING BOWL (鈴)
    const rinGroup = new THREE.Group();
    rinGroup.position.set(1.9, 1.44, 0.7);

    const silkCushion = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.08, 12), new THREE.MeshStandardMaterial({ color: 0x5b21b6, roughness: 0.8 }));
    silkCushion.position.y = 0.04;
    rinGroup.add(silkCushion);

    const singingBowl = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2), brassMat);
    singingBowl.position.y = 0.08;
    singingBowl.rotation.x = Math.PI;
    rinGroup.add(singingBowl);

    const mallet = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.28, 8), darkCedarMat);
    mallet.rotation.z = Math.PI / 3;
    mallet.position.set(0.12, 0.12, 0);
    rinGroup.add(mallet);

    rinGroup.userData = { isSingingBowl: true, label: 'Strike Zen Singing Bowl // 鈴 (528 Hz)' };
    spotifyGroup.add(rinGroup);
    this.clickableObjects.push(singingBowl);

    // 10. FLOATING 3D MUSICAL NOTE PARTICLES (`♪`, `♫`, `♩`)
    const noteChars = ['♪', '♫', '♩', '♬', '♪', '♫'];
    noteChars.forEach((note, ni) => {
      const nCanvas = document.createElement('canvas');
      nCanvas.width = 64;
      nCanvas.height = 64;
      const nctx = nCanvas.getContext('2d');
      nctx.font = 'bold 44px serif';
      nctx.fillStyle = ni % 2 === 0 ? '#1db954' : '#d4af37';
      nctx.textAlign = 'center';
      nctx.textBaseline = 'middle';
      nctx.fillText(note, 32, 32);

      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(nCanvas),
        transparent: true,
        opacity: 0.85
      }));
      sprite.scale.set(0.45, 0.45, 1);
      sprite.position.set(
        (Math.random() - 0.5) * 3.2,
        2.2 + Math.random() * 1.8,
        (Math.random() - 0.5) * 2.0
      );
      spotifyGroup.add(sprite);
      this.floatingMusicNotes.push({ sprite, baseY: sprite.position.y, phase: ni * 1.1, speed: 0.4 + ni * 0.1 });
    });

    this.scene.add(spotifyGroup);
  }

  /* ============================================
     ZONE: GAMING DOJO & ESPORTS SANCTUARY (遊戯道場・電脳神社)
     Aesthetic: Neo-Tokyo Arcade, Valorant Ascendant, Elden Grace, Cyberpunk 2077
     ============================================ */
  buildGamingDojo() {
    const dojoGroup = new THREE.Group();
    dojoGroup.position.set(44, 0, -29);

    const yakisugiPBR = this.getYakisugiTexture();
    const roofTilesTex = this.getJapaneseRoofTileTexture();
    const volcanicPBR = this.getVolcanicRockTexture();
    const arcadeSideLeft = this.getArcadeSideArtTexture('left');
    const arcadeSideRight = this.getArcadeSideArtTexture('right');
    const arcadePanel = this.getArcadeControlPanelTexture();
    const cyberMon0 = this.getCyberpunkMonitorTexture(0);
    const cyberMon1 = this.getCyberpunkMonitorTexture(1);
    const brushedGunmetalTex = this.getBrushedMetalTexture('gunmetal');

    const yakisugiMat = new THREE.MeshStandardMaterial({
      map: yakisugiPBR.map,
      bumpMap: yakisugiPBR.bumpMap,
      bumpScale: 0.08,
      roughness: 0.76
    });
    const cyberDarkMat = new THREE.MeshStandardMaterial({
      map: brushedGunmetalTex,
      color: 0x181a22,
      roughness: 0.42,
      metalness: 0.55
    });
    const neonCyanMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.5,
      roughness: 0.15
    });
    const neonMagentaMat = new THREE.MeshStandardMaterial({
      color: 0xff007f,
      emissive: 0xff007f,
      emissiveIntensity: 1.5,
      roughness: 0.15
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.18
    });
    const obsidianMat = new THREE.MeshStandardMaterial({
      color: 0x08080c,
      roughness: 0.12,
      metalness: 0.85
    });
    const stoneMat = new THREE.MeshStandardMaterial({
      map: volcanicPBR.map,
      bumpMap: volcanicPBR.bumpMap,
      bumpScale: 0.08,
      roughness: 0.92,
      color: 0x3d3a3d
    });

    // 1. Cyber-Dojo Architecture & Elevated Deck
    const platform = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.22, 5.8), yakisugiMat);
    platform.position.y = 0.11;
    platform.receiveShadow = true;
    dojoGroup.add(platform);

    // Glowing Neon Perimeter Piping on Deck Edge
    const leftPipe = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 5.8), neonCyanMat);
    leftPipe.position.set(-3.4, 0.23, 0);
    dojoGroup.add(leftPipe);

    const rightPipe = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 5.8), neonMagentaMat);
    rightPipe.position.set(3.4, 0.23, 0);
    dojoGroup.add(rightPipe);

    const frontPipe = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.04, 0.04), neonCyanMat);
    frontPipe.position.set(0, 0.23, 2.9);
    dojoGroup.add(frontPipe);

    // 4 Upright Pillars with Carbon Fiber Wrap
    const pillarPositions = [[-3.1, -2.6], [3.1, -2.6], [-3.1, 2.6], [3.1, 2.6]];
    pillarPositions.forEach(([px, pz]) => {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 4.4, 8), cyberDarkMat);
      pillar.position.set(px, 2.2, pz);
      pillar.castShadow = true;
      dojoGroup.add(pillar);

      // Neon LED collar ring
      const collar = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 6, 16), (px > 0 ? neonMagentaMat : neonCyanMat));
      collar.rotation.x = Math.PI / 2;
      collar.position.set(px, 3.2, pz);
      dojoGroup.add(collar);
    });

    // Grand Curved Tiled Roof with Cyber Illumination
    const roof = new THREE.Mesh(new THREE.ConeGeometry(5.4, 1.8, 4), new THREE.MeshStandardMaterial({
      map: roofTilesTex.map,
      roughness: 0.65
    }));
    roof.position.set(0, 5.15, 0);
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(1.28, 0.85, 1.08);
    roof.castShadow = true;
    dojoGroup.add(roof);

    // Twin Cyber Dojo Hanging Silk Banners (掛軸)
    const createDojoBanner = (kanji, slogan, bx) => {
      const bCanvas = document.createElement('canvas');
      bCanvas.width = 128;
      bCanvas.height = 384;
      const bctx = bCanvas.getContext('2d');
      bctx.fillStyle = '#0a0a0f';
      bctx.fillRect(0, 0, 128, 384);
      bctx.strokeStyle = bx > 0 ? '#ff007f' : '#00f0ff';
      bctx.lineWidth = 4;
      bctx.strokeRect(6, 6, 116, 372);

      bctx.fillStyle = '#d4af37';
      bctx.font = 'bold 44px serif';
      bctx.textAlign = 'center';
      for (let c = 0; c < kanji.length; c++) {
        bctx.fillText(kanji[c], 64, 75 + c * 55);
      }

      bctx.font = 'bold 13px monospace';
      bctx.fillStyle = '#ffffff';
      bctx.fillText(slogan, 64, 340);

      const bMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(0.85, 2.6),
        new THREE.MeshStandardMaterial({
          map: new THREE.CanvasTexture(bCanvas),
          roughness: 0.8,
          side: THREE.DoubleSide
        })
      );
      bMesh.position.set(bx, 3.0, -2.55);
      return bMesh;
    };
    dojoGroup.add(createDojoBanner('不撓不屈', 'VALORANT ASCENDANT', -2.1));
    dojoGroup.add(createDojoBanner('明鏡止水', 'ELDEN RING 100%', 2.1));

    // Dual Cyberpunk Chōchin Lanterns (`遊` PLAY and `勝` WIN)
    const createCyberLantern = (lx, lz, kanji, color) => {
      const lGroup = new THREE.Group();
      lGroup.position.set(lx, 3.4, lz);

      const lCanvas = document.createElement('canvas');
      lCanvas.width = 128;
      lCanvas.height = 256;
      const lctx = lCanvas.getContext('2d');
      lctx.fillStyle = '#0f0f18';
      lctx.fillRect(0, 0, 128, 256);
      lctx.strokeStyle = color;
      lctx.lineWidth = 6;
      lctx.strokeRect(6, 6, 116, 244);
      lctx.fillStyle = color;
      lctx.font = 'bold 92px serif';
      lctx.textAlign = 'center';
      lctx.textBaseline = 'middle';
      lctx.fillText(kanji, 64, 128);

      const lMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.28, 0.75, 12),
        new THREE.MeshStandardMaterial({
          map: new THREE.CanvasTexture(lCanvas),
          roughness: 0.8,
          emissive: color === '#00f0ff' ? 0x00f0ff : 0xff007f,
          emissiveIntensity: 0.65
        })
      );
      lGroup.add(lMesh);

      const light = new THREE.PointLight(color === '#00f0ff' ? 0x00f0ff : 0xff007f, 1.8, 8, 1.4);
      light.position.set(0, 0, 0);
      lGroup.add(light);
      this.candleLights.push(light);

      return lGroup;
    };
    dojoGroup.add(createCyberLantern(-2.6, 2.6, '遊', '#00f0ff'));
    dojoGroup.add(createCyberLantern(2.6, 2.6, '勝', '#ff007f'));

    // 2. NEO-TOKYO CUSTOM ARCADE CABINET ("VALORANT / CLUTCH MASTER")
    const arcadeGroup = new THREE.Group();
    arcadeGroup.position.set(-1.8, 0.22, -0.6);
    arcadeGroup.rotation.y = 0.25;

    // Cabinet Main Shell
    const cabBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.95, 0.95), cyberDarkMat);
    cabBase.position.y = 0.975;
    cabBase.castShadow = true;
    arcadeGroup.add(cabBase);

    // Left Flank Side Art Decal Panel
    const leftArtMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.92, 1.88),
      new THREE.MeshStandardMaterial({
        map: arcadeSideLeft,
        roughness: 0.35,
        metalness: 0.2
      })
    );
    leftArtMesh.position.set(-0.605, 0.975, 0);
    leftArtMesh.rotation.y = -Math.PI / 2;
    arcadeGroup.add(leftArtMesh);

    // Right Flank Side Art Decal Panel
    const rightArtMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.92, 1.88),
      new THREE.MeshStandardMaterial({
        map: arcadeSideRight,
        roughness: 0.35,
        metalness: 0.2
      })
    );
    rightArtMesh.position.set(0.605, 0.975, 0);
    rightArtMesh.rotation.y = Math.PI / 2;
    arcadeGroup.add(rightArtMesh);

    // Glowing Illuminated Marquee ("ASCENDANT 1")
    const mCanvas = document.createElement('canvas');
    mCanvas.width = 256;
    mCanvas.height = 64;
    const mctx = mCanvas.getContext('2d');
    mctx.fillStyle = '#0a0a14';
    mctx.fillRect(0, 0, 256, 64);
    mctx.strokeStyle = '#00f0ff';
    mctx.lineWidth = 4;
    mctx.strokeRect(3, 3, 250, 58);
    mctx.fillStyle = '#00f0ff';
    mctx.font = '900 22px monospace';
    mctx.textAlign = 'center';
    mctx.fillText('⚡ ASCENDANT 1 ⚡', 128, 30);
    mctx.font = '11px monospace';
    mctx.fillStyle = '#ff007f';
    mctx.fillText('VALORANT CLUTCH DOJO', 128, 50);

    const marquee = new THREE.Mesh(
      new THREE.PlaneGeometry(1.14, 0.28),
      new THREE.MeshStandardMaterial({
        map: new THREE.CanvasTexture(mCanvas),
        emissive: 0x00f0ff,
        emissiveIntensity: 0.65
      })
    );
    marquee.position.set(0, 1.82, 0.48);
    arcadeGroup.add(marquee);

    // Animated 16-Bit CRT Arcade Tactical Screen
    const arcadeCanvas = document.createElement('canvas');
    arcadeCanvas.width = 256;
    arcadeCanvas.height = 256;
    const actx = arcadeCanvas.getContext('2d');
    const arcadeTexture = new THREE.CanvasTexture(arcadeCanvas);

    const arcadeScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(1.0, 0.82),
      new THREE.MeshBasicMaterial({ map: arcadeTexture })
    );
    arcadeScreen.position.set(0, 1.25, 0.46);
    arcadeScreen.rotation.x = -0.15;
    arcadeGroup.add(arcadeScreen);
    this.arcadeCRT = { canvas: arcadeCanvas, ctx: actx, texture: arcadeTexture };

    // Control Panel Angled Shelf with Joysticks & Buttons
    const ctrlShelf = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.12, 0.42), new THREE.MeshStandardMaterial({ color: 0x1f1d24, metalness: 0.6 }));
    ctrlShelf.position.set(0, 0.82, 0.58);
    ctrlShelf.rotation.x = 0.2;
    arcadeGroup.add(ctrlShelf);

    // Carbon-Fiber Twill Control Panel Graphic Decal
    const panelOverlay = new THREE.Mesh(
      new THREE.PlaneGeometry(1.14, 0.38),
      new THREE.MeshStandardMaterial({
        map: arcadePanel,
        roughness: 0.32,
        metalness: 0.35
      })
    );
    panelOverlay.position.set(0, 0.062, 0);
    panelOverlay.rotation.x = -Math.PI / 2;
    ctrlShelf.add(panelOverlay);

    // Dual Ball-top Joysticks (Player 1 Cyan, Player 2 Magenta)
    [-0.35, 0.35].forEach((jx, ji) => {
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.12, 8), new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9 }));
      shaft.position.set(jx, 0.94, 0.56);
      arcadeGroup.add(shaft);

      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 10), ji === 0 ? neonCyanMat : neonMagentaMat);
      ball.position.set(jx, 1.0, 0.56);
      arcadeGroup.add(ball);

      // 6 Arcade Push Buttons each
      for (let btn = 0; btn < 6; btn++) {
        const bx = jx + 0.1 + (btn % 3) * 0.06;
        const bz = 0.52 + Math.floor(btn / 3) * 0.06;
        const button = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.02, 8), ji === 0 ? neonCyanMat : neonMagentaMat);
        button.position.set(bx, 0.88, bz);
        arcadeGroup.add(button);
      }
    });

    // Coin Door with Illuminated Coin Return Inserts
    const coinDoor = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.04), new THREE.MeshStandardMaterial({ color: 0x111116, metalness: 0.7 }));
    coinDoor.position.set(0, 0.36, 0.48);
    arcadeGroup.add(coinDoor);

    arcadeGroup.userData = {
      targetChapter: 'gaming',
      targetProject: 'gaming_arcade',
      isArcade: true,
      label: 'Play Valorant Arcade // Ascendant 1 (1,400+ hrs)'
    };
    dojoGroup.add(arcadeGroup);
    this.clickableObjects.push(arcadeScreen, cabBase);

    // 3. VALORANT RADIANT SPIKE ENERGY CORE (スパイク)
    const spikeGroup = new THREE.Group();
    spikeGroup.position.set(0, 0.22, -1.0);

    // Obsidian Hexagonal Pedestal
    const spikePedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.65, 0.85, 6), obsidianMat);
    spikePedestal.position.y = 0.425;
    spikePedestal.castShadow = true;
    spikeGroup.add(spikePedestal);

    // Glowing Radiant Glyph Inlay on Pedestal
    const pRing = new THREE.Mesh(new THREE.TorusGeometry(0.48, 0.02, 6, 24), neonCyanMat);
    pRing.rotation.x = Math.PI / 2;
    pRing.position.y = 0.86;
    spikeGroup.add(pRing);

    // Floating Geometric Spike Core (Inverted Dual Tetrahedrons)
    const spikeCore = new THREE.Group();
    spikeCore.position.set(0, 1.35, 0);

    const outerCasing = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.28, 0),
      new THREE.MeshStandardMaterial({ color: 0x1a1a24, metalness: 0.85, roughness: 0.25 })
    );
    outerCasing.scale.set(0.85, 1.4, 0.85);
    spikeCore.add(outerCasing);

    const innerRadiant = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.24, 0),
      new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        emissive: 0x00ffcc,
        emissiveIntensity: 2.2,
        roughness: 0.1
      })
    );
    innerRadiant.scale.set(0.75, 1.25, 0.75);
    spikeCore.add(innerRadiant);

    // 4 Orbiting Satellite Radiant Shards
    for (let s = 0; s < 4; s++) {
      const shard = new THREE.Mesh(
        new THREE.TetrahedronGeometry(0.06, 0),
        new THREE.MeshStandardMaterial({ color: 0x00ffcc, emissive: 0x00f0ff, emissiveIntensity: 1.8 })
      );
      spikeCore.add(shard);
      this.spikeCrystals.push({ mesh: shard, phase: (s * Math.PI) / 2, radius: 0.48, speed: 2.2 });
    }

    // Turquoise Volumetric Pulse Light
    const spikeLight = new THREE.PointLight(0x00ffcc, 2.2, 8, 1.4);
    spikeLight.position.set(0, 1.35, 0);
    spikeGroup.add(spikeLight);
    this.candleLights.push(spikeLight);

    spikeGroup.add(spikeCore);
    this.valorantSpike = spikeCore;

    spikeGroup.userData = {
      targetChapter: 'gaming',
      targetProject: 'valorant_spike',
      label: 'Inspect Radiant Spike // Clutch Core (Valorant)'
    };
    dojoGroup.add(spikeGroup);
    this.clickableObjects.push(outerCasing, spikePedestal);

    // 4. ELDEN RING SITE OF LOST GRACE (祝福の光)
    const graceGroup = new THREE.Group();
    graceGroup.position.set(1.9, 0.22, 0.8);

    // Volcanic Rock Cairn Base
    for (let r = 0; r < 8; r++) {
      const ang = (r * Math.PI * 2) / 8;
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18 + (r % 3) * 0.05, 0), stoneMat);
      rock.scale.set(1.2, 0.7, 1.0);
      rock.position.set(Math.cos(ang) * 0.38, 0.08, Math.sin(ang) * 0.38);
      graceGroup.add(rock);
    }

    // Central Grace Flame (Slender Twisted Golden Energy)
    const graceFlameMat = new THREE.MeshStandardMaterial({
      color: 0xffea75,
      emissive: 0xffd700,
      emissiveIntensity: 2.5,
      roughness: 0.2
    });
    const graceFlame = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.65, 8), graceFlameMat);
    graceFlame.position.set(0, 0.45, 0);
    graceGroup.add(graceFlame);

    // Golden Halo Ring (Erdtree Rune)
    const graceRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.24, 0.015, 6, 24),
      new THREE.MeshBasicMaterial({ color: 0xffdd44 })
    );
    graceRing.rotation.x = Math.PI / 2;
    graceRing.position.set(0, 0.45, 0);
    graceGroup.add(graceRing);

    // Intense Golden Point Light
    const graceLight = new THREE.PointLight(0xffd700, 2.4, 9, 1.2);
    graceLight.position.set(0, 0.55, 0);
    graceGroup.add(graceLight);
    this.candleLights.push(graceLight);

    graceGroup.userData = {
      targetChapter: 'gaming',
      targetProject: 'elden_grace',
      isGrace: true,
      label: 'Touch Lost Grace // Elden Ring (100% Achievements)'
    };
    dojoGroup.add(graceGroup);
    this.clickableObjects.push(graceFlame);

    // 5. CYBERPUNK 2077 BATTLESTATION & SAMURAI ONI MASK
    const stationGroup = new THREE.Group();
    stationGroup.position.set(1.6, 0.22, -1.2);
    stationGroup.rotation.y = -0.3;

    // Heavy Industrial Gaming Desk
    const desk = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.12, 1.1), cyberDarkMat);
    desk.position.set(0, 1.0, 0);
    desk.castShadow = true;
    stationGroup.add(desk);

    // Dual Panoramic Curved Displays with High-Density HUD Textures
    [-0.55, 0.55].forEach((mx, mi) => {
      const monHousing = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.58, 0.06), cyberDarkMat);
      monHousing.position.set(mx, 1.45, 0);
      monHousing.rotation.y = (mi === 0 ? 0.22 : -0.22);
      stationGroup.add(monHousing);

      const monScreen = new THREE.Mesh(
        new THREE.PlaneGeometry(0.92, 0.54),
        new THREE.MeshStandardMaterial({
          map: mi === 0 ? cyberMon0 : cyberMon1,
          emissive: mi === 0 ? 0x00f0ff : 0xff007f,
          emissiveIntensity: 0.35,
          roughness: 0.2
        })
      );
      monScreen.position.set(mx, 1.45, 0.035);
      monScreen.rotation.y = (mi === 0 ? 0.22 : -0.22);
      stationGroup.add(monScreen);
    });

    // Custom Water-Cooled Open-Air PC Rig with Glowing Cyan Coolant Tubes
    const pcChassis = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.65, 0.38), obsidianMat);
    pcChassis.position.set(1.4, 0.35, 0);
    stationGroup.add(pcChassis);

    const coolantTube = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.02, 6, 16), neonCyanMat);
    coolantTube.position.set(1.4, 0.42, 0.2);
    stationGroup.add(coolantTube);

    // Floating Holographic Samurai Oni Cyber Mask (サイバー鬼面)
    const oniGroup = new THREE.Group();
    oniGroup.position.set(0, 1.95, -0.15);

    const oniFace = new THREE.Mesh(
      new THREE.ConeGeometry(0.18, 0.32, 5),
      new THREE.MeshStandardMaterial({
        color: 0x961a14,
        roughness: 0.3,
        metalness: 0.6,
        wireframe: false
      })
    );
    oniFace.rotation.x = Math.PI;
    oniGroup.add(oniFace);

    // Glowing Golden Horns
    [-0.14, 0.14].forEach(hx => {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.18, 6), goldMat);
      horn.rotation.z = (hx > 0 ? -1 : 1) * 0.45;
      horn.position.set(hx, 0.16, 0);
      oniGroup.add(horn);
    });

    // Glowing Yellow Ocular Implants (Eyes)
    [-0.07, 0.07].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), new THREE.MeshBasicMaterial({ color: 0xfcee0a }));
      eye.position.set(ex, 0.04, 0.12);
      oniGroup.add(eye);
    });

    stationGroup.add(oniGroup);
    this.cyberpunkHolo = oniGroup;

    stationGroup.userData = {
      targetChapter: 'gaming',
      targetProject: 'cyberpunk_station',
      label: 'Inspect Cyberpunk 2077 // Phantom Liberty'
    };
    dojoGroup.add(stationGroup);
    this.clickableObjects.push(desk, oniFace);

    // 6. THREE ESPORTS TROPHY PEDESTALS (実績台座)
    const trophyData = [
      { text: 'ASCENDANT 1', game: 'VALORANT', x: -2.4, z: 1.6, color: '#00f0ff' },
      { text: '100% ACHIEVED', game: 'ELDEN RING', x: 0, z: 2.1, color: '#ffd700' },
      { text: 'NIGHT CITY LEGEND', game: 'CYBERPUNK', x: 2.4, z: 1.6, color: '#ff007f' }
    ];

    trophyData.forEach(tr => {
      const pGroup = new THREE.Group();
      pGroup.position.set(tr.x, 0.22, tr.z);

      // Granite Plinth
      const plinth = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 0.45, 8), obsidianMat);
      plinth.position.y = 0.225;
      plinth.castShadow = true;
      pGroup.add(plinth);

      // Golden Trophy Cup / Star
      const trophy = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.25, 6), goldMat);
      trophy.position.y = 0.55;
      trophy.castShadow = true;
      pGroup.add(trophy);

      const crown = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 6, 12), goldMat);
      crown.rotation.x = Math.PI / 2;
      crown.position.y = 0.68;
      pGroup.add(crown);

      pGroup.userData = {
        targetChapter: 'gaming',
        label: `Trophy: ${tr.game} (${tr.text})`
      };
      dojoGroup.add(pGroup);
      this.clickableObjects.push(trophy, plinth);
    });

    this.scene.add(dojoGroup);
  }

  /* ============================================
     ZONE 3: 3D RETRO CRT LAB & OSCILLOSCOPE (Studio)
     ============================================ */
  buildRetroTerminalLab() {
    const labGroup = new THREE.Group();
    labGroup.position.set(36, 0, -48);

    const metalMat = new THREE.MeshStandardMaterial({ color: 0x1f1c19, roughness: 0.7, metalness: 0.3 });
    const crtBodyMat = new THREE.MeshStandardMaterial({ color: 0x272420, roughness: 0.82 });
    const keyBeigeMat = new THREE.MeshStandardMaterial({ color: 0xd9cca8, roughness: 0.8 });
    const keyDarkMat = new THREE.MeshStandardMaterial({ color: 0x3d352e, roughness: 0.8 });
    const keyAccentMat = new THREE.MeshStandardMaterial({ color: 0x961a14, roughness: 0.7 });
    const ceramicMat = new THREE.MeshStandardMaterial({ color: 0xf5f0eb, roughness: 0.3 });

    // Industrial Lab Table
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.18, 2.5), metalMat);
    tableTop.position.set(0, 1.4, 0);
    tableTop.castShadow = true;
    labGroup.add(tableTop);

    const tableLeg = new THREE.BoxGeometry(0.18, 1.4, 0.18);
    [[-2.4, -1.05], [2.4, -1.05], [-2.4, 1.05], [2.4, 1.05]].forEach(([x, z]) => {
      const leg = new THREE.Mesh(tableLeg, metalMat);
      leg.position.set(x, 0.7, z);
      labGroup.add(leg);
    });

    // 3 Main CRT Monitors arranged in arc
    const crtConfigs = [
      { x: -1.7, rotY: 0.28, title: 'AST KNOWLEDGE GRAPH', color: '#4ee068', project: 'architech' },
      { x: 0, rotY: 0, title: 'SOLANA ANCHOR DEVNET', color: '#ffb347', project: 'eventix' },
      { x: 1.7, rotY: -0.28, title: 'YOLOV8 CROP VISION', color: '#4ee068', project: 'agrisaksham' }
    ];

    crtConfigs.forEach((cfg) => {
      const crtGroup = new THREE.Group();
      crtGroup.position.set(cfg.x, 1.5, 0);
      crtGroup.rotation.y = cfg.rotY;

      // Monitor Housing
      const housing = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.98, 0.85), crtBodyMat);
      housing.position.y = 0.55;
      housing.castShadow = true;
      crtGroup.add(housing);

      // Curved Screen
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 256;
      screenCanvas.height = 192;
      const ctx = screenCanvas.getContext('2d');
      ctx.fillStyle = '#091109';
      ctx.fillRect(0, 0, 256, 192);
      ctx.fillStyle = cfg.color;
      ctx.font = 'bold 15px monospace';
      ctx.fillText(`> ${cfg.title}`, 12, 30);
      ctx.font = '12px monospace';
      ctx.fillText('> STATUS: ACTIVE 60FPS', 12, 58);
      ctx.fillText('> AST NODES: 1,420 OK', 12, 82);
      ctx.fillText('> LATENCY: 12ms // PUNE', 12, 106);
      ctx.fillText('> PRESS DIAGNOSTIC ⚡', 12, 150);

      const screenTexture = new THREE.CanvasTexture(screenCanvas);
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.98, 0.74), new THREE.MeshBasicMaterial({ map: screenTexture }));
      screen.position.set(0, 0.55, 0.44);
      screen.userData = { targetChapter: 'studio', targetProject: cfg.project, isCRT: true, label: `Run Diagnostic: ${cfg.title}` };
      crtGroup.add(screen);
      this.clickableObjects.push(screen);
      this.crtMonitors.push({ canvas: screenCanvas, ctx, texture: screenTexture, color: cfg.color });

      const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.16, 12), metalMat);
      stand.position.y = 0.08;
      crtGroup.add(stand);

      labGroup.add(crtGroup);
    });

    // 4. Vintage 90s ATX Computer Tower under table
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x221e1a, roughness: 0.8 });
    const pcTower = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.15, 1.2), towerMat);
    pcTower.position.set(-1.8, 0.6, 0.2);
    labGroup.add(pcTower);

    // 5. Dual-Channel Oscilloscope with Animated Sine Wave & Graticule
    const oscCanvas = document.createElement('canvas');
    oscCanvas.width = 128;
    oscCanvas.height = 128;
    const octx = oscCanvas.getContext('2d');
    const oscTexture = new THREE.CanvasTexture(oscCanvas);

    const oscMesh = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.65, 0.7), crtBodyMat);
    oscMesh.position.set(2.4, 1.75, 0.2);
    labGroup.add(oscMesh);

    [-0.15, 0.15].forEach(oy => {
      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.05, 10), metalMat);
      knob.rotation.x = Math.PI / 2;
      knob.position.set(2.65, 1.75 + oy, 0.58);
      labGroup.add(knob);
    });

    const oscScreen = new THREE.Mesh(new THREE.CircleGeometry(0.24, 16), new THREE.MeshBasicMaterial({ map: oscTexture }));
    oscScreen.position.set(2.2, 1.75, 0.56);
    labGroup.add(oscScreen);
    this.oscilloscope = { canvas: oscCanvas, ctx: octx, texture: oscTexture };

    // 6. DETAILED MECHANICAL KEYBOARD with Individual Keycaps
    const kbGroup = new THREE.Group();
    kbGroup.position.set(0, 1.5, 0.75);

    const kbBase = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.05, 0.55), crtBodyMat);
    kbGroup.add(kbBase);

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 12; c++) {
        const isEsc = (r === 0 && c === 0);
        const isEnter = (r === 2 && c === 11);
        const mat = (isEsc || isEnter) ? keyAccentMat : ((r === 0 || c === 0 || c >= 10) ? keyDarkMat : keyBeigeMat);
        const key = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.03, 0.09), mat);
        key.position.set(-0.62 + (c * 0.11), 0.035, -0.18 + (r * 0.12));
        kbGroup.add(key);
      }
    }
    const spacebar = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.03, 0.09), keyBeigeMat);
    spacebar.position.set(0, 0.035, 0.18);
    kbGroup.add(spacebar);
    labGroup.add(kbGroup);

    // Coiled Snaking Cable from Keyboard to Tower
    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.7, 1.5, 0.75),
      new THREE.Vector3(1.0, 1.45, 0.4),
      new THREE.Vector3(-1.0, 1.2, 0.2),
      new THREE.Vector3(-1.6, 0.9, 0.2)
    ]);
    const cableMesh = new THREE.Mesh(new THREE.TubeGeometry(cableCurve, 24, 0.015, 6, false), metalMat);
    labGroup.add(cableMesh);

    // Vintage Mouse on Mousepad
    const pad = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.5), new THREE.MeshBasicMaterial({ color: 0x111111 }));
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(1.05, 1.51, 0.75);
    labGroup.add(pad);

    const mouseMesh = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.06, 0.26), keyBeigeMat);
    mouseMesh.position.set(1.05, 1.54, 0.75);
    labGroup.add(mouseMesh);

    // 7. Ceramic Coffee Mug with Animated Steam
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.10, 0.22, 12), ceramicMat);
    mug.position.set(-1.15, 1.6, 0.8);
    labGroup.add(mug);

    const coffeeSurface = new THREE.Mesh(new THREE.CircleGeometry(0.10, 12), new THREE.MeshBasicMaterial({ color: 0x221308 }));
    coffeeSurface.rotation.x = -Math.PI / 2;
    coffeeSurface.position.set(-1.15, 1.69, 0.8);
    labGroup.add(coffeeSurface);

    // 8. Stack of Hardcover Tech Manuals
    const bookColors = [0x8c2a22, 0x1d4a2d, 0x1c2833, 0xb58d3d];
    bookColors.forEach((bColor, bIdx) => {
      const book = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.09, 0.95), new THREE.MeshStandardMaterial({ color: bColor, roughness: 0.7 }));
      book.position.set(-2.0, 1.54 + (bIdx * 0.095), 0.75);
      book.rotation.y = (bIdx % 2 === 0 ? 0.08 : -0.06);
      labGroup.add(book);
    });

    // 9. Green Banker's Desk Lamp with Brass Arm
    const lampGroup = new THREE.Group();
    lampGroup.position.set(1.7, 1.5, 0.75);

    const lBase = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.18, 0.06, 12), new THREE.MeshStandardMaterial({ color: 0xb58d3d, metalness: 0.8 }));
    lampGroup.add(lBase);

    const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.6, 8), new THREE.MeshStandardMaterial({ color: 0xb58d3d, metalness: 0.8 }));
    lArm.position.set(0, 0.3, 0);
    lampGroup.add(lArm);

    const lShade = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.45, 12, 1, false, 0, Math.PI), new THREE.MeshStandardMaterial({
      color: 0x1d663b,
      roughness: 0.3,
      metalness: 0.2
    }));
    lShade.rotation.z = Math.PI / 2;
    lShade.position.set(0, 0.6, 0);
    lampGroup.add(lShade);

    const lampLight = new THREE.PointLight(0xffea9f, 1.6, 6, 1.4);
    lampLight.position.set(0, 0.52, 0);
    lampGroup.add(lampLight);
    labGroup.add(lampGroup);

    // 10. Vintage Reel-to-Reel Magnetic Tape Deck (オープンリールデッキ)
    const tapeDeckGroup = new THREE.Group();
    tapeDeckGroup.position.set(-2.2, 2.3, -0.4);

    const deckBody = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.95, 0.35), crtBodyMat);
    tapeDeckGroup.add(deckBody);

    const reelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.02, 16);
    reelGeo.rotateX(Math.PI / 2);
    const reelMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.85, roughness: 0.2 });

    [-0.35, 0.35].forEach((rx, ri) => {
      const reel = new THREE.Mesh(reelGeo, reelMat);
      reel.position.set(rx, 0.15, 0.18);
      tapeDeckGroup.add(reel);

      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.03, 12), metalMat);
      hub.position.set(rx, 0.15, 0.19);
      hub.rotation.x = Math.PI / 2;
      tapeDeckGroup.add(hub);

      this.tapeReels.push({ mesh: reel, dir: ri === 0 ? 1 : -1, speed: 2.2 });
    });

    [-0.2, 0.2].forEach(vx => {
      const vu = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 0.02), new THREE.MeshBasicMaterial({ color: 0xfff9c4 }));
      vu.position.set(vx, -0.28, 0.18);
      tapeDeckGroup.add(vu);
    });

    labGroup.add(tapeDeckGroup);

    // 11. Breadboard Circuit with Blinking Multi-Color LEDs
    const bbGroup = new THREE.Group();
    bbGroup.position.set(-0.6, 1.5, 0.75);

    const bbBase = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.025, 0.35), new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.5 }));
    bbGroup.add(bbBase);

    const ledColors = [0x4ee068, 0xffa033, 0x00e5ff, 0xe85338, 0x4ee068, 0xffeb3b];
    ledColors.forEach((col, li) => {
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), new THREE.MeshBasicMaterial({ color: col }));
      led.position.set(-0.18 + li * 0.07, 0.025, 0);
      bbGroup.add(led);

      const ledGlow = new THREE.PointLight(col, 0.4, 1.2, 2.0);
      ledGlow.position.set(-0.18 + li * 0.07, 0.04, 0);
      bbGroup.add(ledGlow);

      this.blinkingLeds.push({ mesh: led, light: ledGlow, phase: li * 1.1, baseColor: col });
    });

    // Stack of 3.5" Floppy Disks
    const diskColors = [0x1e88e5, 0x43a047, 0xd81b60];
    diskColors.forEach((dcol, di) => {
      const disk = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.015, 0.24), new THREE.MeshStandardMaterial({ color: dcol, roughness: 0.6 }));
      disk.position.set(0.48, 1.51 + di * 0.018, 0.8);
      disk.rotation.y = di * 0.12;
      bbGroup.add(disk);
    });

    labGroup.add(bbGroup);

    // Orbiting 3D Holographic Polyhedral Code Wireframes
    const polyGeoList = [
      new THREE.DodecahedronGeometry(0.35),
      new THREE.IcosahedronGeometry(0.38),
      new THREE.OctahedronGeometry(0.32),
      new THREE.TetrahedronGeometry(0.30)
    ];

    polyGeoList.forEach((geo, idx) => {
      const mat = new THREE.MeshStandardMaterial({
        color: idx % 2 === 0 ? 0x4ee068 : 0x961a14,
        roughness: 0.3,
        metalness: 0.8,
        wireframe: true
      });
      const polyMesh = new THREE.Mesh(geo, mat);
      labGroup.add(polyMesh);
      this.orbitingPolyhedra.push({
        mesh: polyMesh,
        speed: 0.8 + idx * 0.35,
        radius: 1.8 + idx * 0.6,
        phase: idx * 1.5,
        height: 2.8 + (idx % 2 * 0.6)
      });
    });

    this.scene.add(labGroup);
  }

  /* ============================================
     ZONE 4: ZEN CHRONICLE GARDEN & SHISHI-ODOSHI (Experience)
     ============================================ */
  buildZenChronicleGarden() {
    const zenGroup = new THREE.Group();
    zenGroup.position.set(-34, 0, -48);

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x6e6559, roughness: 0.95 });
    const monolithMat = new THREE.MeshStandardMaterial({ color: 0x221d18, roughness: 0.85 });
    const bambooMat = new THREE.MeshStandardMaterial({ color: 0x7fa26a, roughness: 0.65 });

    // 1. Karesansui Raked Gravel Ripples
    for (let r = 1.0; r <= 3.8; r += 0.55) {
      const ripple = new THREE.Mesh(new THREE.RingGeometry(r, r + 0.08, 32), new THREE.MeshBasicMaterial({ color: 0xcdc2af, side: THREE.DoubleSide }));
      ripple.rotation.x = -Math.PI / 2;
      ripple.position.set(1.5, 0.02, -3.5);
      zenGroup.add(ripple);
    }

    // 2. SANZON ISHIGUMI (三尊石組) SACRED BOULDER TRIAD
    const rockTriad = new THREE.Group();
    rockTriad.position.set(1.5, 0, -3.5);

    const masterStone = new THREE.Mesh(new THREE.ConeGeometry(0.48, 1.2, 6), stoneMat);
    masterStone.position.y = 0.6;
    masterStone.rotation.y = 0.4;
    masterStone.castShadow = true;
    rockTriad.add(masterStone);

    const leftStone = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.75, 5), stoneMat);
    leftStone.position.set(-0.65, 0.38, 0.2);
    leftStone.rotation.z = 0.2;
    rockTriad.add(leftStone);

    const rightStone = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.68, 5), stoneMat);
    rightStone.position.set(0.65, 0.34, -0.15);
    rightStone.rotation.z = -0.25;
    rockTriad.add(rightStone);

    zenGroup.add(rockTriad);

    // 3. Animated Shishi-odoshi (Bamboo Water Rocker)
    const fountainGroup = new THREE.Group();
    fountainGroup.position.set(2.8, 0, -2.4);

    [-0.3, 0.3].forEach(ox => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.9, 8), bambooMat);
      post.position.set(ox, 0.45, 0);
      fountainGroup.add(post);
    });

    const spout = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8), bambooMat);
    spout.position.set(0, 0.8, 0.35);
    spout.rotation.x = Math.PI / 4;
    fountainGroup.add(spout);

    const waterTrickle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.5, 6), new THREE.MeshBasicMaterial({ color: 0x90caf9, transparent: true, opacity: 0.7 }));
    waterTrickle.position.set(0, 0.55, 0.55);
    fountainGroup.add(waterTrickle);

    const rockerPivot = new THREE.Group();
    rockerPivot.position.set(0, 0.45, 0);

    const rockerTube = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 1.1, 10), bambooMat);
    rockerTube.rotation.x = Math.PI / 2;
    rockerTube.position.z = -0.15;
    rockerPivot.add(rockerTube);
    fountainGroup.add(rockerPivot);

    const anvil = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.22, 0.4), stoneMat);
    anvil.position.set(0, 0.11, -0.65);
    fountainGroup.add(anvil);

    this.shishiOdoshi = { pivot: rockerPivot, angle: 0, phase: 0, lastClack: 0 };
    zenGroup.add(fountainGroup);

    // 4. Japanese Crimson Maple (Momiji)
    const momijiGroup = new THREE.Group();
    momijiGroup.position.set(-3.2, 0, -5.0);
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.22, 3.2, 8), new THREE.MeshStandardMaterial({ color: 0x3d3027 }));
    trunk.position.y = 1.6;
    momijiGroup.add(trunk);

    const crimsonMat = new THREE.MeshStandardMaterial({ color: 0xa82820, roughness: 0.9 });
    [[0, 2.8, 0.3, 0.8], [-0.5, 2.4, -0.3, 0.65], [0.6, 2.5, 0.2, 0.7]].forEach(([x, y, z, rad]) => {
      const foliage = new THREE.Mesh(new THREE.SphereGeometry(rad, 10, 8), crimsonMat);
      foliage.scale.set(1.3, 0.7, 1.2);
      foliage.position.set(x, y, z);
      momijiGroup.add(foliage);
    });
    zenGroup.add(momijiGroup);

    // 5. Granite Milestone Monoliths with Deep Carved Kanji & Dates
    const milestones = [
      { title: 'VIT PUNE', date: '2022-2026', kanji: '学院', y: 1.5 },
      { title: 'PASSION INFO TECH', date: '2025', kanji: '研鑽', y: 1.7 },
      { title: 'AI TEAM LEAD', date: 'ACTIVE', kanji: '統括', y: 1.6 },
      { title: 'SIH FINALIST', date: '2024', kanji: '栄誉', y: 1.4 }
    ];

    milestones.forEach((m, idx) => {
      const obeliskGroup = new THREE.Group();
      obeliskGroup.position.set(-1.8 + (idx * 1.2), 0, -2.5 - (idx * 1.2));

      const obelisk = new THREE.Mesh(new THREE.BoxGeometry(0.48, m.y, 0.28), monolithMat);
      obelisk.position.y = m.y / 2;
      obelisk.castShadow = true;
      obeliskGroup.add(obelisk);

      const mCanvas = document.createElement('canvas');
      mCanvas.width = 128;
      mCanvas.height = 256;
      const mctx = mCanvas.getContext('2d');
      mctx.fillStyle = '#1c1916';
      mctx.fillRect(0, 0, 128, 256);
      mctx.strokeStyle = '#961a14';
      mctx.lineWidth = 4;
      mctx.strokeRect(6, 6, 116, 244);
      mctx.fillStyle = '#d4af37';
      mctx.font = 'bold 36px serif';
      mctx.textAlign = 'center';
      mctx.fillText(m.kanji, 64, 70);
      mctx.font = 'bold 16px monospace';
      mctx.fillStyle = '#ffffff';
      mctx.fillText(m.date, 64, 130);
      mctx.font = '12px monospace';
      mctx.fillStyle = '#c5ba8e';
      mctx.fillText(m.title, 64, 170);

      const mFace = new THREE.Mesh(new THREE.PlaneGeometry(0.44, m.y * 0.9), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(mCanvas) }));
      mFace.position.set(0, m.y / 2, 0.15);
      obeliskGroup.add(mFace);

      obeliskGroup.userData = { targetChapter: 'experience', label: `Milestone: ${m.title} (${m.date})` };
      zenGroup.add(obeliskGroup);
      this.clickableObjects.push(obeliskGroup);
    });

    this.scene.add(zenGroup);
  }

  /* ============================================
     ZONE 5: OCEAN DOCK, LOTUS & SEA TORII (Contact)
     ============================================ */
  buildContactWaterDock() {
    const dockGroup = new THREE.Group();
    dockGroup.position.set(0, 0, -78);

    const hinokiPBR = this.getHinokiWoodTexture();
    const woodPlankMat = new THREE.MeshStandardMaterial({
      color: 0x5c4838,
      roughness: 0.78,
      map: hinokiPBR.map,
      bumpMap: hinokiPBR.bumpMap,
      bumpScale: 0.02
    });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xb58d3d, metalness: 0.8, roughness: 0.3 });

    // 1. Wooden Pier Planks Extending 14 Meters into Ocean (z = 0 to z = -14)
    for (let z = 0; z < 14; z += 0.45) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 0.4), woodPlankMat);
      plank.position.set(0, 0.6, -z);
      plank.castShadow = true;
      plank.receiveShadow = true;
      dockGroup.add(plank);
    }

    // 2. Pier Piles with Coiled Hemp Ropes & Mooring Cleats
    const pileGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.4, 8);
    const ropeMat = new THREE.MeshStandardMaterial({ color: 0xc4a36e, roughness: 0.9 });
    [
      [-1.65, -1.2], [1.65, -1.2],
      [-1.65, -4.5], [1.65, -4.5],
      [-1.65, -8.0], [1.65, -8.0],
      [-1.65, -11.5], [1.65, -11.5],
      [-1.65, -13.8], [1.65, -13.8]
    ].forEach(([x, z]) => {
      const pile = new THREE.Mesh(pileGeo, woodPlankMat);
      pile.position.set(x, 0, z);
      dockGroup.add(pile);

      const ropeRing = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.035, 6, 16), ropeMat);
      ropeRing.rotation.x = Math.PI / 2;
      ropeRing.position.set(x, 0.58, z);
      dockGroup.add(ropeRing);
    });

    const cleat = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.08), brassMat);
    cleat.position.set(1.35, 0.68, -5.5);
    dockGroup.add(cleat);

    // Brass Maritime Lantern on End Post
    const lanternPost = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.4, 8), woodPlankMat);
    lanternPost.position.set(1.65, 1.2, -13.8);
    dockGroup.add(lanternPost);

    const mLantern = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.35, 8), brassMat);
    mLantern.position.set(1.65, 1.85, -13.5);
    dockGroup.add(mLantern);

    const dockLanternLight = new THREE.PointLight(0xffa834, 1.8, 12, 1.4);
    dockLanternLight.position.set(1.65, 1.85, -13.5);
    dockGroup.add(dockLanternLight);
    this.candleLights.push(dockLanternLight);

    // 3. Expansive Multi-Wave Ocean Water Plane (280m x 160m)
    const waterGeo = new THREE.PlaneGeometry(280, 160, this.isMobile ? 24 : 64, this.isMobile ? 16 : 48);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x3d7ecc,
      roughness: 0.12,
      metalness: 0.88,
      transparent: true,
      opacity: 0.78
    });
    this.waterMesh = new THREE.Mesh(waterGeo, waterMat);
    this.waterMesh.rotation.x = -Math.PI / 2;
    this.waterMesh.position.set(0, 0.25, -55);
    dockGroup.add(this.waterMesh);

    // 4. "CONNECT ME" MASTER BOAT // 結・連絡船 (Single Moored Vessel with all Contact Channels)
    this.buildConnectBoat(dockGroup);

    // Floating Message in a Bottle (漂流瓶) bobbing near pier in open water
    const bottleGroup = new THREE.Group();
    bottleGroup.position.set(-2.8, 0.32, -6.5);

    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x80deea,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.55
    });
    const corkMat = new THREE.MeshStandardMaterial({ color: 0xa1887f, roughness: 0.9 });
    const parchmentMat = new THREE.MeshStandardMaterial({ color: 0xfff9c4, roughness: 0.8 });

    const bottleBody = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.34, 12), glassMat);
    bottleBody.rotation.z = Math.PI / 3;
    bottleGroup.add(bottleBody);

    const bottleNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.12, 10), glassMat);
    bottleNeck.position.set(0.18, 0.1, 0);
    bottleNeck.rotation.z = Math.PI / 3;
    bottleGroup.add(bottleNeck);

    const cork = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.032, 0.05, 10), corkMat);
    cork.position.set(0.24, 0.13, 0);
    cork.rotation.z = Math.PI / 3;
    bottleGroup.add(cork);

    const scrollInside = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.22, 8), parchmentMat);
    scrollInside.rotation.z = Math.PI / 3;
    bottleGroup.add(scrollInside);

    bottleGroup.userData = {
      isMessageBottle: true,
      targetChapter: 'contact',
      targetProject: 'drift_bottle',
      label: 'Read Drift Bottle Message // 漂流瓶'
    };
    dockGroup.add(bottleGroup);
    this.clickableObjects.push(bottleBody);
    this.messageBottle = bottleGroup;

    // 6. Floating Lotus Blossoms on water
    const lotusMat = new THREE.MeshStandardMaterial({ color: 0xf48fb1, roughness: 0.8 });
    const padMat = new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.9 });
    [[-2.6, -3.0], [2.6, -3.5], [-2.4, -7.0], [2.6, -10.0]].forEach(([lx, lz]) => {
      const pad = new THREE.Mesh(new THREE.CircleGeometry(0.25, 12), padMat);
      pad.rotation.x = -Math.PI / 2;
      pad.position.set(lx, 0.28, lz);
      dockGroup.add(pad);

      const blossom = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.18, 6), lotusMat);
      blossom.position.set(lx, 0.36, lz);
      dockGroup.add(blossom);
    });

    // 7. FLOATING WASHI PAPER LANTERNS (Tōrō Nagashi 燈籠流し)
    const lanternOffsets = [
      [-4.5, -9.0], [4.2, -11.0], [-3.0, -15.0],
      [3.6, -18.0], [-6.0, -23.0], [5.5, -26.0]
    ];
    lanternOffsets.forEach(([ox, oz], lIdx) => {
      const flGroup = new THREE.Group();
      flGroup.position.set(ox, 0.32, oz);

      const raft = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.04, 0.4), woodPlankMat);
      flGroup.add(raft);

      const wBox = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.36, 0.32), new THREE.MeshBasicMaterial({
        color: 0xffe6a3,
        transparent: true,
        opacity: 0.92
      }));
      wBox.position.y = 0.2;
      flGroup.add(wBox);

      const flame = new THREE.PointLight(0xffaa33, 0.8, 4, 1.5);
      flame.position.y = 0.2;
      flGroup.add(flame);
      this.candleLights.push(flame);

      dockGroup.add(flGroup);
      this.floatingLanterns.push({ group: flGroup, phase: lIdx * 1.4 });
    });

    // 8. Floating Distant Sea Torii, Red Solar Disc & Misty Mt. Fuji
    const seaToriiGroup = new THREE.Group();
    seaToriiGroup.position.set(0, 0, -48);
    const toriiMat = new THREE.MeshBasicMaterial({ color: 0x8c2a22 });
    const tCol1 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.46, 8, 8), toriiMat);
    tCol1.position.set(-4.2, 4.0, 0);
    seaToriiGroup.add(tCol1);
    const tCol2 = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.46, 8, 8), toriiMat);
    tCol2.position.set(4.2, 4.0, 0);
    seaToriiGroup.add(tCol2);
    const tLintel = new THREE.Mesh(new THREE.BoxGeometry(11.5, 0.7, 0.8), toriiMat);
    tLintel.position.set(0, 7.8, 0);
    seaToriiGroup.add(tLintel);

    const sunCanvas = document.createElement('canvas');
    sunCanvas.width = 128;
    sunCanvas.height = 128;
    const suctx = sunCanvas.getContext('2d');
    const sGrad = suctx.createRadialGradient(64, 64, 10, 64, 64, 64);
    sGrad.addColorStop(0, '#ff4b3a');
    sGrad.addColorStop(0.7, '#c8102e');
    sGrad.addColorStop(1, 'rgba(200, 16, 46, 0)');
    suctx.fillStyle = sGrad;
    suctx.fillRect(0, 0, 128, 128);

    const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(sunCanvas), transparent: true, opacity: 0.95 }));
    sunSprite.position.set(0, 10.5, -35);
    sunSprite.scale.set(16, 16, 1);
    seaToriiGroup.add(sunSprite);

    const fujiMat = new THREE.MeshBasicMaterial({ color: 0xc8b59e, transparent: true, opacity: 0.65 });
    const fuji = new THREE.Mesh(new THREE.ConeGeometry(24, 15, 4), fujiMat);
    fuji.position.set(0, 6.5, -30);
    fuji.scale.set(1.8, 1.0, 0.6);
    seaToriiGroup.add(fuji);

    const snowCapMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95 });
    const snowCap = new THREE.Mesh(new THREE.ConeGeometry(8, 5.2, 4), snowCapMat);
    snowCap.position.set(0, 11.2, -29.9);
    snowCap.scale.set(1.8, 1.0, 0.6);
    seaToriiGroup.add(snowCap);

    dockGroup.add(seaToriiGroup);
    this.scene.add(dockGroup);
  }

  /* ============================================
     CONNECT ME // 結・連絡船 (Single Moored Master Vessel)
     Dedicated communications vessel moored at the contact pier
     with 4 tactile in-world stations: Email, GitHub, LinkedIn, Resume
     ============================================ */
  buildConnectBoat(dockGroup) {
    const boatGroup = new THREE.Group();
    // Position boat moored on the right side of the pier (pier width is 3.6m, from x=-1.8 to x=+1.8)
    boatGroup.position.set(2.7, 0.30, -6.5);
    dockGroup.add(boatGroup);
    this.connectBoat = boatGroup;
    this.origamiBoat = boatGroup; // Backwards-compat reference

    const hinokiPBR = this.getHinokiWoodTexture();
    const walnutPBR = this.getWalnutWoodTexture();

    const hullWoodMat = new THREE.MeshStandardMaterial({
      color: 0x8a6240,
      roughness: 0.72,
      metalness: 0.05,
      map: hinokiPBR.map,
      bumpMap: hinokiPBR.bumpMap,
      bumpScale: 0.025
    });

    const darkWoodMat = new THREE.MeshStandardMaterial({
      color: 0x382618,
      roughness: 0.78,
      metalness: 0.1,
      map: walnutPBR.map,
      bumpMap: walnutPBR.bumpMap,
      bumpScale: 0.03
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.28
    });

    const ropeMat = new THREE.MeshStandardMaterial({
      color: 0xc4a36e,
      roughness: 0.92
    });

    // Helper for canvas rounded rectangles
    const drawRoundRect = (ctx, x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    // -------------------------------------------------------------
    // 1. BOAT HULL (Wasen 和船 - Japanese Traditional Wooden Skiff)
    // -------------------------------------------------------------
    // Flat bottom planks (keel floor)
    const floorGeo = new THREE.BoxGeometry(1.35, 0.08, 4.0);
    const floorMesh = new THREE.Mesh(floorGeo, hullWoodMat);
    floorMesh.position.set(0, 0.04, 0);
    floorMesh.receiveShadow = true;
    boatGroup.add(floorMesh);

    // Upswept Bow Bottom (Forward toward -Z / Mt. Fuji)
    const bowFloorGeo = new THREE.BoxGeometry(1.15, 0.08, 1.2);
    const bowFloorMesh = new THREE.Mesh(bowFloorGeo, hullWoodMat);
    bowFloorMesh.position.set(0, 0.16, -2.4);
    bowFloorMesh.rotation.x = -0.22;
    boatGroup.add(bowFloorMesh);

    // Upswept Stern Bottom (Aft toward +Z)
    const sternFloorGeo = new THREE.BoxGeometry(1.25, 0.08, 0.8);
    const sternFloorMesh = new THREE.Mesh(sternFloorGeo, hullWoodMat);
    sternFloorMesh.position.set(0, 0.10, 2.2);
    sternFloorMesh.rotation.x = 0.16;
    boatGroup.add(sternFloorMesh);

    // Port Gunwale (Facing the Pier, local x = -0.68)
    const portSideGeo = new THREE.BoxGeometry(0.08, 0.40, 4.4);
    const portSide = new THREE.Mesh(portSideGeo, hullWoodMat);
    portSide.position.set(-0.68, 0.26, 0);
    portSide.rotation.z = -0.12;
    boatGroup.add(portSide);

    const portRailGeo = new THREE.BoxGeometry(0.14, 0.06, 4.7);
    const portRail = new THREE.Mesh(portRailGeo, darkWoodMat);
    portRail.position.set(-0.72, 0.48, 0);
    boatGroup.add(portRail);

    // Starboard Gunwale (Facing open water, local x = +0.68)
    const stbdSideGeo = new THREE.BoxGeometry(0.08, 0.40, 4.4);
    const stbdSide = new THREE.Mesh(stbdSideGeo, hullWoodMat);
    stbdSide.position.set(0.68, 0.26, 0);
    stbdSide.rotation.z = 0.12;
    boatGroup.add(stbdSide);

    const stbdRailGeo = new THREE.BoxGeometry(0.14, 0.06, 4.7);
    const stbdRail = new THREE.Mesh(stbdRailGeo, darkWoodMat);
    stbdRail.position.set(0.72, 0.48, 0);
    boatGroup.add(stbdRail);

    // Bow Prow / Stem Post (Miyata)
    const prowPostGeo = new THREE.CylinderGeometry(0.05, 0.10, 0.85, 4);
    const prowPost = new THREE.Mesh(prowPostGeo, darkWoodMat);
    prowPost.position.set(0, 0.46, -2.85);
    prowPost.rotation.x = -0.38;
    boatGroup.add(prowPost);

    // Bow Foredeck Cover
    const foreDeckGeo = new THREE.BoxGeometry(1.05, 0.06, 0.9);
    const foreDeck = new THREE.Mesh(foreDeckGeo, darkWoodMat);
    foreDeck.position.set(0, 0.42, -2.3);
    boatGroup.add(foreDeck);

    // Stern Transom Board
    const transomGeo = new THREE.BoxGeometry(1.32, 0.44, 0.08);
    const transom = new THREE.Mesh(transomGeo, darkWoodMat);
    transom.position.set(0, 0.32, 2.5);
    boatGroup.add(transom);

    // Traditional Sculling Oar (Ro 櫓) at stern
    const oarShaftGeo = new THREE.CylinderGeometry(0.032, 0.045, 2.2, 8);
    const oarShaft = new THREE.Mesh(oarShaftGeo, hullWoodMat);
    oarShaft.position.set(0.28, 0.20, 3.1);
    oarShaft.rotation.x = 0.62;
    oarShaft.rotation.y = 0.18;
    boatGroup.add(oarShaft);

    const oarBladeGeo = new THREE.BoxGeometry(0.16, 0.02, 0.9);
    const oarBlade = new THREE.Mesh(oarBladeGeo, darkWoodMat);
    oarBlade.position.set(0.44, -0.22, 3.75);
    oarBlade.rotation.x = 0.62;
    oarBlade.rotation.y = 0.18;
    boatGroup.add(oarBlade);

    // Structural Crossbeams (Kawara)
    [-1.7, -0.6, 0.6, 1.7].forEach(bz => {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.06, 0.12), darkWoodMat);
      beam.position.set(0, 0.32, bz);
      boatGroup.add(beam);
    });

    // Deck Floorboards running fore to aft
    for (let dx = -0.48; dx <= 0.48; dx += 0.24) {
      const board = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 3.8), hullWoodMat);
      board.position.set(dx, 0.08, 0);
      boatGroup.add(board);
    }

    // Mooring Cleats on boat gunwale
    [-1.8, 1.8].forEach(cz => {
      const cleatMesh = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.06), brassMat);
      cleatMesh.position.set(-0.72, 0.52, cz);
      boatGroup.add(cleatMesh);
    });

    // Hemp Mooring Ropes Tethering Boat to the Pier
    const fRopeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.72, 0.52, -1.8),
      new THREE.Vector3(-0.92, 0.44, -1.8),
      new THREE.Vector3(-1.10, 0.58, -1.5)
    ]);
    const fRopeMesh = new THREE.Mesh(new THREE.TubeGeometry(fRopeCurve, 10, 0.025, 6, false), ropeMat);
    boatGroup.add(fRopeMesh);

    const rRopeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.72, 0.52, 1.8),
      new THREE.Vector3(-0.92, 0.44, 1.8),
      new THREE.Vector3(-1.10, 0.58, 1.5)
    ]);
    const rRopeMesh = new THREE.Mesh(new THREE.TubeGeometry(rRopeCurve, 10, 0.025, 6, false), ropeMat);
    boatGroup.add(rRopeMesh);

    // -------------------------------------------------------------
    // 2. GOLD-INLAID HULL NAMEPLATE: "CONNECT ME"
    // -------------------------------------------------------------
    const npCanvas = document.createElement('canvas');
    npCanvas.width = 512;
    npCanvas.height = 128;
    const npctx = npCanvas.getContext('2d');
    npctx.fillStyle = '#12100e';
    npctx.fillRect(0, 0, 512, 128);
    // Gold ornamental frame
    npctx.strokeStyle = '#d4af37';
    npctx.lineWidth = 4;
    npctx.strokeRect(6, 6, 500, 116);
    npctx.strokeStyle = '#92722b';
    npctx.lineWidth = 1.5;
    npctx.strokeRect(12, 12, 488, 104);
    // Text
    npctx.fillStyle = '#f59e0b';
    npctx.font = 'bold 44px "Cinzel", "Times New Roman", serif';
    npctx.textAlign = 'center';
    npctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
    npctx.shadowBlur = 10;
    npctx.fillText('CONNECT ME', 256, 58);
    npctx.shadowBlur = 0;
    npctx.fillStyle = '#d4af37';
    npctx.font = 'bold 20px monospace';
    npctx.fillText('結・連絡船 // DISPATCH VESSEL', 256, 96);

    const npTexture = new THREE.CanvasTexture(npCanvas);
    const npMat = new THREE.MeshBasicMaterial({ map: npTexture });
    const nameplate = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.32), npMat);
    nameplate.position.set(-0.76, 0.34, 0);
    nameplate.rotation.y = -Math.PI / 2;
    boatGroup.add(nameplate);

    // -------------------------------------------------------------
    // 3. MAST & HERO "CONNECT ME" SAIL
    // -------------------------------------------------------------
    const mastGeo = new THREE.CylinderGeometry(0.065, 0.085, 3.5, 12);
    const mast = new THREE.Mesh(mastGeo, darkWoodMat);
    mast.position.set(0, 1.82, -0.6);
    boatGroup.add(mast);

    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.18, 8), brassMat);
    collar.position.set(0, 0.28, -0.6);
    boatGroup.add(collar);

    // Yardarm (Upper cross spar)
    const yardGeo = new THREE.CylinderGeometry(0.038, 0.038, 2.3, 8);
    const yard = new THREE.Mesh(yardGeo, darkWoodMat);
    yard.position.set(0, 3.25, -0.6);
    yard.rotation.y = -0.42;
    yard.rotation.z = Math.PI / 2;
    boatGroup.add(yard);

    // Lower Boom Spar
    const boomGeo = new THREE.CylinderGeometry(0.034, 0.034, 2.2, 8);
    const boom = new THREE.Mesh(boomGeo, darkWoodMat);
    boom.position.set(0, 1.25, -0.6);
    boom.rotation.y = -0.42;
    boom.rotation.z = Math.PI / 2;
    boatGroup.add(boom);

    // High-Resolution "CONNECT ME" Sail Canvas Texture
    const sailCanvas = document.createElement('canvas');
    sailCanvas.width = 1024;
    sailCanvas.height = 1024;
    const sctx = sailCanvas.getContext('2d');

    // Ivory washi canvas background
    sctx.fillStyle = '#fbf8f0';
    sctx.fillRect(0, 0, 1024, 1024);

    // Woven paper fiber lines
    sctx.strokeStyle = 'rgba(215, 200, 180, 0.35)';
    sctx.lineWidth = 1;
    for (let y = 0; y < 1024; y += 8) {
      sctx.beginPath();
      sctx.moveTo(0, y);
      sctx.lineTo(1024, y);
      sctx.stroke();
    }
    for (let x = 0; x < 1024; x += 16) {
      sctx.beginPath();
      sctx.moveTo(x, 0);
      sctx.lineTo(x, 1024);
      sctx.stroke();
    }

    // Outer vermilion border
    sctx.strokeStyle = '#b91c1c';
    sctx.lineWidth = 10;
    sctx.strokeRect(24, 24, 976, 976);
    sctx.strokeStyle = '#7f1d1d';
    sctx.lineWidth = 3;
    sctx.strokeRect(40, 40, 944, 944);

    // Top Atelier Banner
    sctx.fillStyle = '#991b1b';
    sctx.font = 'bold 24px monospace';
    sctx.textAlign = 'center';
    sctx.fillText('★  ATELIER NIHAR MEHAKARE  ★', 512, 125);

    // Big Bold Title: CONNECT ME
    sctx.fillStyle = '#1c1917';
    sctx.font = '900 84px "Cinzel", "Georgia", serif';
    sctx.shadowColor = 'rgba(185, 28, 28, 0.4)';
    sctx.shadowBlur = 12;
    sctx.fillText('CONNECT ME', 512, 250);
    sctx.shadowBlur = 0;

    // Japanese Subtitle: 結 ・ 連 絡 船
    sctx.fillStyle = '#b91c1c';
    sctx.font = 'bold 48px "Noto Serif JP", serif';
    sctx.fillText('結 ・ 連 絡 船', 512, 330);

    // Dividing Brush Stroke Line
    sctx.fillStyle = '#d4af37';
    sctx.fillRect(212, 370, 600, 4);
    sctx.beginPath();
    sctx.arc(512, 372, 9, 0, Math.PI * 2);
    sctx.fillStyle = '#b91c1c';
    sctx.fill();

    // Subtitle & Purpose
    sctx.fillStyle = '#292524';
    sctx.font = 'bold 28px monospace';
    sctx.fillText('OFFICIAL DISPATCH & COMMUNICATIONS', 512, 425);

    sctx.fillStyle = '#57534e';
    sctx.font = '22px sans-serif';
    sctx.fillText('Click any station on deck or this vessel to open connection channels', 512, 475);

    // 4 Channel Badges on Sail
    const badges = [
      { text: '✉ EMAIL', sub: 'Direct Message', col: '#e11d48', x: 210, y: 600 },
      { text: '🐙 GITHUB', sub: '@nhr-09 (15+ Repos)', col: '#06b6d4', x: 410, y: 600 },
      { text: '💼 LINKEDIN', sub: 'Professional Network', col: '#0284c7', x: 610, y: 600 },
      { text: '📜 RESUME', sub: 'Official CV Dossier', col: '#d97706', x: 810, y: 600 }
    ];

    badges.forEach(b => {
      sctx.fillStyle = '#1c1917';
      drawRoundRect(sctx, b.x - 85, b.y - 45, 170, 95, 12);
      sctx.fill();
      sctx.strokeStyle = b.col;
      sctx.lineWidth = 3;
      sctx.stroke();

      sctx.fillStyle = b.col;
      sctx.font = 'bold 22px monospace';
      sctx.fillText(b.text, b.x, b.y - 12);

      sctx.fillStyle = '#e2e8f0';
      sctx.font = '13px monospace';
      sctx.fillText(b.sub, b.x, b.y + 18);

      sctx.fillStyle = b.col;
      sctx.font = 'bold 12px monospace';
      sctx.fillText('[ CLICK ON DECK ]', b.x, b.y + 36);
    });

    // Hanko Artist Seal Stamp (Red square seal)
    sctx.fillStyle = '#dc2626';
    sctx.fillRect(860, 840, 90, 90);
    sctx.strokeStyle = '#ffffff';
    sctx.lineWidth = 3;
    sctx.strokeRect(866, 846, 78, 78);
    sctx.fillStyle = '#ffffff';
    sctx.font = 'bold 36px "Noto Serif JP", serif';
    sctx.fillText('結', 905, 902);

    const sailTexture = new THREE.CanvasTexture(sailCanvas);
    const sailMat = new THREE.MeshStandardMaterial({
      map: sailTexture,
      roughness: 0.85,
      side: THREE.DoubleSide
    });

    // Create sail mesh with subtle billowing curve
    const sailGeo = new THREE.PlaneGeometry(2.1, 2.0, 16, 16);
    const posAttr = sailGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const u = (posAttr.getX(i) / 2.1) + 0.5;
      const v = (posAttr.getY(i) / 2.0) + 0.5;
      const curve = Math.sin(u * Math.PI) * Math.sin(v * Math.PI) * 0.16;
      posAttr.setZ(i, curve);
    }
    sailGeo.computeVertexNormals();

    const sail = new THREE.Mesh(sailGeo, sailMat);
    sail.position.set(0, 2.25, -0.6);
    sail.rotation.y = -0.42;
    boatGroup.add(sail);

    // Rigging cords from masthead to sides
    [[-0.68, 0], [0.68, 0], [0, 2.3]].forEach(([rx, rz]) => {
      const rigCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 3.45, -0.6),
        new THREE.Vector3(rx, 0.48, rz)
      ]);
      const rig = new THREE.Mesh(new THREE.TubeGeometry(rigCurve, 8, 0.012, 4, false), ropeMat);
      boatGroup.add(rig);
    });

    // -------------------------------------------------------------
    // 4. STERN AMBER MARITIME LANTERN
    // -------------------------------------------------------------
    const davitGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
    const davit = new THREE.Mesh(davitGeo, darkWoodMat);
    davit.position.set(0, 0.72, 2.35);
    boatGroup.add(davit);

    const boatLantern = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.32, 8), brassMat);
    boatLantern.position.set(0, 1.15, 2.35);
    boatGroup.add(boatLantern);

    const boatLanternLight = new THREE.PointLight(0xffa834, 1.6, 9, 1.5);
    boatLanternLight.position.set(0, 1.15, 2.35);
    boatGroup.add(boatLanternLight);
    this.candleLights.push(boatLanternLight);

    // -------------------------------------------------------------
    // 5. HELPER: CREATE INTERACTIVE DECK STATION PLAQUE
    // -------------------------------------------------------------
    const createDeckPlaque = (title, sub, detail, cta, borderColor) => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 512;
      pCanvas.height = 256;
      const pctx = pCanvas.getContext('2d');

      // Deep dark lacquer background
      pctx.fillStyle = '#0f1117';
      pctx.fillRect(0, 0, 512, 256);

      // Glowing border
      pctx.strokeStyle = borderColor;
      pctx.lineWidth = 5;
      pctx.strokeRect(8, 8, 496, 240);
      pctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      pctx.lineWidth = 1.5;
      pctx.strokeRect(16, 16, 480, 224);

      // Title
      pctx.fillStyle = borderColor;
      pctx.font = 'bold 36px "Cinzel", "Georgia", serif';
      pctx.textAlign = 'center';
      pctx.shadowColor = borderColor;
      pctx.shadowBlur = 8;
      pctx.fillText(title, 256, 68);
      pctx.shadowBlur = 0;

      // Subtitle
      pctx.fillStyle = '#ffffff';
      pctx.font = 'bold 26px monospace';
      pctx.fillText(sub, 256, 120);

      // Detail
      pctx.fillStyle = '#94a3b8';
      pctx.font = '18px sans-serif';
      pctx.fillText(detail, 256, 164);

      // CTA Button
      pctx.fillStyle = borderColor;
      pctx.font = 'bold 22px monospace';
      pctx.fillText(`[ ${cta} ]`, 256, 212);

      const texture = new THREE.CanvasTexture(pCanvas);
      const plaqueMat = new THREE.MeshBasicMaterial({ map: texture });
      const plaque = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.24), plaqueMat);

      // Miniature wooden easel backing
      const easel = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.26, 0.04), darkWoodMat);
      easel.position.z = -0.022;
      plaque.add(easel);

      return plaque;
    };

    // -------------------------------------------------------------
    // STATION 1 (AFT DECK): ✉ DIRECT MESSAGE / EMAIL (連絡)
    // -------------------------------------------------------------
    const emailStation = new THREE.Group();
    emailStation.position.set(0, 0.12, 1.4);
    boatGroup.add(emailStation);

    // Letter dispatch chest with brass corners
    const chestGeo = new THREE.BoxGeometry(0.38, 0.22, 0.30);
    const chest = new THREE.Mesh(chestGeo, darkWoodMat);
    chest.position.set(0.18, 0.11, 0);
    emailStation.add(chest);

    const chestLid = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.38, 8, 1, false, 0, Math.PI), darkWoodMat);
    chestLid.rotation.z = Math.PI / 2;
    chestLid.position.set(0.18, 0.22, 0);
    emailStation.add(chestLid);

    // Crimson wax seal & folded parchment letter
    const letter = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.16), new THREE.MeshStandardMaterial({ color: 0xfffbf0, roughness: 0.9 }));
    letter.position.set(0.18, 0.24, 0);
    emailStation.add(letter);

    const waxSeal = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.015, 8), new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.4 }));
    waxSeal.position.set(0.18, 0.255, 0);
    emailStation.add(waxSeal);

    // Email Plaque on Port side facing pier
    const emailPlaque = createDeckPlaque('✉ EMAIL', 'niharmehakare@gmail.com', 'Direct Message & Collaboration', 'CLICK TO WRITE ↗', '#f43f5e');
    emailPlaque.position.set(-0.25, 0.42, 0);
    emailPlaque.rotation.y = -Math.PI / 2;
    emailPlaque.rotation.x = -0.32;
    emailStation.add(emailPlaque);

    const emailLight = new THREE.PointLight(0xf43f5e, 1.2, 3.5, 1.6);
    emailLight.position.set(-0.1, 0.45, 0);
    emailStation.add(emailLight);

    const emailData = {
      targetChapter: 'contact',
      targetAction: 'email',
      label: '✉ EMAIL: Send Direct Message (niharmehakare@gmail.com)'
    };
    emailStation.userData = emailData;
    emailPlaque.userData = emailData;
    chest.userData = emailData;
    letter.userData = emailData;
    this.clickableObjects.push(emailPlaque, chest, letter);

    // -------------------------------------------------------------
    // STATION 2 (MID-AFT DECK): 🐙 GITHUB REPOSITORY VAULT (開発倉庫)
    // -------------------------------------------------------------
    const githubStation = new THREE.Group();
    githubStation.position.set(0, 0.12, 0.45);
    boatGroup.add(githubStation);

    // Carved dark stone pedestal
    const ghPedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.32, 8), new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.85 }));
    ghPedestal.position.set(0.18, 0.16, 0);
    githubStation.add(ghPedestal);

    // Armillary sphere with brass rings
    [0.15, 0.12, 0.09].forEach((rad, idx) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(rad, 0.015, 6, 16), brassMat);
      ring.position.set(0.18, 0.40, 0);
      ring.rotation.x = idx * 0.7;
      ring.rotation.y = idx * 0.9;
      githubStation.add(ring);
    });

    // Glowing cyan core crystal
    const ghCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.065), new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
    ghCore.position.set(0.18, 0.40, 0);
    githubStation.add(ghCore);

    // GitHub Plaque on Port side facing pier
    const ghPlaque = createDeckPlaque('🐙 GITHUB', '@nhr-09', '15+ Public Repositories & Code', 'VIEW REPOSITORIES ↗', '#06b6d4');
    ghPlaque.position.set(-0.25, 0.42, 0);
    ghPlaque.rotation.y = -Math.PI / 2;
    ghPlaque.rotation.x = -0.32;
    githubStation.add(ghPlaque);

    const ghLight = new THREE.PointLight(0x06b6d4, 1.4, 3.5, 1.6);
    ghLight.position.set(-0.1, 0.45, 0);
    githubStation.add(ghLight);

    const ghData = {
      targetChapter: 'contact',
      targetAction: 'github',
      label: '🐙 GITHUB: Explore 15+ Repositories (@nhr-09)'
    };
    githubStation.userData = ghData;
    ghPlaque.userData = ghData;
    ghPedestal.userData = ghData;
    ghCore.userData = ghData;
    this.clickableObjects.push(ghPlaque, ghPedestal, ghCore);

    // -------------------------------------------------------------
    // STATION 3 (MID-FORE DECK): 💼 LINKEDIN PROFESSIONAL NETWORK (人脈)
    // -------------------------------------------------------------
    const linkedinStation = new THREE.Group();
    linkedinStation.position.set(0, 0.12, -0.65);
    boatGroup.add(linkedinStation);

    // Polished brass pedestal post
    const liPost = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.14, 0.36, 10), brassMat);
    liPost.position.set(0.18, 0.18, 0);
    linkedinStation.add(liPost);

    // Perched metallic origami crane in electric sapphire blue
    const cranePerchMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.75,
      roughness: 0.25
    });
    const craneGroup = new THREE.Group();
    craneGroup.position.set(0.18, 0.44, 0);
    craneGroup.rotation.y = -Math.PI / 4;

    const craneBody = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.32, 4), cranePerchMat);
    craneBody.rotation.x = Math.PI / 3;
    craneGroup.add(craneBody);

    [-0.15, 0.15].forEach(wx => {
      const wing = new THREE.Mesh(new THREE.BufferGeometry(), cranePerchMat);
      const wVerts = new Float32Array([
        0, 0, 0,
        wx, 0.14, -0.08,
        0, 0, -0.22
      ]);
      wing.geometry.setAttribute('position', new THREE.BufferAttribute(wVerts, 3));
      craneGroup.add(wing);
    });
    linkedinStation.add(craneGroup);
    this.origamiCrane = craneGroup;

    // LinkedIn Plaque on Port side facing pier
    const liPlaque = createDeckPlaque('💼 LINKEDIN', 'in/nihar-mehakare', 'Professional Network & Experience', 'CONNECT WITH ME ↗', '#38bdf8');
    liPlaque.position.set(-0.25, 0.42, 0);
    liPlaque.rotation.y = -Math.PI / 2;
    liPlaque.rotation.x = -0.32;
    linkedinStation.add(liPlaque);

    const liLight = new THREE.PointLight(0x0284c7, 1.4, 3.5, 1.6);
    liLight.position.set(-0.1, 0.45, 0);
    linkedinStation.add(liLight);

    const liData = {
      targetChapter: 'contact',
      targetAction: 'linkedin',
      label: '💼 LINKEDIN: Connect with Nihar Mehakare'
    };
    linkedinStation.userData = liData;
    liPlaque.userData = liData;
    craneBody.userData = liData;
    liPost.userData = liData;
    this.clickableObjects.push(liPlaque, craneBody, liPost);

    // -------------------------------------------------------------
    // STATION 4 (FORE DECK): 📜 OFFICIAL RESUME / CV ARCHIVE (履歴書)
    // -------------------------------------------------------------
    const resumeStation = new THREE.Group();
    resumeStation.position.set(0, 0.12, -1.65);
    boatGroup.add(resumeStation);

    // Curved ceremonial wooden scroll cradle (Makimono-kake)
    const standMat = new THREE.MeshStandardMaterial({ color: 0x221a14, roughness: 0.8 });
    const standBase = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.05, 0.22), standMat);
    standBase.position.set(0.18, 0.06, 0);
    resumeStation.add(standBase);

    [-0.16, 0.16].forEach(sx => {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.18), standMat);
      arm.position.set(0.18 + sx, 0.17, 0);
      resumeStation.add(arm);
    });

    // High-gloss black lacquer canister (巻物筒 - Makimono Tsutsu) with gold inlays
    const scrollTubeMat = new THREE.MeshStandardMaterial({
      color: 0x100e0c,
      roughness: 0.15,
      metalness: 0.4
    });
    const scrollTube = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.65, 16), scrollTubeMat);
    scrollTube.rotation.z = Math.PI / 2;
    scrollTube.position.set(0.18, 0.26, 0);
    resumeStation.add(scrollTube);

    // Gold-leaf caps on tube ends
    [-0.33, 0.33].forEach(cx => {
      const tubeCap = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.05, 16), brassMat);
      tubeCap.rotation.z = Math.PI / 2;
      tubeCap.position.set(0.18 + cx, 0.26, 0);
      resumeStation.add(tubeCap);
    });

    // Crimson silk cord & golden tassel
    const cordMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.6 });
    const cord = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.012, 6, 16), cordMat);
    cord.rotation.y = Math.PI / 2;
    cord.position.set(0.18, 0.26, 0);
    resumeStation.add(cord);

    const tassel = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.12, 6), new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.5 }));
    tassel.position.set(0.18, 0.18, 0.07);
    resumeStation.add(tassel);

    // Resume Plaque on Port side facing pier
    const cvPlaque = createDeckPlaque('📜 RESUME // CV', 'Official Dossier', 'VIT Pune • AI / Distributed Systems', 'DOWNLOAD CV [PDF] ↓', '#f59e0b');
    cvPlaque.position.set(-0.25, 0.42, 0);
    cvPlaque.rotation.y = -Math.PI / 2;
    cvPlaque.rotation.x = -0.32;
    resumeStation.add(cvPlaque);

    const cvLight = new THREE.PointLight(0xf59e0b, 1.4, 3.5, 1.6);
    cvLight.position.set(-0.1, 0.45, 0);
    resumeStation.add(cvLight);

    const cvData = {
      targetChapter: 'contact',
      targetAction: 'resume',
      label: '📜 RESUME: Download Official Curriculum Vitae (PDF)'
    };
    resumeStation.userData = cvData;
    cvPlaque.userData = cvData;
    scrollTube.userData = cvData;
    standBase.userData = cvData;
    this.clickableObjects.push(cvPlaque, scrollTube, standBase);

    // -------------------------------------------------------------
    // MASTER BOAT INTERACTION (Clicking Hull, Sail, or Mast)
    // -------------------------------------------------------------
    const masterBoatData = {
      targetChapter: 'contact',
      targetProject: 'connect_boat',
      label: '⛵ BOAT: "CONNECT ME" (Click to View All Channels)'
    };
    boatGroup.userData = masterBoatData;
    floorMesh.userData = masterBoatData;
    bowFloorMesh.userData = masterBoatData;
    portRail.userData = masterBoatData;
    stbdRail.userData = masterBoatData;
    mast.userData = masterBoatData;
    sail.userData = masterBoatData;
    nameplate.userData = masterBoatData;
    this.clickableObjects.push(floorMesh, bowFloorMesh, portRail, stbdRail, mast, sail, nameplate);

    return boatGroup;
  }

  /* ============================================
     PARTICLE FX: SAKURA, FIREFLIES, INCENSE & STEAM
     ============================================ */
  buildSakuraParticles() {
    const count = this.isMobile ? 70 : 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const swayPhases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = Math.random() * 14 + 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
      speeds[i] = 0.015 + Math.random() * 0.025;
      swayPhases[i] = Math.random() * Math.PI * 2;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#e88892';
    ctx.beginPath();
    ctx.ellipse(16, 16, 12, 6, Math.PI / 4, 0, Math.PI * 2);
    ctx.fill();

    const petalTexture = new THREE.CanvasTexture(canvas);
    const material = new THREE.PointsMaterial({
      size: 0.3,
      map: petalTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });

    this.sakuraParticles = new THREE.Points(geometry, material);
    this.sakuraParticles.userData = { speeds, swayPhases };
    this.scene.add(this.sakuraParticles);
  }

  buildHotaruParticles() {
    const count = this.isMobile ? 25 : 65;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 1] = 0.6 + Math.random() * 4.2;
      positions[i * 3 + 2] = -4 - Math.random() * 32;
      phases[i] = Math.random() * Math.PI * 2;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 2, 16, 16, 16);
    grad.addColorStop(0, '#ffff88');
    grad.addColorStop(0.4, '#a8e063');
    grad.addColorStop(1, 'rgba(168,224,99,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    const hotaruMat = new THREE.PointsMaterial({
      size: 0.44,
      map: new THREE.CanvasTexture(canvas),
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.hotaruParticles = new THREE.Points(geometry, hotaruMat);
    this.hotaruParticles.userData = { phases };
    this.scene.add(this.hotaruParticles);
  }

  buildIncenseSmokeParticles() {
    const count = 35;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = -11.7 + (Math.random() - 0.5) * 0.15;
      pos[i * 3 + 1] = 1.6 + Math.random() * 1.5;
      pos[i * 3 + 2] = -9.3 + (Math.random() - 0.5) * 0.15;
      speeds[i] = 0.008 + Math.random() * 0.012;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const smokeMat = new THREE.PointsMaterial({
      size: 0.22,
      color: 0x999999,
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    });

    this.incenseSmoke = new THREE.Points(geo, smokeMat);
    this.incenseSmoke.userData = { speeds };
    this.scene.add(this.incenseSmoke);
  }

  buildCoffeeSteamParticles() {
    const count = 25;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = 13.85 + (Math.random() - 0.5) * 0.12;
      pos[i * 3 + 1] = 1.7 + Math.random() * 0.8;
      pos[i * 3 + 2] = -23.2 + (Math.random() - 0.5) * 0.12;
      speeds[i] = 0.007 + Math.random() * 0.01;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const steamMat = new THREE.PointsMaterial({
      size: 0.18,
      color: 0xdddddd,
      transparent: true,
      opacity: 0.28,
      depthWrite: false
    });

    this.coffeeSteam = new THREE.Points(geo, steamMat);
    this.coffeeSteam.userData = { speeds };
    this.scene.add(this.coffeeSteam);
  }

  buildWaterSplashParticles() {
    const count = 30;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = -9.2;
      pos[i * 3 + 1] = 0.15;
      pos[i * 3 + 2] = -27.05;
      vel[i * 3] = (Math.random() - 0.5) * 0.05;
      vel[i * 3 + 1] = 0.04 + Math.random() * 0.08;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const splashMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x90caf9,
      transparent: true,
      opacity: 0.65,
      depthWrite: false
    });

    this.waterSplash = new THREE.Points(geo, splashMat);
    this.waterSplash.userData = { vel, active: false, timer: 0 };
    this.scene.add(this.waterSplash);
  }

  /* ============================================
     PARTICLE FX: ELDEN RING SITE OF GRACE GOLDEN EMBERS (祝福の粒子)
     ============================================ */
  buildEldenGraceParticles() {
    const count = 45;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    const radii = new Float32Array(count);

    // Site of Grace located at (45.9, 0.22, -28.2) in Gaming Dojo
    const centerX = 45.9;
    const centerZ = -28.2;

    for (let i = 0; i < count; i++) {
      phases[i] = Math.random() * Math.PI * 2;
      radii[i] = 0.08 + Math.random() * 0.35;
      speeds[i] = 0.008 + Math.random() * 0.015;
      pos[i * 3] = centerX + Math.cos(phases[i]) * radii[i];
      pos[i * 3 + 1] = 0.45 + Math.random() * 2.2;
      pos[i * 3 + 2] = centerZ + Math.sin(phases[i]) * radii[i];
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const gCanvas = document.createElement('canvas');
    gCanvas.width = 32;
    gCanvas.height = 32;
    const gctx = gCanvas.getContext('2d');
    const grad = gctx.createRadialGradient(16, 16, 2, 16, 16, 16);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#ffea75');
    grad.addColorStop(0.7, '#d4af37');
    grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 32, 32);

    const graceMat = new THREE.PointsMaterial({
      size: 0.18,
      map: new THREE.CanvasTexture(gCanvas),
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.eldenGraceParticles = new THREE.Points(geo, graceMat);
    this.eldenGraceParticles.userData = { speeds, phases, radii, centerX, centerZ };
    this.scene.add(this.eldenGraceParticles);
  }

  /* ============================================
     TIME-OF-DAY ATMOSPHERE ILLUMINATION (昼・夕・夜)
     ============================================ */
  setTimeOfDay(mode) {
    this.timeOfDay = mode;
    const todBtn = document.getElementById('webgl-tod-btn');
    if (todBtn) {
      const icon = todBtn.querySelector('.tod-icon');
      const label = todBtn.querySelector('.tod-label');
      if (mode === 'day') {
        if (icon) icon.textContent = '☀️';
        if (label) label.textContent = 'DAY';
      } else if (mode === 'dusk') {
        if (icon) icon.textContent = '🌇';
        if (label) label.textContent = 'DUSK';
      } else if (mode === 'night') {
        if (icon) icon.textContent = '🌙';
        if (label) label.textContent = 'NIGHT';
      }
    }

    if (mode === 'day') {
      this.scene.fog.color.setHex(0xf6ede0);
      if (this.ambientLight) {
        this.ambientLight.color.setHex(0xfcf6eb);
        this.ambientLight.intensity = 0.95;
      }
      if (this.sunLight) {
        this.sunLight.color.setHex(0xfff5e4);
        this.sunLight.intensity = 1.35;
      }
      this.candleLights.forEach(l => l.intensity = 1.0);
    } else if (mode === 'dusk') {
      this.scene.fog.color.setHex(0xe8c8a8);
      if (this.ambientLight) {
        this.ambientLight.color.setHex(0xcaa090);
        this.ambientLight.intensity = 0.75;
      }
      if (this.sunLight) {
        this.sunLight.color.setHex(0xff6b4a);
        this.sunLight.intensity = 1.1;
      }
      this.candleLights.forEach(l => l.intensity = 1.8);
    } else if (mode === 'night') {
      this.scene.fog.color.setHex(0x121724);
      if (this.ambientLight) {
        this.ambientLight.color.setHex(0x222838);
        this.ambientLight.intensity = 0.45;
      }
      if (this.sunLight) {
        this.sunLight.color.setHex(0x8aa8d8);
        this.sunLight.intensity = 0.65;
      }
      this.candleLights.forEach(l => l.intensity = 2.4);
    }

    if (this.audioEngine) this.audioEngine.playFurinChime();
  }

  cycleTimeOfDay() {
    const cycle = ['day', 'dusk', 'night'];
    const nextIdx = (cycle.indexOf(this.timeOfDay) + 1) % cycle.length;
    this.setTimeOfDay(cycle[nextIdx]);
  }

  /* ============================================
     DIEGETIC IN-SCENE INSPECTION MODAL (In-World Preview)
     ============================================ */
  showDiegeticInspection(targetChapter, targetProject) {
    const modal = document.getElementById('webgl-diegetic-modal');
    if (!modal) return;

    const titleEl = document.getElementById('diegetic-title');
    const descEl = document.getElementById('diegetic-desc');
    const codeEl = document.getElementById('diegetic-code');
    const sealEl = document.getElementById('diegetic-seal');
    const metricsEl = document.getElementById('diegetic-metrics');
    const testBtn = document.getElementById('diegetic-test-btn');
    const expandBtn = document.getElementById('diegetic-expand-btn');

    const projectData = {
      architech: {
        seal: '構', code: 'PRJ_01 // AST ENGINE',
        title: 'ARCHITECH KNOWLEDGE GRAPH',
        desc: 'Automated abstract syntax tree extraction with recursive sub-graph query optimization in Python & Neo4j.',
        metrics: [
          { val: '60 FPS', lbl: 'Graph Latency' },
          { val: '1,420', lbl: 'AST Nodes' },
          { val: 'Neo4j', lbl: 'Storage Engine' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playTerminalBeep();
          alert('⚡ ARCHITECH: AST Knowledge Graph nodes verified. Query response: 12ms // Status: 200 OK');
        }
      },
      eventix: {
        seal: '券', code: 'PRJ_02 // SOLANA PROTOCOL',
        title: 'EVENTIX DECENTRALIZED TICKETING',
        desc: 'Dynamic bonding curve ticketing protocol on Solana Devnet with anti-scalping cryptographic verification.',
        metrics: [
          { val: '400ms', lbl: 'Finality Time' },
          { val: 'Anchor', lbl: 'Framework' },
          { val: '0.001 SOL', lbl: 'Gas Fee' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playTerminalBeep();
          alert('⚡ EVENTIX: Anchor devnet connection established. Signature hash valid.');
        }
      },
      agrisaksham: {
        seal: '農', code: 'PRJ_03 // VISION AI',
        title: 'AGRISAKSHAM CROP PATHOLOGY',
        desc: 'Edge-optimized YOLOv8 diagnostic computer vision model classifying crop blight with 98.4% precision.',
        metrics: [
          { val: '98.4%', lbl: 'Detection Precision' },
          { val: '14ms', lbl: 'Inference Latency' },
          { val: 'YOLOv8', lbl: 'Neural Backbone' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playTerminalBeep();
          alert('⚡ AGRISAKSHAM: YOLOv8 inference pipeline active. Confidence: 98.4% OK');
        }
      },
      agentswarm: {
        seal: '群', code: 'PRJ_04 // MULTI-AGENT',
        title: 'AUTONOMOUS REASONING SWARM',
        desc: 'Multi-agent orchestration ring coordinating LangGraph tasks with Groq Llama 3 high-throughput inference.',
        metrics: [
          { val: '750 tps', lbl: 'Groq Token Stream' },
          { val: '4 Agents', lbl: 'Consensus Ring' },
          { val: 'LangGraph', lbl: 'State Engine' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playTerminalBeep();
          alert('⚡ AGENT SWARM: Consensus verified across 4 worker agents.');
        }
      },
      drift_bottle: {
        seal: '心', code: 'DISPATCH // 漂流瓶',
        title: 'FOUNDER DRIFT BOTTLE DISPATCH',
        desc: '“To construct artificial intelligence is to carve water with stone—it demands reverence for fundamental laws and the courage to engineer without precedent.”',
        metrics: [
          { val: 'AI Vanguard', lbl: 'Core Thesis' },
          { val: 'Autonomous', lbl: 'Agent Swarms' },
          { val: 'Pune / Global', lbl: 'Station' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playPaperRustle();
          alert('📜 Drift Bottle: Dispatch received from Nihar Mehakare: "Let us build systems that expand human potential."');
        }
      },
      tea_hearth: {
        seal: '茶', code: 'IRORI // 囲炉裏',
        title: 'TRADITIONAL ZEN TEA HEARTH',
        desc: 'Simmering cast-iron Tetsubin kettle over volcanic ash embers. A moment of quiet reflection amidst recursive compilation.',
        metrics: [
          { val: 'Uji Matcha', lbl: 'Ceremonial' },
          { val: 'Cast Iron', lbl: 'Tetsubin' },
          { val: 'Charcoal', lbl: 'Binchōtan' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playKettleSizzle();
          alert('🍵 A bowl of freshly whisked ceremonial matcha has been served. "虚心坦懐" (Open heart, clear mind).');
        }
      },
      about_skills: {
        seal: '技', code: 'SKILLS // 技能目録',
        title: 'TECHNICAL ARSENAL & PROFICIENCY',
        desc: 'Comprehensive mastery across Java, Python, Spring Boot, PyTorch, RAG Pipelines, Vector Search, and High-Throughput Backends.',
        metrics: [
          { val: 'Python & Java', lbl: 'Core Stack' },
          { val: 'PyTorch / RAG', lbl: 'AI Frameworks' },
          { val: 'Spring / SQL', lbl: 'Distributed' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playFurinChime();
          if (window.openAbout) window.openAbout('journal-sec-3');
        }
      },
      about_education: {
        seal: '学', code: 'ACADEMICS // 学歴',
        title: 'VIT PUNE COMPUTER ENGINEERING',
        desc: 'Bachelor of Technology in Computer Science & Engineering (AI & ML) at Vishwakarma Institute of Technology, Pune.',
        metrics: [
          { val: '9.13 CGPA', lbl: 'Academic Merit' },
          { val: 'VIT Pune', lbl: 'Institution' },
          { val: 'Top 1%', lbl: 'Percentile' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playTempleGong(140);
          if (window.openAbout) window.openAbout('journal-sec-2');
        }
      },
      about_leadership: {
        seal: '導', code: 'LEADERSHIP // 統率',
        title: 'ENGINEERING LEADERSHIP & MANIFESTO',
        desc: 'Directing AI engineering teams, mentoring developer cohorts, and architecting solutions recognized at Smart India Hackathon.',
        metrics: [
          { val: 'SIH Finalist', lbl: 'National Rank' },
          { val: 'AI Team Lead', lbl: 'Industry Role' },
          { val: 'CSM Head', lbl: 'Coding Club' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playTempleGong(160);
          if (window.openAbout) window.openAbout('journal-sec-4');
        }
      },
      spotify_turntable: {
        seal: '音', code: 'HI-FI // 音響レコード',
        title: 'SPOTIFY HIGH-FIDELITY VINYL TURNTABLE',
        desc: 'Analog acoustic sanctuary featuring direct live sync with Nihar’s Spotify listening data, vacuum tube analog amplification, and vinyl microgrooves.',
        metrics: [
          { val: '320 kbps', lbl: 'Audio Stream' },
          { val: '14 Bands', lbl: 'Spectrum EQ' },
          { val: '33⅓ RPM', lbl: 'Platter Speed' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playVinylChord();
          if (window.openSpotifyOverlay) window.openSpotifyOverlay();
        }
      },
      gaming_arcade: {
        seal: '遊', code: 'ARCADE // 電脳筐体',
        title: 'NEO-PUNE TACTICAL ARCADE CABINET',
        desc: 'High-stress tactical FPS clutch discipline, split-second utility timing, and crisp crosshair mechanics on 240Hz esports displays.',
        metrics: [
          { val: '1,400+ hrs', lbl: 'Valorant' },
          { val: 'Ascendant 1', lbl: 'Peak Rank' },
          { val: '0.5 ms', lbl: 'Input Latency' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playArcadeChirp();
          if (window.openGamingOverlay) window.openGamingOverlay();
        }
      },
      valorant_spike: {
        seal: '核', code: 'RADIANT // スパイク',
        title: 'RADIANT SPIKE ENERGY CORE',
        desc: 'Geometric tactical defuse core forged from pure Radiant energy shards. High clutch focus and site retake precision.',
        metrics: [
          { val: '45s', lbl: 'Detonation Fuse' },
          { val: '7s', lbl: 'Defuse Window' },
          { val: 'Ascendant', lbl: 'Tier Class' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playTerminalBeep();
          alert('⚡ RADIANT CORE: Tactical defuse simulation verified. Ascendant 1 combat rating.');
        }
      },
      elden_grace: {
        seal: '祝', code: 'GRACE // 祝福の光',
        title: 'SITE OF LOST GRACE (祝福)',
        desc: '“Touch lost grace. Golden rays guide the Tarnished through punishing pattern recognition and spatial architectural bosses.”',
        metrics: [
          { val: '185 hrs', lbl: 'Playtime' },
          { val: '100%', lbl: 'Achievements' },
          { val: 'Shadow', lbl: 'Erdtree Conquered' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playGraceChime();
          alert('✨ SITE OF GRACE DISCOVERED: Rest and reflect. "Hesitation is defeat."');
        }
      },
      cyberpunk_station: {
        seal: '電', code: 'CYBER // 電脳要塞',
        title: 'CYBERPUNK 2077 SAMURAI RIG',
        desc: 'Ray-traced Night City transhumanist battlestation with liquid-cooled custom computing and holographic Samurai Oni optics.',
        metrics: [
          { val: '120 hrs', lbl: 'Night City' },
          { val: '4K HDR', lbl: 'Ray Tracing' },
          { val: 'All Endings', lbl: 'Phantom Liberty' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playArcadeChirp();
          if (window.openGamingOverlay) window.openGamingOverlay();
        }
      },
      connect_boat: {
        seal: '結', code: 'VESSEL // 連絡船',
        title: 'CONNECT ME // DISPATCH VESSEL',
        desc: 'Official communications vessel of Nihar Mehakare. Direct access to developer channels, repositories, professional network, and official credentials.',
        metrics: [
          { val: 'Direct', lbl: 'Email / Message' },
          { val: '15+ Repos', lbl: 'GitHub Vault' },
          { val: 'Open', lbl: 'Collaborations' }
        ],
        testAction: () => {
          if (this.audioEngine) this.audioEngine.playPaperRustle();
          if (window.openContact) window.openContact();
        }
      }
    };

    const data = projectData[targetProject] || {
      seal: '略', code: 'ATELIER // DOSSIER',
      title: 'NIHAR MEHAKARE ATELIER',
      desc: 'AI/ML Engineering, Distributed Systems, and High-Performance Spatial Architectures.',
      metrics: [
        { val: 'B.Tech', lbl: 'VIT Pune 2026' },
        { val: 'Team Lead', lbl: 'AI Industry' },
        { val: 'Top 1%', lbl: 'Hackathon Rank' }
      ],
      testAction: () => {
        if (this.audioEngine) this.audioEngine.playTempleGong();
      }
    };

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (codeEl) codeEl.textContent = data.code;
    if (sealEl) sealEl.textContent = data.seal;

    if (metricsEl) {
      metricsEl.innerHTML = data.metrics.map(m => `
        <div class="d-metric"><span class="d-val">${m.val}</span><span class="d-lbl">${m.lbl}</span></div>
      `).join('');
    }

    if (testBtn) {
      testBtn.onclick = () => data.testAction();
    }

    if (expandBtn) {
      expandBtn.onclick = () => {
        modal.classList.remove('active');
        if (targetChapter === 'projects' && window.openProjects) window.openProjects();
        else if (targetChapter === 'gaming' && window.openGamingOverlay) window.openGamingOverlay();
        else if (targetChapter === 'spotify' && window.openSpotifyOverlay) window.openSpotifyOverlay();
        else if (targetChapter === 'about') {
          let sub = null;
          if (targetProject === 'about_skills') sub = 'journal-sec-3';
          else if (targetProject === 'about_education') sub = 'journal-sec-2';
          else if (targetProject === 'about_leadership') sub = 'journal-sec-4';
          if (window.openAbout) window.openAbout(sub);
        }
        else if (targetChapter === 'experience' && window.openExperience) window.openExperience();
        else if (targetChapter === 'contact' && window.openContact) window.openContact();
      };
    }

    modal.classList.add('active');
    if (this.audioEngine) this.audioEngine.playPaperRustle();
  }

  hideDiegeticInspection() {
    const modal = document.getElementById('webgl-diegetic-modal');
    if (modal) modal.classList.remove('active');
  }

  /* ============================================
     3D SPATIAL MOVEMENT & DOOR ACTIONS
     ============================================ */
  openEntranceDoors() {
    if (this.doorsOpen) {
      if (!this.isFull3DMode) {
        this.toggleFull3DMode();
      }
      this.navigateToZone('hero');
      return;
    }

    this.doorsOpen = true;

    if (this.audioEngine) {
      this.audioEngine.playPaperRustle();
      this.audioEngine.playTempleGong(110);
    }
    if (window.achievementsManager) window.achievementsManager.unlock('explorer');

    // Switch to full 3D mode immediately so the 2D UI fades out
    if (!this.isFull3DMode) {
      this.toggleFull3DMode();
    }
    document.body.classList.add('doors-opened');

    // Glide smoothly from entrance through the Torii arches to right in front of the gate!
    this.currentZone = 'hero';
    this.targetCameraPos.set(0, 1.85, 3.5);
    this.targetCameraLook.set(0, 1.65, -15);
    this.isTransitioning = true;
    this.transitionProgress = 0;

    const zonePill = document.getElementById('webgl-zone-pill');
    if (zonePill) {
      const zoneNameEl = zonePill.querySelector('.zone-name');
      if (zoneNameEl) zoneNameEl.textContent = 'SANCTUARY GATE // 鳥居・正門';
    }

    document.querySelectorAll('.webgl-rail-btn').forEach(btn => {
      if (btn.getAttribute('data-rail-zone') === 'hero') {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    let startTime = performance.now();
    const duration = 1400;

    const animateDoors = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 5);

      if (this.leftDoor) this.leftDoor.position.x = -1.08 - (ease * 1.6);
      if (this.rightDoor) this.rightDoor.position.x = 1.08 + (ease * 1.6);

      if (progress < 1) {
        requestAnimationFrame(animateDoors);
      } else {
        // Transition and doors complete: user is right in front of the gate ready to explore!
        if (this.controls) {
          const fwd = new THREE.Vector3();
          this.camera.getWorldDirection(fwd);
          fwd.y = 0;
          if (fwd.lengthSq() < 0.01) fwd.set(0, 0, -1);
          fwd.normalize();
          this.controls.target.copy(this.camera.position).addScaledVector(fwd, 4.0);
          this.controls.target.y = this.camera.position.y - 0.1;
          this.controls.update();
        }
      }
    };
    requestAnimationFrame(animateDoors);
  }

  navigateToZone(zoneId) {
    let targetPos, targetLook, zoneName;

    if (zoneId === 'hero') {
      if (this.isFull3DMode && this.doorsOpen) {
        targetPos = new THREE.Vector3(0, 1.85, 3.5);
        targetLook = new THREE.Vector3(0, 1.65, -15);
        zoneName = 'SANCTUARY GATE // 鳥居・正門';
      } else {
        targetPos = this.waypoints.hero.pos;
        targetLook = this.waypoints.hero.look;
        zoneName = this.waypoints.hero.zone;
      }
    } else {
      const wp = this.waypoints[zoneId];
      if (!wp) return;
      targetPos = wp.pos;
      targetLook = wp.look;
      zoneName = wp.zone;
    }

    this.currentZone = zoneId;
    this.targetCameraPos.copy(targetPos);
    this.targetCameraLook.copy(targetLook);
    this.isTransitioning = true;
    this.transitionProgress = 0;

    if (this.audioEngine) {
      this.audioEngine.playTempleGong(zoneId === 'hero' ? 110 : (zoneId === 'about' ? 130 : 150));
    }

    const zonePill = document.getElementById('webgl-zone-pill');
    if (zonePill) {
      const zoneNameEl = zonePill.querySelector('.zone-name');
      if (zoneNameEl) zoneNameEl.textContent = zoneName;
    }

    document.querySelectorAll('.webgl-rail-btn').forEach(btn => {
      if (btn.getAttribute('data-rail-zone') === zoneId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (window.achievementsManager) {
      window.achievementsManager.unlock('wanderer');
    }
  }

  stepZone(direction) {
    const currentIndex = this.zoneOrder.indexOf(this.currentZone);
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= this.zoneOrder.length) nextIndex = this.zoneOrder.length - 1;

    if (nextIndex !== currentIndex) {
      this.navigateToZone(this.zoneOrder[nextIndex]);
    }
  }

  toggleAutoTour() {
    this.autoTourActive = !this.autoTourActive;
    const tourBtn = document.getElementById('webgl-tour-btn');
    if (tourBtn) {
      if (this.autoTourActive) {
        tourBtn.classList.add('active');
        tourBtn.querySelector('.tour-label').textContent = 'AUTO-TOUR: ON';
      } else {
        tourBtn.classList.remove('active');
        tourBtn.querySelector('.tour-label').textContent = 'AUTO-TOUR: OFF';
      }
    }
    if (this.autoTourActive && !this.isFull3DMode) {
      this.toggleFull3DMode();
    }
  }

  toggleFull3DMode() {
    this.isFull3DMode = !this.isFull3DMode;
    const container = document.getElementById('webgl-container');
    const toggleBtn = document.getElementById('nav-3d-toggle');
    const reticle = document.getElementById('webgl-interaction-reticle');
    const hintKey = document.querySelector('.webgl-controls-hint .hint-key');
    const hintDesc = document.querySelector('.webgl-controls-hint .hint-desc');

    if (this.isFull3DMode) {
      this.resumeAnimation();
      container.classList.add('cinematic-3d-active');
      if (toggleBtn) toggleBtn.classList.add('active');
      document.body.classList.add('mode-3d-fullscreen');
      if (hintKey) hintKey.textContent = 'WASD / ARROWS';
      if (hintDesc) hintDesc.textContent = 'Walk & Explore  •  Drag to Look  •  Shift: Sprint';
      if (this.controls) {
        this.controls.enabled = true;
        const fwd = new THREE.Vector3();
        this.camera.getWorldDirection(fwd);
        fwd.y = 0;
        if (fwd.lengthSq() < 0.01) fwd.set(0, 0, -1);
        fwd.normalize();
        this.controls.target.copy(this.camera.position).addScaledVector(fwd, 4.0);
        this.controls.target.y = this.camera.position.y - 0.1;
        this.controls.update();
      }
    } else {
      container.classList.remove('cinematic-3d-active');
      if (toggleBtn) toggleBtn.classList.remove('active');
      document.body.classList.remove('mode-3d-fullscreen');
      this.autoTourActive = false;
      this.hideDiegeticInspection();
      if (hintKey) hintKey.textContent = 'ENTER ↵';
      if (hintDesc) hintDesc.textContent = 'Slide Open 3D Shoji Doors & Explore';
      if (this.controls) {
        this.controls.enabled = false;
      }
      if (reticle) reticle.classList.remove('visible');
      if (this.canvas) this.canvas.style.cursor = 'default';
      this.navigateToZone('hero');
      if (this.isMobile || !this.isHeroInView) {
        this.pauseAnimation();
      }
    }

    if (window.achievementsManager) {
      window.achievementsManager.unlock('director');
    }
  }

  /* ============================================
     EVENT BINDINGS & USER INTERACTION
     ============================================ */
  bindEvents() {
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });

    // Pause rendering when tab is hidden or backgrounded
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAnimation();
      } else {
        if (this.isFull3DMode || (!this.isMobile && this.isHeroInView)) {
          this.resumeAnimation();
        }
      }
    });

    // Pause rendering when Hero is scrolled out of view (unless in Full 3D mode)
    const heroEl = document.getElementById('hero');
    if (heroEl && 'IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this.isHeroInView = entry.isIntersecting;
          if (!this.isFull3DMode) {
            if (entry.isIntersecting) {
              if (!this.isMobile) {
                this.resumeAnimation();
              }
            } else {
              this.pauseAnimation();
            }
          }
        });
      }, { threshold: 0.05 });
      heroObserver.observe(heroEl);
    }

    const reticle = document.getElementById('webgl-interaction-reticle');
    const reticleLabel = document.getElementById('reticle-label');

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.normalizedMouse.x = (e.clientX / window.innerWidth) - 0.5;
      this.normalizedMouse.y = (e.clientY / window.innerHeight) - 0.5;

      // Strict Isolation: In 2D mode, NEVER show reticle or capture mouse for 3D interactions
      if (!this.isFull3DMode) {
        if (reticle) reticle.classList.remove('visible');
        if (this.canvas) this.canvas.style.cursor = 'default';
        return;
      }

      if (reticle) {
        reticle.style.left = `${e.clientX}px`;
        reticle.style.top = `${e.clientY}px`;
      }

      if (this.canvas && this.clickableObjects.length > 0) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.clickableObjects, true);
        if (intersects.length > 0) {
          let hit = intersects[0].object;
          while (hit && !hit.userData.label && !hit.userData.targetChapter && !hit.userData.isDoor) {
            hit = hit.parent;
          }
          this.canvas.style.cursor = 'pointer';
          if (reticle && hit?.userData?.label) {
            reticle.classList.add('visible');
            if (reticleLabel) reticleLabel.textContent = hit.userData.label;
          }
        } else {
          this.canvas.style.cursor = 'grab';
          if (reticle) reticle.classList.remove('visible');
        }
      }
    });

    // Track pointerdown to distinguish deliberate clicks from orbit camera drags
    this.pointerDownPos = { x: 0, y: 0, time: 0 };
    window.addEventListener('pointerdown', (e) => {
      this.pointerDownPos.x = e.clientX;
      this.pointerDownPos.y = e.clientY;
      this.pointerDownPos.time = performance.now();
    });

    // WASD & Arrow Key Ground Movement + ESC to exit 3D mode
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.minimapActive) {
          this.hideMinimap();
          return;
        }
        if (this.isFull3DMode) {
          this.toggleFull3DMode();
          return;
        }
      }
      if (!this.isFull3DMode) {
        if (e.key === 'Enter' && !this.doorsOpen) {
          this.openEntranceDoors();
        }
        return;
      }
      if (this.keys.hasOwnProperty(e.code)) {
        this.keys[e.code] = true;
      }
      if (e.key === 'Enter' && !this.doorsOpen) {
        this.openEntranceDoors();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.keys.hasOwnProperty(e.code)) {
        this.keys[e.code] = false;
      }
    });

    // Mouse Wheel / Trackpad - natural camera dolly without abrupt zone jumping
    window.addEventListener('wheel', (e) => {
      // Natural orbit zoom is preserved; abrupt stepZone jumping is disabled
    }, { passive: true });

    // Click Raycaster for 3D Objects with Diegetic In-Scene Inspection
    window.addEventListener('click', (e) => {
      // Strict Isolation: Clicks in 2D mode must NEVER raycast or trigger 3D actions!
      if (!this.isFull3DMode) return;

      // Filter out camera orbit rotations / drags
      const dragDist = Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y);
      const dragDuration = performance.now() - this.pointerDownPos.time;
      if (dragDist > 6 || dragDuration > 350) {
        return; // Orbit drag, not a deliberate object click
      }

      if (e.target.closest('#main-nav, .about-overlay, .projects-overlay, .experience-overlay, .contact-overlay, .manuscript-map-modal, .achievements-drawer, .quick-cmd-hud, .webgl-diegetic-modal, .webgl-minimap-modal')) {
        return;
      }

      const clickMouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      this.raycaster.setFromCamera(clickMouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.clickableObjects, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        let parent = hit;
        while (parent && !parent.userData.targetChapter && !parent.userData.isDoor && !parent.userData.isGuidepost && !parent.userData.isWaypointPortal && !parent.userData.isTeaKettle && !parent.userData.isMessageBottle && !parent.userData.isSingingBowl) {
          parent = parent.parent;
        }

        if (parent?.userData?.isDoor && !this.doorsOpen) {
          this.openEntranceDoors();
        } else if (parent?.userData?.isSingingBowl) {
          if (this.audioEngine) this.audioEngine.playSingingBowl(528);
        } else if (parent?.userData?.isWaypointPortal && parent.userData.targetChapter) {
          if (this.audioEngine) this.audioEngine.playSingingBowl(396);
          this.navigateToZone(parent.userData.targetChapter);
        } else if (parent?.userData?.isTeaKettle) {
          if (this.audioEngine) this.audioEngine.playKettleSizzle();
          this.showDiegeticInspection('about', 'tea_hearth');
        } else if (parent?.userData?.isMessageBottle) {
          if (this.audioEngine) this.audioEngine.playPaperRustle();
          this.showDiegeticInspection('contact', 'drift_bottle');
        } else if (parent?.userData?.isGuidepost && parent.userData.targetChapter) {
          this.navigateToZone(parent.userData.targetChapter);
        } else if (parent?.userData?.targetChapter) {
          const ch = parent.userData.targetChapter;
          const prj = parent.userData.targetProject;
          const sub = parent.userData.subSection;
          const act = parent.userData.targetAction;

          // Dedicated 3D Contact Object Actions & CONNECT ME Boat
          if (ch === 'contact') {
            if (act === 'email') {
              if (this.audioEngine) this.audioEngine.playPaperRustle();
              if (window.openContact) window.openContact();
              return;
            } else if (act === 'github') {
              if (this.audioEngine) this.audioEngine.playFurinChime();
              window.open('https://github.com/nhr-09', '_blank');
              return;
            } else if (act === 'linkedin') {
              if (this.audioEngine) this.audioEngine.playFurinChime();
              window.open('https://www.linkedin.com/in/nihar-mehakare', '_blank');
              return;
            } else if (act === 'resume') {
              if (this.audioEngine) this.audioEngine.playPaperRustle();
              const link = document.createElement('a');
              link.href = 'assets/resume.pdf';
              link.target = '_blank';
              link.download = 'Nihar_Mehakare_Resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              return;
            } else if (prj === 'connect_boat' || !act) {
              if (this.audioEngine) this.audioEngine.playPaperRustle();
              this.showDiegeticInspection('contact', 'connect_boat');
              return;
            }
          }

          // In full 3D mode, show diegetic in-world inspection first for seamless immersion
          if (this.isFull3DMode && (ch === 'projects' || ch === 'studio')) {
            this.showDiegeticInspection(ch, prj || 'architech');
          } else if (this.isFull3DMode && ch === 'spotify') {
            if (this.audioEngine) this.audioEngine.playVinylChord();
            this.showDiegeticInspection('spotify', prj || 'spotify_turntable');
          } else if (this.isFull3DMode && ch === 'gaming') {
            if (prj === 'elden_grace') {
              if (this.audioEngine) this.audioEngine.playGraceChime();
            } else if (this.audioEngine) {
              this.audioEngine.playArcadeChirp();
            }
            this.showDiegeticInspection('gaming', prj || 'gaming_arcade');
          } else if (this.isFull3DMode && ch === 'about') {
            let diegeticKey = 'atelier';
            if (sub === 'journal-sec-2') diegeticKey = 'about_education';
            else if (sub === 'journal-sec-4') diegeticKey = 'about_leadership';
            else if (sub === 'journal-sec-3' || sub === 'journal-sec-5') diegeticKey = 'about_skills';
            this.showDiegeticInspection('about', diegeticKey);
          } else if (this.isFull3DMode && ch === 'experience') {
            this.showDiegeticInspection('experience', 'chronicle');
          } else {
            switch (ch) {
              case 'about':
                if (window.openAbout) window.openAbout(sub);
                break;
              case 'projects':
                if (window.openProjects) window.openProjects();
                break;
              case 'gaming':
                if (window.openGamingOverlay) window.openGamingOverlay();
                break;
              case 'spotify':
                if (window.openSpotifyOverlay) window.openSpotifyOverlay();
                break;
              case 'studio':
                if (window.openProjects) {
                  window.openProjects();
                  setTimeout(() => {
                    document.getElementById('studio-lab-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }
                break;
              case 'experience':
                if (window.openExperience) window.openExperience();
                break;
              case 'contact':
                if (window.openContact) window.openContact();
                break;
            }
          }
          if (window.achievementsManager) window.achievementsManager.unlock('explorer');
        }
      }
    });

    // Minimap Button
    const minimapBtn = document.getElementById('webgl-minimap-btn');
    if (minimapBtn) {
      minimapBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleMinimap();
      });
    }

    const minimapClose = document.getElementById('minimap-close-btn');
    if (minimapClose) {
      minimapClose.addEventListener('click', () => this.hideMinimap());
    }

    // Time of Day Button
    const todBtn = document.getElementById('webgl-tod-btn');
    if (todBtn) {
      todBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.cycleTimeOfDay();
      });
    }

    // Sound Ambience Toggle Button
    const soundBtn = document.getElementById('webgl-sound-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.audioEngine) this.audioEngine.toggle();
      });
    }

    // Diegetic Close Button
    const diegeticClose = document.getElementById('diegetic-close-btn');
    if (diegeticClose) {
      diegeticClose.addEventListener('click', () => this.hideDiegeticInspection());
    }

    // Hero Enter Button Click
    const enterBtn = document.getElementById('hero-3d-enter-btn');
    if (enterBtn) {
      enterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openEntranceDoors();
      });
    }

    // Nav 3D Mode Toggle
    const nav3dToggle = document.getElementById('nav-3d-toggle');
    if (nav3dToggle) {
      nav3dToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleFull3DMode();
      });
    }

    // HUD Exit 3D Mode Button
    const exit3dBtn = document.getElementById('webgl-exit-3d-btn');
    if (exit3dBtn) {
      exit3dBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.isFull3DMode) {
          this.toggleFull3DMode();
        }
      });
    }

    // Auto-Tour Button
    const tourBtn = document.getElementById('webgl-tour-btn');
    if (tourBtn) {
      tourBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleAutoTour();
      });
    }

    // Reset Camera Button
    const resetCamBtn = document.getElementById('webgl-reset-cam');
    if (resetCamBtn) {
      resetCamBtn.addEventListener('click', () => {
        this.navigateToZone('hero');
        if (this.isFull3DMode) {
          this.toggleFull3DMode();
        }
      });
    }
  }

  /* ============================================
     ARCHITECTURAL WASHI MINIMAP RADAR (境内絵図)
     ============================================ */
  toggleMinimap() {
    this.minimapActive = !this.minimapActive;
    const modal = document.getElementById('webgl-minimap-modal');
    const btn = document.getElementById('webgl-minimap-btn');
    if (modal) {
      if (this.minimapActive) {
        modal.classList.add('active');
        if (btn) btn.classList.add('active');
        if (this.audioEngine) this.audioEngine.playPaperRustle();
        this.drawMinimap();
      } else {
        modal.classList.remove('active');
        if (btn) btn.classList.remove('active');
      }
    }
  }

  hideMinimap() {
    this.minimapActive = false;
    const modal = document.getElementById('webgl-minimap-modal');
    const btn = document.getElementById('webgl-minimap-btn');
    if (modal) modal.classList.remove('active');
    if (btn) btn.classList.remove('active');
  }

  drawMinimap() {
    const canvas = document.getElementById('minimap-radar-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = '#ede3d1';
    ctx.fillRect(0, 0, w, h);

    // Sumi-e grid lines
    ctx.strokeStyle = 'rgba(60, 50, 40, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    const worldToCanvas = (wx, wz) => {
      const cx = ((wx + 45) / 90) * (w - 40) + 20;
      const cy = ((24 - wz) / 120) * (h - 40) + 20;
      return { x: cx, y: cy };
    };

    // Draw Ocean Water at bottom (z < -76)
    const waterPt = worldToCanvas(0, -78);
    ctx.fillStyle = 'rgba(61, 126, 204, 0.28)';
    ctx.fillRect(0, waterPt.y, w, h - waterPt.y);

    // Draw Central Promenade (z = 18 to z = -78)
    const deckTop = worldToCanvas(-1.9, 18);
    const deckBottom = worldToCanvas(1.9, -78);
    ctx.fillStyle = 'rgba(54, 43, 34, 0.45)';
    ctx.fillRect(deckTop.x, deckTop.y, deckBottom.x - deckTop.x, deckBottom.y - deckTop.y);

    // Connecting cross branches (z = -16)
    const atelierDeck = worldToCanvas(-26, -16);
    const galleryDeck = worldToCanvas(26, -16);
    const crossY = worldToCanvas(0, -16).y;
    ctx.fillRect(atelierDeck.x, crossY - 3, deckTop.x - atelierDeck.x, 6);
    ctx.fillRect(deckBottom.x, crossY - 3, galleryDeck.x - deckBottom.x, 6);

    // Azumaya Tea Gazebo at (0, -34)
    const gz = worldToCanvas(0, -34);
    ctx.fillStyle = 'rgba(181, 141, 61, 0.65)';
    ctx.beginPath();
    ctx.arc(gz.x, gz.y, 7, 0, Math.PI * 2);
    ctx.fill();

    // Taiko Bridge Arch at (0, -50)
    const tb = worldToCanvas(0, -50);
    ctx.fillStyle = 'rgba(150, 26, 20, 0.8)';
    ctx.fillRect(deckTop.x - 3, tb.y - 5, (deckBottom.x - deckTop.x) + 6, 10);

    // Draw Zones
    const zones = [
      { id: 'hero', kanji: '門', title: 'ENTRANCE', x: 0, z: 18, color: '#e85338' },
      { id: 'about', kanji: '略', title: 'ATELIER', x: -28, z: -16, color: '#d4af37' },
      { id: 'projects', kanji: '廊', title: 'GALLERY', x: 28, z: -16, color: '#c8102e' },
      { id: 'gaming', kanji: '遊', title: 'GAMING', x: 44, z: -29, color: '#ff007f' },
      { id: 'studio', kanji: '工', title: 'CRT LAB', x: 36, z: -48, color: '#4ee068' },
      { id: 'spotify', kanji: '音', title: 'SPOTIFY', x: -42, z: -29, color: '#1db954' },
      { id: 'experience', kanji: '歴', title: 'GARDEN', x: -34, z: -48, color: '#8c2a22' },
      { id: 'contact', kanji: '港', title: 'DOCK', x: 0, z: -78, color: '#3d7ecc' }
    ];

    // Connecting dashed paths between zones
    ctx.strokeStyle = 'rgba(150, 26, 20, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    const centerPt = worldToCanvas(0, -16);
    zones.forEach(z => {
      const zp = worldToCanvas(z.x, z.z);
      ctx.beginPath();
      ctx.moveTo(centerPt.x, centerPt.y);
      ctx.lineTo(zp.x, zp.y);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // Draw Zone nodes
    zones.forEach(z => {
      const p = worldToCanvas(z.x, z.z);
      const isCurrent = this.currentZone === z.id;

      ctx.fillStyle = isCurrent ? z.color : 'rgba(28, 25, 22, 0.88)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, isCurrent ? 13 : 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = z.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(z.kanji, p.x, p.y);

      ctx.fillStyle = '#221d18';
      ctx.font = 'bold 9px monospace';
      ctx.fillText(z.title, p.x, p.y + 16);
    });

    // Draw Player Position Beacon (YOU)
    if (this.camera) {
      const cp = worldToCanvas(this.camera.position.x, this.camera.position.z);
      const now = performance.now() * 0.003;
      const pulseRad = 6 + Math.sin(now * 3) * 3;

      ctx.strokeStyle = '#c8102e';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cp.x, cp.y, pulseRad * 1.6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#c8102e';
      ctx.beginPath();
      ctx.arc(cp.x, cp.y, 4.5, 0, Math.PI * 2);
      ctx.fill();

      const forward = new THREE.Vector3();
      this.camera.getWorldDirection(forward);
      const dirAngle = Math.atan2(forward.x, -forward.z);
      ctx.fillStyle = 'rgba(200, 16, 46, 0.25)';
      ctx.beginPath();
      ctx.moveTo(cp.x, cp.y);
      ctx.arc(cp.x, cp.y, 20, dirAngle - 0.4, dirAngle + 0.4);
      ctx.closePath();
      ctx.fill();
    }
  }

  /* ============================================
     RENDER LOOP & DYNAMIC PHYSICS
     ============================================ */
  pauseAnimation() {
    this.isPaused = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  resumeAnimation() {
    if (!this.isPaused && this.animationFrameId) return;
    this.isPaused = false;
    if (!this.animationFrameId) {
      this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
  }

  animate() {
    if (this.isPaused) {
      this.animationFrameId = null;
      return;
    }
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();
    let isMoving = false;
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);

    // 1. Camera Navigation & 2D Parallax
    if (this.isTransitioning) {
      this.transitionProgress += delta * 1.8;
      const t = Math.min(this.transitionProgress, 1.0);

      this.camera.position.lerp(this.targetCameraPos, 0.08);
      if (this.controls) {
        this.controls.target.lerp(this.targetCameraLook, 0.08);
        this.controls.update();
      }

      if (t >= 1.0 && this.camera.position.distanceTo(this.targetCameraPos) < 0.1) {
        this.isTransitioning = false;
        if (this.isFull3DMode && this.controls) {
          const fwd = new THREE.Vector3();
          this.camera.getWorldDirection(fwd);
          fwd.y = 0;
          if (fwd.lengthSq() < 0.01) fwd.set(0, 0, -1);
          fwd.normalize();
          this.controls.target.copy(this.camera.position).addScaledVector(fwd, 4.0);
          this.controls.target.y = this.camera.position.y - 0.1;
          this.controls.update();
        }
      }
    } else if (this.isFull3DMode && this.controls) {
      this.controls.update();
    } else if (!this.isFull3DMode) {
      // Elegant 2.5D background mouse parallax in 2D mode without interfering with DOM UI
      const targetX = this.waypoints.hero.pos.x + this.normalizedMouse.x * 1.4;
      const targetY = this.waypoints.hero.pos.y - this.normalizedMouse.y * 0.8;
      this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, targetX, 0.05);
      this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, targetY, 0.05);
      this.camera.lookAt(this.waypoints.hero.look);
    }

    // 2. Ground-Level Movement Translation (Active Only in 3D Mode)
    if (this.isFull3DMode) {
      const sprint = (this.keys.ShiftLeft || this.keys.ShiftRight) ? 1.6 : 1.0;
      const moveSpeed = 7.5 * sprint * delta;
      forward.y = 0;
      if (forward.lengthSq() > 0.001) forward.normalize();
      else forward.set(0, 0, -1);
      const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

      const moveDelta = new THREE.Vector3(0, 0, 0);
      if (this.keys.KeyW || this.keys.ArrowUp) moveDelta.addScaledVector(forward, moveSpeed);
      if (this.keys.KeyS || this.keys.ArrowDown) moveDelta.addScaledVector(forward, -moveSpeed);
      if (this.keys.KeyA || this.keys.ArrowLeft) moveDelta.addScaledVector(right, -moveSpeed);
      if (this.keys.KeyD || this.keys.ArrowRight) moveDelta.addScaledVector(right, moveSpeed);

      if (moveDelta.lengthSq() > 0) {
        // User is manually moving: interrupt any active camera transition instantly
        this.isTransitioning = false;
        isMoving = true;
        this.camera.position.add(moveDelta);
        if (this.controls) {
          this.controls.target.add(moveDelta);
        }
      }

      // Ground Level Elevation & Smooth Bridge Conformation (Human eye height ~1.85m)
      let groundLevel = 1.85;
      const camZ = this.camera.position.z;
      const camX = this.camera.position.x;

      // Taiko Arched Bridge: z = -45.2 to -54.8, x in [-2.2, 2.2]
      if (camZ <= -45.2 && camZ >= -54.8 && Math.abs(camX) <= 2.4) {
        const u = (-45.2 - camZ) / 9.6; // normalized 0 to 1 along bridge
        groundLevel += Math.sin(Math.max(0, Math.min(1, u)) * Math.PI) * 1.55;
      }

      // Spotify Sound Pavilion Stage (x: -42, z: -29)
      if (Math.abs(camX - (-42)) <= 3.3 && Math.abs(camZ - (-29)) <= 2.8) {
        groundLevel += 0.22;
      }

      // Gaming Cyber-Dojo Deck (x: 44, z: -29)
      if (Math.abs(camX - 44) <= 3.4 && Math.abs(camZ - (-29)) <= 2.9) {
        groundLevel += 0.22;
      }

      // Smoothly conform to ground height without sudden pops
      const yDelta = (groundLevel - this.camera.position.y) * 0.16;
      this.camera.position.y += yDelta;
      if (this.controls) {
        this.controls.target.y += yDelta;
      }

      // World boundary clamping with synchronized controls target
      const clampedX = THREE.MathUtils.clamp(this.camera.position.x, -52, 52);
      const clampedZ = THREE.MathUtils.clamp(this.camera.position.z, -95, 26);
      if (clampedX !== this.camera.position.x || clampedZ !== this.camera.position.z) {
        const fixX = clampedX - this.camera.position.x;
        const fixZ = clampedZ - this.camera.position.z;
        this.camera.position.x = clampedX;
        this.camera.position.z = clampedZ;
        if (this.controls) {
          this.controls.target.x += fixX;
          this.controls.target.z += fixZ;
        }
      }

      if (isMoving && this.audioEngine) {
        this.stepTimer = (this.stepTimer || 0) + delta;
        if (this.stepTimer > (sprint > 1 ? 0.22 : 0.35)) {
          this.stepTimer = 0;
          let surface = 'wood';
          if (camZ < -76) surface = 'water';
          else if (Math.abs(camX) > 3.5) surface = 'stone';
          this.audioEngine.playFootstep(surface);
        }
      }
    }

    // 3. Real-Time Spatial Compass Heading
    const needle = document.getElementById('compass-needle');
    const degText = document.getElementById('compass-deg');
    if (needle || degText) {
      const headingRad = Math.atan2(forward.x, forward.z);
      const headingDeg = Math.round(((headingRad * 180 / Math.PI) + 360) % 360);
      if (needle) needle.style.transform = `rotate(${-headingDeg}deg)`;
      if (degText) degText.textContent = `${String(headingDeg).padStart(3, '0')}°`;
    }

    // 4. Auto-Tour Flythrough Engine
    if (this.autoTourActive && !this.isTransitioning) {
      this.autoTourTimer += delta;
      if (this.autoTourTimer > 4.2) {
        this.autoTourTimer = 0;
        this.autoTourIndex = (this.autoTourIndex + 1) % this.zoneOrder.length;
        this.navigateToZone(this.zoneOrder[this.autoTourIndex]);
      }
    }

    // 5. Subtle 6-DOF Floating Parallax
    if (!this.isTransitioning && !isMoving && !this.isFull3DMode) {
      const breathY = Math.sin(time * 1.4) * 0.012;
      this.camera.position.y += breathY * 0.05;
    }

    // 6. Candle / Lantern Flame Flicker
    this.candleLights.forEach((light, i) => {
      light.intensity = (this.timeOfDay === 'night' ? 2.2 : (this.timeOfDay === 'dusk' ? 1.6 : 1.0))
        + Math.sin(time * 6 + i * 2) * 0.25 + (Math.random() - 0.5) * 0.15;
    });

    // 7. Wind Chimes (Fūrin) Flutter Physics
    this.windChimes.forEach(fc => {
      fc.group.rotation.z = Math.sin(time * 2.8) * 0.14;
      fc.tanzaku.rotation.y = Math.cos(time * 3.5) * 0.35;
    });

    // 8. Shide Streamers & Ribbons Wind Sway
    this.shideStreamers.forEach(ss => {
      ss.group.rotation.x = Math.sin(time * 2.0 + ss.phase) * 0.15;
      ss.group.rotation.z = Math.cos(time * 1.8 + ss.phase) * 0.10;
    });

    this.ribbons.forEach((rib, idx) => {
      rib.rotation.z = Math.sin(time * 3.0 + idx) * 0.25;
      rib.rotation.y = Math.cos(time * 2.4 + idx) * 0.18;
    });

    // 9. Bamboo Culm Wind Sway
    this.bambooCulms.forEach(bc => {
      bc.group.rotation.z = Math.sin(time * 1.6 + bc.phase) * 0.022;
      bc.group.rotation.x = Math.cos(time * 1.2 + bc.phase) * 0.015;
    });

    // 10. Noren Curtains Flutter
    this.norenCurtains.forEach((nc, idx) => {
      nc.rotation.x = Math.sin(time * 2.2 + idx * 1.2) * 0.12;
    });

    // 11. Oscilloscope Animated Sine Wave
    if (this.oscilloscope) {
      const ctx = this.oscilloscope.ctx;
      ctx.fillStyle = '#061106';
      ctx.fillRect(0, 0, 128, 128);
      ctx.strokeStyle = 'rgba(78, 224, 104, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < 128; x += 16) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 128); ctx.stroke(); }
      for (let y = 0; y < 128; y += 16) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(128, y); ctx.stroke(); }

      ctx.strokeStyle = '#4ee068';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < 128; x++) {
        const y = 64 + Math.sin((x * 0.1) + (time * 8)) * 32;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      this.oscilloscope.texture.needsUpdate = true;
    }

    // 12. Incense Smoke Rising
    if (this.incenseSmoke) {
      const pos = this.incenseSmoke.geometry.attributes.position.array;
      const spd = this.incenseSmoke.userData.speeds;
      for (let i = 0; i < spd.length; i++) {
        pos[i * 3 + 1] += spd[i];
        pos[i * 3] += Math.sin(time * 2.0 + i) * 0.002;
        if (pos[i * 3 + 1] > 3.2) {
          pos[i * 3 + 1] = 1.6;
          pos[i * 3] = -11.7 + (Math.random() - 0.5) * 0.15;
        }
      }
      this.incenseSmoke.geometry.attributes.position.needsUpdate = true;
    }

    // 13. Coffee Steam Rising
    if (this.coffeeSteam) {
      const pos = this.coffeeSteam.geometry.attributes.position.array;
      const spd = this.coffeeSteam.userData.speeds;
      for (let i = 0; i < spd.length; i++) {
        pos[i * 3 + 1] += spd[i];
        pos[i * 3] += Math.sin(time * 2.5 + i) * 0.002;
        if (pos[i * 3 + 1] > 2.6) {
          pos[i * 3 + 1] = 1.7;
          pos[i * 3] = 13.85 + (Math.random() - 0.5) * 0.12;
        }
      }
      this.coffeeSteam.geometry.attributes.position.needsUpdate = true;
    }

    // 14. Shishi-odoshi (Bamboo Water Rocker) & Splash Physics
    if (this.shishiOdoshi) {
      const cycle = (time * 0.65) % (Math.PI * 2);
      if (cycle < 4.0) {
        this.shishiOdoshi.angle = Math.sin(cycle * 0.35) * 0.45;
      } else {
        this.shishiOdoshi.angle = -0.15;
        if (time - this.shishiOdoshi.lastClack > 3.0) {
          this.shishiOdoshi.lastClack = time;
          if (this.audioEngine) this.audioEngine.playBambooClack();
          if (this.waterSplash) {
            this.waterSplash.userData.active = true;
            this.waterSplash.userData.timer = 0;
          }
        }
      }
      this.shishiOdoshi.pivot.rotation.x = this.shishiOdoshi.angle;
    }

    // Water Splash Burst
    if (this.waterSplash && this.waterSplash.userData.active) {
      this.waterSplash.userData.timer += delta;
      const pos = this.waterSplash.geometry.attributes.position.array;
      const vel = this.waterSplash.userData.vel;
      for (let i = 0; i < 30; i++) {
        pos[i * 3] += vel[i * 3];
        pos[i * 3 + 1] += vel[i * 3 + 1];
        vel[i * 3 + 1] -= delta * 0.25;
        pos[i * 3 + 2] += vel[i * 3 + 2];
      }
      this.waterSplash.geometry.attributes.position.needsUpdate = true;
      if (this.waterSplash.userData.timer > 0.6) {
        this.waterSplash.userData.active = false;
        for (let i = 0; i < 30; i++) {
          pos[i * 3] = -9.2;
          pos[i * 3 + 1] = 0.15;
          pos[i * 3 + 2] = -27.05;
          vel[i * 3 + 1] = 0.04 + Math.random() * 0.08;
        }
        this.waterSplash.geometry.attributes.position.needsUpdate = true;
      }
    }

    // 15. Swimming Koi Fish Animation (太鼓橋の錦鯉)
    this.koiFish.forEach(koi => {
      const kAngle = time * koi.speed + koi.phase;
      koi.group.position.x = koi.center.x + Math.cos(kAngle) * koi.radiusX;
      koi.group.position.z = koi.center.z + Math.sin(kAngle) * koi.radiusZ;
      koi.group.position.y = 0.18 + Math.sin(time * 2.0 + koi.phase) * 0.03;
      koi.group.rotation.y = -kAngle + Math.PI / 2;
      koi.tail.rotation.z = Math.sin(time * 7 + koi.phase) * 0.45;
    });

    // 16. Pathway Energy Beacons Flow
    this.pathBeacons.forEach(b => {
      const pulse = Math.sin(time * 3.0 + b.phase) * 0.5 + 0.5;
      b.mesh.scale.setScalar(0.8 + pulse * 0.5);
      b.mesh.material.opacity = 0.4 + pulse * 0.6;
    });

    // 17. Hanging Clothesline Pendulum Physics
    this.hangingCanvases.forEach(item => {
      item.group.rotation.x = item.baseAngle + Math.sin(time * 2.4 + item.phase) * 0.065;
      item.group.rotation.z = Math.cos(time * 1.9 + item.phase) * 0.03;
    });

    // 18. Floating Kanji Revolve
    this.floatingKanjis.forEach((sprite, idx) => {
      sprite.position.y += Math.sin(time * 2.2 + idx) * 0.003;
    });

    // 19. Orbiting Polyhedra in Retro CRT Lab
    this.orbitingPolyhedra.forEach(poly => {
      const angle = time * poly.speed + poly.phase;
      poly.mesh.position.x = Math.cos(angle) * poly.radius;
      poly.mesh.position.z = Math.sin(angle) * poly.radius;
      poly.mesh.position.y = poly.height + Math.sin(time * 2.0 + poly.phase) * 0.25;
      poly.mesh.rotation.x += 0.02;
      poly.mesh.rotation.y += 0.03;
    });

    // 20. Multi-Wave Water Surface & Floating Crafts / Lanterns Bobbing
    if (this.waterMesh) {
      const pos = this.waterMesh.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const wave1 = Math.sin(u * 0.8 + time * 2.2) * 0.12;
        const wave2 = Math.cos(v * 0.7 + time * 1.6) * 0.10;
        const wave3 = Math.sin((u + v) * 0.5 + time * 2.8) * 0.04;
        pos.setZ(i, wave1 + wave2 + wave3);
      }
      pos.needsUpdate = true;
    }

    if (this.connectBoat) {
      this.connectBoat.position.y = 0.30 + Math.sin(time * 1.8) * 0.035;
      this.connectBoat.rotation.z = Math.sin(time * 1.4) * 0.025;
      this.connectBoat.rotation.x = Math.cos(time * 1.1) * 0.018;
      this.connectBoat.rotation.y = Math.sin(time * 0.7) * 0.012;
    } else if (this.origamiBoat) {
      this.origamiBoat.position.y = 0.35 + Math.sin(time * 2.2) * 0.045;
      this.origamiBoat.rotation.z = Math.sin(time * 1.8) * 0.065;
      this.origamiBoat.rotation.y = Math.PI / 4 + Math.cos(time * 1.2) * 0.09;
    }

    if (this.origamiCrane) {
      this.origamiCrane.rotation.y = -Math.PI / 4 + Math.sin(time * 1.6) * 0.08;
    }

    this.floatingLanterns.forEach(fl => {
      fl.group.position.y = 0.32 + Math.sin(time * 2.0 + fl.phase) * 0.04;
      fl.group.rotation.z = Math.sin(time * 1.5 + fl.phase) * 0.06;
      fl.group.rotation.x = Math.cos(time * 1.7 + fl.phase) * 0.05;
    });

    // 21. Sakura Drifting Petals
    if (this.sakuraParticles) {
      const pos = this.sakuraParticles.geometry.attributes.position.array;
      const spd = this.sakuraParticles.userData.speeds;
      const phs = this.sakuraParticles.userData.swayPhases;

      for (let i = 0; i < spd.length; i++) {
        pos[i * 3 + 1] -= spd[i];
        pos[i * 3] += Math.sin(time * 1.6 + phs[i]) * 0.014;

        if (pos[i * 3 + 1] < 0) {
          pos[i * 3 + 1] = 14;
          pos[i * 3] = (Math.random() - 0.5) * 60;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
        }
      }
      this.sakuraParticles.geometry.attributes.position.needsUpdate = true;
    }

    // 22. Hotaru (Fireflies) Swarm Motion
    if (this.hotaruParticles) {
      const pos = this.hotaruParticles.geometry.attributes.position.array;
      const phs = this.hotaruParticles.userData.phases;

      for (let i = 0; i < phs.length; i++) {
        pos[i * 3] += Math.sin(time * 1.2 + phs[i]) * 0.018;
        pos[i * 3 + 1] += Math.cos(time * 1.5 + phs[i]) * 0.012;
        pos[i * 3 + 2] += Math.sin(time * 0.9 + phs[i]) * 0.015;
      }
      this.hotaruParticles.geometry.attributes.position.needsUpdate = true;
    }

    // 23. Rotating Reel-to-Reel Tape Spools
    this.tapeReels.forEach(tr => {
      tr.mesh.rotation.z += delta * tr.speed * tr.dir;
    });

    // 24. Blinking Microcontroller Dev Board LEDs
    this.blinkingLeds.forEach((led) => {
      const p = Math.sin(time * 8.0 + led.phase);
      const isOn = p > 0.05;
      led.light.intensity = isOn ? 0.7 + p * 0.3 : 0.04;
      led.mesh.material.color.setHex(isOn ? led.baseColor : 0x1a1a1a);
    });

    // 25. Sacred Cranes Majestic Horizon Flight & Wing Flap
    this.craneFlock.forEach((crane, idx) => {
      const cAngle = time * crane.speed + crane.baseAngle;
      crane.group.position.x = Math.sin(cAngle) * 32;
      crane.group.position.z = -55 + Math.cos(cAngle) * 12;
      crane.group.rotation.y = cAngle + Math.PI / 2;
      const flap = Math.sin(time * 5.5 + idx) * 0.45;
      crane.leftWing.rotation.z = flap;
      crane.rightWing.rotation.z = -flap;
    });

    // 26. Waypoint Portal Energy Rings Rotation & Pulse
    this.waypointPortals.forEach((wp, idx) => {
      wp.ring.rotation.z = time * 0.5 + idx;
      const pulse = Math.sin(time * 2.5 + idx) * 0.5 + 0.5;
      wp.ring.material.opacity = 0.4 + pulse * 0.45;
      wp.ring.scale.setScalar(0.96 + pulse * 0.08);
    });

    // 27. Tea Hearth Kettle Steam
    if (this.teaSteam) {
      const pos = this.teaSteam.geometry.attributes.position.array;
      const spd = this.teaSteam.userData.speeds;
      for (let i = 0; i < spd.length; i++) {
        pos[i * 3 + 1] += spd[i];
        pos[i * 3] += Math.sin(time * 2.2 + i) * 0.002;
        if (pos[i * 3 + 1] > 1.8) {
          pos[i * 3 + 1] = 0.52;
          pos[i * 3] = 0.18 + (Math.random() - 0.5) * 0.08;
        }
      }
      this.teaSteam.geometry.attributes.position.needsUpdate = true;
    }

    // 28. Message in a Bottle Bobbing in Water
    if (this.messageBottle) {
      this.messageBottle.position.y = 0.32 + Math.sin(time * 2.4) * 0.035;
      this.messageBottle.rotation.z = Math.PI / 3 + Math.sin(time * 1.8) * 0.08;
      this.messageBottle.rotation.y = Math.cos(time * 1.5) * 0.12;
    }

    // 29. Spotify Sound Pavilion Real-Time Audio FX & Vinyl Rotation
    if (this.spinningVinyl) {
      this.spinningVinyl.rotation.y += delta * 3.49; // ~33 1/3 RPM authentic vinyl speed
    }
    if (this.holographicVinyl) {
      this.holographicVinyl.rotation.y = time * 0.75;
      this.holographicVinyl.position.y = 3.8 + Math.sin(time * 2.2) * 0.08;
    }
    if (this.spotifyEqualizerBars && this.spotifyEqualizerBars.length > 0) {
      for (let i = 0; i < this.spotifyEqualizerBars.length; i++) {
        const bar = this.spotifyEqualizerBars[i];
        const targetScaleY = 0.15 + Math.abs(Math.sin(time * bar.freqMult + bar.phase)) * 1.45;
        bar.mesh.scale.y = targetScaleY;
        bar.mesh.position.y = (targetScaleY * 1.0) / 2;
        if (bar.cap) {
          bar.cap.position.y = targetScaleY * 1.0;
        }
      }
    }

    // 30. Gaming Dojo Cyber-Arcade CRT, Radiant Spike, Elden Grace & Hologram
    if (this.arcadeCRT) {
      const { ctx, texture } = this.arcadeCRT;
      // Partial transparent fade for phosphor persistence trail
      ctx.fillStyle = 'rgba(6, 8, 16, 0.22)';
      ctx.fillRect(0, 0, 512, 384);

      // Rotating tactical sonar sweep
      const sweepAngle = time * 2.8;
      const rx = 256 + Math.cos(sweepAngle) * 90;
      const ry = 192 + Math.sin(sweepAngle) * 90;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(256, 192);
      ctx.lineTo(rx, ry);
      ctx.stroke();

      // Sonar target blips
      const pulseVal = (Math.sin(time * 6) + 1) * 0.5;
      ctx.fillStyle = `rgba(255, 0, 127, ${0.4 + pulseVal * 0.6})`;
      ctx.beginPath();
      ctx.arc(256 + 50, 192 - 35, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgba(0, 240, 255, ${0.5 + (1 - pulseVal) * 0.5})`;
      ctx.beginPath();
      ctx.arc(256 - 65, 192 + 45, 6, 0, Math.PI * 2);
      ctx.fill();

      // Realtime HUD Diagnostics
      ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
      ctx.font = 'bold 13px monospace';
      ctx.fillText('RADAR ACTIVE // SECTOR 07', 20, 345);
      ctx.font = '12px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('FPS: 60 | PING: 16ms | DEFUSE: READY', 20, 368);

      if (Math.sin(time * 5) > 0) {
        ctx.fillStyle = '#ff007f';
        ctx.font = 'bold 12px monospace';
        ctx.fillText('● CLUTCH LIVE', 380, 368);
      }
      texture.needsUpdate = true;
    }

    if (this.valorantSpike) {
      this.valorantSpike.rotation.y = time * 1.5;
      this.valorantSpike.position.y = 1.35 + Math.sin(time * 2.2) * 0.06;
    }
    if (this.spikeCrystals && this.spikeCrystals.length > 0) {
      for (let s = 0; s < this.spikeCrystals.length; s++) {
        const sc = this.spikeCrystals[s];
        const ang = time * sc.speed + sc.phase;
        sc.mesh.position.x = Math.cos(ang) * sc.radius;
        sc.mesh.position.z = Math.sin(ang) * sc.radius;
        sc.mesh.position.y = Math.sin(ang * 2.2) * 0.08;
        sc.mesh.rotation.y = ang * 2;
        sc.mesh.rotation.x = Math.sin(ang) * 0.5;
      }
    }

    if (this.eldenGraceParticles) {
      const pos = this.eldenGraceParticles.geometry.attributes.position.array;
      const { speeds, phases, radii, centerX, centerZ } = this.eldenGraceParticles.userData;
      const count = speeds.length;
      for (let i = 0; i < count; i++) {
        let y = pos[i * 3 + 1];
        y += speeds[i];
        if (y > 2.65) {
          y = 0.35 + Math.random() * 0.12;
        }
        pos[i * 3 + 1] = y;

        const progress = (y - 0.35) / 2.3;
        const curRadius = radii[i] * (0.35 + Math.sin(progress * Math.PI) * 0.65);
        const angle = time * 1.8 + phases[i] + y * 2.2;
        pos[i * 3] = centerX + Math.cos(angle) * curRadius;
        pos[i * 3 + 2] = centerZ + Math.sin(angle) * curRadius;
      }
      this.eldenGraceParticles.geometry.attributes.position.needsUpdate = true;
    }

    if (this.cyberpunkHolo) {
      this.cyberpunkHolo.rotation.y = Math.sin(time * 1.4) * 0.45;
      this.cyberpunkHolo.position.y = 1.68 + Math.sin(time * 2.8) * 0.05;
      if (Math.random() < 0.025) {
        this.cyberpunkHolo.position.x = (Math.random() - 0.5) * 0.05;
      } else {
        this.cyberpunkHolo.position.x = 0;
      }
    }

    // 31. Architectural Minimap Radar Refresh
    if (this.minimapActive) {
      this.drawMinimap();
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Global Export & Auto-Initialization
window.SpatialWorld3D = SpatialWorld3D;

function init3DWorld() {
  if (!window.spatialWorld && typeof THREE !== 'undefined') {
    window.spatialWorld = new SpatialWorld3D();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init3DWorld);
} else {
  init3DWorld();
}
