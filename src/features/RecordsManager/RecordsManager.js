import React, { useState, useEffect } from 'react';
import CoreForm from './components/CoreForm';
import CoreList from './components/CoreList';
import firebaseService from '../../services/firebaseService';

const svc = firebaseService();

const RecordsManager = ({fbUser, definition}) => {

    const [records, setRecords] = useState([]);
    const initialRecords = {};
    definition.fields.forEach(element => {
        initialRecords[element.name] = element.defaultValue;
    });
    const [selectedRecord, setSelectedRecord] = useState(initialRecords);
    const [mode, setMode] = useState(0);
    useEffect( () => {
        async function getRecords() {
            if (records.length === 0) {
                const result = await svc.getRecords(fbUser);
                if (result && result.data) {
                    const objectKeys = Object.keys(result.data);
                    const keyField = definition.fields.find(e=> e.isKey);
                    const mappedRecords = objectKeys.map(k=> { return {...result.data[k], [keyField.name]: k}});
                    setRecords(mappedRecords);
                    setMode(0);
                }
            }
          }
          getRecords();
      },[]);

    const handleOnAdded = (newRecord) => {
        setRecords([...records, newRecord]);
        setMode(0)
    };
    const handleOnUpdated = (updatedRecord) => {
        const updatedRecords = records.map(c => c.id === updatedRecord.id ? updatedRecord : c);
        setRecords(updatedRecords);
        setMode(0)
    };
    const handleOnDeleted = (deletedRecord) => {
        const remainingRecords = records.filter(x => x.id !== deletedRecord.id);
        setRecords(remainingRecords);
        setMode(0)
    };
    const handleOnCancelled = () => {
        setMode(0)
    };
    const handleOnAdd = () => {
        setSelectedRecord(initialRecords);
        setMode(1);
    };
    const handleOnDelete = (deleteRecord) => {
        setSelectedRecord(deleteRecord)
        setMode(2);
    };
    const handleOnUpdate = (updateRecord) => {
        setSelectedRecord(updateRecord)
        setMode(3);
    };
    return (
        <React.Fragment>
            {
                mode === 0 ? <CoreList definition={definition} records={records} onAdd={handleOnAdd} onDelete={handleOnDelete} onUpdate={handleOnUpdate}></CoreList> :
                    <CoreForm mode={mode} definition={definition} inputRecord={selectedRecord} fbUser={fbUser} onAdded={handleOnAdded} onDeleted={handleOnDeleted} onUpdated={handleOnUpdated} onCancelled={handleOnCancelled}></CoreForm>
            }

        </React.Fragment >
    )
}

export default RecordsManager;