const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=5';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?limit=5';

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });
  return response.json();
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=15');

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return res.status(200).json({
      configured: false,
      message: 'Spotify credentials not configured in Vercel. Set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN in Vercel Project Settings.',
    });
  }

  try {
    const tokenData = await getAccessToken();
    const access_token = tokenData.access_token;
    if (!access_token) {
      return res.status(500).json({ error: 'Failed to retrieve access token from Spotify' });
    }

    const headers = { Authorization: `Bearer ${access_token}` };
    const [nowPlayingRes, recentlyPlayedRes, topTracksRes] = await Promise.all([
      fetch(NOW_PLAYING_ENDPOINT, { headers }).catch(() => null),
      fetch(RECENTLY_PLAYED_ENDPOINT, { headers }).catch(() => null),
      fetch(TOP_TRACKS_ENDPOINT, { headers }).catch(() => null),
    ]);

    let currentlyPlaying = { isPlaying: false };
    if (nowPlayingRes && nowPlayingRes.status === 200) {
      const nowPlayingData = await nowPlayingRes.json();
      if (nowPlayingData && nowPlayingData.item) {
        currentlyPlaying = {
          isPlaying: nowPlayingData.is_playing,
          title: nowPlayingData.item.name,
          artist: nowPlayingData.item.artists.map(a => a.name).join(', '),
          album: nowPlayingData.item.album.name,
          cover: nowPlayingData.item.album.images[0] ? nowPlayingData.item.album.images[0].url : '',
          url: nowPlayingData.item.external_urls ? nowPlayingData.item.external_urls.spotify : 'https://open.spotify.com',
          progressMs: nowPlayingData.progress_ms,
          durationMs: nowPlayingData.item.duration_ms,
        };
      }
    }

    let recentlyPlayed = [];
    if (recentlyPlayedRes && recentlyPlayedRes.status === 200) {
      const recentData = await recentlyPlayedRes.json();
      if (recentData && recentData.items) {
        recentlyPlayed = recentData.items.map(item => {
          const playedAt = new Date(item.played_at);
          const diffMin = Math.max(1, Math.round((Date.now() - playedAt.getTime()) / 60000));
          const timeAgo = diffMin < 60 ? `${diffMin} min ago` : `${Math.floor(diffMin / 60)} hr ago`;
          return {
            title: item.track.name,
            artist: item.track.artists.map(a => a.name).join(', '),
            cover: item.track.album.images[0] ? item.track.album.images[0].url : '',
            url: item.track.external_urls ? item.track.external_urls.spotify : 'https://open.spotify.com',
            timeAgo: timeAgo,
          };
        });
      }
    }

    let topTracks = [];
    if (topTracksRes && topTracksRes.status === 200) {
      const topData = await topTracksRes.json();
      if (topData && topData.items) {
        topTracks = topData.items.map((track, idx) => {
          const min = Math.floor(track.duration_ms / 60000);
          const sec = Math.floor((track.duration_ms % 60000) / 1000).toString().padStart(2, '0');
          return {
            rank: (idx + 1).toString().padStart(2, '0'),
            title: track.name,
            artist: track.artists.map(a => a.name).join(', '),
            duration: `${min}:${sec}`,
            cover: track.album.images[0] ? track.album.images[0].url : '',
            url: track.external_urls ? track.external_urls.spotify : 'https://open.spotify.com',
          };
        });
      }
    }

    return res.status(200).json({
      configured: true,
      currentlyPlaying,
      recentlyPlayed,
      topTracks,
    });
  } catch (error) {
    console.error('Spotify API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
