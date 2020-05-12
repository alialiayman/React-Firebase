import React, { useState } from 'react';
import tableModel from './model';
import columnModel from './model_paper';
import RecordsManager from '../RecordsManager/RecordsManager';
import { useDispatch } from 'react-redux';

const TableManager = () => {

    const [state, setState] = useState({
        model: tableModel
    });

    const dispatch = useDispatch();
    const handleModelChange = (firebaseId) => {
        if (state.model.child && state.model.child === 'column') {
            columnModel.name = `${state.model.name}${firebaseId}-${state.model.child}`
            setState({ model: columnModel });
        }
    }

    const handleDeletedRecord = (deletedRecord)=> {
        dispatch({ type: 'DELETE_TABLE', table: deletedRecord });
    }
    const handleAddRecord = (addedRecord)=> {
        dispatch({ type: 'ADD_TABLE', table: addedRecord });
    }
    const handleUpdateRecord = (updateRecord)=> {
        dispatch({ type: 'UPDATE_TABLE', table: updateRecord });
    }

    return (
        <RecordsManager 
        model={state.model} 
        onModelChange={handleModelChange} 
        onRecordDeleted={handleDeletedRecord}
        onRecordAdded={handleAddRecord}
        onRecordUpated={handleUpdateRecord}
        />
    )
}

export default TableManager;