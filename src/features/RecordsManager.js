import React, { useState, useEffect } from 'react';
import CoreForm from './core/CoreForm';
import CoreList from './core/CoreList';
import firebaseService from '../services/firebaseService';

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

    const columns = definition.fields.filter(x=> x.isSummary).map(r=> {return {title: r.name, field: r.name}});

    const handleOnAdded = (newRecord) => {
        setRecords([...records, newRecord]);
        setMode(0)
    };
    const handleOnUpdated = (updatedRecord) => {
        const updatedCustomers = records.map(c => c.id === updatedRecord.id ? updatedRecord : c);
        setRecords(updatedCustomers);
        setMode(0)
    };
    const handleOnDeleted = (deletedRecord) => {
        const remainingRecords = records.filter(x => x.id !== deletedRecord.id);
        setRecords(remainingRecords);
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
                mode === 0 ? <CoreList name={definition.name} columns={columns} records={records} onAdd={handleOnAdd} onDelete={handleOnDelete} onUpdate={handleOnUpdate}></CoreList> :
                    <CoreForm mode={mode} customer={selectedRecord} fbUser={fbUser} onAdded={handleOnAdded} onDeleted={handleOnDeleted} onUpdated={handleOnUpdated}></CoreForm>
            }

        </React.Fragment >
    )
}

export default RecordsManager;