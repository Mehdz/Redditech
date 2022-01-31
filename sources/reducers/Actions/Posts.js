import EncryptedStorage from 'react-native-encrypted-storage';
import {setUserLoggedOut, setRefreshToken} from './Auth.js';
import {apiGetRequestNoAuth, apiPostRequest} from './ApiRequest.js';

export const GET_SUBREDDIT_DATA = 'GET_SUBREDDIT_DATA';
export const RESET_DATA = 'RESET_DATA';
export const SET_SUBREDDIT_FILTER = 'SET_SUBREDDIT_FILTER';
export const SET_VOTE = 'SET_VOTE';

export const getFilteredSubredditData = (filter, before, after, limit) => {
    return async dispatch => {
        const accessToken = await EncryptedStorage.getItem('accessToken');

        let url = '';
        if (
            (accessToken && accessToken) === null ||
            (accessToken && accessToken) === undefined
        ) {
            console.log('No user found');
            url = `https://reddit.com/${filter}.json?before=${before}&after=${after}&limit=${limit}`;
            dispatch(setUserLoggedOut());
        } else {
            url = `https://oauth.reddit.com/${filter}.json?before=${before}&after=${after}&limit=${limit}`;
        }
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: 'bearer ' + accessToken,
                },
            });
            const json = await response.json();
            if (!json.error) {
                dispatch({
                    type: GET_SUBREDDIT_DATA,
                    payload: json.data.children,
                });
            } else {
                console.log('Error while fetching');
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getSubredditPosts = (subreddit, filter, before, after, limit) => {
    return async dispatch => {
        const accessToken = await EncryptedStorage.getItem('accessToken');
        let url = '';
        if (accessToken === null || accessToken === undefined) {
            console.log('No user found');
            url = `https://reddit.com${subreddit}${filter}.json?before=${before}&after=${after}&limit=${limit}&count=0`;
            dispatch(setUserLoggedOut());
        } else {
            dispatch(setRefreshToken());
            url = `https://oauth.reddit.com${subreddit}${filter}.json?before=${before}&after=${after}&limit=${limit}&count=0`;
        }
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: 'bearer ' + accessToken,
                },
            });
            const json = await response.json();
            if (!json.error) {
                dispatch({
                    type: GET_SUBREDDIT_DATA,
                    payload: json.data.children,
                });
            } else {
                console.log('Error while fetching');
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const setSubredditFilter = filter => {
    return dispatch => {
        dispatch({
            type: SET_SUBREDDIT_FILTER,
            payload: filter,
        });
    };
};

export const resetData = () => {
    return dispatch => {
        dispatch({
            type: RESET_DATA,
            payload: [],
        });
    };
};

export const setVote = params => {
    return async dispatch => {
        const accessToken = await EncryptedStorage.getItem('accessToken');

        if (accessToken === null || accessToken === undefined) {
            console.log('No user found');
            return dispatch(setUserLoggedOut());
        }
        dispatch(setRefreshToken());
        try {
            const response = await apiPostRequest(
                accessToken,
                'https://oauth.reddit.com/api/vote' + params,
            );
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.log(error);
        }
    };
};

export const getTrendingSubreddit = () => {
    return async dispatch => {
        const url =
            'https://reddit.com/subreddits/popular.json?limit=5&count=0';
        try {
            const response = await apiGetRequestNoAuth(url);
            const json = await response.json();
            if (!json.error) {
                dispatch({
                    type: GET_SUBREDDIT_DATA,
                    payload: json.data.children,
                });
            } else {
                console.log('Error while fetching');
            }
        } catch (error) {
            console.log(error);
        }
    };
};
