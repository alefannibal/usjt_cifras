import React, { useState } from 'react';
import Input from '../form/Input.js';
import SubmitButton from '../form/SubmitButton.js';
import styles from './ProjectForm.module.css';
import { Link, useNavigate } from 'react-router-dom';

function ProjectForm({ btnText, onAuthentication }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    console.log('Função handleLogin disparada');
    e.preventDefault();
    const data = {
      email,
      password
    };

    try {
      console.log('Chamando endpoint /login...');
      console.log('Dados de login:', data);

      const response = await fetch('http://localhost:7000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Login bem-sucedido
        console.log('Login bem-sucedido');
        onAuthentication();
      } else {
        // Lidar com erros de login
        const errorData = await response.json();
        console.log('Credenciais inválidas:', errorData.message);
      }
    } catch (error) {
      console.log('Credenciais inválidas:', error);
    }
  };

  const handleTest = () => {
    console.log('Função de teste chamada');
  };

  return (
    <form className={styles.form}>
      <Input
        type="text"
        text="Email"
        name="email"
        placeholder="Insira o seu email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        autoComplete="off"
      />
      <Input
        type="password"
        text="Senha"
        name="password"
        placeholder="Insira a sua senha"
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <SubmitButton text={btnText} onClick={handleLogin} />
    </form>
  );
}

export default ProjectForm;