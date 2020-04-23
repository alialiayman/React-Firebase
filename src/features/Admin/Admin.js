import React from 'react'
import Button from '@material-ui/core/Button';
import firebaseService from '../../services/firebaseService';

const Admin = ({ fbUser, onEnableImport }) => {

    const svc = firebaseService('company');
    const handleOnDeleteCustomers = () => {
        svc.deleteTable(fbUser)
    }

    const handleOnEnableImport = ()=> {
        onEnableImport();
    }
    return (
        <React.Fragment>
            <Button color='primary' onClick={handleOnDeleteCustomers}>
                Delete Companies
            </Button>
            <Button color='primary' onClick={handleOnEnableImport}>
                Enable Import
            </Button>

        </React.Fragment>
    )
}

export default Admin;