import InputSearch from '../form/InputSearch'
import styles from './FormSearch.module.css'

function FormSearch(){
  return ( 
    <form className={styles.form}>
      <InputSearch
        type="text" 
        name="name"
        placeholder="O que você quer ouvir hoje?"
      /> 
    </form> 
  )
}

export default FormSearch