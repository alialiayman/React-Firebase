import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import createCustomerService from '../services/createCustomerService';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        height: '30vh',
        flexDirection: 'column',
        width: '40%',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '10px auto',
    },
}));

const CustomerForm = ({ fbUser }) => {
    const [customer, setCustomer] = useState({});
    const classes = useStyles();
    const handleNameChange = ({ target }) => {
        setCustomer(u => u = { ...u, name: target.value });
    }

    const handleAddressChange = ({ target }) => {
        setCustomer(u => u = { ...u, address: target.value });
    }

    const handleCreateCustomer = async () => {
        const fbuser = await createCustomerService(fbUser, customer);
        console.log(fbuser);
        // setCustomer(fbuser);
    }

    return (
        <React.Fragment>
            <form className={classes.formContainer}>
                <TextField value={customer.name} onChange={handleNameChange} label="Name" />
                <TextField value={customer.address} onChange={handleAddressChange} label="Address" />
                <Button variant="contained" color='primary' onClick={handleCreateCustomer}> Create Customer </Button>
            </form>

            {JSON.stringify(customer)}
        </React.Fragment>
    )
}


export default CustomerForm;