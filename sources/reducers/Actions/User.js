import EncryptedStorage from 'react-native-encrypted-storage';
import {setUserLoggedOut, setRefreshToken} from './Auth';
import {
    apiGetRequest,
    apiGetRequestNoAuth,
    apiPatchRequest,
    apiPostRequest,
} from './ApiRequest.js';
import {GET_SUBREDDIT_DATA} from './Posts';

export const GET_USER_INFOS = 'GET_USER_INFOS';
export const GET_USER_SETTINGS = 'GET_USER_SETTINGS';
export const GET_USER_MESSAGES = 'GET_USER_MESSAGES';
export const GET_USER_SPECIFIC_DATA = 'GET_USER_SPECIFIC_DATA';

export const getUserInfos = () => {
    return async dispatch => {
        const accessToken = await EncryptedStorage.getItem('accessToken');

        if (accessToken === null || accessToken === undefined) {
            console.log('No user found');
            return dispatch(setUserLoggedOut());
        }
        dispatch(setRefreshToken());
        try {
            const response = await apiGetRequest(
                accessToken,
                'https://oauth.reddit.com/api/v1/me.json',
            );
            const json = await response.json();

            if (!json.error) {
                dispatch({
                    type: GET_USER_INFOS,
                    payload: json,
                });
            } else {
                console.log('Error while fetching');
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getUserSettings = () => {
    return async dispatch => {
        const accessToken = await EncryptedStorage.getItem('accessToken');

        if (accessToken === null || accessToken === undefined) {
            console.log('No user found');
            return dispatch(setUserLoggedOut());
        }
        dispatch(setRefreshToken());
        try {
            const response = await apiGetRequest(
                accessToken,
                'https://oauth.reddit.com/api/v1/me/prefs.json',
            );
            const json = await response.json();

            if (!json.error) {
                dispatch({
                    type: GET_USER_SETTINGS,
                    payload: json,
                });
            } else {
                console.log('Error while fetching');
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const setUserSettings = (keyParam, valueParam) => {
    const data = {[keyParam]: valueParam};

    return async dispatch => {
        const accessToken = await EncryptedStorage.getItem('accessToken');

        if (accessToken === null || accessToken === undefined) {
            console.log('No user found');
            return dispatch(setUserLoggedOut());
        }
        dispatch(setRefreshToken());
        try {
            const response = await apiPatchRequest(
                accessToken,
                'https://oauth.reddit.com/api/v1/me/prefs.json',
                data,
            );
            const json = await response.json();
            if (!json.error) {
                dispatch(getUserSettings());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getUserMessages = (before, after, count, limit) => {
    return async dispatch => {
        const accessToken = await EncryptedStorage.getItem('accessToken');

        if (accessToken === null || accessToken === undefined) {
            console.log('No user found');
            return dispatch(setUserLoggedOut());
        }
        dispatch(setRefreshToken());
        try {
            const url = `https://oauth.reddit.com/message/inbox.json?before=${before}&after=${after}&count=${count}&limit=${limit}`;
            const response = await apiGetRequest(accessToken, url);
            const json = await response.json();

            if (!json.error) {
                dispatch({
                    type: GET_USER_MESSAGES,
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

export const getUserSpecificData = (dataname, username, after) => {
    return async dispatch => {
        const accessToken = await EncryptedStorage.getItem('accessToken');

        if (accessToken === null || accessToken === undefined) {
            console.log('No user found');
            return dispatch(setUserLoggedOut());
        }
        dispatch(setRefreshToken());
        try {
            const url = `https://oauth.reddit.com/user/${username}/${dataname}?count=0&limit=10&after=${after}`;
            const response = await apiGetRequest(accessToken, url);
            const json = await response.json();

            if (!json.error) {
                dispatch({
                    type: GET_USER_SPECIFIC_DATA,
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

export const getUserTrophies = after => {
    return async dispatch => {
        const accessToken = await EncryptedStorage.getItem('accessToken');

        if (accessToken === null || accessToken === undefined) {
            console.log('No user found');
            return dispatch(setUserLoggedOut());
        }
        dispatch(setRefreshToken());
        try {
            const url = `https://oauth.reddit.com/api/v1/me/trophies?after=${after}`;
            const response = await apiGetRequest(accessToken, url);
            const json = await response.json();

            if (!json.error) {
                dispatch({
                    type: GET_USER_SPECIFIC_DATA,
                    payload: json.data.trophies,
                });
            } else {
                console.log('Error while fetching');
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getUserSubreddit = after => {
    return async dispatch => {
        const accessToken = await EncryptedStorage.getItem('accessToken');

        if (accessToken === null || accessToken === undefined) {
            console.log('No user found');
            return dispatch(setUserLoggedOut());
        }
        dispatch(setRefreshToken());
        try {
            const url = `https://oauth.reddit.com/subreddits/mine/subscriber?limit=10&count=0&after=${after}`;
            const response = await apiGetRequest(accessToken, url);
            const json = await response.json();

            if (!json.error) {
                dispatch({
                    type: GET_USER_SPECIFIC_DATA,
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

export const setUserSubscribe = params => {
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
                'https://oauth.reddit.com/api/subscribe' + params,
            );
            const json = await response.json();
        } catch (error) {
            console.log(error);
        }
    };
};

export const userSearchQuery = (query, after) => {
    return async dispatch => {
        const accessToken = await EncryptedStorage.getItem('accessToken');
        let url = '';
        let response = '';
        try {
            if (accessToken === null || accessToken === undefined) {
                console.log('No user found');
                url = `https://www.reddit.com/subreddits/search.json?q=${query}&after=${after}&limit=10`;

                response = await apiGetRequestNoAuth(url);
                dispatch(setUserLoggedOut());
            } else {
                dispatch(setRefreshToken());
                url = `https://oauth.reddit.com/subreddits/search.json?q=${query}&after=${after}&limit=10`;
                response = await apiGetRequest(accessToken, url);
            }
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
