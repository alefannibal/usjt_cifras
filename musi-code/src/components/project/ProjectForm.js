import React, { useState, useEffect } from 'react';
import Input from '../form/Input.js';
import SubmitButton from '../form/SubmitButton.js';
import styles from './ProjectForm.module.css';
import { Link, useNavigate } from 'react-router-dom';

async function authenticateUser(email, password) {
  const response = await fetch('http://localhost:7000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    // Login successful
    console.log('Login successful');
    const { token } = await response.json();
    return token;
  } else {
    // Handle login errors
    const errorData = await response.json();
    alert("Credenciais invalidas")
    console.log('Invalid credentials:', errorData.message);
    throw new Error(errorData.message);
  }
}

function ProjectForm({ btnText, onAuthentication }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Verificar se o token é válido no servidor ou decodificar localmente
      onAuthentication(token);
      navigate('/dashboard');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = await authenticateUser(email, password);

      localStorage.setItem('token', token);
      onAuthentication(token);
      navigate('/dashboard');
    } catch (error) {
      console.log('Invalid credentials:', error.message);
    }
  };

  const handleTest = () => {
    console.log('Test function called');
  };

  return (
    <form className={styles.form}>
      <Input
        type="text"
        text="Email"
        name="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        autoComplete="off"
      />
      <Input
        type="password"
        text="Password"
        name="password"
        placeholder="Enter your password"
        autoComplete="off"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <SubmitButton text={btnText} onClick={handleLogin} />
    </form>
  );
}

export default ProjectForm;