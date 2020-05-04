import React from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import authService from '../../services/authService'
import firebaseService  from '../../services/firebaseService'
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    mainContainer: {
        width: '80%',
        height: '50vh',
        margin: '30px auto',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    message: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    }

}));

const AppHome = () => {
    const fbUser = useSelector((state)=> state.user);
    const isLoggedIn = fbUser && fbUser.idToken;
    const classes = useStyles();
    const fbSrvc = firebaseService();
    return (
        <Container className={classes.mainContainer}>
            <Paper elevation={5} className={classes.message}>
                {
                    !isLoggedIn && <Typography>Welcome to Keepy! Web API Key {authService.webApiKey}, ProjId: {fbSrvc.projId}</Typography>
                }
                {
                    isLoggedIn && <Typography color='primary'>{`Welcome, ${fbUser.localId} [aka: ${fbUser.email}]`}</Typography>
                }
            </Paper>
        </Container>
    )
};

export default AppHome;