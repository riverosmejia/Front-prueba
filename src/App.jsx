import Home from './views/Home/home'
import MisTurnos from './views/MisTurnos/MisTurnos'
import styles from "./styles/body.module.css"
import Navbar from './components/navbar'
import Register from './views/Register/Register'
import Login from './views/Login/Login'
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom'
import CrearTurno from './views/CrearTurno/CrearTurno'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from './context/UsersContext'
import Footer from './components/footer'
import ContactPage from './views/ContactPage/ContactPage'

function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add(styles.bodyBackground);

    if (!user && location.pathname !== "/Login" && location.pathname !== "/Register" && location.pathname !== "/Home"&& location.pathname !== "/contact")  {
      navigate("/Home");
    }
  }, [user, navigate, location.pathname]);

  return (
    <div className="app-container">
      <Navbar />

      <div className={styles.mainContent}>

        <Routes>
          {/* Estas rutas siempre están disponibles para todos */}
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/contact' element={<ContactPage />} />

          {user ? (
            // Si está logueado, accede a todas las demás rutas
            <>
              <Route path='/Appointments' element={<MisTurnos />} />
              <Route path='/Appointments/schedule' element={<CrearTurno />} />
              <Route path='*' element={<h1>Error 404 - Not Found</h1>} />
            </>
          ) : (
            // Si NO está logueado y trata de ir a otra página, lo redirige a Login
            <Route path='*' element={<Navigate to="/Login" />} />
          )}
        </Routes>
      
      </div>
      
      <Footer />
      
      {/* <footer className="w-full bg-gray-800 text-white py-4 text-center mt-auto">
        Footer
      </footer> */}

    </div>
  );
}

export default App;
