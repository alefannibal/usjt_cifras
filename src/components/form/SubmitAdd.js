
import styles from './SubmitAdd.module.css';

function SubmitAdd({ text }) {
  return (
    <div>
      <button className={styles.btn} type="submit">
        {text}
      </button>
    </div>
  );
}

export default SubmitAdd;