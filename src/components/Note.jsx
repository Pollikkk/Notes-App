import { useRef, useEffect, useState } from 'react'
import { useNote } from '../context/NoteContext'
import './Note.css'

function Note({CurNote}) {
    const {updateNote, deleteNote} = useNote()
    const noteRef = useRef(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState({
        title: CurNote.title, 
        text: CurNote.text,
        images: CurNote.images ?? []
    });

    const handleEdit = () => setIsEditing(true)

    const readAsDataURL = (file) =>
        new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = reject;
            fr.readAsDataURL(file); 
        });

    const handleSave = () => {
        updateNote(CurNote.id, editedText.title, editedText.text, editedText.images)
        setIsEditing(false)
    };

    const handleAddImagesEdit = async (e) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;

        const dataUrls = await Promise.all(files.map(readAsDataURL));
        setEditedText(prev => ({ ...prev, images: [...(prev.images ?? []), ...dataUrls] }));
        e.target.value = "";
    };

    const removeEditedImage = (index) => {
        setEditedText(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
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
                        <div className="noteImages">
                            {(editedText.images ?? []).map((src, i) => (
                                <div key={i}>
                                    <img src={src} alt="" style={{ maxWidth: 160 }} />
                                    <button onClick={() => removeEditedImage(i)}>Удалить</button>
                                </div>
                            ))}
                        </div>
                        <input type="file" accept="image/*" multiple onChange={handleAddImagesEdit} />
                    </>
                ) : (
                    <>
                        <div className="oneNoteTitle">{CurNote.title}</div>
                        <div className="oneNoteText">{CurNote.text}</div>
                        {(CurNote.images ?? []).length > 0 && (
                            <div className="noteImages">
                                {CurNote.images.map((src, i) => (
                                    <img key={i} src={src} alt="" style={{ maxWidth: "100%" }} />
                                ))}
                            </div>
                        )}
                    </>
                )}

            </div>
        </>
    )
}

export default Note