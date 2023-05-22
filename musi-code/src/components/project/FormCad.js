import React, { useState } from 'react';
import Input from '../form/Input.js';
import SubmitCad from '../form/SubmitCad.js';
import styles from './ProjectForm.module.css';

function FormCad({ btnText }) {
  const [fullName, SetfullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Função handleRegister disparada")
    const data = {
      fullName,
      email,
      password,
      confirmPassword,
    };

    try {
      const response = await fetch('http://localhost:7000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Registro realizado com sucesso
        console.log('Usuário registrado com sucesso');
      } else {
        // Lidar com erros durante o registro
        const errorData = await response.json();
        console.log('Erro durante o registro:', errorData.message);
      }
    } catch (error) {
      console.log('Erro durante o registro:', error);
    }
  };

  return (
    <form className={styles.form}>
      <Input
        type="text"
        text="Nome completo"
        name="fullName"
        placeholder="Insira o seu nome completo"
        onChange={(e) => SetfullName(e.target.value)}
        value={fullName}
      />
      <Input
        type="text"
        text="Email"
        name="email"
        placeholder="Insira o seu email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <Input
        type="password"
        text="Senha"
        name="password"
        placeholder="Insira a sua senha"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Input
        type="password"
        text="Repita a senha"
        name="confirmPassword"
        placeholder="Repita a sua senha"
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />
      <SubmitCad text={btnText} onClick={handleRegister} />
    </form>
  );
}

export default FormCad;