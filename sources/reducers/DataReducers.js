/* eslint-disable indent */
import {
    GET_USER_INFOS,
    GET_USER_SETTINGS,
    GET_USER_MESSAGES,
    GET_USER_SPECIFIC_DATA,
} from './Actions/User';
import {
    GET_SUBREDDIT_DATA,
    RESET_DATA,
    SET_SUBREDDIT_FILTER,
} from './Actions/Posts';

const initState = {
    data: {
        userInfos: {},
        userSettings: {},
        userMessages: {},
        subredditData: {},
        subredditFilter: 'hot',
    },
};

function dataReducer(state = initState, action) {
    switch (action.type) {
        case GET_USER_INFOS:
            return {
                ...state,
                data: {...state.data, userInfos: action.payload},
            };
        case GET_USER_SETTINGS:
            return {
                ...state,
                data: {...state.data, userSettings: action.payload},
            };
        case GET_USER_MESSAGES:
            return {
                ...state,
                data: {...state.data, userMessages: action.payload},
            };
        case GET_SUBREDDIT_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    subredditData: state.data.subredditData.concat(
                        action.payload,
                    ),
                },
            };
        case GET_USER_SPECIFIC_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    subredditData: state.data.subredditData.concat(
                        action.payload,
                    ),
                },
            };
        case RESET_DATA:
            return {
                ...state,
                data: {
                    ...state.data,
                    subredditData: action.payload,
                },
            };
        case SET_SUBREDDIT_FILTER:
            return {
                ...state,
                data: {
                    ...state.data,
                    subredditFilter: action.payload,
                },
            };
        default:
            return state;
    }
}

export default dataReducer;
