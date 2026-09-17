import { useDispatch } from 'react-redux'
import { addNote } from './storage/notesSlice'
import { useState } from 'react'
import './App.css'
import AddButton from './components/AddButton'
import CurrentNote from './components/CurrentNote'
import NotesField from './components/NotesField'

function App() {
  const dispatch = useDispatch()

  //const [notes, setNotes] = useNotes();

  const [newNote, setNewNote] = useState({ 
    title: "", 
    text: "", 
    images: [] 
  })
  const [isOpenNewNote, setIsOpenNewNote] = useState(false)

  const handleAddNote = () => {
    if (newNote.title && newNote.text) {
      const id = Date.now().toString()
      dispatch(
        addNote({
          id, 
          title: newNote.title,
          text: newNote.text,
          images: newNote.images
        }))
    }
    setNewNote({ 
      title: "", 
      text: "", 
      images: [] 
    })
    setIsOpenNewNote(false)
  }

  return (
    <>
      <div className="AppClass">
        {isOpenNewNote &&
          <CurrentNote
            newNote={newNote}
            setNewNote={setNewNote}
            onClose={() => setIsOpenNewNote(false)}
            onAdd={handleAddNote}
          />
        }
        <div className='AppName'>Мои заметки</div>
        <NotesField />
        <AddButton onClick={() => setIsOpenNewNote(prev => !prev)} />
      </div>
    </>
  )
}

export default App