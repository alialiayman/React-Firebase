import React from 'react';
import customersDefinition from './customersDefinition';
import RecordsManager from '../RecordsManager/RecordsManager';

const CustomersManager = ({fbUser}) => {
    return (
        <RecordsManager fbUser={fbUser} definition={customersDefinition} />
    )

}

export default CustomersManager;