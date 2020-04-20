import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebaseService from '../../services/firebaseService';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, ErrorMessage } from 'formik';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        width: '90%',
        margin: '25px auto',
        border: '2px solid black'
    },
    formTitle: {
        margin: '10px auto',
        width: '80%',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: '2em',
        backgroundColor: 'red',
    }
}));

const CoreForm = ({ fbUser, mode, customer, onAdded, onUpdated, onDeleted }) => {

    const classes = useStyles();
    const svc = firebaseService();

    return (
        <React.Fragment>
            <Formik
                initialValues={customer}
                onSubmit={async (values, { setSubmitting }) => {
                    if (mode === 1) {
                        const result = await svc.createRecord(fbUser, values);
                        onAdded({ ...values, id: result.data.name });
                    } else if (mode === 2) {
                        await svc.deleteRecord(fbUser, customer.id, values);
                        onDeleted(values);
                    } else if (mode === 3) {
                        await svc.updateRecord(fbUser, customer.id, values);
                        onUpdated(values);
                    }
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                        <form onSubmit={handleSubmit} className={classes.formContainer}>

                            <Toolbar variant="dense">
                                <IconButton edge="start" color="inherit" aria-label="menu">
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" color="primary">
                                    {(mode === 1) && 'Create'}
                                    {(mode === 2) && 'Delete'}
                                    {(mode === 3) && 'Update'}
                                </Typography>
                            </Toolbar>
                            <Grid container xs={12} >
                                <Grid item xs={6}>
                                    <TextField
                                        type="text"
                                        name="name"
                                        label='Name'
                                        autoFocus={true}
                                        disabled={mode === 2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    <ErrorMessage name="name" component="div" />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        type="text"
                                        name="address"
                                        label='Address'
                                        disabled={mode === 2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.address}
                                    />
                                    <ErrorMessage name="address" component="div" />
                                </Grid>
                            </Grid>

                            {(mode === 1) && <Button type="submit" disabled={isSubmitting} variant="contained" color='primary'>Create</Button>}
                            {(mode === 2) && <Button type="submit" disabled={isSubmitting} variant="contained" color='secondary' startIcon={<DeleteIcon />}>Delete</Button>}
                            {(mode === 3) && <Button type="submit" disabled={isSubmitting} variant="contained" color='primary' startIcon={<SaveIcon />}>Save</Button>}
                        </form>
                    )}

            </Formik>
        </React.Fragment>
    )
}

export default CoreForm;