import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebaseService from '../../../services/firebaseService';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, ErrorMessage } from 'formik';
import Grid from '@material-ui/core/Grid';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        width: '90%',
        margin: '25px auto',
    },
    cardTitle: {
        textAlign: 'left',
        fontSize: '2em',
        backgroundColor: 'silver',
    },
    actionsContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: 'silver',
    }
}));

const CoreForm = ({ fbUser, mode, definition, inputRecord, onAdded, onUpdated, onDeleted, onCancelled }) => {

    const keyName = definition.fields.find(k=> k.isKey).name;
    const classes = useStyles();
    const svc = firebaseService();
    const title = (mode) => {
        switch (mode) {
            case 1:
                return 'Create ' + definition.name;
            case 2:
                return 'Delete ' + definition.name;
            case 3:
                return 'Update ' + definition.name;
            default:
                break;
        }
    }
    const filteredFields = _.filter(definition.fields, { 'isKey': false });
    const sortedFields = _.orderBy(filteredFields, ['editOrder'], ['asc']);
    return (
        <React.Fragment>
            <Formik
                initialValues={inputRecord}
                onSubmit={async (values, { setSubmitting }) => {
                    if (mode === 1) {
                        const result = await svc.createRecord(fbUser, values);
                        onAdded({ ...values, id: result.data.name });
                    } else if (mode === 2) {
                        await svc.deleteRecord(fbUser, inputRecord[keyName], values);
                        onDeleted(values);
                    } else if (mode === 3) {
                        await svc.updateRecord(fbUser, inputRecord[keyName], values);
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
                        <form onSubmit={handleSubmit} >
                            <Card raised className={classes.formContainer}>
                                <CardHeader className={classes.cardTitle}
                                    title={title(mode)}
                                    subheader=""
                                />
                                <CardContent>
                                    <Grid container  >
                                        {sortedFields.map(f => 
                                            <Grid item xs={6}>
                                                <TextField
                                                    type={f.type}
                                                    name={f.name}
                                                    label={f.label}
                                                    autoFocus={f.autoFocus}
                                                    disabled={mode === 2}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values[f.name]}
                                                />
                                                <ErrorMessage name={f.name} component="div" />
                                            </Grid>
                                        )}
                                    </Grid>

                                </CardContent>
                                <CardActions className={classes.actionsContainer}>
                                    <Button type="button" disabled={isSubmitting} variant="contained" color='secondary' onClick={onCancelled} startIcon={<CancelOutlinedIcon />}>Cancel</Button>
                                    {(mode === 1) && <Button type="submit" disabled={isSubmitting} variant="contained" color='primary' startIcon={<AddOutlinedIcon />}>Create</Button>}
                                    {(mode === 2) && <Button type="submit" disabled={isSubmitting} variant="contained" color='secondary' startIcon={<DeleteOutlinedIcon />}>Delete</Button>}
                                    {(mode === 3) && <Button type="submit" disabled={isSubmitting} variant="contained" color='primary' startIcon={<SaveOutlinedIcon />}>Save</Button>}
                                </CardActions>
                            </Card>
                        </form>
                    )}

            </Formik>
        </React.Fragment>
    )
}

export default CoreForm;