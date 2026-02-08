import { useNote } from '../context/NoteContext'
import './CurrentNote.css'

function CurrentNote({onClick}) {
    const {newNote, setNewNote, setIsOpenNewNote, addNote} = useNote()
    return (
        <>
            <div className="noteBackground" onClick={onClick}>
                <div className="note" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      placeholder="Заголовок"
                      className='noteTitleArea'
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    />
                    <textarea
                      rows="4"
                      cols="50"
                      placeholder="Текст"
                      className='noteTextArea'
                      value={newNote.text}
                      onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
                    />
                    <button className='noteAddButton' 
                            onClick={() => {
                                addNote(); 
                                setIsOpenNewNote(prev => !prev)
                            }}>Добавить заметку
                    </button>
                </div>
            </div>
        </>
    )
}

export default CurrentNote