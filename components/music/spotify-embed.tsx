"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"

interface Track {
  id: string
  title: string
  artist: string
  album: string
  coverUrl: string
  spotifyId: string
}

// Sample tracks - replace with your actual favorites
const FAVORITE_TRACKS: Track[] = [
  {
    id: "track1",
    title: "Pixel Dreams",
    artist: "Retro Wave",
    album: "Digital Memories",
    coverUrl: "/pixel-dreams.png",
    spotifyId: "4cOdK2wGLETKBW3PvgPWqT", // Replace with actual Spotify track ID
  },
  {
    id: "track2",
    title: "Synthwave Nights",
    artist: "Neon Pulse",
    album: "Retroscape",
    coverUrl: "/pixelated-dreamscape.png",
    spotifyId: "2tznHmp70DxMyr2XhWLOW0", // Replace with actual Spotify track ID
  },
  {
    id: "track3",
    title: "8-Bit Adventure",
    artist: "Chiptune Heroes",
    album: "Game Over",
    coverUrl: "/pixelated-after-hours.png",
    spotifyId: "3bidbhpOYeV4knp8AIu8Xn", // Replace with actual Spotify track ID
  },
  {
    id: "track4",
    title: "Digital Sunset",
    artist: "Pixel Horizon",
    album: "Vaporwave Collection",
    coverUrl: "/pixelated-m83-album.png",
    spotifyId: "7LVHVU3tWfcxj5aiPFEW4Q", // Replace with actual Spotify track ID
  },
  {
    id: "track5",
    title: "Arcade Memories",
    artist: "Retro Beats",
    album: "High Score",
    coverUrl: "/pixelated-mau5.png",
    spotifyId: "4kbj5MwxO1bq9wjT5g9HaA", // Replace with actual Spotify track ID
  },
]

// Your Spotify playlist ID - replace with your actual playlist
const PLAYLIST_ID = "37i9dQZF1DXc8kgYqQLMfH" // Example: Lofi Beats playlist

