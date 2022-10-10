import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: true,
    messageSaved: "",
    notes: [],
    activeNote: null,
  },
  reducers: {
    addNewEmptyNote: (state, action) => {},
    setActiveNotes: (state, action) => {},
    setNotes: (state, action) => {},
    setSaving: (state) => {},
    updateNote: (state, action) => {},
    deleteNoteById: (state, action) => {},
  },
});

export const { addNewEmptyNote,setActiveNotes} = journalSlice.actions