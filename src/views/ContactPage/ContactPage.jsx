import React from "react";
import styles from '../../styles/Contactpage.module.css';
//import styles from '../../styles/Login.module.css'
import { FaGithub, FaTwitter, FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
    return (
        <div className={styles.contactContainer}>
            <h1>Contacto</h1>
            <p>Puedes encontrarme en:</p>

            <div className={styles.links}>
                <a href="https://github.com/riverosmejia" target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                </a>
                <a href="https://twitter.com/el_riv_eros" target="_blank" rel="noopener noreferrer">
                    <FaTwitter /> Twitter
                </a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=riverosmejiamiguel@gmail.com" target="_blank" rel="noopener noreferrer">
                    <FaEnvelope /> Correo Electrónico
                </a>

            </div>
        </div>
    );
};

export default ContactPage;
