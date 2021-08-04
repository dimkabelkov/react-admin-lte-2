let defaultState = {
    alert: null,
    updateIndex: null,
    updateTabIndex: null,
    tabs: []
};

const InfoReducer = (state = defaultState, action) => {
    let updateIndex = (new Date()).getTime(),
        updateTabIndex = (new Date()).getTime(),
        actionType = action.type;

    switch (actionType) {
        case 'ADD_ALERT': {
            return {
                ...state,
                alert: {
                    message: action.message,
                    variant: action.view ? action.view : null
                },
                updateIndex: updateIndex
            };
        }
        case 'ERROR_TABS_CLEAR': {
            let tabs = [];

            return {
                ...state,

                tabs: tabs,
                updateTabIndex: updateTabIndex
            };
        }
        case 'ERROR_TAB_ADD': {
            let tabs = state.tabs;

            let index = tabs.indexOf(action.tab);

            if (action.error && index === -1) {
                tabs.push(action.tab);
            } else if (!action.error && index !== -1) {
                tabs.splice(index, 1);
            }

            return {
                ...state,

                tabs: tabs,
                updateTabIndex: updateTabIndex
            };
        }
        default:
            return state;
    }
};

export default InfoReducer;
