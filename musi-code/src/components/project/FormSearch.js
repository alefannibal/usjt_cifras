import React, { useState } from 'react';
import InputSearch from '../form/InputSearch';
import styles from './FormSearch.module.css';
import SubmitSearch from '../form/SubmitSearch';
import axios from 'axios';

function FormSearch({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.get(`http://localhost:6001/musicas?titulo=${searchQuery}`);
  
      if (response.status === 200) {
        const data = response.data;
        console.log('Resposta da busca:', data); // Imprime a resposta da busca no console
        onSearch(data); // Chama a função onSearch passada como prop do componente
      } else {
        throw new Error('Erro ao buscar dados');
      }
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
