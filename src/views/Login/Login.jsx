import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UsersContext';
import styles from '../../styles/Login.module.css'

const Login = () => {

    const {loginUser,setUser} = useContext(UserContext)

    const [user, setUserState] = useState({
        "identifier": "",
        "password": ""
    });

    const [err, setErr] = useState({});

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        let errors = {};

        if (user.identifier.trim() === '') {
            errors.identifier = 'El email es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.identifier)) {
            errors.identifier = 'El email no es válido';
        }

        if (user.password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErr(errors);

        if (Object.keys(errors).length === 0) {
            
            try {
                const response = await loginUser(user)
                console.log(response)
                setUser(response);
                localStorage.setItem("isLogged", JSON.stringify(true));
                console.log(localStorage.user)
                alert('Inicio de sesión exitoso');
                navigate("/Home");
            } catch (error) {
                console.log(error)
                alert(`Error: ${error.response?.data?.message || 'No se pudo iniciar sesión'}`);
            }
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Formulario para Iniciar Sesión:</h1>
                <label className={styles.label}>Email:</label>
                <input 
                    type='email' 
                    className={styles.input}
                    onChange={event => setUserState({ ...user, identifier: event.target.value })} 
                />
                {err.email && <p style={{ color: 'red' }}>{err.email}</p>}

                <label className={styles.label}>Contraseña:</label>
                <input 
                    type='password' 
                    className={styles.input}
                    onChange={event => setUserState({ ...user, password: event.target.value })} 
                />
                {err.password && <p className={styles.error}>{err.password}</p>}

                <button className={styles.button}>Iniciar sesión</button>
            
            <div><label className={styles.footer}>¿No tienes una cuenta? no sea vago,<Link to ="/register"> Registrate</Link></label></div>
            </form>

        </div>
    );
};

export default Login;
