import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { firebaseReducer } from 'react-redux-firebase'
import eventsReducer from '../reducers/eventsReducer';
import filtersReducer from '../reducers/filtersReducer';
import authReducer from '../reducers/auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// New Store Creation
export default () => {
    const store = createStore (
        combineReducers({
            events:eventsReducer, //expenses property managed by expensesReducer
            filters:filtersReducer,
            auth: authReducer,
            firebase: firebaseReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        
    );

    return store;
};