import React from 'react';
import logo from '../../assets/tool.svg'
import { Button, TextField } from '@material-ui/core';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';


export const LoginScreen = () => {

    const [formLoginValues, handleLoginInputChange] = useForm({
        email: '',
        password: ''
    });

    const {email, password} = formLoginValues;
    
    const handleLogin = (e) => {
        e.preventDefault();
    }

    return (
        <div className="auth-container">
            <div className="form-container">
                <div className="form-welcome">
                    <div style={{display:"flex", alignItems:"center"}}>
                        <img src={logo} alt="logo" width="40" height="40"/>
                        <h2 className="form-title">
                            Inventory Organizer
                        </h2>
                    </div>
                    <p className="tc-grey" style={{marginTop:"6px"}}>
                        Bienvenido! Comienza a inventariar!
                    </p>
                </div>
                <form onSubmit={handleLogin} className="form">
                    <div className="text-field">
                        <TextField
                            label="Correo Electronico"
                            variant="outlined"
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleLoginInputChange}
                        />
                    </div>
                    <div className="text-field" style={{marginTop:"30px"}}>
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleLoginInputChange}
                        />
                    </div>
                    <div className="form-optional">
                        <p className="p">
                            ¿Olvidó su contraseña?
                        </p>
                    </div>
                    <div className="form-button">
                        <Button
                            component={Link} 
                            to="/"
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                            type="submit"
                        >
                            Login
                        </Button>
                    </div>
                    
                </form>
                <div className="form-sign-up">
                    <p className="tc-grey">
                        ¿Nuevo usuario?
                    </p>
                    <Link to="/register" className="p" style={{marginLeft:"5px"}}>
                        Crear Cuenta
                    </Link>
                </div>
            </div>
        </div>
    )
}