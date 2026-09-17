import { useDispatch } from 'react-redux'
import { updateNote, deleteNote } from '../storage/notesSlice'
import { useRef, useEffect, useState } from 'react'
import TextEditor from './TextEditor'
import './Note.css'

function Note({ CurNote }) {
    const dispatch = useDispatch()

    const handleDeleteNote = (id) => {
        dispatch(deleteNote(id))
    }

    const handleUpdateNote = (id, newTitle, newText, newImages) => {
        dispatch(
            updateNote({
                id,
                title: newTitle,
                text: newText,
                images: newImages
            }))
    }

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
        handleUpdateNote(CurNote.id, editedText.title, editedText.text, editedText.images)
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
        if (!isEditing) return

        const handleDocMouseDown = (e) => {
            if (noteRef.current && !noteRef.current.contains(e.target)) {
                handleSave()
            }
        }

        document.addEventListener("mousedown", handleDocMouseDown)
        return () => document.removeEventListener("mousedown", handleDocMouseDown)
    }, [isEditing, editedText])

    return (
        <>
            <div ref={noteRef} className="oneNote" onClick={handleEdit}>
                <button className='buttonDelNote' onClick={() => handleDeleteNote(CurNote.id)}>X</button>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            className='noteTitleArea'
                            value={editedText.title}
                            onChange={(e) => setEditedText(prev => ({ ...prev, title: e.target.value }))}
                        />
                        <TextEditor
                            value={editedText.text}
                            onChange={(html) => setEditedText(prev => ({ ...prev, text: html }))}
                        />

                        <div className="noteImages">
                            {(editedText.images ?? []).map((src, i) => (
                                <div className="noteImg" key={i}>
                                    <img src={src} alt="" style={{ maxWidth: 160 }} />
                                    <button className="buttonDelImg" onClick={() => removeEditedImage(i)}>X</button>
                                </div>
                            ))}
                        </div>
                        <input type="file" accept="image/*" multiple onChange={handleAddImagesEdit} />
                    </>
                ) : (
                    <>
                        <div className="oneNoteTitle">{CurNote.title}</div>
                        <div className="oneNoteText" dangerouslySetInnerHTML={{ __html: CurNote.text ?? "" }} />
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