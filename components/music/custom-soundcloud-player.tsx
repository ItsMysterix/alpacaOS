"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import Image from "next/image"
import {
  Heart,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
  Search,
  Folder,
  Music,
} from "lucide-react"
import { type SCTrack, formatDuration } from "./soundcloud-api"

// Sample tracks - replace with actual API data later
const SAMPLE_TRACKS: SCTrack[] = [
  {
    id: 1,
    title: "Pixel Dreams",
    permalink_url: "https://soundcloud.com/user-279686825/pixel-dreams",
    artwork_url: "/pixel-dreams.png",
    user: {
      username: "Retro Wave",
    },
    duration: 180000,
  },
  {
    id: 2,
    title: "Synthwave Nights",
    permalink_url: "https://soundcloud.com/neonpulse/synthwave-nights",
    artwork_url: "/pixelated-dreamscape.png",
    user: {
      username: "Neon Pulse",
    },
    duration: 210000,
  },
  {
    id: 3,
    title: "8-Bit Adventure",
    permalink_url: "https://soundcloud.com/chiptune-heroes/8-bit-adventure",
    artwork_url: "/pixelated-after-hours.png",
    user: {
      username: "Chiptune Heroes",
    },
    duration: 160000,
  },
  {
    id: 4,
    title: "Digital Sunset",
    permalink_url: "https://soundcloud.com/pixel-horizon/digital-sunset",
    artwork_url: "/pixelated-m83-album.png",
    user: {
      username: "Pixel Horizon",
    },
    duration: 195000,
  },
  {
    id: 5,
    title: "Arcade Memories",
    permalink_url: "https://soundcloud.com/retro-beats/arcade-memories",
    artwork_url: "/pixelated-mau5.png",
    user: {
      username: "Retro Beats",
    },
    duration: 220000,
  },
]

// Group tracks by artist (simulating albums)
const groupByArtist = (tracks: SCTrack[]) => {
  const groups: Record<string, SCTrack[]> = {}

  tracks.forEach((track) => {
    const artist = track.user.username
    if (!groups[artist]) {
      groups[artist] = []
    }
    groups[artist].push(track)
  })

  return groups
}

