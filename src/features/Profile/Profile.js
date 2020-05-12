import React from 'react';
import definition from './definition';
import CoreForm from '../RecordsManager/components/CoreForm';
import {withRouter} from 'react-router-dom';
import  {touchModel} from '../RecordsManager/RecordsManager';

const Profile = withRouter(({fbUser})=> {


    const handleOnUpdated = ()=> {

    };

    const handleOnCancelled = ()=> {

    };

    const selectedRecord = {
        firebaseId: 'default'
    }
    const newDefinitions = touchModel(definition);
    return (
        <CoreForm mode={3} model={newDefinitions} initialInputRecord={selectedRecord} fbUser={fbUser} onUpdated={handleOnUpdated} onCancelled={handleOnCancelled}></CoreForm>
    )
});

export default Profile;
