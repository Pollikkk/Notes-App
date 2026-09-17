import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [
        {
            id: 1,
            title: "Какой-то заголовок", 
            text: "Какой-то текст",
            images: []
        }
    ]
}

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote(state, action) {
            state.notes.push(action.payload);
        },
        updateNote(state, action) {
            const {id, title, text, images} = action.payload;
            const note = state.notes.find(n => n.id === id);
            if(note) {
                note.title = title;
                note.text = text;
                note.images = images;
            }
        },
        deleteNote(state, action) {
            state.notes = state.notes.filter(n => n.id !== action.payload);
        }
    }
})

export const {addNote, updateNote, deleteNote} = notesSlice.actions;
export default notesSlice.reducer;