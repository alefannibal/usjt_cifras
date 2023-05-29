import React, { useEffect, useState } from 'react';
import styles from './MySongs.module.css';
import ProjectCard from '../project/ProjectCard';
import { Link } from 'react-router-dom';

function MySongs() {
  const [musicas, setMusicas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado.');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    fetch('http://localhost:6001/minhas-musicas', {
      headers: headers,
    })
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMusicas(data);
        } else {
          console.error('Resposta inválida do servidor:', data);
        }
      })
      .catch(error => {
        console.error('Erro ao obter músicas:', error);
      });
  }, []);

  const handleRemoveMusic = (id) => {
    // Lógica para remover a música com o ID especificado
  };

  return (
    <div>
      <h1 className={styles.title}>Minhas Músicas</h1>
      {Array.isArray(musicas) ? (
        musicas.map(musica => (
          <div className={styles.container_musica} key={musica.id}>
            <h2>{musica.titulo}</h2>
            <p className={styles.container_musica_autor}>Autor: {musica.autor}</p>
            <p className={styles.container_musica_letra}>Letra: {musica.letra}</p>
            <button className={styles.btn} onClick={() => handleRemoveMusic(musica.id)}>
              Remover Música
            </button>
          </div>
        ))
      ) : (
        <p>Não foi possível obter as músicas.</p>
      )}
      <button className={styles.btn}>
        <Link to="/AddMusica">Adicionar Música</Link>
      </button>
    </div>
  );
}

export default MySongs;
