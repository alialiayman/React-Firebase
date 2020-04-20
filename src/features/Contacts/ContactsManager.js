import React from 'react';
import definition from './definition';
import RecordsManager from '../RecordsManager/RecordsManager';

const ContactsManager = ({fbUser}) => {
    return (
        <RecordsManager fbUser={fbUser} definition={definition} />
    )

}

export default ContactsManager;