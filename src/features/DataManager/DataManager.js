import React from 'react';
import RecordsManager from '../RecordsManager/RecordsManager';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

const DataManager = ({ match }) => {
    const tableName = match.params.tableName;

    const dispatch = useDispatch();
    const tables = useSelector(s => s.tables);
    const model = _.find(tables, (t) => t.name.toLowerCase() === tableName.toLowerCase());
    const handleModelChange = (firebaseId) => {
        if (model.child) {
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
        model.name ?
            <RecordsManager
                model={model}
                onModelChange={handleModelChange}
                onRecordDeleted={handleDeletedRecord}
                onRecordAdded={handleAddRecord}
                onRecordUpated={handleUpdateRecord}
            />
            : null

    )
}

export default DataManager;