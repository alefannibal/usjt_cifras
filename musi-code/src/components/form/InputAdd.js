import React from 'react';
import styles from './InputAdd.module.css';

function InputAdd({ type, text, name, placeholder, onChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default InputAdd;