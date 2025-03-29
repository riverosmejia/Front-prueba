import React from 'react'
import styles from "../styles/Card.module.css"

const Card = ({data,onCancel}) => {
  
  const handleCancel = () => {

    console.log(data)

    if (window.confirm(`¿Seguro que deseas cancelar la cita de ${data.Asunto}? a la fecha de ${data.date}`)) {
      onCancel(data.id);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <h3>{data.Asunto}</h3>
        <p>Fecha: {data.date}</p>
        <p>Hora: {data.time}</p>
        <p>Estado: {data.status}</p>
      </div>
      <button className={styles.cancelButton} onClick={handleCancel}>Cancelar</button>
    </div>
  )
}

export default Card
