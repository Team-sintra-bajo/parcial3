import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Home from './Home';  
import ResetPassword from './ResetPassword';
import './App.css';

const App = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const [switchChecked, setSwitchChecked] = useState(false);

    useEffect(() => {
        if (switchChecked) {
            setBackgroundImage("img/p4.png");
        } else {
            setBackgroundImage(null);
        }

        const handleKeyPress = (event) => {
            if (event.key === 'q') {
                setSwitchChecked(prev => !prev);
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [switchChecked]);

    const cambiarFondo = () => {
        setSwitchChecked(prev => !prev);
    };

    return ( 
        <Router>
            <div
                className="background-container"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>
            <header className="header-bar">
            </header>
            <div className="container">
                {isTabletOrMobile && (
                    <div className="switch-container">
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={switchChecked}
                                onChange={cambiarFondo}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                )}
                <Routes>
                    <Route path="/" element={
                        isRegistering ? (
                            <RegisterForm setIsRegistering={setIsRegistering} />
                        ) : (
                            <div className="row justify-content-center margen">
                                <div className="col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <h1>Inicio de Sesión</h1>
                                            <LoginForm setIsRegistering={setIsRegistering} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-none d-lg-block">
                                    <img src="img/i1.png" alt="Logotipo" className="img-fluid" />
                                </div>
                            </div>
                        )
                    } />
                    <Route path="/home" element={<Home />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
