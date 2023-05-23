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
