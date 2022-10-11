import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = "") => {
  const collectionRef = collection(FirebaseDB, `${uid}/journals/notes`)
  const docs = await getDocs(collectionRef)
  const notes =  [] 
  docs.forEach(doc =>{
    notes.push({id: doc.id, ...doc.data()})
  })
  console.log(notes)
  return notes
};
