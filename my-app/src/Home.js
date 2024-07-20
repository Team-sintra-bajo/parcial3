import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
    const navigate = useNavigate();  

    const handleLogout = () => {
        
        fetch('http://localhost:5000/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(() => {
            
            navigate('/');
        })
        .catch(error => {
            console.error('Error al cerrar sesión:', error);
        });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Bienvenido a sintra-bajo</h1>
            <p className="text-center">¡Has iniciado sesión exitosamente!</p>
            <div className="text-center mt-4">
                <button className="btn btn-secondary" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default Home;
