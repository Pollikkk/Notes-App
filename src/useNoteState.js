import { useEffect, useState } from "react"

const STORAGE_KEY = "notes"

export function useNotes() {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if(!saved) return [{title: "Какой-то заголовок", text: "Какой-то текст"}]

        try {
            const parsed = JSON.parse(saved)
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