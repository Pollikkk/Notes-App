import { createContext, useContext } from 'react'

export const NoteContext = createContext(null)

export const useNote = () => {
  const context = useContext(NoteContext)
  if (!context) {
    throw new Error('useTableContext must be used inside <NoteContext.Provider>')
  }
  return context
}