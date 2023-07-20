import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './PublicProfile.module.css';
import axios from 'axios';

function PublicProfile() {
  const { userId } = useParams();
  const [publicador, setPublicador] = useState(null);
  const [showLyrics, setShowLyrics] = useState({});
  const [showAll, setShowAll] = useState(false);
  const maxVisible = 1;
  const [visibleSongs, setVisibleSongs] = useState(maxVisible);

  // UseEffect para buscar os detalhes do publicador com base no userId
  useEffect(() => {
    const fetchPublicadorData = async () => {
      try {
        const response = await axios.get(`http://localhost:6001/usuarios/${userId}`);
        setPublicador(response.data);
        console.log('Detalhes do publicador:', response.data);
      } catch (error) {
        console.error('Erro ao buscar os dados do publicador:', error);
      }
    };

    fetchPublicadorData();
  }, [userId]);

  if (!publicador) {
    return <p>Carregando...</p>;
  }

  const toggleLyrics = (id) => {
    setShowLyrics((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShowMore = () => {
    setVisibleSongs(publicador.musicas.length);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setVisibleSongs(maxVisible);
    setShowAll(false);
  };

  return (
    <div>
      <h1 className={styles.title}>Perfil do Publicador</h1>
      <hr className={styles.hr} />
      <div className={styles.profileContainer}>
        <h2 className={styles.name}>
          <span className={styles.firstLetter}>{publicador.fullName[0]}</span>
          {publicador.fullName.slice(1)}
        </h2>
        <p className={styles.field}>ID: {publicador.id}</p>
        <div className={styles.emailContainer}>
          <img
            src="https://img.icons8.com/material-rounded/24/000000/email.png"
            alt="Email Icon"
            className={styles.emailIcon}
          />
          <p className={styles.email}>{publicador.email}</p>
        </div>
        <div className={styles.descriptionContainer}>
          <textarea
            className={styles.description}
            value={publicador.description}
            readOnly
          />
        </div>
      </div>

      {/* Renderize apenas as músicas visíveis do publicador aqui */}
      <div className={styles.musicasContainer}>
        {publicador.musicas.slice(0, visibleSongs).map((musica) => (
          <div key={musica._id} className={styles.music_card}>
            <h2>{musica.titulo}</h2>
            <p className={styles.musicAuthor}>Autor: {musica.autor}</p>
            <p className={styles.musicLyrics}>
              {showLyrics[musica._id] || musica.letra.length <= 152
                ? musica.letra
                : musica.letra.slice(0, 152) + '...'}
              {musica.letra.length > 152 && (
                <button
                  className={styles['btn-vermais']}
                  onClick={() => toggleLyrics(musica._id)}
                >
                  {showLyrics[musica._id] ? 'Ver Menos' : 'Ver Mais'}
                </button>
              )}
            </p>
            {/* Você pode renderizar os detalhes adicionais da música aqui, se necessário */}
          </div>
        ))}

        {/* Botão "ver mais músicas" para mostrar todas as músicas */}
        {!showAll && publicador.musicas.length > maxVisible && (
          <button className={styles.btn} onClick={handleShowMore}>
            <img src='https://cdn-icons-png.flaticon.com/128/10728/10728680.png' className={styles.arrow}></img>
          </button>
        )}

        {/* Botão "ver menos músicas" */}
        {showAll && (
          <button className={styles.btn} onClick={handleShowLess}>
            <img src='https://cdn-icons-png.flaticon.com/128/5053/5053186.png' className={styles.arrow}></img>
          </button>
        )}
      </div>
    </div>
  );
}

export default PublicProfile;
