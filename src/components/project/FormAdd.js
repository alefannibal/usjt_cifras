import React, { useState } from 'react';
import InputAdd from '../form/InputAdd';
import SubmitAdd from '../form/SubmitAdd';
import styles from './FormAdd.module.css';
import axios from 'axios';

function FormAdd({ btnText }) {
  const [formData, setFormData] = useState({
    nome: '',
    autor: '',
    letra: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { nome, autor, letra } = formData;

    try {
      await axios.post('http://localhost:4000/musica', {
        titulo: nome,
        autor: autor,
        letra: letra,
      });

      setFormData({ nome: '', autor: '', letra: '' });
    } catch (error) {
      console.error('Erro ao adicionar música:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputAdd
        type="text"
        text="Nome da música"
        name="nome"
        placeholder="Insira o nome da música"
        value={formData.nome}
        onChange={handleInputChange}
      />
      <InputAdd
        type="text"
        text="Autor"
        name="autor"
        placeholder="Insira o nome do autor"
        value={formData.autor}
        onChange={handleInputChange}
      />
      <InputAdd
        type="text"
        text="Letra"
        name="letra"
        placeholder="Insira a letra da música"
        value={formData.letra}
        onChange={handleInputChange}
      />
      <SubmitAdd text={btnText} onSubmit={handleSubmit} />
    </form>
  );
}

export default FormAdd;