export default function CustomSoundCloudPlayer() {
  const [tracks, setTracks] = useState<SCTrack[]>(SAMPLE_TRACKS)
  const [currentTrack, setCurrentTrack] = useState<SCTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(70)
  const [favorites, setFavorites] = useState<Record<number, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredTracks, setFilteredTracks] = useState(SAMPLE_TRACKS)
  const [activeView, setActiveView] = useState<"all" | "favorites" | "artists">("all")
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null)
  const [playbackError, setPlaybackError] = useState<string | null>(null)
  const [simulatedPlayback, setSimulatedPlayback] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio()
      audioRef.current.volume = volume / 100

      // Load favorites from localStorage
      const storedFavorites = localStorage.getItem("alpaca_os_music_favorites")
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      } else {
        // Initialize all tracks as favorites by default
        const initialFavorites: Record<number, boolean> = {}
        SAMPLE_TRACKS.forEach((track) => {
          initialFavorites[track.id] = true
        })
        setFavorites(initialFavorites)
        localStorage.setItem("alpaca_os_music_favorites", JSON.stringify(initialFavorites))
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [])

  // Filter tracks based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTracks(tracks)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = tracks.filter(
      (track) => track.title.toLowerCase().includes(query) || track.user.username.toLowerCase().includes(query),
    )
    setFilteredTracks(filtered)
  }, [searchQuery, tracks])

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      nextTrack()
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  // Simulate playback progress when in simulation mode
  useEffect(() => {
    if (simulatedPlayback && isPlaying && currentTrack) {
      // Clear any existing interval
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }

      // Set up a new interval to update the current time
      progressInterval.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          // Calculate the new time
          const newTime = prevTime + 1

          // Check if we've reached the end of the track
          if (newTime >= currentTrack.duration / 1000) {
            clearInterval(progressInterval.current!)
            setIsPlaying(false)
            setCurrentTime(0)
            // Simulate moving to the next track
            setTimeout(() => nextTrack(), 500)
            return 0
          }

          return newTime
        })
      }, 1000) // Update every second

      return () => {
        if (progressInterval.current) {
          clearInterval(progressInterval.current)
        }
      }
    }
  }, [simulatedPlayback, isPlaying, currentTrack])

  // Play a track
  const playTrack = (track: SCTrack) => {
    setCurrentTrack(track)
    setPlaybackError(null)

    try {
      if (audioRef.current) {
        // Try to play the actual track
        const streamUrl = track.permalink_url
        audioRef.current.src = streamUrl

        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
            setSimulatedPlayback(false)
          })
          .catch((error) => {
            console.error("Error playing audio:", error)

            // If we can't play the actual track, simulate playback
            setPlaybackError("Using simulated playback mode")
            setIsPlaying(true)
            setSimulatedPlayback(true)
          })
      }
    } catch (error) {
      console.error("Error setting up audio:", error)
      setPlaybackError("Using simulated playback mode")
      setIsPlaying(true)
      setSimulatedPlayback(true)
    }
  }

  // Pause the current track
  const pauseTrack = () => {
    if (simulatedPlayback) {
      // Just update the state for simulated playback
      setIsPlaying(false)
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  // Resume the current track
  const resumeTrack = () => {
    if (simulatedPlayback) {
      // Just update the state for simulated playback
      setIsPlaying(true)
    } else if (audioRef.current && !isPlaying && currentTrack) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((error) => {
          console.error("Error resuming audio:", error)
          setPlaybackError("Using simulated playback mode")
          setIsPlaying(true)
          setSimulatedPlayback(true)
        })
    }
  }

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      pauseTrack()
    } else {
      resumeTrack()
    }
  }

  // Set volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseInt(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100
    }
  }

  // Seek to a specific time
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTrack) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickPosition = e.clientX - rect.left
    const newProgress = (clickPosition / rect.width) * (currentTrack.duration / 1000)

    if (simulatedPlayback) {
      // Just update the time for simulated playback
      setCurrentTime(newProgress)
    } else if (audioRef.current) {
      audioRef.current.currentTime = newProgress
      setCurrentTime(newProgress)
    }
  }

  // Play next track
  const nextTrack = () => {
    if (!currentTrack) return

    const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % tracks.length
    playTrack(tracks[nextIndex])
  }

  // Play previous track
  const previousTrack = () => {
    if (!currentTrack) return

    const currentIndex = tracks.findIndex((track) => track.id === currentTrack.id)
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
    playTrack(tracks[prevIndex])
  }

  // Toggle favorite status for a track
  const toggleFavorite = (trackId: number) => {
    const newFavorites = { ...favorites }
    newFavorites[trackId] = !newFavorites[trackId]
    setFavorites(newFavorites)
    localStorage.setItem("alpaca_os_music_favorites", JSON.stringify(newFavorites))
  }

  // Calculate progress percentage
  const progressPercentage = currentTrack ? (currentTime / (currentTrack.duration / 1000)) * 100 : 0

  // Get artists from tracks
  const artists = Array.from(new Set(tracks.map((track) => track.user.username)))
  const artistGroups = groupByArtist(tracks)

  // Render track list
  const renderTracks = (trackList: SCTrack[]) => {
    if (trackList.length === 0) {
      return <div className="p-4 font-vt323 text-xl">No tracks found</div>
    }

    return (
      <div className="space-y-4">
        {trackList.map((track) => (
          <div
            key={track.id}
            className={`flex items-center p-3 rounded-none border-2 hover:bg-[#87CEEB] cursor-pointer ${
              currentTrack?.id === track.id ? "bg-[#87CEEB] border-black" : "border-gray-300"
            }`}
            onClick={() => playTrack(track)}
          >
            <div className="w-12 h-12 relative mr-4 border-2 border-black">
              <Image
                src={track.artwork_url || "/placeholder.svg"}
                alt={track.title}
                width={48}
                height={48}
                className="pixel-effect"
              />
            </div>
            <div className="flex-1">
              <p className="font-vt323 text-xl font-bold">{track.title}</p>
              <p className="font-vt323 text-lg text-gray-600">{track.user.username}</p>
            </div>
            <div className="font-vt323 text-lg text-gray-500">{formatDuration(track.duration)}</div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(track.id)
              }}
              className="p-2 focus:outline-none relative"
            >
              <div className={`w-5 h-5 ${favorites[track.id] ? "block" : "hidden"}`}>
                <div
                  className="absolute top-0 left-0 w-5 h-5 bg-[#FF4B91] transform translate-x-0.5 translate-y-0.5"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                ></div>
                <div
                  className="absolute top-0 left-0 w-5 h-5 border-2 border-black"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                ></div>
              </div>
              <Heart className={`w-5 h-5 ${favorites[track.id] ? "hidden" : "text-gray-400"}`} />
            </button>
            {currentTrack?.id === track.id && isPlaying && (
              <div className="w-3 h-3 ml-2 bg-[#FF4B91] animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case "all":
        return (
          <div className="p-4">
            <div className="mb-6">
              <h3 className="font-vt323 text-2xl font-bold text-[#FF4B91]">All Tracks</h3>
              <p className="font-vt323 text-lg text-gray-500">{filteredTracks.length} songs</p>
            </div>
            {renderTracks(filteredTracks)}
          </div>
        )
      case "favorites":
        const favoriteTracks = tracks.filter((track) => favorites[track.id])
        return (
          <div className="p-4">
            <div className="mb-6">
              <h3 className="font-vt323 text-2xl font-bold text-[#FF4B91]">Favorites</h3>
              <p className="font-vt323 text-lg text-gray-500">{favoriteTracks.length} songs</p>
            </div>
            {favoriteTracks.length === 0 ? (
              <div className="p-4 font-vt323 text-xl">
                No favorite tracks yet. Click the heart icon to add tracks to your favorites.
              </div>
            ) : (
              renderTracks(favoriteTracks)
            )}
          </div>
        )
      case "artists":
        if (selectedArtist) {
          const artistTracks = artistGroups[selectedArtist] || []
          return (
            <div className="p-4">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 bg-[#87CEEB] border-2 border-black font-vt323 text-lg"
                    onClick={() => setSelectedArtist(null)}
                  >
                    ← Back
                  </button>
                  <h3 className="font-vt323 text-2xl font-bold text-[#FF4B91]">{selectedArtist}</h3>
                </div>
                <p className="font-vt323 text-lg text-gray-500">{artistTracks.length} songs</p>
              </div>
              {renderTracks(artistTracks)}
            </div>
          )
        }

        return (
          <div className="p-4">
            <div className="mb-6">
              <h3 className="font-vt323 text-2xl font-bold text-[#FF4B91]">Artists</h3>
              <p className="font-vt323 text-lg text-gray-500">{artists.length} artists</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {artists.map((artist) => {
                const artistTracks = artistGroups[artist] || []
                const coverArt = artistTracks[0]?.artwork_url || "/placeholder.svg"

                return (
                  <div
                    key={artist}
                    className="bg-gray-50 p-4 border-2 border-gray-300 hover:border-[#FF4B91] cursor-pointer"
                    onClick={() => setSelectedArtist(artist)}
                  >
                    <div className="w-full h-40 relative mb-3 border-2 border-black">
                      <Image
                        src={coverArt || "/placeholder.svg"}
                        alt={artist}
                        fill
                        className="pixel-effect object-cover"
                      />
                    </div>
                    <h4 className="font-vt323 text-xl font-bold">{artist}</h4>
                    <p className="font-vt323 text-lg text-gray-600">{artistTracks.length} tracks</p>
                  </div>
                )
              })}
            </div>
          </div>
        )
      default:
        return <div className="p-4 font-vt323 text-xl">Select a view from the sidebar</div>
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#F8F1E7]">
      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-1/4 bg-[#87CEEB] border-r-2 border-black p-3">
          {/* Search bar */}
          <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-black font-vt323 text-lg"
            />
          </div>

          {/* Navigation options */}
          <div className="mb-4">
            <div
              className={`flex items-center gap-3 p-3 cursor-pointer border-2 mb-2 ${
                activeView === "all" ? "bg-[#FFCD4B] border-black" : "border-transparent hover:border-black"
              }`}
              onClick={() => {
                setActiveView("all")
                setSearchQuery("")
              }}
            >
              <Music className="w-5 h-5 text-[#0802A3]" />
              <span className="font-vt323 text-xl">All Tracks</span>
            </div>
            <div
              className={`flex items-center gap-3 p-3 cursor-pointer border-2 mb-2 ${
                activeView === "favorites" ? "bg-[#FFCD4B] border-black" : "border-transparent hover:border-black"
              }`}
              onClick={() => {
                setActiveView("favorites")
                setSearchQuery("")
              }}
            >
              <Heart className="w-5 h-5 text-[#FF4B91]" />
              <span className="font-vt323 text-xl">Favorites</span>
            </div>
            <div
              className={`flex items-center gap-3 p-3 cursor-pointer border-2 mb-2 ${
                activeView === "artists" ? "bg-[#FFCD4B] border-black" : "border-transparent hover:border-black"
              }`}
              onClick={() => {
                setActiveView("artists")
                setSelectedArtist(null)
                setSearchQuery("")
              }}
            >
              <Folder className="w-5 h-5 text-[#0802A3]" />
              <span className="font-vt323 text-xl">Artists</span>
            </div>
          </div>

          <div className="font-vt323 text-2xl font-bold mb-4 px-2 text-black">Favourites</div>
          {/* Display favorite tracks */}
          {tracks
            .filter((track) => favorites[track.id])
            .slice(0, 5)
            .map((track) => (
              <div
                key={track.id}
                className={`flex items-center gap-3 p-3 cursor-pointer border-2 mb-2 ${
                  currentTrack?.id === track.id ? "bg-[#FFCD4B] border-black" : "border-transparent hover:border-black"
                }`}
                onClick={() => playTrack(track)}
              >
                <div className="w-10 h-10 relative">
                  <Image
                    src={track.artwork_url || "/placeholder.svg"}
                    alt={track.title}
                    width={40}
                    height={40}
                    className="pixel-effect border-2 border-black"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <span className="font-vt323 text-lg block truncate">{track.title}</span>
                  <span className="font-vt323 text-sm block truncate text-gray-600">{track.user.username}</span>
                </div>
                <div className="w-4 h-4 relative">
                  <div
                    className="absolute top-0 left-0 w-4 h-4 bg-[#FF4B91] transform translate-x-0.5 translate-y-0.5"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                    }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-4 h-4 border-2 border-black"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                    }}
                  ></div>
                </div>
              </div>
            ))}
        </div>

        {/* Right content area */}
        <div className="flex-1 overflow-auto">
          <div className="p-3 bg-[#87CEEB] border-b-2 border-black font-vt323 text-xl font-bold">
            {activeView === "all" ? "All Tracks" : activeView === "favorites" ? "Favorites" : "Artists"}
          </div>

          {/* Main content */}
          <div className="p-4">
            {/* Now playing section */}
            {currentTrack && (
              <div className="mb-6 bg-white p-4 border-2 border-black">
                <div className="flex items-start gap-4">
                  <div className="w-32 h-32 relative border-2 border-black">
                    <Image
                      src={currentTrack.artwork_url || "/placeholder.svg"}
                      alt={currentTrack.title}
                      fill
                      className="pixel-effect object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-vt323 text-2xl font-bold">{currentTrack.title}</h3>
                    <p className="font-vt323 text-lg text-gray-600">{currentTrack.user.username}</p>

                    {/* Playback error message */}
                    {playbackError && <p className="font-vt323 text-sm text-[#FF4B91] mt-1">{playbackError}</p>}

                    {/* Progress bar */}
                    <div className="flex items-center gap-2 mt-4">
                      <span className="font-vt323 text-lg">{formatDuration(currentTime * 1000)}</span>
                      <div
                        className="flex-1 h-4 bg-[#87CEEB] border-2 border-black cursor-pointer relative"
                        onClick={handleProgressClick}
                      >
                        <div className="h-full bg-[#FFCD4B]" style={{ width: `${progressPercentage}%` }}></div>
                      </div>
                      <span className="font-vt323 text-lg">{formatDuration(currentTrack.duration)}</span>
                    </div>

                    {/* Playback controls */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        className="w-8 h-8 bg-[#87CEEB] border-2 border-black flex items-center justify-center"
                        onClick={previousTrack}
                      >
                        <SkipBack className="w-4 h-4 text-black" />
                      </button>
                      <button
                        className="w-10 h-10 bg-[#FFCD4B] border-2 border-black flex items-center justify-center"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black" />}
                      </button>
                      <button
                        className="w-8 h-8 bg-[#87CEEB] border-2 border-black flex items-center justify-center"
                        onClick={nextTrack}
                      >
                        <SkipForward className="w-4 h-4 text-black" />
                      </button>

                      {/* Volume control */}
                      <div className="flex items-center gap-2 ml-auto">
                        <div className="w-6 h-6 relative">
                          {volume > 50 ? (
                            <Volume2 className="w-5 h-5 text-black" />
                          ) : volume > 0 ? (
                            <Volume1 className="w-5 h-5 text-black" />
                          ) : (
                            <VolumeX className="w-5 h-5 text-black" />
                          )}
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={handleVolumeChange}
                          className="w-24 h-4 appearance-none bg-[#87CEEB] border-2 border-black cursor-pointer"
                          style={{
                            backgroundImage: `linear-gradient(to right, #FFCD4B ${volume}%, #87CEEB ${volume}%)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content based on active view */}
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Player controls (fixed at bottom) */}
      <div className="h-24 bg-[#0C4A9C] border-t-2 border-black p-4">
        <div className="flex h-full items-center">
          {currentTrack ? (
            <>
              {/* Album art */}
              <div className="w-16 h-16 relative border-2 border-black mr-4">
                <Image
                  src={currentTrack.artwork_url || "/placeholder.svg"}
                  alt={currentTrack.title}
                  fill
                  className="pixel-effect object-cover"
                />
              </div>

              {/* Track info and controls */}
              <div className="flex-1 flex flex-col justify-between">
                {/* Track info */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-vt323 text-xl font-bold text-white">{currentTrack.title}</p>
                    <p className="font-vt323 text-lg text-[#87CEEB]">{currentTrack.user.username}</p>
                    {simulatedPlayback && <p className="font-vt323 text-xs text-[#FFCD4B]">Simulated playback mode</p>}
                  </div>

                  {/* Favorite button with pixelated heart */}
                  <button onClick={() => toggleFavorite(currentTrack.id)} className="p-2 focus:outline-none relative">
                    <div className={`w-6 h-6 ${favorites[currentTrack.id] ? "block" : "hidden"}`}>
                      <div
                        className="absolute top-0 left-0 w-6 h-6 bg-[#FF4B91] transform translate-x-0.5 translate-y-0.5"
                        style={{
                          clipPath:
                            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                        }}
                      ></div>
                      <div
                        className="absolute top-0 left-0 w-6 h-6 border-2 border-black"
                        style={{
                          clipPath:
                            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                        }}
                      ></div>
                    </div>
                    <Heart className={`w-6 h-6 ${favorites[currentTrack.id] ? "hidden" : "text-white"}`} />
                  </button>
                </div>

                {/* Playback controls */}
                <div className="flex items-center gap-4">
                  <button
                    className="w-8 h-8 bg-[#87CEEB] border-2 border-black flex items-center justify-center"
                    onClick={previousTrack}
                  >
                    <SkipBack className="w-4 h-4 text-black" />
                  </button>
                  <button
                    className="w-12 h-12 bg-[#FFCD4B] border-2 border-black flex items-center justify-center"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause className="w-6 h-6 text-black" /> : <Play className="w-6 h-6 text-black" />}
                  </button>
                  <button
                    className="w-8 h-8 bg-[#87CEEB] border-2 border-black flex items-center justify-center"
                    onClick={nextTrack}
                  >
                    <SkipForward className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-center">
                <p className="font-vt323 text-xl text-white">Select a track to play</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
