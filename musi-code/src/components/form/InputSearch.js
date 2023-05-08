import styles from './InputSearch.module.css'

function InputSearch(type, name, placeholder, value) {
  return (
    <div className={styles.form_control}>

      <input 
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}

export default InputSearch