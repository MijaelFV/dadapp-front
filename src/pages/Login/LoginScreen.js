import React from 'react';
import bgImage from '../../assets/loginImage.png'
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../../redux/actions/auth';
import { Controller, useForm } from 'react-hook-form';
import { hasError } from '../../helpers/hasError';
import { errorClear } from '../../redux/actions/error';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.error)

    const { control, handleSubmit, reset} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    
    const onSubmit = async (data) => {
        await dispatch(startLogin(data.email, data.password))
        if (!errors) {
          reset();
        }
    }

    return (
        <div 
            className="text-white bg-gradient-to-t from-gray-900 to-black items-center flex flex-col w-full h-auto min-h-full" 
            style={{maxWidth:"500px", marginInline:"auto"}}
        >
            <div className="flex flex-col items-center justify-center rounded-md py-4 px-0.5 w-full mt-auto mb-auto">
                <div className="flex flex-wrap items-center justify-center w-11/12 h-2/6 mx-2 mb-8 overflow-hidden">
                    <img src={bgImage} alt="background img" width="185px"/>
                    <div className="flex flex-col text-center mt-2 justify-center items-center">
                        <p className="ml-3 text-3xl w-min font-medium">
                            Inventory Organizer
                        </p>
                        <p className="ml-3 w-min whitespace-nowrap text-gray-200">
                            ¡Comienza a inventariar!
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-11/12">
                    <Controller 
                        name="email"
                        control={control}
                        render={({ field }) => 
                        <TextField 
                            {...field} 
                            InputLabelProps={{ required: false}}
                            fullWidth
                            error={hasError(errors, "email")}
                            helperText={hasError(errors, "email", "helper")}
                            label="Correo Electronico"
                            required
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
                            InputLabelProps={{ required: false}}
                            fullWidth
                            error={hasError(errors, "password")}
                            helperText={hasError(errors, "password", "helper")}
                            required
                            label="Contraseña"
                            variant="filled"
                            type="password"
                        />}
                    />
                    <Link to="/login" className="pointer no-tap-highlight text-sm">
                        <p className="mt-2">¿Olvidó su contraseña?</p>
                    </Link>
                    <div className="mt-7">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth={true}
                            type="submit"
                        >
                            Iniciar Sesion
                        </Button>
                    </div>
                    <div className="flex mt-9 justify-center">
                        <p className="text-gray-400">
                            ¿Nuevo usuario?
                        </p>
                        <Link 
                            to="/register" 
                            className="pointer no-tap-highlight ml-2" 
                            onClick={() => dispatch(errorClear())}
                        >
                            <p>Crear Cuenta</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}