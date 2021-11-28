import { combineReducers } from 'redux';
import Services from './Services';

const reducers = combineReducers({
   ...Services.Reducers
});

export default (state, action) => {
    switch (action.type) {
        case 'USUARIO_LOGOUT':
            state = undefined;
            break;
        default:
            break;
    }
    return reducers(state, action);
}