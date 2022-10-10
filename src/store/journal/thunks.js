import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"

export const startNewNote = ()=>{
  return async (dispatch)=>{
    // uid
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    console.log(newNote)
    try{
      const newDoc = doc(collection(FirebaseDB, `${uid}/journals/notes`))
      const setDocResp = await setDoc(newDoc,newNote)
      console.log(newDote)
      console.log(setDocResp)
    }catch(error){
      console.log(error)
    }
    

   
    //    di+spatch( activar la nota)
  }
}






