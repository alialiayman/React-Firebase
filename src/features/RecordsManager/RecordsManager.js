import React, { useState, useEffect } from 'react';
import CoreForm from './components/CoreForm';
import CoreList from './components/CoreList';
import pluralize from 'pluralize'
import firebaseService from '../../services/firebaseService';
import _ from 'lodash';
import { useSelector } from 'react-redux';


const RecordsManager = ({ model, initialMode, onModelChange , onRecordAdded, onRecordDeleted, onRecordUpated}) => {
    const [state, setState] = useState({
        importMessage: '',
        importUrl: '',
        records: [],
        selectedRecord: {},
        mode: initialMode,
    });
    model = touchModel(model);
    const fbUser = useSelector((state) => state.user);
    const svc = firebaseService(model.name.toLowerCase());
    const emptyRecord = establishEmptyRecord(model);

    useEffect(() => {
        async function getRecords() {
            if (canLoadRecords(state, model, fbUser)) {
                const result = await svc.getRecords(fbUser);
                if (result && result.data) {
                    const objectKeys = Object.keys(result.data);
                    const mappedRecords = objectKeys.map(k => { return { ...result.data[k], firebaseId: k } });
                    setState({ ...state, records: mappedRecords });
                }
            }
        }
        getRecords();
    }, [fbUser, svc, state, model, emptyRecord]);

    if (!model){
        return null;
    }
    const handleOnAdded = (newRecord) => {
        setState({ ...state, mode: 0, records: [...state.records, newRecord] });
        onRecordAdded(newRecord);
    };
    const handleOnUpdated = (updatedRecord) => {
        const updatedRecords = state.records.map(c => c.firebaseId === updatedRecord.firebaseId ? updatedRecord : c);
        setState({ ...state, mode: 0, records: updatedRecords });
        onRecordUpated(updatedRecord);
    };
    const handleOnDeleted = (deletedRecord) => {
        const remainingRecords = state.records.filter(x => x.firebaseId !== deletedRecord.firebaseId);
        setState({ ...state, mode: 0, records: remainingRecords });
        onRecordDeleted(deletedRecord);
    };
    const handleOnCancelled = () => {
        setState({ ...state, mode: 0 });
    };
    const handleOnAdd = () => {
        setState({ ...state, mode: 1, selectedRecord: emptyRecord });
    };
    const handleOnDelete = (deleteRecord) => {
        setState({ ...state, mode: 2, selectedRecord: deleteRecord });
    };
    const handleOnUpdate = (updateRecord) => {
        setState({ ...state, mode: 3, selectedRecord: updateRecord });
    };
    const handleOnDetails = (rowdata) => {
        setState({...state, records:[]})
        onModelChange(rowdata.firebaseId);
    }

    const handleOnImport = async () => {
        try {
            if (!state.importUrl) {
                return setState({ ...state, importMessage: 'Please enter import url...' });
            }
            const importRecords = await (await svc.importFrom(state.importUrl)).data;
            setState({ ...state, importMessage: `Found ${importRecords.length} ${model.name} records. Importing...` });
            importRecords.forEach(r => {
                setTimeout(() => {
                    const newImport = {};
                    const importedKeys = Object.keys(r);
                    importedKeys.forEach(ik => {
                        const normalizedKey = ik.replace('_', '').toLowerCase();
                        //Find this normalizedKey in the definition
                        const matchingKey = _.find(model.fields, (f) => f.name.toLowerCase() === normalizedKey);
                        if (matchingKey && matchingKey.name) {
                            if (matchingKey.type === 'date') {
                                newImport[matchingKey.name] = (new Date(r[ik]).toISOString().substring(0, 10));
                            } else {
                                newImport[matchingKey.name] = r[ik];
                            }
                        }
                    })
                    svc.createRecord(fbUser, newImport);
                    setState({ ...state, importMessage: `Importing ${model.name} record# ${newImport[model.fields[0].name]}`, records: [...state.records, newImport] });
                }, 2000)
            });
        } catch (err) {
            setState({ ...state, importMessage: err.message });
        }
    };
    const handleImportUrlChange = (event) => {
        setState({ ...state, importUrl: event.target.value });
    }
    return (
        <React.Fragment>
            {
                state.mode ?
                    <CoreForm 
                    mode={state.mode} 
                    model={model} 
                    initialInputRecord={state.selectedRecord} 
                    onAdded={handleOnAdded} 
                    onDeleted={handleOnDeleted} 
                    onUpdated={handleOnUpdated} 
                    onCancelled={handleOnCancelled}
                    /> :
                    <CoreList 
                    model={model}  
                    records={state.records} 
                    onAdd={handleOnAdd} 
                    onDelete={handleOnDelete} 
                    onUpdate={handleOnUpdate} 
                    onImport={handleOnImport} 
                    importMessage={state.importMessage} 
                    onImportUrlChange={handleImportUrlChange} 
                    onModelChange={handleOnDetails}
                    />
            }
        </React.Fragment >
    )
}

function establishEmptyRecord(model) {
    const output = {};
    if (model && model.fields) {
        model.fields.forEach(element => {
            output[element.name] = element.defaultValue;
        });
    }
    return output;
}

function touchModel(model) {
    if (!model || !model.name || !model.fields) return null;
    if (model.processed) return model;
    model.name = model.name[0].toUpperCase() + model.name.toLowerCase().substring(1);
    model.pluralName = pluralize(model.name);
    if (model.sqlFields) {
        if (!model.fields) model.fields = [];
        const fields = model.sqlFields.split('\n');
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

            const existingDefinitionRecord = _.find(model.fields, (f) => f.name === fieldParts[0]);
            if (existingDefinitionRecord) {
                existingDefinitionRecord.label = label;
                existingDefinitionRecord.type = type;
                existingDefinitionRecord.name = name;
            } else {
                model.fields.push({
                    name,
                    label,
                    type
                })
            }

        });
    }

    // reassure all fields have type, label, summary, default value and readonly flag
    model.fields = model.fields.map(f => {
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

    // reassure least one summary column
    if (!model.fields.some(s => s.summary)) {
        model.fields[0].summary = 1;
    }
    // reassure least one autofocus column
    if (!model.fields.some(s => s.autoFocus)) {
        model.fields[0].autoFocus = true;
    }

    model.processed = true;
    return model;
}

function canLoadRecords(state, model, fbUser){
    return (state.records.length ===0  &&  (!state.mode || state.mode === 0) && fbUser && model && model.fields)
}

export { touchModel, RecordsManager as default };