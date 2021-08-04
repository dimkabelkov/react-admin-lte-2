let defaultState = {
    auth: null,
    ttl: 0
};

const AuthReducer = (state = defaultState, action) => {
    switch  (action.type) {
        case 'AUTH_TTL': {
            if (state.ttl !== -1) {
                state.ttl = state.ttl - 1;
            }

            return {
                ...state
            };
        }
        case 'AUTH_CHECK_FULFILLED': {
            return {
                ...state,
                auth: !!action.payload ? action.payload : false,
                ttl: !!action.payload ? action.payload.ttl : 0,
            };
        }
        case 'AUTH_EMAIL_FULFILLED': {
            return {
                ...state,
                auth: !!action.payload ? action.payload : false,
                ttl: !!action.payload ? action.payload.ttl : 0,
            };
        }
        case 'AUTH_EXIT_FULFILLED': {
            return {
                ...state,
                auth: false
            };
        }
        default: {
            return state;
        }
    }
};

export default AuthReducer;
