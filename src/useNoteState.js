import { useEffect, useState } from "react"

const STORAGE_KEY = "notes"

export function useNotes() {
    console.log("useNotes loaded");

    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        console.log(saved)
        if(!saved) return []

        try {
            const parsed = JSON.parse(saved)
            console.log("parsed " + parsed)
            console.log("isArr " + Array.isArray(parsed))
            console.log(true)
            return Array.isArray(parsed) ? parsed : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch (e) {
          console.error("localStorage save failed:", e);
        }
    }, [notes])

    return [notes, setNotes]
}