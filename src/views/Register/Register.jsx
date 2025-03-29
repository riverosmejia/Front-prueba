import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes';
import { UserContext } from '../../context/UsersContext';
import styles from '../../styles/Register.module.css'

const Register = () => {

    const {registerUser} = useContext(UserContext)

    const navigate =useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        birthdate: '',
        password: '',
        confirm_password: '',
        nDni: Number('')
    });

    const [err, setErr] = useState({});

    const handleSubmit = async(event) => {
        event.preventDefault();

        let errors = {};

        if (user.name.trim() === '') {
            errors.name = 'El nombre es obligatorio';
        }

        if (user.email.trim() === '') {
            errors.email = 'El email es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            errors.email = 'El email no es válido';
        }

        if (user.birthdate === '') {
            errors.birthdate = 'La fecha de nacimiento es obligatoria';
        }

        if (user.nDni.trim() === '') {
            errors.nDni = 'El número de identificación es obligatorio';
        } else if (isNaN(user.nDni)) {
            errors.nDni = 'El número de identificación debe ser numérico';
        }

        if (user.password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (user.password !== user.confirm_password) {
            errors.confirm_password = 'Las contraseñas no coinciden';
        }

        setErr(errors);

        if (Object.keys(errors).length === 0) {
        
            try {
                registerUser(user)
                alert("Usuario registrado con éxito"); 
            
                navigate(routes.login)
            
            } catch (error) {
                alert(`Error: ${error.response?.data?.message || "No se pudo registrar el usuario"}`);
              }
              
        

        
        }

        
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.title}>Formulario de Registro:</h1>
                <label>Nombre:</label>
                <input 
                    className={styles.input}
                    type='text' 
                    onChange={event => setUser({ ...user, name: event.target.value })} 
                />
                {err.name && <p className={styles.error}>{err.name}</p>}

                <label>Email:</label>
                <input 
                    type='email' 
                    className={styles.input}
                    onChange={event => setUser({ ...user, email: event.target.value })} 
                />
                {err.email && <p className={styles.error}>{err.email}</p>}

                <label>Año de nacimiento:</label>
                <input 
                    type='date' 
                    className={styles.input}
                    onChange={event => setUser({ ...user, birthdate: event.target.value })} 
                />
                {err.birthdate && <p className={styles.error}>{err.birthdate}</p>}

                <label>N° de identificación:</label>
                <input 
                    type='number'
                    className={styles.input} 
                    onChange={event => setUser({ ...user, nDni: event.target.value })} 
                />
                {err.nDni && <p className={styles.error}>{err.nDni}</p>}

                <label>Contraseña:</label>
                <input 
                    type='password' 
                    className={styles.input}
                    onChange={event => setUser({ ...user, password: event.target.value })} 
                />
                {err.password && <p className={styles.error}>{err.password}</p>}

                <label>Repita la contraseña:</label>
                <input 
                    type='password' 
                    className={styles.input}
                    onChange={event => setUser({ ...user, confirm_password: event.target.value })} 
                />
                {err.confirm_password && <p className={styles.error}>{err.confirm_password}</p>}

                <button className={styles.button}>Registrar</button>

                <div><label className={styles.footer}>¿Ya tienes una cuenta? que haces acá,<Link to ="/Login"> Logueate</Link></label></div>
            </form>
        </div>
    );
};

export default Register;
