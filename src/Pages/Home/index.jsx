import { Link } from "react-router-dom";
import Header from "../../Components/Header";

import styles from "./home.module.css";

const HomePage = () => {
  return (
    <><Header />
    <div className={styles.containerHome}>
      
      <div className={styles.centerHome}>
        <h1>welcome, gamer!</h1>
        <p>click no botão abaixo para começar o jogo!</p>
        <Link to={"start"}>
          <button>Começar</button>
        </Link>  
      </div>
    </div>
    </>
  );
};

export default HomePage;
