import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
    const [profileAnchorEl, setAnchorEl] = React.useState(null);
    const [settingsAnchorEl, setSettingsAnchorEl] = React.useState(null);

    const handleProfileMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        onSignout();
    }

    const handleSettingsMenuClick = (event) => {
        setSettingsAnchorEl(event.currentTarget);
    }

    const handleSettingsMenuClose = () => {
        setSettingsAnchorEl(null);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <div className={classes.links}>
                    {(fbUser && fbUser.idToken) && <Link to="/yachts" className={classes.link}><Typography variant="button">Yachts</Typography></Link>}
                    {(fbUser && fbUser.idToken) && <Link to="/customers" className={classes.link}><Typography variant="button">Companies</Typography></Link>}
                    {(fbUser && fbUser.idToken) && <Link to="/contacts" className={classes.link}><Typography variant="button">Contacts</Typography></Link>}
                </div>
                {
                    (!fbUser || !fbUser.idToken) && <Link to="/signin" className={classes.link}><Typography variant="button">Login</Typography></Link>
                }
                {
                    (fbUser && fbUser.idToken) &&
                    (
                        <>
                            <IconButton edge="end" color="inherit">
                                <HelpOutlineOutlinedIcon />
                            </IconButton>

                            <IconButton edge="end" color="inherit" onClick={handleSettingsMenuClick}>
                                <TuneOutlinedIcon />
                            </IconButton>

                            <Menu
                                anchorEl={settingsAnchorEl}
                                keepMounted
                                open={Boolean(settingsAnchorEl)}
                                onClose={handleSettingsMenuClose}
                            >
                                <MenuItem onClick={handleSettingsMenuClose}><Link to="/schema">Schemas</Link></MenuItem>
                                <MenuItem onClick={handleSettingsMenuClose}><Link to="/admin">Settings</Link></MenuItem>
                            </Menu>

                            <IconButton edge="end" color="inherit" onClick={handleProfileMenuClick}>
                                <PermIdentityOutlinedIcon />
                            </IconButton>

                            <Menu
                                anchorEl={profileAnchorEl}
                                keepMounted
                                open={Boolean(profileAnchorEl)}
                                onClose={handleProfileMenuClose}
                            >
                                <MenuItem onClick={handleProfileClick}><Link to="/profile">Profile</Link></MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    )

                }


            </Toolbar>
        </AppBar>
    )
}

export default AppHeader;