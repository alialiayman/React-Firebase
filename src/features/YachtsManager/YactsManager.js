import React from 'react';
import definition from './definition';
import RecordsManager from '../RecordsManager/RecordsManager';

const YachtsManager = ({fbUser}) => {
    return (
        <RecordsManager fbUser={fbUser} definition={definition} />
    )

}

export default YachtsManager;