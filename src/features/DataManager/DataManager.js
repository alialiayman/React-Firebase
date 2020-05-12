import React, { useState } from 'react';
import RecordsManager from '../RecordsManager/RecordsManager';
import { useDispatch } from 'react-redux';

const DataManager = ({ match }) => {

    const [state, setState] = useState({
        model: {}
    });
    const tableName = match.params.tableName;

    const dispatch = useDispatch();
    const handleModelChange = (firebaseId) => {
        if (state.model.child) {
            // columnModel.name = `${state.model.name}${firebaseId}-${state.model.child}`
            // setState({ model: columnModel });
        }
    }

    const handleDeletedRecord = (deletedRecord) => {
        dispatch({ type: 'DELETE_DATA', table: deletedRecord });
    }
    const handleAddRecord = (addedRecord) => {
        dispatch({ type: 'ADD_DATA', table: addedRecord });
    }
    const handleUpdateRecord = (updateRecord) => {
        dispatch({ type: 'UPDATE_DATA', table: updateRecord });
    }

    return (
        state.model.name ?
            <RecordsManager
                model={state.model}
                onModelChange={handleModelChange}
                onRecordDeleted={handleDeletedRecord}
                onRecordAdded={handleAddRecord}
                onRecordUpated={handleUpdateRecord}
            />
            : null

    )
}

export default DataManager;