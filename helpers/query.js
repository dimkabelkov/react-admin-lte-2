import qs from 'qs';

export function makeStateParams(objects, parent, types) {
    let query = qs.parse(location.search ? location.search.slice(1) : location.search);

    if (!!query[parent]) {
        let values = query[parent];
        if (_.isObject(values)) {
            _.each(values, (value, key) => {
                if (!!values[key] && !!value) {
                    objects[key] = value;
                }
                if (objects[key] === 'true' || objects[key] === 'false') {
                    objects[key] = objects[key] === 'true';
                }
            });
        }
    }

    return objects;
}

export function withObject(objects, parent) {
    let query = qs.parse(location.search ? location.search.slice(1) : location.search);
    query[parent] = objects;

    query._ = (new Date()).getTime();

    return query;
}
