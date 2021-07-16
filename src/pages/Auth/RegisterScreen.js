import React from 'react';
import '../../styles/auth.scss'
import '../../styles/general.scss'
import { Button, TextField } from '@material-ui/core';
import { useForm } from '../../hooks/useForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';


export const RegisterScreen = () => {

    const [formLoginValues, handleLoginInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formLoginValues;
    
    const handleLogin = (e) => {
        e.preventDefault();
    }
    return (
        <div className="container inverted">
            <div className="formContainer">
                <div className="formWelcome">
                    <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                        <FontAwesomeIcon icon={faUserCircle} size="4x" color="#576bfa"/>
                        <h2 className="formTitle" style={{margin:"10px 0 0 0", fontWeight:"normal"}}>
                            Sign Up    
                        </h2>
                        <p className="tc-grey" style={{marginTop:"6px"}}>
                            Please fill this form to create an account
                        </p>
                    </div>
                </div>
                <form onSubmit={handleLogin} className="form">
                    <div className="textField">
                        <TextField
                            label="Name"
                            variant="outlined"
                            type="name"
                            name="name"
                            value={name}
                            onChange={handleLoginInputChange}
                        />
                    </div>
                    <div className="textField" style={{marginTop:"30px"}}>
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
                    <div className="textField" style={{marginTop:"30px"}}>
                        <TextField
                            label="Repeat Password"
                            variant="outlined"
                            type="password"
                            name="password2"
                            value={password2}
                            onChange={handleLoginInputChange}
                        />
                    </div>
                    <div className="formButton" style={{marginTop:"50px"}}>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                            type="submit"
                        >
                            Register
                        </Button>
                    </div>
                    
                </form>
                <div className="formSignUpOption">
                    <p className="tc-grey">
                        Already have an account?
                    </p>
                    <Link to="/login" className="p" style={{marginLeft:"5px"}}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}