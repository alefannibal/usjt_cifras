import React, { useState } from 'react';
import InputSearch from '../form/InputSearch';
import styles from './FormSearch.module.css';
import SubmitSearch from '../form/SubmitSearch';

function FormSearch({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:6001/musica?titulo=${searchQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }

      const data = await response.json();
      console.log('Resposta da busca:', data); // Imprime a resposta da busca no console
      onSearch(data); // Chama a função onSearch passada como prop do componente
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputSearch
          type="text"
          name="name"
          placeholder="O que você quer ouvir hoje?"
          value={searchQuery}
          onChange={handleChange}
        />
        <SubmitSearch />
      </form>
    </div>
  );
}

export default FormSearch;
