import React from 'react';
import styles from './SubmitButton.module.css';

function SubmitCad({ text, onClick }) {
  return (
    <div>
      <button className={styles.btn} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}

export default SubmitCad;