import React from 'react';
// import '../../styles/auth.scss'
// import '../../styles/general.scss'
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
        <div className="container">
            <div className="formContainer">
                <div className="formWelcome">
                    <div style={{display:"flex", alignItems:"center"}}>
                        <img src={logo} alt="logo" width="40" height="40"/>
                        <h2 className="formTitle">
                            Inventory Organizer
                        </h2>
                    </div>
                    <p className="tc-grey" style={{marginTop:"6px"}}>
                        Welcome! Let's get started!
                    </p>
                </div>
                <form onSubmit={handleLogin} className="form">
                    <div className="textField">
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="text"
                            name="email"
                            value={email}
                            onChange={handleLoginInputChange}
                        />
                    </div>
                    <div className="textField" style={{marginTop:"30px"}}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleLoginInputChange}
                        />
                    </div>
                    <div className="formOptional">
                        <p className="p">
                            Forgot password?
                        </p>
                    </div>
                    <div className="formButton">
                        <Button
                            style={{
                                color:"white"
                            }}
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
                <div className="formSignUpOption">
                    <p className="tc-grey">
                        New User?
                    </p>
                    <Link to="/register" className="p" style={{marginLeft:"5px"}}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}