"use client"
import { useState, useEffect } from "react"

export type Season = "spring" | "summer" | "autumn" | "winter"
export type TimeOfDay = "dawn" | "day" | "dusk" | "night"

export interface Atmosphere {
    season: Season
    timeOfDay: TimeOfDay
}

export function useAtmosphere() {
    const [atmosphere, setAtmosphere] = useState<Atmosphere>({
        season: "summer",
        timeOfDay: "day",
    })

    useEffect(() => {
        const updateAtmosphere = () => {
            const now = new Date()
            const month = now.getMonth() // 0-11
            const hour = now.getHours() // 0-23

            // Calculate Season
            let season: Season = "spring"
            if (month >= 2 && month <= 4) season = "spring"
            else if (month >= 5 && month <= 7) season = "summer"
            else if (month >= 8 && month <= 10) season = "autumn"
            else season = "winter"

            // Calculate Time of Day
            let timeOfDay: TimeOfDay = "day"
            if (hour >= 5 && hour < 8) timeOfDay = "dawn"
            else if (hour >= 8 && hour < 18) timeOfDay = "day"
            else if (hour >= 18 && hour < 21) timeOfDay = "dusk"
            else timeOfDay = "night"

            setAtmosphere({ season, timeOfDay })
        }

        updateAtmosphere()
        const timer = setInterval(updateAtmosphere, 60000) // Update every minute
        return () => clearInterval(timer)
    }, [])

    return atmosphere
}
