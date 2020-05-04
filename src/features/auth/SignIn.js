import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import authService from '../../services/authService';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { AlternateEmail, LockOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { CardContent, CardActions } from '@material-ui/core';
import { useDispatch } from 'react-redux';

// TODO: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
// TODO: use formik https://www.youtube.com/watch?v=TxEVnaISj1w
const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        height: '30vh',
        width: '30%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '20px auto',
    },
    actionsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    }
}));

const SignIn = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({ email: "ayali@hotmail.com", password: "paris123" });
    const classes = useStyles();
    const history = useHistory();

    const handleEmailChange = ({ target }) => {
        setUser(u => u = { ...u, email: target.value });
    }

    const handlePasswordChange = ({ target }) => {
        setUser(u => u = { ...u, password: target.value });
    }

    const handleSignIn = async () => {
        const loginUser = await authService.signIn(user);
        if (loginUser) {
            dispatch({ type: 'SET_USER', user: loginUser.data });
            history.push('/');
        }
    }

    return (
        <React.Fragment>
            <Card className={classes.formContainer}>
                <form>
                    <CardContent>
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <AlternateEmail />
                            </Grid>
                            <Grid item>
                                <TextField value={user.email} label="Email Address" onChange={handleEmailChange} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <LockOutlined />
                            </Grid>
                            <Grid item>
                                <TextField value={user.password} type="password" label="Password" onChange={handlePasswordChange} />
                            </Grid>
                        </Grid>

                    </CardContent>

                    <CardActions className={classes.actionsContainer}>
                        <Button color='secondary' onClick={() => setUser({ email: "", password: "" })}> Reset </Button>
                        <Button variant="contained" color='primary' onClick={handleSignIn}> Login </Button>
                    </CardActions>
                </form>
            </Card>
        </React.Fragment>

    )
}

export default SignIn;