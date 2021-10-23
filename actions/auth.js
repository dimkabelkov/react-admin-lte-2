import {fetching} from './index';

import * as apiRoutes from '../constants/api-routes';

export function authTtl() {
    return {
        type: 'AUTH_TTL'
    };
}

export function authCheckAction() {
    return fetching('AUTH_CHECK', apiRoutes.auth.check.replace(':api-ns', window.apiNs));
}

export function authEmailAction(email, password) {
    return fetching('AUTH_EMAIL', apiRoutes.auth.email.replace(':api-ns', window.apiNs), {
        form: {
            email,
            password,
        }
    });
}

export function authExitAction() {
    return fetching('AUTH_EXIT', apiRoutes.auth.exit.replace(':api-ns', window.apiNs));
}
