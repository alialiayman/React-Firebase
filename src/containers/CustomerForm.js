import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import createCustomerService from '../services/createCustomerService';


const CustomerForm = ({appState}) => {
    const [customer, setCustomer] = useState({});

    const handleNameChange = ({ target }) => {
        setCustomer(u => u = { ...u, name: target.value });
    }

    const handleAddressChange = ({ target }) => {
        setCustomer(u => u = { ...u, address: target.value });
    }

    const handleCreateCustomer = async () => {
        const fbuser = await createCustomerService(appState.idToken, customer);
        console.log(fbuser);
        // setCustomer(fbuser);
    }

    return (
        <React.Fragment>
            <Form>
                <TextField value={customer.name} onChange={handleNameChange} label="Name" />
                <TextField value={customer.address} onChange={handleAddressChange} label="Address" />
                <Button variant="contained" color='primary' onClick={handleCreateCustomer}> Create Customer </Button>
            </Form>

            {JSON.stringify(customer)}
        </React.Fragment>
    )
}


const Form = styled.div`
display: flex;
height: 30vh;
flex-direction: column;
width: 40%;
justify-content: space-around;
align-items: center;
margin: 10px auto;

`

export default CustomerForm;