import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UsersContext';
import styles from '../../styles/misTurnos.module.css';
import Card from '../../components/Card';

const MisTurnos = () => {
  const { user, userAppointments, fetchUserAppointments,cancelAppointment } = useContext(UserContext);

  
  useEffect(() => {

    if (user && user.id) {
      
      console.log("User encontrado:", user);
      const res=fetchUserAppointments(user.id);
      console.log(res);
      
    }
  }, [user]); // No pongas fetchUserAppointments aquí si es una función definida fuera del componente.
  
  return (
     <>
  
  <div className={styles.container}>
     <h1 className={styles.title}>Mis turnos</h1>
     <div className={styles.turnosContainer}>
     <div className={styles.cardWrapper}>
        {userAppointments?.length > 0 ? (
          userAppointments.map((turno) => <Card key={turno.id} data={turno} onCancel={cancelAppointment}/>)
        ) : (
          <p>No tienes turnos agendados.</p>
        )}
      </div>
    </div>
  </div>
     </>
    )

/*
  return (
    <div  className={styles.container}>
      <h1 className={styles.title}>Mis Turnos</h1>
      <div className={styles.cardWrapper}>
        {userAppointments?.length > 0 ? (
          userAppointments.map((turno) => <Card key={turno.id} data={turno} onCancel={cancelAppointment}/>)
        ) : (
          <p>No tienes turnos agendados.</p>
        )}
      </div>
    </div>
  );
  */
};
export default MisTurnos;
