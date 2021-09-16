import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { startRegister } from '../../redux/actions/auth';
import { Controller, useForm } from 'react-hook-form';


export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { control, handleSubmit, reset} = useForm({
        defaultValues: {
            name: 'Mijael',
            email: 'mijael@hotmail.com',
            password: '123456',
            password2: '123456'
        }
    });


    const onSubmit = (data) => {
        if (data.password === data.password2) {
            dispatch(startRegister(data.name, data.email, data.password))
            reset();
        }
    }

    return (
        <div 
            className="text-white bg-gray-900 w-full h-auto min-h-full flex flex-col justify-center items-center" 
            style={{maxWidth:"500px", marginInline:"auto"}}
        >
            <div className="flex flex-col items-center justify-center rounded-md p-1 w-auto">
                <div className="flex flex-col mb-8 items-center">
                    <FontAwesomeIcon icon={faUserCircle} size="4x"/>
                    <p className="mt-3 font-medium text-2xl">
                        Crear Cuenta    
                    </p>
                    <p className="text-gray-400">
                        Complete el formulario para crear su usuario
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-96">
                    <Controller 
                        name="name"
                        control={control}
                        render={({ field }) => 
                        <TextField 
                            {...field} 
                            fullWidth
                            label="Correo Electronico"
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
                            autoComplete={false}
                            fullWidth
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
                            label="Contraseña"
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
                            label="Repetir Contraseña"
                            variant="filled"
                            type="password"
                        />}
                    />
                    <div className="mt-7">
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
                <div className="flex mt-9 -mb-6 items-center">
                    <p className="text-gray-500">
                        ¿Ya tienes una cuenta?
                    </p>
                    <Link to="/login" className="pointer no-tap-highlight ml-2">
                        Iniciar Sesion
                    </Link>
                </div>
            </div>
        </div>
    )
}