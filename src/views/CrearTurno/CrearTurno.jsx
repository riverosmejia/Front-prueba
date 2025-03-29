import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UsersContext';
import styles from '../../styles/Login.module.css'


const CrearTurno = () => {
    const { user, createAppointment } = useContext(UserContext);
    const [turno, setTurno] = useState({
        date: '',
        time: '',
        Asunto: ''
    });

    const [err, setErr] = useState({});

    const handleSchedule = async (event) => {
        event.preventDefault();
    
        let errors = {};
    
        if (!turno.time.trim()) {
            errors.time = 'La hora es obligatoria';
        }
    
        if (!turno.date.trim()) {
            errors.date = 'El día es obligatorio';
        }
    
        if (!turno.Asunto.trim()) {
            errors.Asunto = 'El asunto es obligatorio';
        }
    
        // Convertir la hora a un número para validación (formato HH:MM)
        const [hour, minute] = turno.time.split(":").map(Number);
        if (hour < 9 || hour > 17 || (hour === 17 && minute > 0)) {
            errors.time = 'La hora debe estar entre 09:00 y 17:00';
        }
    
        setErr(errors);
    
        if (Object.keys(errors).length === 0) {
            const appointmentData = { ...turno, userId: user.id, status: true };
            await createAppointment(appointmentData);
        }
    };
    
    
    

    const handleSubmit = (event) => {
        event.preventDefault();

        let errors = {};
        if (!turno.time.trim()) errors.time = 'La hora es obligatoria';
        if (!turno.date.trim()) errors.date = 'El día es obligatorio';
        if (!turno.Asunto.trim()) errors.Asunto = 'El asunto es obligatorio';

        setErr(errors);

        if (Object.keys(errors).length === 0) {
            handleSchedule(event);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Formulario para Agendar turno:</h1>
                <label>Hora:</label>
                <input 
                    className={styles.input}
                    type='time' 
                    onChange={event => setTurno({ ...turno, time: event.target.value })} 
                />
                {err.time && <p className={styles.error}>{err.time}</p>}
                
                <label>Día:</label>
                <input 
                    type='date' 
                    className={styles.input}
                    onChange={event => setTurno({ ...turno, date: event.target.value })} 
                />
                {err.date && <p className={styles.error}>{err.date}</p>}
                
                <label>Asunto:</label>
                <input 
                    type='text' 
                    className={styles.input}
                    onChange={event => setTurno({ ...turno, Asunto: event.target.value })} 
                />
                {err.Asunto && <p className={styles.error}>{err.Asunto}</p>}
                
                <button className={styles.button}>Crear Turno</button>
            </form>
        </div>
    );
};

export default CrearTurno;
