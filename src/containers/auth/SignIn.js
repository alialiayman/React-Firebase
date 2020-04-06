import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import signInService from '../../services/signIn';


const SignIn = ({onSignIn}) => {
    const [user, setUser] = useState({email: "ayali@hotmail.com", password: "paris123"});

    const handleEmailChange = ({ target }) => {
        setUser(u => u = { ...u, email: target.value });
    }

    const handlePasswordChange = ({ target }) => {
        setUser(u => u = { ...u, password: target.value });
    }

    const handleSignIn = async () => {
        const fbuser = await signInService(user);
        onSignIn(fbuser.data);
    }

    return (
        <React.Fragment>
            <Form>
                <TextField value={user.email} onChange={handleEmailChange} label="Email" />
                <TextField value={user.password} onChange={handlePasswordChange} type="password" label="Password" />
                <Button variant="contained" color='primary' onClick={handleSignIn}> Login </Button>
            </Form>
        </React.Fragment>
    )
}


const Form = styled.div`
display: flex;
height: 30vh;
flex-direction: column;
width: 40%;
justify-content: space-around;
align-items: center;
margin: 10px auto;

`

export default SignIn;