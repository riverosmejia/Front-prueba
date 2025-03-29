import styles from "../styles/footer.module.css";
import { routes } from "../utils/routes";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} El_Riv. Todos los derechos reservados.</p>
      <nav>
        <a href={routes.home}>Inicio</a>
        <a href={routes.Contacto}>Contacto</a>
      </nav>
    </footer>
  );
};

export default Footer;
