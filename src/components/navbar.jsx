import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import { routes } from "../utils/routes";
import { useState,useContext, useEffect } from "react";
import { UserContext } from "../context/UsersContext";

function NavBar() {
    const { user, logout, setUser } = useContext(UserContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        }
    }, [setUser]);

    return (
        <nav className={styles.navContainer}>
            <div className={styles.logo}>Logo</div>

            <div className={styles.links}>
                <Link to={routes.login}><h4>Login</h4></Link>
                <Link to={routes.register}><h4>Register</h4></Link>

                {user ? (
                    <button className={styles.logoutBtn} onClick={() => {
                        logout();
                        navigate("/Login"); // Redirige a Login después de cerrar sesión
                    }}>
                        Cerrar Sesión
                    </button>
                ) : (<></>)}

                 {/* Botón del menú hamburguesa */}
            <button className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
                ☰ Menú
            </button>

            {/* Menú desplegable */}
            <div className={`${styles.dropdownMenu} ${menuOpen ? styles.open : ""}`}>
                <Link to={routes.home} onClick={() => setMenuOpen(false)}>Inicio</Link>
                <Link to={routes.MisTurnos} onClick={() => setMenuOpen(false)}>Turnos</Link>
                <Link to={routes.CrearTurno} onClick={() => setMenuOpen(false)}>Crear Turno</Link>
                <Link to={routes.Contacto} onClick={() => setMenuOpen(false)}>Contacto</Link>
            </div>
            </div>
        </nav>
    );
}

export default NavBar;