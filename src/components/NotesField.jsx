import { useSelector } from 'react-redux'

import Note from './Note'
import './NotesField.css'

function NotesField() {
    const notes = useSelector(state => state.notes.notes)
    console.log(notes)
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