import { useNote } from '../context/NoteContext'
import Note from './Note'
import './NotesField.css'

function NotesField() {
    const {notes} = useNote()
    return(
        <>
            <div className='notesField'>
                {
                    notes.map((note) =>(
                        <Note key={note.id} CurNote={note}/>
                    ))
                }
            </div>
        </>
    )
}

export default NotesField