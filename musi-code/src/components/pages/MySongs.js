import React, { useEffect, useState } from 'react';
import styles from './MySongs.module.css';

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

  return (
    <div>
      <h1>Minhas Músicas</h1>
      {Array.isArray(musicas) ? (
        musicas.map(musica => (
          <div className={styles.container_musica} key={musica._id}>
            <h2 className={styles.container_musica_titulo}>{musica.titulo}</h2>
            <h3 className={styles.container_musica_autor}>{musica.autor}</h3>
            <p className={styles.container_musica_letra}>{musica.letra}</p>
          </div>
        ))
      ) : (
        <p>Não foi possível obter as músicas.</p>
      )}
    </div>
  );
}

export default MySongs;