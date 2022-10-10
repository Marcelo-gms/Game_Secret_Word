import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.HeaderContainer}>
      <nav className={styles.NavContainer}>
        <img className={styles.logo} src="/logoMedia.png" alt="logo page" />
        <ul className={styles.List}>
          <li className={styles.ItemList}>
            <Link to={"/"}>Home</Link>
          </li>
          <li className={styles.ItemList}>Contato</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
