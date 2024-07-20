import React from 'react';

const RegisterForm = ({ setIsRegistering }) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const email = event.target.registerEmail.value;
        const password = event.target.registerPassword.value;
        const confirmPassword = event.target.confirmPassword.value;
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const phone = event.target.phone.value;

        const minLength = 8;
        const maxLength = 12;
        const validPhoneNumber = /^\d{10,12}$/.test(phone);
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!email || !password || !confirmPassword || !firstName || !lastName || !phone) {
            alert('Por favor, llena todos los campos.');
            return;
        }

        if (password.length < minLength) {
            alert('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        if (!validPhoneNumber) {
            alert('Ingresa un número de teléfono válido.');
            return;
        }

        if (!validEmail) {
            alert('Ingresa un correo electrónico válido.');
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push({ email, password, firstName, lastName, phone });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Registro exitoso');
        setIsRegistering(false);
    };

    return (
        <div className="modal-overlay" style={{ display: 'flex' }}>
            <div className="modal-content">
                <h1>Registro</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="registerEmail" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" id="registerEmail" placeholder="Ingresa tu correo" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="registerPassword" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="registerPassword" placeholder="Ingresa tu contraseña" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirma tu contraseña" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Ingresa tu nombre" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Apellido</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Ingresa tu apellido" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="phone" placeholder="Ingresa tu número de teléfono" />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-secondary">Registrarse</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setIsRegistering(false)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;