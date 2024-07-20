import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsRegistering }) => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuario = usuarios.find(u => u.email === email && u.password === password);

        if (usuario) {
            navigate('/home');
        } else {
            alert('Credenciales incorrectas. Inténtalo de nuevo.');
        }
    };

    return (
        <form id="loginForm" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo" required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" required />
            </div>
            <div className="mb-3">
                <a href="/reset-password">¿Olvidaste tu contraseña?</a>
            </div>
            <div className="text-center btn-container">
                <button type="submit" className="btn btn-secondary custom-btn">Iniciar Sesión</button>
                <button type="button" className="btn btn-outline-secondary custom-btn" onClick={() => { document.getElementById('email').value = ''; document.getElementById('password').value = ''; }}>Cancelar</button>
            </div>
            <br></br>
            <p className='text-center'>O</p> 
            <div className="text-center mt-3">
                <a href="http://localhost:5000/auth/google" className="btn btn-secondary custom-btn">Iniciar sesión con Google</a>
            </div>
            <br></br>
    
            <p className="mt-3 text-center">¿No tienes una cuenta? <a href="#" onClick={(e) => { e.preventDefault(); setIsRegistering(true); }}>Regístrate aquí</a></p>
        
        </form>
    );
};

export default LoginForm;
