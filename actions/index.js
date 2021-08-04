import Es6Promise from 'es6-promise';
import 'isomorphic-fetch';

Es6Promise.polyfill();

export const fetching = (type, url, params = null) => {
    let method = 'GET';
    if (params !== null) {
        method = 'POST';
    }
    let command = url.split(':');
    if (command.length === 2) {
        method = command[0];
        url = command[1];
    }

    let f = params !== null ? fetch(url, {
        credentials: 'same-origin',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
        method: method
    }) : fetch(url, {
        method: method,
        credentials: 'same-origin',
    });

    return {
        type,
        payload:
            f.then(response => {
                if ([200, 401, 403, 404, 406].includes(response.status)) {
                    return response.json();
                } else {

                }
            }).then(json => {
                let {result, error} = json;
                if (error) {
                    let {code, message, data} = error;
                    return Promise.reject({code, message, data});
                } else {
                    return Promise.resolve(result)
                }
            }).catch(e => {
                return Promise.reject({error: e})
            })
    };
};
