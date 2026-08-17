function initSpotify() {
  const recentlyPlayedList = document.getElementById('spotify-recently-played');
  const topSongsList = document.getElementById('spotify-top-songs');
  const nowPlayingBar = document.getElementById('spotify-now-playing');

  async function loadSpotifyLive() {
    try {
      const res = await fetch('/api/spotify');
      if (!res.ok) return;
      const data = await res.json();
      if (!data || !data.configured) return;

      // 1. Update Currently Playing
      if (data.currentlyPlaying && nowPlayingBar) {
        const titleEl = nowPlayingBar.querySelector('.now-playing-title');
        const artistEl = nowPlayingBar.querySelector('.now-playing-artist');
        const scriptEl = nowPlayingBar.querySelector('.currently-script');

        if (data.currentlyPlaying.isPlaying && data.currentlyPlaying.title) {
          if (titleEl) titleEl.textContent = data.currentlyPlaying.title;
          if (artistEl) artistEl.textContent = data.currentlyPlaying.artist;
          if (scriptEl) scriptEl.textContent = 'Currently listening →';
        } else {
          if (scriptEl) scriptEl.textContent = 'Offline / Last played →';
        }
      }

      // 2. Update Recently Played
      if (data.recentlyPlayed && data.recentlyPlayed.length > 0 && recentlyPlayedList) {
        recentlyPlayedList.innerHTML = data.recentlyPlayed.map(item => `
          <div class="track-row">
            <div class="track-left">
              <div class="track-cover-wrapper">
                <img src="${item.cover || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=120'}" alt="${item.title}" class="track-cover">
                <a href="${item.url}" target="_blank" class="track-play-btn" aria-label="Play ${item.title}">▶</a>
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
      if (data.topTracks && data.topTracks.length > 0 && topSongsList) {
        topSongsList.innerHTML = data.topTracks.map(item => `
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
      }
    } catch (err) {
      console.log('Spotify live integration ready:', err);
    }
  }

  loadSpotifyLive();
}
