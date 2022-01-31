export const apiGetRequest = async (accessToken, url) =>
    await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'bearer ' + accessToken,
        },
    });

export const apiPostRequest = async (accessToken, url) =>
    await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + accessToken,
        },
    });

export const apiPatchRequest = async (accessToken, url, data) =>
    await fetch(url, {
        method: 'PATCH',
        headers: {
            Authorization: 'bearer ' + accessToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

export const apiGetRequestNoAuth = async url =>
    await fetch(url, {
        method: 'GET',
    });
