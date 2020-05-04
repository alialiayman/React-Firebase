const initialState = {
    user: {},
    schemas: []
}
function rootReducer(state = initialState, action){
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.user};
            case 'SET_SCHEMAS':
                return {...state, schemas: action.schemas};
        default:
            return state;
    }
}

export default rootReducer;