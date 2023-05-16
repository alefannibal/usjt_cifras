import Input from '../form/Input.js'
import SubmitButton from '../form/SubmitButton.js'
import styles from './ProjectForm.module.css'
function ProjectForm(btnText){
  return (
    <form className={styles.form}>
      <Input 
        type='text' 
        text='Email' 
        name='name'
        placeholder='Insira o seu email'
      />
      <Input 
        type='password'  
        text='Senha' 
        name='name'
        placeholder='Insira a sua senha'
      />
      <SubmitButton text={btnText}/>
    </form>
  )
}

export default ProjectForm