import { useRef, useEffect, useState } from 'react'
import { useNote } from '../context/NoteContext'
import './Note.css'

function Note({CurNote}) {
    const {updateNote, deleteNote} = useNote()
    const noteRef = useRef(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState({
        title: CurNote.title, 
        text: CurNote.text
    });

    const handleEdit = () => setIsEditing(true)

    const handleSave = () => {
      updateNote(CurNote.id, editedText.title, editedText.text)
      setIsEditing(false)
    };

    useEffect(() => {
        if(!isEditing) return

        const handleDocMouseDown = (e) => {
            if(noteRef.current && !noteRef.current.contains(e.target)){
                handleSave()
            }
        }

        document.addEventListener("mousedown", handleDocMouseDown)
        return () => document.removeEventListener("mousedown", handleDocMouseDown)
    }, [isEditing, editedText])

    return(
        <>
            <div ref={noteRef} className="oneNote" onClick={handleEdit}>
                <button className='buttonDelNote' onClick={() => deleteNote(CurNote.id)}>DEL</button>
                {isEditing ? (
                    <>
                        <input
                          type="text"
                          className='noteTitleArea'
                          value={editedText.title}
                          onChange={(e) => setEditedText(prev => ({...prev, title: e.target.value}))}
                        />
                        <textarea
                          rows="4"
                          cols="50"
                          className='noteTextArea'
                          value={editedText.text}
                          onChange={(e) => setEditedText(prev => ({...prev, text: e.target.value}))}
                        />
                    </>
                ) : (
                    <>
                        <div className="oneNoteTitle">{CurNote.title}</div>
                        <div className="oneNoteText">{CurNote.text}</div>
                    </>
                )}

            </div>
        </>
    )
}

export default Note