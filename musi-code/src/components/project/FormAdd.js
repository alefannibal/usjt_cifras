import React, { useRef, useState } from 'react';
import axios from 'axios';
import InputAdd from '../form/InputAdd';
import SubmitAdd from '../form/SubmitAdd';
import styles from './FormAdd.module.css';

function FormAdd({ btnText }) {
  const [formValues, setFormValues] = useState({ titulo: '', letra: '', autor: '' });
  const textAreaRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      console.log('Enviando requisição...');
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      if (!token) {
        console.error('Token não encontrado.');
        return;
      }
      console.log("Token encontrado");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const data = {
        titulo: formValues.titulo,
        letra: formValues.letra,
        autor: formValues.autor,
      };
      const response = await axios.post('http://localhost:4000/musica', data, { headers });

      console.log('Música adicionada com sucesso!');
      console.log('Resposta do servidor:', response.data);
      setFormValues({ titulo: '', letra: '', autor: '' });
    } catch (error) {
      console.error('Erro ao adicionar música:', error.response.data);
    }
  };

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <InputAdd
        type="text"
        text="Nome da música"
        name="titulo"
        placeholder="Insira o nome da música"
        value={formValues.titulo}
        onChange={handleInputChange}
      />
      <InputAdd
        type="text"
        text="Autor"
        name="autor"
        placeholder="Insira o nome do autor"
        value={formValues.autor}
        onChange={handleInputChange}
      />

      <p>Letra: </p>
      <textarea
        ref={textAreaRef}
        type="textarea"
        text="Letra"
        name="letra"
        placeholder="Insira a letra da música"
        value={formValues.letra}
        onChange={handleInputChange}
      />

      <SubmitAdd text={btnText} onSubmit={submitForm} />
    </form>
  );
}

export default FormAdd;