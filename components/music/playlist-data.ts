// Playlist data for our custom music player

export interface Track {
  id: string
  title: string
  artist: string
  coverUrl: string
  duration: number // in seconds
}

export interface Playlist {
  id: string
  name: string
  description: string
  tracks: Track[]
}

// Playlist 1: Quiet Hearts
export const quietHeartsPlaylist: Playlist = {
  id: "quiet-hearts",
  name: "Quiet Hearts",
  description: "Peaceful piano melodies for relaxation and focus",
  tracks: [
    {
      id: "track1",
      title: "Calm Your Heart",
      artist: "Patient",
      coverUrl: "/music-thumbnails/calm-heart.png",
      duration: 180,
    },
    {
      id: "track2",
      title: "When Life Feels Like a Daydream",
      artist: "Ophelia Wilde",
      coverUrl: "/music-thumbnails/daydream.png",
      duration: 195,
    },
    {
      id: "track3",
      title: "The Best of Yiruma",
      artist: "Charlie Lim",
      coverUrl: "/music-thumbnails/yiruma.png",
      duration: 210,
    },
    {
      id: "track4",
      title: "Improvisation in February",
      artist: "Sailence",
      coverUrl: "/music-thumbnails/improvisation.png",
      duration: 165,
    },
    {
      id: "track5",
      title: "Classical Masterpieces",
      artist: "Classical Stars",
      coverUrl: "/music-thumbnails/classical.png",
      duration: 240,
    },
  ],
}

// Playlist 2: Cozy Vibes
export const cozyVibesPlaylist: Playlist = {
  id: "cozy-vibes",
  name: "Cozy Vibes",
  description: "Warm coffee shop ambience with smooth jazz",
  tracks: [
    {
      id: "track6",
      title: "Cozy Coffee Shop",
      artist: "Relaxing Jazz Piano",
      coverUrl: "/music-thumbnails/coffee-shop.png",
      duration: 215,
    },
    {
      id: "track7",
      title: "Ghibli Piano Collection",
      artist: "Soothing Ghibli Piano",
      coverUrl: "/music-thumbnails/ghibli.png",
      duration: 190,
    },
    {
      id: "track8",
      title: "Tchaikovsky Playlist",
      artist: "Doe Victor and Victoria",
      coverUrl: "/music-thumbnails/tchaikovsky.png",
      duration: 225,
    },
    {
      id: "track9",
      title: "Gibran Alcocer Piano",
      artist: "Gibran Alcocer",
      coverUrl: "/music-thumbnails/gibran.png",
      duration: 175,
    },
    {
      id: "track10",
      title: "Dark Academia",
      artist: "Toxic Dreamer",
      coverUrl: "/music-thumbnails/dark-academia.png",
      duration: 200,
    },
  ],
}

// All playlists
export const playlists: Playlist[] = [quietHeartsPlaylist, cozyVibesPlaylist]

// All tracks
export const allTracks: Track[] = [...quietHeartsPlaylist.tracks, ...cozyVibesPlaylist.tracks]

// Format duration from seconds to mm:ss
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}
