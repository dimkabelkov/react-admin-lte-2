let defaultState = {
    link: location.pathname + location.search,
    previousState: null,
    updateIndex: null
};

const HistoryReducer = (state = defaultState, action) => {
    let updateIndex = (new Date()).getTime();
    
    switch (action.type) {
        case 'SET_LINK':
            return {
                link: action.link,
                previousState: state,
                updateIndex
            };
        case 'GO_BACK':
            if (state.previousState) {
                return {
                    ...state.previousState,
                    updateIndex
                };
            } else {
                return {
                    ...action.previousState,
                    updateIndex
                };
            }
        default:
            return state
    }
};

export default HistoryReducer
