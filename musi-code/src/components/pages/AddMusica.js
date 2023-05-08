import FormAdd from '../project/FormAdd'
import styles from './AddMusica.module.css'

function AddMusica() {
  return(
    <div className={styles.addmusica_container}>
      <h1>Adicionar Música</h1>
      <p>Adicione suas músicas para poder cantar com seus amigos</p>

      <FormAdd/>
    </div>
  ) 
}

export default AddMusica