import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import dataReducer from './DataReducers';
import authReducer from './AuthReducers';

const rootReducer = combineReducers({dataReducer, authReducer});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
