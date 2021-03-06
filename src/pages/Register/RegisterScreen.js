import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { startRegister } from '../../redux/actions/auth';
import { Controller, useForm } from 'react-hook-form';
import { hasError } from '../../helpers/hasError';
import { errorClear } from '../../redux/actions/error';


export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.error)

    const [disableSubmit, setDisableSubmit] = useState(false);

    const { control, handleSubmit, reset} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password2: ''
        }
    });


    const onSubmit = async (data) => {
        setDisableSubmit(true);
        await dispatch(startRegister(data.name, data.email, data.password, data.password2))
        setDisableSubmit(false);
        if (!errors) {
            reset();
        }
    }

    return (
        <div 
            className="text-white bg-gradient-to-t from-gray-900 to-black flex flex-col w-full h-auto min-h-full items-center" 
            style={{maxWidth:"500px", marginInline:"auto"}}
        >
            <div className="flex flex-col items-center justify-center rounded-md py-4 px-0.5 w-full mt-auto mb-auto">
                <div className="flex flex-col mb-8 items-center">
                    <FontAwesomeIcon icon={faUserCircle} size="4x"/>
                    <p className="mt-3 font-medium text-2xl">
                        Crear Cuenta    
                    </p>
                    <p className="text-gray-400 text-center">
                        Complete el formulario para crear su usuario
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-11/12">
                    <Controller 
                        name="name"
                        control={control}
                        render={({ field }) => 
                        <TextField 
                            {...field} 
                            fullWidth
                            label="Nombre"
                            variant="filled"
                            type="text"
                        />}
                    />
                    <div className="h-3"/>
                    <Controller 
                        name="email"
                        control={control}
                        render={({ field }) => 
                        <TextField 
                            {...field} 
                            fullWidth
                            error={hasError(errors, "email")}
                            helperText={hasError(errors, "email", "helper")}
                            label="Correo Electronico"
                            variant="filled"
                            type="email"
                        />}
                    />
                    <div className="h-3"/>
                    <Controller 
                        name="password"
                        control={control}
                        render={({ field }) => 
                        <TextField 
                            {...field} 
                            fullWidth
                            error={hasError(errors, "password")}
                            helperText={hasError(errors, "password", "helper")}
                            label="Contrase??a"
                            variant="filled"
                            type="password"
                        />}
                    />
                    <div className="h-3"/>
                    <Controller 
                        name="password2"
                        control={control}
                        render={({ field }) => 
                        <TextField 
                            {...field} 
                            fullWidth
                            error={hasError(errors, "password2")}
                            helperText={hasError(errors, "password2", "helper")}
                            label="Repetir Contrase??a"
                            variant="filled"
                            type="password"
                        />}
                    />
                    <div className="mt-7">
                        <Button
                            disabled={disableSubmit}
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                            type="submit"
                        >
                            Registrarse
                        </Button>
                    </div>
                    <div className="flex mt-9 justify-center">
                        <p className="text-gray-500">
                            ??Ya tienes una cuenta?
                        </p>
                        <Link 
                            to="/login" 
                            className="pointer no-tap-highlight ml-2" 
                            onClick={() => dispatch(errorClear())}
                        >
                            Iniciar Sesion
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}