import React, { useState } from 'react';
import Input from '../form/Input.js';
import SubmitCad from '../form/SubmitCad.js';
import styles from './ProjectForm.module.css';
import axios from 'axios';

function FormCad({ btnText }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/gerenciar-usuarios/register', {
        fullName,
        email,
        password,
        confirmPassword,
      });

      console.log(response.data.message);

      // Limpar os campos após o envio
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type='text'
        text='Nome completo'
        name='fullName'
        placeholder='Insira o seu nome completo'
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <Input
        type='text'
        text='Email'
        name='email'
        placeholder='Insira o seu email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type='password'
        text='Senha'
        name='password'
        placeholder='Insira a sua senha'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type='password'
        text='Repita a senha'
        name='confirmPassword'
        placeholder='Repita a sua senha'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <SubmitCad text={btnText} />
    </form>
  );
}

export default FormCad;