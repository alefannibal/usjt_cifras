import React from 'react';
import styles from './SubmitAdd.module.css';

function SubmitAdd({ text, onSubmit }) {
  return (
    <div>
      <button className={styles.btn} type="submit" onClick={onSubmit}>
        {text}
      </button>
    </div>
  );
}

export default SubmitAdd;