import React, { useState, useEffect } from 'react';
import CoreForm from './components/CoreForm';
import CoreList from './components/CoreList';
import pluralize from 'pluralize'
import firebaseService from '../../services/firebaseService';
import _ from 'lodash';

const RecordsManager = ({ fbUser, definition, initialMode }) => {
    const [importMessage, setImportMessage] = useState('');
    const [importUrl, setImportUrl] = useState('');
    const [records, setRecords] = useState([]);
    definition = normalizeDefinition(definition);
    const initialRecords = {};
    definition.fields.forEach(element => {
        initialRecords[element.name] = element.defaultValue;
    });
    const [selectedRecord, setSelectedRecord] = useState(initialRecords);
    const [mode, setMode] = useState(initialMode);
    const svc = firebaseService(definition.name.toLowerCase());
    useEffect(() => {
        async function getRecords() {
            if (records.length === 0) {
                const result = await svc.getRecords(fbUser);
                if (result && result.data) {
                    const objectKeys = Object.keys(result.data);
                    const mappedRecords = objectKeys.map(k => { return { ...result.data[k], firebaseId: k } });
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
    const handleOnDetails = (rowdata) => {
        // Reload with new definition.
        // Reload new definition from firebase, change the state and the component will reload with new data.
        alert(JSON.stringify(rowdata));
    }

    const handleOnImport = async () => {
        try {
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
                        //Find this normalizedKey in the definition
                        const matchingKey = _.find(definition.fields, (f) => f.name.toLowerCase() === normalizedKey);
                        if (matchingKey && matchingKey.name) {
                            if (matchingKey.type === 'date') {
                                newImport[matchingKey.name] = (new Date(r[ik]).toISOString().substring(0, 10));
                            } else {
                                newImport[matchingKey.name] = r[ik];
                            }
                        }
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
    const handleImportUrlChange = (event) => {
        setImportUrl(event.target.value);
    }
    return (
        <React.Fragment>
            {
                mode ?
                    <CoreForm mode={mode} definition={definition} initialInputRecord={selectedRecord} fbUser={fbUser} onAdded={handleOnAdded} onDeleted={handleOnDeleted} onUpdated={handleOnUpdated} onCancelled={handleOnCancelled}></CoreForm> :
                    <CoreList definition={definition} fbUser={fbUser} records={records} onAdd={handleOnAdd} onDelete={handleOnDelete} onUpdate={handleOnUpdate} onImport={handleOnImport} importMessage={importMessage} onImportUrlChange={handleImportUrlChange} onDetails={handleOnDetails}></CoreList>
            }

        </React.Fragment >
    )
}

function normalizeDefinition(definition) {
    if (definition.processed) return definition;
    definition.name = definition.name[0].toUpperCase() + definition.name.toLowerCase().substring(1);
    definition.pluralName = pluralize(definition.name);
    if (definition.sqlFields) {
        if (!definition.fields) definition.fields = [];
        const fields = definition.sqlFields.split('\n');
        fields.forEach(sf => {
            const fieldParts = sf.replace(/ /g, '').split('\t');
            const name = fieldParts[0][0].toLowerCase() + fieldParts[0].substring(1);
            const label = fieldParts[0];
            let type = '';
            if (fieldParts[1].includes('char')) {
                type = 'text';
            } else if (fieldParts[1].includes('bit')) {
                type = 'checkbox';
            } else if (fieldParts[1].includes('datetime')) {
                type = 'date';
            } else if (fieldParts[1].includes('int')) {
                type = 'number';
            } else if (fieldParts[1].includes('money')) {
                type = 'number';
            } else if (fieldParts[1].includes('decimal')) {
                type = 'number';
            }

            const existingDefinitionRecord = _.find(definition.fields, (f) => f.name === fieldParts[0]);
            if (existingDefinitionRecord) {
                existingDefinitionRecord.label = label;
                existingDefinitionRecord.type = type;
                existingDefinitionRecord.name = name;
            } else {
                definition.fields.push({
                    name,
                    label,
                    type
                })
            }

        });
    }

    definition.fields = definition.fields.map(f => {
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

    if (!definition.fields.some(s => s.summary)) {
        definition.fields[0].summary = 1;
    }
    if (!definition.fields.some(s => s.autofocus)) {
        definition.fields[0].autofocus = true;
    }
    definition.processed = true;
    return definition;
}

export { normalizeDefinition, RecordsManager as default };