import Input from '../form/Input.js'
import SubmitCad from '../form/SubmitCad.js'
import styles from './ProjectForm.module.css'

function FormCad(btnText){
  return (
    <form className={styles.form}>
      <Input 
        type='text' 
        text='Nome completo' 
        name='name'
        placeholder='Insira o seu nome completo'
      />
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
      <Input 
        type='password'  
        text='Repita a senha' 
        name='name'
        placeholder='Repita a sua senha'
      />
      <SubmitCad text={btnText}/>
    </form>
  )
}

export default FormCad