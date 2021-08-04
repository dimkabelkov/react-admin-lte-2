let defaultState = {
    title: '',
    subTitle: '',
    breadCrumbs: []
};

const TitleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            let title = action.title;
            let subTitle = action.subTitle;
            let updateIndex = (new Date()).getTime();
            return {
                title,
                subTitle,
                updateIndex
            };
        default:
            return state;
    }
};

export default TitleReducer;