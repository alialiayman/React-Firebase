import React, { useState, useEffect } from 'react';
import CoreForm from './core/CoreForm';
import CoreList from './core/CoreList';
import customerService from '../services/customerService';

const svc = customerService();

const Customers = ({fbUser}) => {

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState({id: '', name: '', address: ''});
    const [mode, setMode] = useState(0);
    useEffect( () => {
        async function getCustomers() {
            if (customers.length === 0) {
                const result = await svc.getCustomers(fbUser);
                if (result && result.data) {
                    const objectKeys = Object.keys(result.data);
                    const customers = objectKeys.map(k=> { return {id: k, name: result.data[k].name, address: result.data[k].address}});
                    setCustomers(customers);
                    setMode(0);
                }
            }
          }
          getCustomers();
      },[]);

    const columns = [
        { title: 'Name', field: 'name' },
        { title: 'Address', field: 'address' },
    ];

    const handleOnAdded = (newCustomer) => {
        setCustomers([...customers, newCustomer]);
        setMode(0)
    };
    const handleOnUpdated = (updatedCustomer) => {
        const updatedCustomers = customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c);
        setCustomers(updatedCustomers);
        setMode(0)
    };
    const handleOnDeleted = (deletedCustomer) => {
        const remainingCustomers = customers.filter(x => x.id !== deletedCustomer.id);
        setCustomers(remainingCustomers);
        setMode(0)
    };
    const handleOnAdd = () => {
        setSelectedCustomer({id: '', name: '', address: ''});
        setMode(1);
    };
    const handleOnDelete = (cust) => {
        setSelectedCustomer(cust)
        setMode(2);
    };
    const handleOnUpdate = (cust) => {
        setSelectedCustomer(cust)
        setMode(3);
    };
    return (
        <React.Fragment>
            {
                mode === 0 ? <CoreList name='Customer' columns={columns} records={customers} onAdd={handleOnAdd} onDelete={handleOnDelete} onUpdate={handleOnUpdate}></CoreList> :
                    <CoreForm mode={mode} customer={selectedCustomer} fbUser={fbUser} onAdded={handleOnAdded} onDeleted={handleOnDeleted} onUpdated={handleOnUpdated}></CoreForm>
            }

        </React.Fragment >
    )
}

export default Customers;