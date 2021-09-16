import React from 'react';
import bgImage from '../../assets/loginImage.png'
import { Button, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogin } from '../../redux/actions/auth';
import { Controller, useForm } from 'react-hook-form';
import Particles from 'react-particles-js';


export const LoginScreen = () => {

    const dispatch = useDispatch();

    const { control, handleSubmit, reset} = useForm({
        defaultValues: {
            email: 'mijael@hotmail.com',
            password: '123456'
        }
    });
    
    const onSubmit = (data) => {
        dispatch(startLogin(data.email, data.password))
        reset();
    }

    return (
        <div 
            className="text-white relative bg-gradient-to-t from-gray-800 to-black w-full h-full flex flex-col items-center" 
            style={{maxWidth:"500px", marginInline:"auto"}}
        >
            <Particles className="absolute w-full h-full z-0"
                params={{
                    "particles": {
                        "number": {
                          "value": 355,
                          "density": {
                            "enable": true,
                            "value_area": 789.1476416322727
                          }
                        },
                        "color": {
                          "value": "#ffffff"
                        },
                        "shape": {
                          "type": "circle",
                          "stroke": {
                            "width": 0,
                            "color": "#000000"
                          },
                          "polygon": {
                            "nb_sides": 5
                          },
                          "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                          }
                        },
                        "opacity": {
                          "value": 0.48927153781200905,
                          "random": false,
                          "anim": {
                            "enable": true,
                            "speed": 0.2,
                            "opacity_min": 0,
                            "sync": false
                          }
                        },
                        "size": {
                          "value": 2,
                          "random": true,
                          "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0,
                            "sync": false
                          }
                        },
                        "line_linked": {
                          "enable": false,
                          "distance": 150,
                          "color": "#ffffff",
                          "opacity": 0.4,
                          "width": 1
                        },
                        "move": {
                          "enable": true,
                          "speed": 0.2,
                          "direction": "none",
                          "random": true,
                          "straight": false,
                          "out_mode": "out",
                          "bounce": false,
                          "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                          }
                        }
                      },
                      "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                          "onhover": {
                            "enable": true,
                            "mode": "bubble"
                          },
                          "onclick": {
                            "enable": true,
                            "mode": "push"
                          },
                          "resize": true
                        },
                        "modes": {
                          "grab": {
                            "distance": 400,
                            "line_linked": {
                              "opacity": 1
                            }
                          },
                          "bubble": {
                            "distance": 83.91608391608392,
                            "size": 1,
                            "duration": 3,
                            "opacity": 1,
                            "speed": 3
                          },
                          "repulse": {
                            "distance": 200,
                            "duration": 0.4
                          },
                          "push": {
                            "particles_nb": 4
                          },
                          "remove": {
                            "particles_nb": 2
                          }
                        }
                      },
                      "retina_detect": true
                }}
            />
            <div className="flex flex-col items-center justify-center rounded-md mt-32 p-1 w-max z-20">
                <div className="flex items-center h-2/6 mb-8">
                    <img src={bgImage} alt="background img" width="200"/>
                    <div className="flex flex-col">
                        <p className="ml-3 text-3xl w-min font-medium">
                            Inventory Administrator
                        </p>
                        <p className="ml-3 w-min whitespace-nowrap text-gray-200">
                            ¡Comienza a inventariar!
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-96">
                    <Controller 
                        name="email"
                        control={control}
                        render={({ field }) => 
                        <TextField 
                            {...field} 
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
                    {/* <p className="text-gray-500 mt-1.5">
                        ¿Olvidó su contraseña?
                    </p> */}
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
                </form>
                <div className="flex mt-2 mr-auto">
                    <p className="text-gray-400">
                        ¿Nuevo usuario?
                    </p>
                    <Link to="/register" className="pointer no-tap-highlight ml-2">
                        <p>Crear Cuenta</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}