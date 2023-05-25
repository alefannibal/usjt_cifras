import React from 'react';
import styles from './AllSongs.module.css';


function AllSongs() {
  
  return (
    <div className={styles.container_musica}>
      <h1 className={styles.container_musica_titulo}>Flowers</h1>
      <h2 className={styles.container_musica_autor}>Miley Cyrus</h2>
      <p className={styles.container_musica_letra}>
        We were good, we were gold
        Kinda dream that can't be sold
        We were right 'til we weren't
        Built a home and watched it burn
        Mm, I didn't wanna leave you
        I didn't wanna lie
        Started to cry, but then remembered I
        I can buy myself flowers
        Write my name in the sand
        Talk to myself for hours
        Say things you don't understand
        I can take myself dancing
        And I can hold my own hand
        Yeah, I can love me better than you can</p>
    </div>
  );
}

export default AllSongs;

