/* ============================================
   SPOTIFY - Music Integration Manager (API Ready)
   ============================================ */

function initSpotify() {
  const spotifyData = {
    recentlyPlayed: [
      { title: "Another Love", artist: "Tom Odell", timeAgo: "8 min ago", cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=120" },
      { title: "Ivy", artist: "Frank Ocean", timeAgo: "42 min ago", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120" },
      { title: "The Night We Met", artist: "Lord Huron", timeAgo: "2 hr ago", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120" },
      { title: "Do I Wanna Know?", artist: "Arctic Monkeys", timeAgo: "3 hr ago", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120" },
      { title: "Choo Lo", artist: "The Local Train", timeAgo: "5 hr ago", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120" }
    ],
    topSongs: [
      { rank: "01", title: "Everything In Its Right Place", artist: "Radiohead", duration: "4:11", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120" },
      { rank: "02", title: "Night Changes", artist: "One Direction", duration: "3:46", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120" },
      { rank: "03", title: "Time", artist: "Pink Floyd", duration: "6:53", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120" },
      { rank: "04", title: "Stay With Me", artist: "Sam Smith", duration: "2:52", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=120" },
      { rank: "05", title: "Sweater Weather", artist: "The Neighbourhood", duration: "4:00", cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=120" }
    ],
    currentlyPlaying: {
      title: "Everything In Its Right Place",
      artist: "Radiohead",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120",
      isPlaying: true
    }
  };

  // Helper method for future Spotify API fetch hookup
  window.loadSpotifyAPI = async function() {
    try {
      // In future: const res = await fetch('/api/spotify');
      // const data = await res.json();
      // updateSpotifyUI(data);
    } catch (err) {
      console.log('Spotify API ready for hookup:', err);
    }
  };

}
