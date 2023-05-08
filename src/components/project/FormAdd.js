import InputAdd from '../form/InputAdd'
import SubmitAdd from '../form/SubmitAdd'
import styles from './FormAdd.module.css'

function FormAdd({btnText}){
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

      <InputAdd 
        type="text"
        text="Letra"
        name="name"
        placeholder="Insira a letra da música"
      />    
      <SubmitAdd text={btnText}/>
    </form>
  )
}

export default FormAdd