/* eslint-disable indent */
import {SET_USER_LOGGED_IN, SET_USER_LOGGED_OUT} from './Actions/Auth';

const initState = {
    isLogged: undefined,
};

function authReducer(state = initState, action) {
    switch (action.type) {
        case SET_USER_LOGGED_IN:
            return {...state, isLogged: action.payload};
        case SET_USER_LOGGED_OUT:
            return {...state, isLogged: action.payload};
        default:
            return state;
    }
}

export default authReducer;
