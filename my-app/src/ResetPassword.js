import React, { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [tokenSent, setTokenSent] = useState(false);
  const [users, setUsers] = useState({});
  const [resettingPassword, setResettingPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [enteredToken, setEnteredToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setAlertMessage('El correo electrónico debe contener un símbolo "@"');
      setShowAlert(true);
      return;
    }

    // Generar token aleatorio
    const token = Math.random().toString(36).substr(2, 8);
    setUsers((prevUsers) => ({
      ...prevUsers,
      [email]: { token, password: null }
    }));

    console.log('Token enviado:', token); // Mostrar token en la consola
    console.log('Usuarios:', users); // Mostrar usuarios en la consola
    setTokenSent(true);
    setAlertMessage('Se ha enviado un token a tu correo electrónico.');
    setShowAlert(true);
    setShowModal(true); // Mostrar modal para ingresar token
  };

  const handleVerifyToken = (e) => {
    e.preventDefault();
    const user = users[email];

    if (user.token !== enteredToken) {
      setAlertMessage('Token inválido.');
      setShowAlert(true);
      return;
    }

    setShowModal(false); // Ocultar modal si el token es correcto
    setResettingPassword(true); // Mostrar formulario de restablecimiento de contraseña
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = e.target.elements;
    const user = users[email];

    if (newPassword.value.length < 8 || newPassword.value.length > 8) {
      setAlertMessage('La contraseña debe tener exactamente 8 caracteres.');
      setShowAlert(true);
      return;
    }

    if (newPassword.value !== confirmPassword.value) {
      setAlertMessage('Las contraseñas no coinciden.');
      setShowAlert(true);
      return;
    }

    setUsers((prevUsers) => ({
      ...prevUsers,
      [email]: { ...user, password: newPassword.value }
    }));

    console.log('Usuarios actualizados:', users); // Mostrar usuarios actualizados en la consola
    setAlertMessage('Contraseña restablecida correctamente.');
    setShowAlert(true);
    setResettingPassword(false);
    window.location.href = '/'; // Redirigir al inicio
  };

  const handleCancel = () => {
    window.location.href = '/';
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="container">
      <button className="btn btn-link back-button" onClick={handleBack}>&larr; Regresar</button>
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          {!resettingPassword && !showModal && <h2>Recuperar Contraseña</h2>}
          {showAlert && <div className="alert alert-info">{alertMessage}</div>}
          {!tokenSent ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-secondary">Enviar</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancelar</button>
            </form>
          ) : (
            resettingPassword ? (
              <form onSubmit={handleResetPassword}>
                <h3>Cambia tu contraseña</h3>
                <p>Elija una contraseña segura y no la reutilice para otras cuentas.</p>
                <p>Es posible que haya cerrado sesión en algunos dispositivos.</p>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    placeholder="Ingresa la nueva contraseña"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirma la nueva contraseña"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-secondary">Restablecer Contraseña</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>Cancelar</button>
              </form>
            ) : (
              <div>
                <form onSubmit={handleVerifyToken}>
                  <div className="mb-3">
                    <label htmlFor="token" className="form-label">Token</label>
                    <input
                      type="text"
                      className="form-control"
                      id="token"
                      placeholder="Ingresa el token"
                      value={enteredToken}
                      onChange={(e) => setEnteredToken(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </div>
            )
          )}
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>¡Consulta tu correo electrónico!</h3>
            <p>Te hemos enviado un código.</p>
            <p>Ingrese el código de activación del correo electrónico a continuación:</p>
            <form onSubmit={handleVerifyToken}>
              <div className="mb-3">
                <label htmlFor="modalToken" className="form-label">Codigo de activación</label>
                <input
                  type="text"
                  className="form-control"
                  id="modalToken"
                  placeholder="Ingresa tu codigo"
                  value={enteredToken}
                  onChange={(e) => setEnteredToken(e.target.value)}
                  required
                />
              </div>
              <p>¿No recibiste un código? ¡Revisa tu carpeta de spam!. Los códigos pueden tardar un par de minutos en llegar.</p>
              <button type="submit" className="btn btn-secondary">Verificar</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowModal(false)}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
