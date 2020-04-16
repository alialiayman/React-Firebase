import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import authService from '../../services/authService';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        height: '30vh',
        flexDirection: 'column',
        width: '40%',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '10px auto',
    },
  }));

const SignUp = () => {
    const [user, setUser] = useState({});
const classes = useStyles();

    const handleEmailChange = ({ target }) => {
        setUser(u => u = { ...u, email: target.value });
    }

    const handlePasswordChange = ({ target }) => {
        setUser(u => u = { ...u, password: target.value });
    }

    const handleSignUp = async () => {
        const fbuser = await authService.signUp(user);
        setUser(fbuser);
    }

    return (
        <React.Fragment>
            <form className={classes.formContainer}> 
                <TextField value={user.email} onChange={handleEmailChange} label="Email" />
                <TextField value={user.password} onChange={handlePasswordChange} type="password" label="Password" />
                <Button variant="contained" color='primary' onClick={handleSignUp}> Signup </Button>
            </form>

            {JSON.stringify(user)}
        </React.Fragment>
    )
}


export default SignUp;