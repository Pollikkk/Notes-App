import { useNote } from '../context/NoteContext'
import './CurrentNote.css'

function CurrentNote({onClick}) {
    const {newNote, setNewNote, setIsOpenNewNote, addNote} = useNote()

    const readAsDataURL = (file) =>
        new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = reject;
            fr.readAsDataURL(file); 
        });

    const handleImagesPick = async (e) => {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;

        const MAX_MB = 0.3;
        const okFiles = files.filter(f => f.size <= MAX_MB * 1024 * 1024);

        const dataUrls = await Promise.all(okFiles.map(readAsDataURL));

        setNewNote(prev => ({
            ...prev,
            images: [...(prev.images ?? []), ...dataUrls],
        }));

        e.target.value = "";
    };

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
                    <div className="imagesPreview">
                      {(newNote.images ?? []).map((src, i) => (
                        <img key={i} src={src} alt="" style={{ maxWidth: 120, maxHeight: 120 }} />
                      ))}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImagesPick}
                    />
                    <button 
                        className='noteAddButton' 
                        onClick={() => {
                            addNote(); 
                            setIsOpenNewNote(prev => !prev)
                        }}>
                        Добавить
                    </button>
                </div>
            </div>
        </>
    )
}

export default CurrentNote