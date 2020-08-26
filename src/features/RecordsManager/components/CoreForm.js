import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import firebaseService from '../../../services/firebaseService';
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
        justifyContent: 'space-between',
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

    const [state, SetState] = useState({
        importDMLOpen: false,
        importJSONOpen: false,
    });
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

    let importText = '';
    const handleImportChange = (event) => {
        importText = event.target.value;
    }

    const handleImport = async () => {
        const rows = importText.split('\n');
        for (let i = 0; i < rows.length; i++) {
            let regex = /(\w*?)\s(\w*)/g;
            let [, name, type] = regex.exec(rows[i]) || [];
            if (name) {
                let newRecord = {initialInputRecord};
                newRecord.name = name.substring(0, 1).toLowerCase() + name.substring(1);
                newRecord.label = name;
                newRecord.type = convertToFirebaseType(type);
                svc.createRecord(fbUser, newRecord);
            }
        }
        SetState({ ...state, importDMLOpen: false });
        // onAdded({ ...newRecord});
    }
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
                        if (model.childfields) {
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
                                    <Grid container spacing={3}>
                                        {model.fields.map(f => <CoreField key={f.name} field={f} value={values[f.name]} mode={mode} onChange={handleChange} onBlur={handleBlur} />)}
                                    </Grid>

                                </CardContent>
                                <CardActions className={classes.actionsContainer}>
                                    <div>
                                        <Button type="button" disabled={isSubmitting} color='secondary' onClick={() => SetState({ ...state, importJSONOpen: true })} >Import JSON</Button>
                                        <Button type="button" disabled={isSubmitting} color='secondary' onClick={() => SetState({ ...state, importDMLOpen: true })} >Import DML</Button>
                                    </div>
                                    <div>
                                        <Button type="button" disabled={isSubmitting} variant="contained" color='secondary' onClick={onCancelled} startIcon={<CancelOutlinedIcon />}>Cancel</Button>
                                        {(mode === 1) && <Button type="submit" disabled={isSubmitting} variant="contained" color='primary' startIcon={<AddOutlinedIcon />}>Create</Button>}
                                        {(mode === 2) && <Button type="submit" disabled={isSubmitting} variant="contained" color='secondary' startIcon={<DeleteOutlinedIcon />}>Delete</Button>}
                                        {(mode === 3) && <Button type="submit" disabled={isSubmitting} variant="contained" color='primary' startIcon={<SaveOutlinedIcon />}>Save</Button>}
                                    </div>
                                </CardActions>
                            </Card>
                        </form>
                    )}

            </Formik>
            <Dialog open={state.importDMLOpen} onClose={() => SetState({ ...state, importDMLOpen: false })} style={{ width: '90%' }}>
                <DialogTitle>
                    Import columns
                </DialogTitle>
                <DialogContent dividers>
                    <TextField label="Names" autoFocus fullWidth multiline required rows="10" variant='outlined' onChange={handleImportChange}>

                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleImport}>
                        Import
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

function convertToFirebaseType(typ) {
    const _typ = typ.toLowerCase();
    if (_typ.includes('int')) return 'number';
    if (_typ.includes('bit')) return 'checkbox';

    return 'text'

}

export default CoreForm;