import React, { useEffect } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import firebaseService from '../../services/firebaseService';

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

const AppHeader = () => {
    const fbUser = useSelector((state) => state.user);
    const tables = useSelector((state) => state.tables);
    const dispatch = useDispatch();

    const isLoggedIn = fbUser && fbUser.idToken;
    const svc = firebaseService('table');
    useEffect(() => {
        async function getTables() {
            if (isLoggedIn && Object.keys(tables).length === 0) {
                const result = await svc.getRecords(fbUser);
                if (result.data) {
                    const objectKeys = Object.keys(result.data);
                    // TODO: //Loop and fetch all field records TableName-firebaseId-columns
                    const mappedRecords = objectKeys.map(k => { return { ...result.data[k], firebaseId: k } });
                    dispatch({ type: 'SET_TABLES', tables: mappedRecords });
                }
            }
        }
        getTables();
    }, [dispatch, fbUser, isLoggedIn, svc, tables]);
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
        // dispatch({ type: 'SET_USER', user: {} });
        // history.push('/');
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
                    {isLoggedIn && <Link to={`/`} className={classes.link}><Typography variant="button">Home</Typography></Link>}
                    {isLoggedIn && Object.keys(tables).length > 0 && Object.keys(tables).map(k => {
                        return (<Link to={`/table/${tables[k].name.toLowerCase()}`} className={classes.link}><Typography variant="button">{tables[k].name}</Typography></Link>)
                    })}

                </div>
                {
                    (!isLoggedIn) && <Link to="/signin" className={classes.link}><Typography variant="button">Login</Typography></Link>
                }
                {
                    (isLoggedIn) &&
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
                                <MenuItem onClick={handleSettingsMenuClose}><Link to="/table">Tables</Link></MenuItem>
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