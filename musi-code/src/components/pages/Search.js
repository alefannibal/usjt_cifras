import SubmitSearch from "../form/SubmitSearch";
import FormSearch from "../project/FormSearch";
import styles from "./Search.module.css";

import ddf from "../../img/ddf.jpg";
import veigh from "../../img/veigh.jpg";
import matue from "../../img/matue.jpg";

const musics = [
  {
    title: "Habite-se",
    imgSrc: ddf,
  },
  {
    title: "ClickBait",
    imgSrc: veigh,
  },
  {
    title: "Conexões de Máfia",
    imgSrc: matue,
  },
];

function MusicCard({ title, imgSrc }) {
  return (
    <div className={styles.music_card}>
      <img src={imgSrc} alt={`imagem música - ${title}`} />
      <h2>{title}</h2>
    </div>
  );
}

function Search() {
  return (
    <div className={styles.search_container}>
      <div className={styles.display}>
        <FormSearch />
        <SubmitSearch />
      </div>
      <div className={styles.center}>
        <h1>Sugestões de Músicas</h1>
        {musics.map((music) => (
          <MusicCard title={music.title} imgSrc={music.imgSrc} />
        ))}
      </div>
    </div>
  );
}

export default Search;
//Arquivo que mostra todas as musicas: modificar o estilo:
// import React, { useState, useEffect } from "react";
// import SubmitSearch from "../form/SubmitSearch";
// import FormSearch from "../project/FormSearch";
// import styles from "./Search.module.css";
// import axios from "axios";

// function MusicCard({ titulo, autor, letra, fullName }) {
//   return (
//     <div className={styles.music_card}>
//       <h2>{titulo}</h2>
//       <p>Autor: {autor}</p>
//       <p>Letra: {letra}</p>
//       <p>Nome do publicador: {fullName}</p>
//     </div>
//   );
// }

// function Search() {
//   const [musicData, setMusicData] = useState([]);

//   useEffect(() => {
//     const fetchMusicData = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/musica");
//         setMusicData(response.data);
//       } catch (error) {
//         console.error("Erro ao buscar as músicas:", error);
//       }
//     };

//     fetchMusicData();
//   }, []);

//   return (
//     <div className={styles.search_container}>
//       <div className={styles.display}>
//         <FormSearch />
//         <SubmitSearch />
//       </div>
//       <div className={styles.center}>
//         <h1>Sugestões de Músicas</h1>
//         {musicData.map((music) => (
//           <MusicCard
//             key={music._id}
//             titulo={music.titulo}
//             autor={music.autor}
//             letra={music.letra}
//             fullName={music.fullName}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Search;

