import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    links: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    link: {
        color: 'white',
        textDecoration: 'none'
    }
}));

const AppHeader = ({ fbUser, onSignout }) => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <div className={classes.links}>
                    {(fbUser && fbUser.idToken) && <Link to="/admin" className={classes.link}><Typography variant="button">Admin</Typography></Link>}
                    {(fbUser && fbUser.idToken) && <Link to="/yachts" className={classes.link}><Typography variant="button">Yachts</Typography></Link>}
                    {(fbUser && fbUser.idToken) && <Link to="/customers" className={classes.link}><Typography variant="button">Companies</Typography></Link>}
                    {(fbUser && fbUser.idToken) && <Link to="/contacts" className={classes.link}><Typography variant="button">Contacts</Typography></Link>}
                </div>
                {
                    (!fbUser || !fbUser.idToken) && <Link to="/signin" className={classes.link}><Typography variant="button">Login</Typography></Link>
                }
                {
                    (fbUser && fbUser.idToken) && <Button className={classes.link} onClick={onSignout}><Typography variant="button">Logout</Typography></Button>
                }

            </Toolbar>
        </AppBar>
    )
}

export default AppHeader;