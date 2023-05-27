import React from 'react';
import styles from './InputSearch.module.css';

function InputSearch({ type, name, placeholder, value, onChange }) {
  return (
    <div className={styles.form_control}>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputSearch;