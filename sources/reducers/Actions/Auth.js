import EncryptedStorage from 'react-native-encrypted-storage';
import {authorize, refresh} from 'react-native-app-auth';

export const GET_REFRESHTOKEN = 'GET_REFRESHTOKEN';
export const GET_ACCESSTOKEN = 'GET_ACCESSTOKEN';
export const SET_USER_LOGGED_IN = 'SET_USER_LOGGED_IN';
export const SET_USER_LOGGED_OUT = 'SET_USER_LOGGED_OUT';

const config = {
    redirectUrl: 'com.readit.fr://oauth2redirect/reddit',
    clientId: 'x7Cef-txK_MwARV2_aRGmw',
    clientSecret: '',
    scopes: ['*'],
    additionalParameters: {
        duration: 'permanent',
    },
    serviceConfiguration: {
        authorizationEndpoint:
            'https://www.reddit.com/api/v1/authorize.compact',
        tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    },
    customHeaders: {
        token: {
            Authorization: 'Basic <base64encoded clientID:>',
        },
    },
};

export const setUserLoggedIn = () => {
    return dispatch => {
        dispatch({
            type: SET_USER_LOGGED_IN,
            payload: true,
        });
    };
};

export const setUserLoggedOut = () => {
    return async dispatch => {
        try {
            dispatch({
                type: SET_USER_LOGGED_OUT,
                payload: false,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const setRefreshToken = () => {
    const now = Date.now();

    return async dispatch => {
        const refreshToken = await EncryptedStorage.getItem('refreshToken');
        const duration = await EncryptedStorage.getItem('duration');
        const expirationDate = new Date(duration && duration);

        if (
            (now >= expirationDate && refreshToken) ||
            (duration === undefined && refreshToken)
        ) {
            try {
                const auth = await refresh(config, {
                    refreshToken: refreshToken,
                });
                await EncryptedStorage.setItem('accessToken', auth.accessToken);
                await EncryptedStorage.setItem(
                    'refreshToken',
                    auth.refreshToken,
                );
                await EncryptedStorage.setItem(
                    'duration',
                    auth.accessTokenExpirationDate,
                );

                return dispatch(setUserLoggedIn());
            } catch (error) {
                console.log(error);
                return dispatch(setUserLoggedOut());
            }
        }
    };
};

export const setAccessToken = () => {
    return async dispatch => {
        try {
            const auth = await authorize(config);
            const refreshToken = await EncryptedStorage.getItem('refreshToken');

            if (!auth.error) {
                await EncryptedStorage.setItem('accessToken', auth.accessToken);
                await EncryptedStorage.setItem(
                    'refreshToken',
                    auth.refreshToken,
                );
                await EncryptedStorage.setItem(
                    'duration',
                    auth.accessTokenExpirationDate,
                );

                return dispatch(setUserLoggedIn());
            } else if (refreshToken) {
                dispatch(setRefreshToken());
                dispatch(setUserLoggedIn());
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const clearToken = () => {
    return async () => {
        const accessToken = await EncryptedStorage.getItem('accessToken');

        try {
            if (accessToken) {
                await EncryptedStorage.removeItem('accessToken');
                await EncryptedStorage.removeItem('refreshToken');
                await EncryptedStorage.removeItem('duration');
            }
        } catch (error) {
            console.log(error);
        }
    };
};
