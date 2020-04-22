import React, { useState, useEffect } from 'react';
import CoreForm from './components/CoreForm';
import CoreList from './components/CoreList';
import firebaseService from '../../services/firebaseService';

const RecordsManager = ({ fbUser, definition }) => {
    const [importMessage, setImportMessage] = useState('');
    const [importUrl, setImportUrl] = useState('');
    const [records, setRecords] = useState([]);
    definition = normalizeDefinition(definition);
    const initialRecords = {};
    definition.fields.forEach(element => {
        initialRecords[element.name] = element.defaultValue;
    });
    const [selectedRecord, setSelectedRecord] = useState(initialRecords);
    const [mode, setMode] = useState(0);
    const svc = firebaseService(definition.name.toLowerCase());
    useEffect(() => {
        async function getRecords() {
            if (records.length === 0) {
                const result = await svc.getRecords(fbUser);
                if (result && result.data) {
                    const objectKeys = Object.keys(result.data);
                    const mappedRecords = objectKeys.map(k => { return { ...result.data[k], firebaseId: k} });
                    setRecords(mappedRecords);
                    setMode(0);
                } else {
                    setImportMessage('Enter service Url, then press Import to import up to 5000 records');
                }
            }
        }
        getRecords();
    }, [fbUser, svc, definition, records]);

    const handleOnAdded = (newRecord) => {
        setRecords([...records, newRecord]);
        setMode(0)
    };
    const handleOnUpdated = (updatedRecord) => {
        const updatedRecords = records.map(c => c.firebaseId === updatedRecord.firebaseId ? updatedRecord : c);
        setRecords(updatedRecords);
        setMode(0)
    };
    const handleOnDeleted = (deletedRecord) => {
        const remainingRecords = records.filter(x => x.firebaseId !== deletedRecord.firebaseId);
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
    const handleOnImport = async () => {
        try {
            // svc.deleteTable(fbUser);
            if (!importUrl) {
                setImportMessage('Please enter import url...');
                return;
            }
            const importRecords = await (await svc.importFrom(importUrl)).data;
            setImportMessage(`Found ${importRecords.length} ${definition.name} records. Importing...`);
            importRecords.forEach(r => {
                setTimeout(() => {
                    const newImport = {};
                    const importedKeys = Object.keys(r);
                    importedKeys.forEach(ik => {
                        const normalizedKey = ik.replace('_', '').toLowerCase();
                        newImport[normalizedKey] = r[ik]
                    })
                    svc.createRecord(fbUser, newImport);
                    setImportMessage(`Importing ${definition.name} record# ${newImport[definition.fields[0].name]}`)
                    setRecords([...records, newImport]);
                }, 2000)
            });
        } catch (err) {
            setImportMessage(err.message);
        }
    };
    const handleImportUrlChange = (event)=> {
        setImportUrl(event.target.value);
    }
    return (
        <React.Fragment>
            {
                mode === 0 ? <CoreList definition={definition} records={records} onAdd={handleOnAdd} onDelete={handleOnDelete} onUpdate={handleOnUpdate} onImport={handleOnImport} importMessage={importMessage} onImportUrlChange={handleImportUrlChange}></CoreList> :
                    <CoreForm mode={mode} definition={definition} initialInputRecord={selectedRecord} fbUser={fbUser} onAdded={handleOnAdded} onDeleted={handleOnDeleted} onUpdated={handleOnUpdated} onCancelled={handleOnCancelled}></CoreForm>
            }

        </React.Fragment >
    )
}

function normalizeDefinition(definition){
    definition.name = definition.name[0].toUpperCase() + definition.name.toLowerCase().substring(1);
    definition.fields = definition.fields.map(f=> {
        const label = (f.label || (f.name[0].toUpperCase() + f.name.substring(1)));
        const type = (f.type || 'text');
        const summary = f.summary || 0;
        const defaultValue = f.defaultValue || '';
        const readonly = f.readonly || false;
        return {
            ...f,
            label,
            type,
            summary,
            readonly,
            defaultValue,
        };
    });

    if (!definition.fields.some(s=> s.summary)){
        definition.fields[0].summary = 1;
    }
    if (!definition.fields.some(s=> s.autofocus)){
        definition.fields[0].autofocus = true;
    }
    return definition;
}

export default RecordsManager;