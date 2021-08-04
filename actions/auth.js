import {fetching} from './index';

import * as apiRoutes from '../constants/api-routes';

export function authTtl() {
    return {
        type: 'AUTH_TTL'
    };
}

export function authCheckAction() {
    return fetching('AUTH_CHECK', apiRoutes.auth.check);
}

export function authEmailAction(email, password) {
    return fetching('AUTH_EMAIL', apiRoutes.auth.email, {
        form: {
            email,
            password,
        }
    });
}

export function authExitAction() {
    return fetching('AUTH_EXIT', apiRoutes.auth.exit);
}
