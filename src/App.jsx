import { useMemo, useState } from 'react'
import { NoteContext } from './context/NoteContext'
import { useNotes } from './useNoteState'
import './App.css'
import AddButton from './components/AddButton'
import CurrentNote from './components/CurrentNote'
import NotesField from './components/NotesField'

function App() {
  const [notes, setNotes] = useNotes();

  const [newNote, setNewNote] = useState({title: "", text: "", images: []})
  const [isOpenNewNote, setIsOpenNewNote] = useState(false)

  const addNote = () => {
    if(newNote.title && newNote.text){
      const newId = Date.now().toString()
      setNotes(prev => [...prev, { ...newNote, id: newId }]);
      setNewNote({title: "", text: "", images: []})
    }
  }
  const deleteNote = (id) => {
    const updateNotes = notes.filter((n) => n.id !== id)
    setNotes(updateNotes)
  }
  const updateNote = (id, newTitle, newText, newImages) => {
    const updatedNotes = notes.map((note) => 
      note.id == id ? {...note, title: newTitle, text: newText, images: newImages ?? []} : note
    )
    setNotes(updatedNotes)
  }

  const contextValue = useMemo(() => ({
    notes,
    setNotes,
    newNote,
    setNewNote,
    isOpenNewNote,
    setIsOpenNewNote,
    addNote,
    deleteNote,
    updateNote
  }), [notes, newNote, isOpenNewNote])


  return (
    <>
      <NoteContext.Provider value={contextValue}>
        <div className="AppClass">
          { isOpenNewNote && <CurrentNote onClick={() => setIsOpenNewNote(prev => !prev)}/> }
          <div className='AppName'>Мои заметки</div>
          <NotesField />
          <AddButton onClick={() => setIsOpenNewNote(prev => !prev)} />
        </div>
      </NoteContext.Provider>
    </>
  )
}

export default App