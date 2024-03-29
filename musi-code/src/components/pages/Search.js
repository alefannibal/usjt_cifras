import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importe o Link do React Router
import SubmitSearch from "../form/SubmitSearch";
import FormSearch from "../project/FormSearch";
import styles from "./Search.module.css";
import axios from "axios";

function MusicCard({ titulo, autor, letra, fullName, userId}) {
  const [showFull, setShowFull] = useState(false);

  const handleReadMore = () => {
    setShowFull(true);
  };

  const handleShowLess = () => {
    setShowFull(false);
  };

  return (
    <div className={styles.music_card}>
      <h2>{titulo}</h2>
      <p className={styles.musicAuthor}>Autor: {autor}</p>
      <p className={styles.musicLyrics}>
        Letra:{" "}
        {letra.length > 320 && !showFull ? (
          <>
            {letra.slice(0, 320)}...{" "}
            <span className={styles.readMore} onClick={handleReadMore}>
              Ler mais
            </span>
          </>
        ) : (
          <>
            {letra}{" "}
            {showFull && (
              <span className={styles.showLess} onClick={handleShowLess}>
                Mostrar menos
              </span>
            )}
          </>
        )}
      </p>
      {/* Nome do publicador como um link para /PublicProfile */}
      <p className={styles.musicFullName}>
        Nome do publicador:{" "}
        <Link to={`/PublicProfile/${userId}`}>{fullName}</Link>
      </p>
    </div>
  );
}

function Search() {
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const response = await axios.post("http://localhost:6001/events", {
          type: "GetAllMusicas",
        });
        setMusicData(response.data);
      } catch (error) {
        console.error("Erro ao buscar as músicas:", error);
      }
    };

    fetchMusicData();
  }, []);

  const handleSearch = (data) => {
    // Atualize o estado do musicData com os dados da busca
    setMusicData(data);
  };  

  return (
    <div className={styles.search_container}>
      <div className={styles.display}>
        <FormSearch onSearch={handleSearch} />
      </div>

      {musicData.map((music) => (
        <MusicCard
          key={music._id}
          titulo={music.titulo}
          autor={music.autor}
          letra={music.letra}
          fullName={music.fullName}
          userId={music.userId}
        />
      ))}
    </div>
  );
}

export default Search;
