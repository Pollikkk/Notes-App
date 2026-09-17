import TextEditor from './TextEditor'
import './CurrentNote.css'

function CurrentNote({newNote, setNewNote, onClose, onAdd}) {
    console.log('CurrentNote render, newNote:', newNote);

    const removeAddedImage = (index) => {
        setNewNote(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const readAsDataURL = (file) =>
        new Promise((resolve, reject) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = reject;
            fr.readAsDataURL(file); 
        });

    const handleImagesPick = async (e) => {
        const files = Array.from(e.target.files ?? []);
        console.log('Selected files:', files);

        if (!files.length) return;

        try {
          const dataUrls = await Promise.all(files.map(readAsDataURL));
          console.log('dataUrls:', dataUrls);

          setNewNote(prev => {
            const next = {
              ...prev,
              images: [...(prev.images ?? []), ...dataUrls],
            };
            console.log('setNewNote next:', next);
            return next;
          });
        } catch (err) {
          console.error('Images load error:', err);
        }

        e.target.value = '';
    };

    return (
        <>
            <div className="noteBackground" onClick={onClose}>
                <div className="note" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      placeholder="Заголовок"
                      className='noteTitleArea'
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    />
                    <TextEditor
                      value={newNote.text}
                      onChange={(html) => setNewNote(prev => ({ ...prev, text: html }))}
                      placeholder="Текст"
                    />
                    <div className="imagesPreview">
                      {(newNote.images ?? []).map((src, i) => (
                        <div className="noteImg" key={i}>
                            <img className="noteImg" key={i} src={src} alt="" style={{ maxWidth: 120, maxHeight: 120 }} />
                            <button className="buttonDelImg" onClick={() => removeAddedImage(i)}>X</button>
                        </div>
                      ))}
                    </div>
                    <input
                        className='inputImg'
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImagesPick}
                    />
                    <button 
                        className='noteAddButton' 
                        onClick={onAdd}>
                        Добавить
                    </button>
                </div>
            </div>
        </>
    )
}

export default CurrentNote