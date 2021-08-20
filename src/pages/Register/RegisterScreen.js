import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { startRegister } from '../../redux/actions/auth';


export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        name: 'Mijael',
        email: 'mijael@hotmail.com',
        password: '123456',
        password2: '123456'
    });

    const {name, email, password, password2} = formRegisterValues;
    
    const handleRegister = (e) => {
        e.preventDefault();

        dispatch(startRegister(name, email, password))
    }
    return (
        <div className="auth-container inverted">
            <div className="form-container">
                <div className="form-welcome">
                    <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                        <FontAwesomeIcon icon={faUserCircle} size="4x" color="#ffad4e"/>
                        <h2 className="form-title" style={{margin:"10px 0 0 0", fontWeight:"normal"}}>
                            Crear Cuenta    
                        </h2>
                        <p className="tc-grey" style={{marginTop:"6px"}}>
                            Complete el formulario para crear su usuario
                        </p>
                    </div>
                </div>
                <form onSubmit={handleRegister} className="form">
                    <div className="text-field">
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            type="name"
                            name="name"
                            value={name}
                            onChange={handleRegisterInputChange}
                        />
                    </div>
                    <div className="text-field" style={{marginTop:"30px"}}>
                    <TextField
                            label="Correo Electronico"
                            variant="outlined"
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleRegisterInputChange}
                        />
                    </div>
                    <div className="text-field" style={{marginTop:"30px"}}>
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleRegisterInputChange}
                        />
                    </div>
                    <div className="text-field" style={{marginTop:"30px"}}>
                        <TextField
                            label="Repetir Contraseña"
                            variant="outlined"
                            type="password"
                            name="password2"
                            value={password2}
                            onChange={handleRegisterInputChange}
                        />
                    </div>
                    <div className="form-button" style={{marginTop:"50px"}}>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                            type="submit"
                        >
                            Registrarse
                        </Button>
                    </div>
                    
                </form>
                <div className="form-sign-up">
                    <p className="tc-grey">
                        ¿Ya tienes una cuenta?
                    </p>
                    <Link to="/login" className="p" style={{marginLeft:"5px"}}>
                        Iniciar Sesion
                    </Link>
                </div>
            </div>
        </div>
    )
}