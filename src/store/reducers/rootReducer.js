import _ from 'lodash';

const initialState = {
    user: {},
    tables: []
}
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.user };
        case 'SET_TABLES':
            return { ...state, tables: action.tables };
        case 'DELETE_TABLE':
            const remainingTables = _.filter(state.tables, x => x.firebaseId !== action.table.firebaseId);
            return { ...state, tables: remainingTables };
        case 'ADD_TABLE':
            return { ...state, tables: [...state.tables, action.table] };
        case 'UPDATE_TABLE':
            const tables = _.cloneDeep(state.tables);
            const updateTable = _.find(tables, x => x.firebaseId === action.table.firebaseId);
            updateTable.name = action.table.name;
            return { ...state, tables};
        default:
            return state;
    }
}

export default rootReducer;