export default function SpotifyEmbed() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(70)
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})
  const [activeView, setActiveView] = useState<"playlist" | "favorites">("favorites")
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Load favorites from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("alpaca_os_music_favorites")
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      } else {
        // Initialize all tracks as favorites by default
        const initialFavorites: Record<string, boolean> = {}
        FAVORITE_TRACKS.forEach((track) => {
          initialFavorites[track.id] = true
        })
        setFavorites(initialFavorites)
        localStorage.setItem("alpaca_os_music_favorites", JSON.stringify(initialFavorites))
      }
    }
  }, [])

  // Toggle favorite status for a track
  const toggleFavorite = (trackId: string) => {
    const newFavorites = { ...favorites }
    newFavorites[trackId] = !newFavorites[trackId]
    setFavorites(newFavorites)
    localStorage.setItem("alpaca_os_music_favorites", JSON.stringify(newFavorites))
  }

  // Play a track
  const playTrack = (track: Track) => {
    setSelectedTrack(track)
    setIsPlaying(true)
  }

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)

    // In a real implementation, you would control the iframe player
    // This is a placeholder for the UI state
  }

  // Render track list
  const renderTracks = (trackList: Track[]) => {
    if (trackList.length === 0) {
      return <div className="p-4 font-vt323 text-xl">No tracks found</div>
    }

    return (
      <div className="space-y-4">
        {trackList.map((track) => (
          <div
            key={track.id}
            className={`flex items-center p-3 rounded-none border-2 hover:bg-[#87CEEB] cursor-pointer ${
              selectedTrack?.id === track.id ? "bg-[#87CEEB] border-black" : "border-gray-300"
            }`}
            onClick={() => playTrack(track)}
          >
            <div className="w-12 h-12 relative mr-4 border-2 border-black">
              <Image
                src={track.coverUrl || "/placeholder.svg"}
                alt={track.album}
                width={48}
                height={48}
                className="pixel-effect"
              />
            </div>
            <div className="flex-1">
              <p className="font-vt323 text-xl font-bold">{track.title}</p>
              <p className="font-vt323 text-lg text-gray-600">{track.artist}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(track.id)
              }}
              className="p-2 focus:outline-none"
            >
              <Heart className={`w-5 h-5 ${favorites[track.id] ? "text-[#FF4B91] fill-[#FF4B91]" : "text-gray-400"}`} />
            </button>
            {selectedTrack?.id === track.id && isPlaying && (
              <div className="w-3 h-3 ml-2 bg-[#FF4B91] animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Get the current Spotify embed URL
  const getEmbedUrl = () => {
    if (selectedTrack) {
      return `https://open.spotify.com/embed/track/${selectedTrack.spotifyId}?utm_source=generator&theme=0`
    } else {
      return `https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#F8F1E7]">
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-1/4 bg-[#87CEEB] border-r-2 border-black p-3">
          {/* Navigation options */}
          <div className="mb-4">
            <div
              className={`flex items-center gap-3 p-3 cursor-pointer border-2 mb-2 ${
                activeView === "playlist" ? "bg-[#FFCD4B] border-black" : "border-transparent hover:border-black"
              }`}
              onClick={() => setActiveView("playlist")}
            >
              <span className="font-vt323 text-xl">My Playlist</span>
            </div>
            <div
              className={`flex items-center gap-3 p-3 cursor-pointer border-2 mb-2 ${
                activeView === "favorites" ? "bg-[#FFCD4B] border-black" : "border-transparent hover:border-black"
              }`}
              onClick={() => setActiveView("favorites")}
            >
              <Heart className="w-5 h-5" />
              <span className="font-vt323 text-xl">Favorites</span>
            </div>
          </div>

          <div className="font-vt323 text-2xl font-bold mb-4 px-2 text-black">Tracks</div>
          {/* Display favorite tracks */}
          {FAVORITE_TRACKS.map((track) => (
            <div
              key={track.id}
              className={`flex items-center gap-3 p-3 cursor-pointer border-2 mb-2 ${
                selectedTrack?.id === track.id ? "bg-[#FFCD4B] border-black" : "border-transparent hover:border-black"
              }`}
              onClick={() => playTrack(track)}
            >
              <div className="w-10 h-10 relative">
                <Image
                  src={track.coverUrl || "/placeholder.svg"}
                  alt={track.title}
                  width={40}
                  height={40}
                  className="pixel-effect border-2 border-black"
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <span className="font-vt323 text-lg block truncate">{track.title}</span>
                <span className="font-vt323 text-sm block truncate text-gray-600">{track.artist}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right content area */}
        <div className="flex-1 overflow-auto">
          <div className="p-3 bg-[#87CEEB] border-b-2 border-black font-vt323 text-xl font-bold">
            {activeView === "playlist" ? "My Playlist" : "Favorites"}
          </div>

          {/* Spotify Embed */}
          <div className="p-4">
            <div className="mb-6">
              <h3 className="font-vt323 text-2xl font-bold text-[#1DB954]">
                {selectedTrack ? selectedTrack.title : "My Playlist"}
              </h3>
              <p className="font-vt323 text-lg text-gray-500">
                {selectedTrack ? `${selectedTrack.artist} - ${selectedTrack.album}` : "Curated tracks"}
              </p>
            </div>

            <div className="w-full h-[380px] border-2 border-black">
              <iframe
                ref={iframeRef}
                src={getEmbedUrl()}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="bg-black"
              ></iframe>
            </div>

            {activeView === "favorites" && (
              <div className="mt-6">
                <h4 className="font-vt323 text-xl font-bold mb-4">My Favorites</h4>
                {renderTracks(FAVORITE_TRACKS.filter((track) => favorites[track.id]))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Player controls (visual only - actual control happens in the iframe) */}
      <div className="h-24 bg-[#0C4A9C] border-t-2 border-black p-4">
        <div className="flex h-full items-center">
          {selectedTrack ? (
            <>
              {/* Album art */}
              <div className="w-16 h-16 relative border-2 border-black mr-4">
                <Image
                  src={selectedTrack.coverUrl || "/placeholder.svg"}
                  alt={selectedTrack.album}
                  fill
                  className="pixel-effect object-cover"
                />
              </div>

              {/* Track info and controls */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-vt323 text-xl font-bold text-white">{selectedTrack.title}</p>
                    <p className="font-vt323 text-lg text-[#87CEEB]">{selectedTrack.artist}</p>
                  </div>
                  <div className="text-white font-vt323 text-sm">Controls available in the player above</div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 text-center">
              <p className="font-vt323 text-xl text-white">
                Select a track to play or use the embedded player controls
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
