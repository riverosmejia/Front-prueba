import {createContext, useState,useEffect} from "react"
import axios from "axios"

export const UserContext = createContext({

    user:{},
    userAppointments:[],
    registerUser: async()=>{}

})

export const UserProvider=({children})=>{

    const [user,setUser]=useState(0)
    const [userAppointments, setUserAppointments] = useState([]);


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const fetchUserAppointments = async (userId) => {
        try {
          const response = await axios.get(`https://back-prueba-vvj3.onrender.com/appointments/user/${userId}`);
            
            console.log(response);
            
            // Filtrar turnos activos (si el estado es "cancelado", los excluye)
            const activeAppointments = response.data.filter(appointment => appointment.status !== "cancelled");
    
            setUserAppointments(activeAppointments);
        } catch (error) {
            console.error('Error obteniendo turnos:', error);
            setUserAppointments([]); // En caso de error, dejar la lista vacía
        }
    };
    
      const cancelAppointment = async (appointmentId) => {
        
        try {
          const response = await fetch(`https://back-prueba-vvj3.onrender.com/appointments/cancel/${appointmentId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Error al cancelar el turno');
          }
      
          // Actualizar la lista de turnos después de cancelar
          setUserAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment.id !== appointmentId)
          );
      
          alert('Turno cancelado exitosamente');
        } catch (error) {
          console.error('Error:', error);
          alert('Hubo un problema al cancelar el turno');
        }
      };

      const logout = () => {
        localStorage.removeItem("user"); // Elimina usuario del almacenamiento local
        setUser(null); // Actualiza el estado global del contexto
    };
    

    const registerUser=async(userData)=>{

        const response = await axios.post('https://back-prueba-vvj3.onrender.com/users/register', userData);

        // Guarda la sesión en localStorage
        localStorage.setItem('user', JSON.stringify(response.data));

        // Actualiza el estado global del contexto
        setUser(response.data);

    }

    const loginUser=async(userdata)=>{

        const response = await axios.post("https://back-prueba-vvj3.onrender.com/user/login", userdata);

        console.log(response)

        localStorage.setItem('user', JSON.stringify(response.data));

        setUser(response.data)

        return response.data;

    }

    const createAppointment = async (appointmentData) => {
        try {
            const response = await axios.post("https://back-prueba-vvj3.onrender.com/appointments/schedule", appointmentData);
            console.log("Turno creado:", response.data);
    
            await fetchUserAppointments(user.id); // ✅ Actualizar la lista de turnos
            alert("Turno creado exitosamente");
        } catch (error) {
            console.error("Error al crear el turno:", error);
            alert(`Error: ${error.response?.data?.message || "No se pudo crear el turno"}`);
        }
    };
    
    

    const value={

        user,
        userAppointments,
        registerUser,
        loginUser,
        setUser,
        fetchUserAppointments,
        cancelAppointment,
        createAppointment,
        logout

    }


    return <UserContext.Provider value={value}>

        {children}

    </UserContext.Provider>

}