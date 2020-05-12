import React from 'react';
import Button from '@material-ui/core/Button';
import firebaseService from '../../../services/firebaseService';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import Grid from '@material-ui/core/Grid';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { useSelector } from 'react-redux';
import CoreField from './CoreField';

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
    },
    actionsContainerTopMain: {
        width: '50%',
        padding: '10px',
    },
    actionsContainerTopButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));

const CoreForm = ({ mode, model, initialInputRecord, onAdded, onUpdated, onDeleted, onCancelled }) => {

    const classes = useStyles();
    const svc = firebaseService(model.name.toLowerCase());
    const title = (mode) => {
        switch (mode) {
            case 1:
                return 'Create ' + model.name;
            case 2:
                return 'Delete ' + model.name;
            case 3:
                return 'Update ' + model.name;
            default:
                break;
        }
    }
    const fbUser = useSelector((state) => state.user);

    // const handleImageChange = ()=> {
    //     // TODO: when image changes store it to the database using the record key and its field name
    // }
    return (
        <React.Fragment>
            <Formik
                initialValues={initialInputRecord}
                onSubmit={async (values, { setSubmitting }) => {
                    const newRecord = {};
                    model.fields.forEach(f => newRecord[f.name] = values[f.name]);
                    if (mode === 1) {
                        const result = await svc.createRecord(fbUser, newRecord);
                        onAdded({ ...values, firebaseId: result.data.name });
                    } else if (mode === 2) {
                        await svc.deleteRecord(fbUser, initialInputRecord.firebaseId, newRecord);
                        if (model.childfields){
                            const svcChildren = firebaseService(`${model.name}-${model.childmodel}${initialInputRecord.firebaseId}`.toLowerCase());
                            await svcChildren.deleteTable(fbUser);
                        }
                        onDeleted(values);
                    } else if (mode === 3) {
                        await svc.updateRecord(fbUser, initialInputRecord.firebaseId, newRecord);
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
                                    subheader={`${values.firebaseId}` || ''}
                                    action={
                                        <CancelOutlinedIcon color='secondary' onClick={onCancelled} />
                                    }
                                />
                                <CardContent>
                                    <Grid container  spacing={3}>
                                        {model.fields.map(f => <CoreField key={f.name} field={f} value={values[f.name]} mode={mode} onChange={handleChange} onBlur={handleBlur}/>)}
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