import React from 'react';
import definition from './definition';
import CoreForm from '../RecordsManager/components/CoreForm';
import {withRouter} from 'react-router-dom';
import  {normalizeDefinition} from '../RecordsManager/RecordsManager';

const Profile = withRouter(({fbUser})=> {


    const handleOnUpdated = ()=> {

    };

    const handleOnCancelled = ()=> {

    };

    const selectedRecord = {
        firebaseId: 'default'
    }
    const newDefinitions = normalizeDefinition(definition);
    return (
        <CoreForm mode={3} definition={newDefinitions} initialInputRecord={selectedRecord} fbUser={fbUser} onUpdated={handleOnUpdated} onCancelled={handleOnCancelled}></CoreForm>
    )
});

export default Profile;
