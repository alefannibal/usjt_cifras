import React, { useEffect, useState, useRef } from 'react'; // Importe useRef
// Restante do código existente...
import styles from './Profile.module.css';
import ProjectCard from '../project/ProjectCard';
import { Link } from 'react-router-dom';

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

function Profile() {
  const [musicas, setMusicas] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showLyrics, setShowLyrics] = useState({});
  const maxVisible = 1;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado.');
      return;
    }

    const decodedToken = parseJwt(token);
    const userId = decodedToken.id;

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    console.log('Realizando requisição para obter músicas do usuário...');
    console.log('Token:', token);

    fetch(`http://localhost:6001/usuarios/${userId}`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.musicas) {
          setMusicas(data.musicas);
          console.log('Músicas obtidas:', data.musicas);
        } else {
          console.error('Resposta inválida do servidor:', data);
        }

        if (data.id) {
          setUsuario(data);
          console.log('Detalhes do usuário:', data);
        } else {
          console.error('Resposta inválida do servidor:', data);
        }
      })
      .catch((error) => {
        console.error('Erro ao obter músicas:', error);
      });
  }, []);

  const handleRemoveMusic = (id) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token não encontrado.');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    console.log('Removendo música...');
    console.log('Token:', token);
    console.log('Música identificada:', id);

    fetch(`http://localhost:4000/musica/${id}`, {
      method: 'DELETE',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Música deletada');
        console.log('Música deletada:', data);
        // Atualizar a lista de músicas após a exclusão bem-sucedida
        setMusicas((prevMusicas) =>
          prevMusicas.filter((musica) => musica._id !== id)
        );
      })
      .catch((error) => {
        console.error('Erro ao excluir música:', error);
      });
  };

  const handleDescriptionChange = (event) => {
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      description: event.target.value,
    }));
  };

  const updateDescription = () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Token não encontrado.');
      return;
    }
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const payload = {
      description: usuario.description,
    };
  
    console.log('Enviando requisição de atualização de descrição...');
    console.log('Descrição:', usuario.description);
  
    fetch(`http://localhost:7000/usuarios/${usuario.id}/descricao`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Descrição atualizada:', data.message);
  
        // Recarrega a página
        window.location.reload();
      })
      .catch((error) => {
        console.error('Erro ao atualizar descrição:', error);
      });
  };
  
  const handleShowLess = () => {
    setShowAll(false);
    scrollToTop(); // Chamamos a função para fazer o scroll até o topo
  };

  const topOfListRef = useRef(null);
  
  const scrollToTop = () => {
    topOfListRef.current.scrollIntoView({
      behavior: 'smooth', // Adicionamos o comportamento de scroll suave
    });
  };

  const toggleLyrics = (id) => {
    setShowLyrics((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      {usuario && (
        <div>
          <h1 className={styles.title}>MyProfile</h1>
          <hr className={styles.hr} />
          <div className={styles.profileContainer}>
            <h2 className={styles.name}>
              <span className={styles.firstLetter}>{usuario.fullName[0]}</span>
              {usuario.fullName.slice(1)}
            </h2>
            <p className={styles.field}>ID: {usuario.id}</p>
            <div className={styles.emailContainer}>
              <img
                src="https://img.icons8.com/material-rounded/24/000000/email.png"
                alt="Email Icon"
                className={styles.emailIcon}
              />
              <p className={styles.email}>{usuario.email}</p>
            </div>
            <div className={styles.descriptionContainer}>
              <textarea
                className={styles.description}
                value={usuario.description}
                onChange={handleDescriptionChange}
              />
              <button className={styles.btn} onClick={updateDescription}>
                Atualizar Descrição
              </button>
              <div ref={topOfListRef}></div>
            </div>
          </div>
          {Array.isArray(musicas) ? (
        musicas.slice(0, showAll ? musicas.length : maxVisible).map((musica, index) => (
          <div className={styles.container_musica} key={musica._id}>
            <h2>{musica.titulo}</h2>
            <p className={styles.container_musica_autor}>
              Autor: {musica.autor}
            </p>
            <p className={styles.container_musica_letra}>
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
            <button
              className={styles.btn}
              onClick={() => handleRemoveMusic(musica._id)}
            >
              Remover Música
            </button>
          </div>
        ))
      ) : (
        <p>Não foi possível obter as músicas.</p>
      )}

        {/* Botão "ver mais" para mostrar todas as músicas */}
        {Array.isArray(musicas) && !showAll && musicas.length > maxVisible && (
            <button className={styles.btn} onClick={() => setShowAll(true)}>
              <img src='https://cdn-icons-png.flaticon.com/128/10728/10728680.png' className={styles.arrow}></img>
            </button>
          )}
          {showAll && (
            // Botão "ver menos" com o efeito de scroll
            <button className={styles.btn} onClick={handleShowLess}>
              <img src='https://cdn-icons-png.flaticon.com/128/5053/5053186.png' className={styles.arrow}></img>
            </button>
          )}
        
          <button className={styles.btn}>
            <Link to="/AddMusica">Adicionar Música</Link>
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;