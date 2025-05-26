// SoundCloud API service

// Define types for SoundCloud tracks
export interface SCTrack {
  id: number
  title: string
  permalink_url: string
  artwork_url: string | null
  user: {
    username: string
  }
  duration: number
  stream_url?: string
}

// SoundCloud API configuration
const CLIENT_ID = "YOUR_SOUNDCLOUD_CLIENT_ID" // You'll need to replace this with your actual client ID

// Fetch tracks from a user
export async function getUserTracks(userId: string): Promise<SCTrack[]> {
  try {
    const response = await fetch(`https://api.soundcloud.com/users/${userId}/tracks?client_id=${CLIENT_ID}&limit=50`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching user tracks:", error)
    return []
  }
}

// Fetch tracks from a playlist
export async function getPlaylistTracks(playlistId: string): Promise<SCTrack[]> {
  try {
    const response = await fetch(`https://api.soundcloud.com/playlists/${playlistId}?client_id=${CLIENT_ID}`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const playlist = await response.json()
    return playlist.tracks || []
  } catch (error) {
    console.error("Error fetching playlist tracks:", error)
    return []
  }
}

// Search for tracks
export async function searchTracks(query: string): Promise<SCTrack[]> {
  try {
    const response = await fetch(
      `https://api.soundcloud.com/tracks?client_id=${CLIENT_ID}&q=${encodeURIComponent(query)}&limit=20`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error searching tracks:", error)
    return []
  }
}

// Get stream URL for a track
export function getStreamUrl(track: SCTrack): string {
  if (track.stream_url) {
    return `${track.stream_url}?client_id=${CLIENT_ID}`
  }
  return `https://api.soundcloud.com/tracks/${track.id}/stream?client_id=${CLIENT_ID}`
}

// Format duration from milliseconds to mm:ss
export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

// Get artwork URL with size
export function getArtworkUrl(track: SCTrack, size: "large" | "medium" | "small" = "medium"): string {
  if (!track.artwork_url) {
    return "/placeholder.svg" // Default placeholder
  }

  // SoundCloud artwork URLs can be modified to get different sizes
  // t500x500 (large), t300x300 (medium), t100x100 (small)
  const sizeMap = {
    large: "t500x500",
    medium: "t300x300",
    small: "t100x100",
  }

  return track.artwork_url.replace("large", sizeMap[size])
}
