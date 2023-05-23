import {useRef} from 'react'
import InputAdd from '../form/InputAdd'
import SubmitAdd from '../form/SubmitAdd'
import styles from './FormAdd.module.css'

function FormAdd({btnText}){
  const textAreaRef = useRef(null)
   function submitForm(e){
    e.preventDefault()
      console.log(textAreaRef.current.value)
   }


  return(
    <form className={styles.form}>
      <InputAdd 
        type="text" 
        text="Nome da música"
        name="name"
        placeholder="Insira o nome da música"
      />
      <InputAdd 
        type="text" 
        text="Autor"
        name="name"
        placeholder="Insira o nome do autor"
      />


      <p>Letra: </p> 
      <textarea 
        ref={textAreaRef}
        type="textarea"
        text="Letra"
        name="name"
        placeholder="Insira a letra da música"
        // rows="8"
        // cols="48"
      /> 

      <SubmitAdd text={btnText} onClick={submitForm}/>
    </form>
  )
}

export default FormAdd