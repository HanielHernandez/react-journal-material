import { async } from "@firebase/util";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import {
  addNewEmptyNote,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // uid
    dispatch(savingNewNote());
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    try {
      const newDoc = doc(collection(FirebaseDB, `${uid}/journals/notes`));
      await setDoc(newDoc, newNote);
      newNote.id = newDoc.id;

      dispatch(addNewEmptyNote(newNote));
      dispatch(setActiveNote(newNote));
    } catch (error) {
      console.log(error);
    }

    //    di+spatch( activar la nota)
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El Uid no existe");
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSavingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeNote: note } = getState().journal;
    const noteToFireSore = { ...note };
    delete noteToFireSore.id;
    const docRef = doc(FirebaseDB, `${uid}/journals/notes/${note.id}`);
    dispatch(setSaving());
    await setDoc(docRef, noteToFireSore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }
    const photosUrl = await Promise.all(fileUploadPromises);
    console.log(photosUrl);
    dispatch(setPhotosToActiveNote(photosUrl));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { activeNote: note } = getState().journal;
    const docRef = doc(FirebaseDB, `${uid}/journals/notes/${note.id}`);
    await deleteDoc(docRef);
    dispatch(deleteNoteById (note.id))
  };
};
