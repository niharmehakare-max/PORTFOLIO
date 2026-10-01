/* ============================================
   SPOTIFY SOUND PAVILION OVERLAY MODULE (js/spotify.js)
   Standalone Parchment Overlay for Chapter 07
   Live Spotify Integration with Visibility Polling
   ============================================ */

function initSpotify() {
  const spotifyOverlay = document.getElementById('spotify-overlay');
  const spotifyCloseBtn = document.getElementById('spotify-close');
  const spotifyReturn3dBtn = document.getElementById('spotify-return-3d');
  const navSpotifyBtn = document.getElementById('nav-spotify-btn');
  const journeyToContactBtn = document.getElementById('journey-to-contact-from-spotify');

  const recentlyPlayedList = document.getElementById('spotify-recently-played');
  const topSongsList = document.getElementById('spotify-top-songs');
  const nowPlayingBar = document.getElementById('spotify-now-playing');
  const rangeDropdown = document.getElementById('spotify-range-dropdown');
  const rangeBtn = document.getElementById('spotify-range-btn');
  const rangeLabel = document.getElementById('spotify-range-label');
  const rangeOptions = document.querySelectorAll('.dropdown-option-item');

  let currentRange = 'short_term';
  let pollInterval = null;

  function renderTopTracks(tracks) {
    if (!topSongsList || !tracks || tracks.length === 0) return;
    topSongsList.style.opacity = '0';
    topSongsList.style.transform = 'translateY(6px)';
    topSongsList.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

    setTimeout(() => {
      topSongsList.innerHTML = tracks.map(item => `
        <div class="rank-row">
          <span class="rank-num">${item.rank}</span>
          <div class="rank-track-info">
            <img src="${item.cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120'}" alt="${item.title}" class="rank-cover">
            <div class="rank-meta">
              <h5 class="rank-title">${item.title}</h5>
              <span class="rank-artist">${item.artist}</span>
            </div>
          </div>
          <span class="rank-duration">${item.duration}</span>
          <a href="${item.url}" target="_blank" class="rank-heart-btn" aria-label="Open track on Spotify" style="text-decoration:none; color:inherit;">↗</a>
        </div>
      `).join('');

      topSongsList.style.opacity = '1';
      topSongsList.style.transform = 'translateY(0)';
    }, 150);
  }

  async function loadSpotifyLive(range = currentRange) {
    try {
      const res = await fetch(`/api/spotify?range=${range}&_t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (!data || !data.configured) return;

      // 1. Update Currently Playing
      if (nowPlayingBar) {
        const titleEl = nowPlayingBar.querySelector('.now-playing-title');
        const artistEl = nowPlayingBar.querySelector('.now-playing-artist');
        const scriptEl = nowPlayingBar.querySelector('.currently-script');
        const coverEl = nowPlayingBar.querySelector('.now-playing-cover');
        const equalizer = nowPlayingBar.querySelector('.equalizer-waveform');
        const pauseBtn = nowPlayingBar.querySelector('.pause-btn');

        if (data.currentlyPlaying && data.currentlyPlaying.isPlaying && data.currentlyPlaying.title) {
          if (titleEl) titleEl.textContent = data.currentlyPlaying.title;
          if (artistEl) artistEl.textContent = data.currentlyPlaying.artist;
          if (scriptEl) scriptEl.textContent = 'Currently listening →';
          if (coverEl && data.currentlyPlaying.cover) {
            coverEl.src = data.currentlyPlaying.cover;
            coverEl.alt = data.currentlyPlaying.title;
          }
          if (equalizer) equalizer.style.opacity = '1';
          if (pauseBtn) pauseBtn.textContent = '⏸';
        } else if (data.recentlyPlayed && data.recentlyPlayed.length > 0) {
          const lastTrack = data.recentlyPlayed[0];
          if (titleEl) titleEl.textContent = lastTrack.title;
          if (artistEl) artistEl.textContent = lastTrack.artist;
          if (scriptEl) scriptEl.textContent = 'Last played →';
          if (coverEl && lastTrack.cover) {
            coverEl.src = lastTrack.cover;
            coverEl.alt = lastTrack.title;
          }
          if (equalizer) equalizer.style.opacity = '0.35';
          if (pauseBtn) pauseBtn.textContent = '▶';
        }
      }

      // 2. Update Recently Played
      if (data.recentlyPlayed && data.recentlyPlayed.length > 0 && recentlyPlayedList) {
        recentlyPlayedList.innerHTML = data.recentlyPlayed.map(item => `
          <div class="track-row">
            <div class="track-left">
              <div class="track-cover-wrapper">
                <img src="${item.cover || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=120'}" alt="${item.title}" class="track-cover">
                <a href="${item.url}" target="_blank" class="track-play-btn" aria-label="Play ${item.title}" style="text-decoration:none;">▶</a>
              </div>
              <div class="track-meta">
                <h5 class="track-title">${item.title}</h5>
                <span class="track-artist">${item.artist}</span>
              </div>
            </div>
            <span class="track-time-ago">${item.timeAgo}</span>
          </div>
        `).join('');
      }

      // 3. Update Top Tracks
      if (data.topTracks && data.topTracks.length > 0) {
        renderTopTracks(data.topTracks);
      }
    } catch (err) {
      console.log('Spotify live sync:', err);
    }
  }

  function openSpotify() {
    // Close other overlays
    const allOverlays = [
      document.getElementById('about-overlay'),
      document.getElementById('projects-overlay'),
      document.getElementById('experience-overlay'),
      document.getElementById('contact-overlay'),
      document.getElementById('gaming-overlay')
    ];
    allOverlays.forEach(ol => {
      if (ol && ol.classList.contains('active')) {
        ol.classList.remove('active');
      }
    });

    if (spotifyOverlay) {
      spotifyOverlay.classList.add('active');
      spotifyOverlay.scrollTop = 0;
      const scrollCont = document.getElementById('spotify-scroll');
      if (scrollCont) scrollCont.scrollTop = 0;
    }

    // Audio chime
    if (window.audioEngine && typeof window.audioEngine.playFurinChime === 'function') {
      window.audioEngine.playFurinChime();
    } else if (typeof window.playFurinChime === 'function') {
      window.playFurinChime();
    }

    // Load data immediately on opening
    loadSpotifyLive(currentRange);

    // Start polling while open
    if (!pollInterval) {
      pollInterval = setInterval(() => {
        if (spotifyOverlay && spotifyOverlay.classList.contains('active')) {
          loadSpotifyLive(currentRange);
        }
      }, 20000);
    }
  }

  function closeSpotify() {
    if (spotifyOverlay) {
      spotifyOverlay.classList.remove('active');
    }
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  }

  // Navigation button
  if (navSpotifyBtn) {
    navSpotifyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openSpotify();
    });
  }

  if (spotifyCloseBtn) {
    spotifyCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSpotify();
    });
  }

  if (spotifyReturn3dBtn) {
    spotifyReturn3dBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSpotify();
      if (window.spatialWorld && typeof window.spatialWorld.navigateToZone === 'function') {
        window.spatialWorld.navigateToZone('hero');
      }
    });
  }

  // Journey to Contact
  if (journeyToContactBtn) {
    journeyToContactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSpotify();
      setTimeout(() => {
        if (typeof window.openContact === 'function') {
          window.openContact();
        }
      }, 200);
    });
  }

  // Range dropdown
  if (rangeBtn && rangeDropdown) {
    rangeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      rangeDropdown.classList.toggle('active');
    });

    rangeOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        rangeOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');

        const selectedRange = opt.getAttribute('data-range');
        const labelText = opt.textContent.split('(')[0].trim();
        if (rangeLabel) rangeLabel.textContent = labelText;
        rangeDropdown.classList.remove('active');

        currentRange = selectedRange;
        loadSpotifyLive(currentRange);
      });
    });

    document.addEventListener('click', (e) => {
      if (!rangeDropdown.contains(e.target)) {
        rangeDropdown.classList.remove('active');
      }
    });
  }

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && spotifyOverlay && spotifyOverlay.classList.contains('active')) {
      closeSpotify();
    }
  });

  // Global exports
  window.openSpotifyOverlay = openSpotify;
  window.closeSpotifyOverlay = closeSpotify;
  window.openSpotifySection = openSpotify;
}

window.initSpotify = initSpotify;
