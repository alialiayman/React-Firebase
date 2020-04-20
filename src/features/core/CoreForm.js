import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import customerService from '../../services/customerService';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, ErrorMessage } from 'formik';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        width: '90%',
        margin: '25px auto',
        border: '2px solid black'
    },
}));

const CoreForm = ({ fbUser, mode, customer, onAdded, onUpdated, onDeleted }) => {

    const classes = useStyles();
    const svc = customerService();

    return (
        <React.Fragment>
            <Formik
                initialValues={customer}
                onSubmit={async (values, { setSubmitting }) => {
                    if (mode === 1) {
                        const result = await svc.createCustomer(fbUser, values);
                        onAdded({ id: result.data.name, ...values });
                    } else if (mode === 2) {
                        const result = await svc.deleteCustomer(fbUser, customer.id, values);
                        onDeleted(values);
                    } else if (mode === 3) {
                        const result = await svc.updateCustomer(fbUser, customer.id, values);
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
                            <Grid container xs={12} >
                                <Grid item xs={6}>
                                    <TextField
                                        type="text"
                                        name="name"
                                        label='Name'
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