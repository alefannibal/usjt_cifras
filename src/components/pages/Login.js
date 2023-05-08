import { Link } from "react-router-dom";

import FormCad from "../project/FormCad";
import styles from "./Login.module.css";
import fundo from "../../img/fundo.jpg";

function Login() {
  return (
    <>
      <div className={styles.code}>
        <section className={`${styles.hello} ${styles.focus}`}>
          <h1>
            Bem-vindo ao <br /> Musi<span>Code</span>
          </h1>
          <p>Cadastre-se</p>
          <FormCad btnText="Entrar" />
          <h3>
            ou
            <Link to="/">
              <span>acesse sua conta</span>
            </Link>
          </h3>
        </section>
      </div>
      <img
        src={fundo}
        alt="MusiCode"
        placeholder="Home"
        className={styles.background_image}
      />
    </>
  );
}

export default Login;
