// tab

export function errorTabAdd(tab, error) {
    return {
        type: 'ERROR_TAB_ADD',
        tab,
        error
    };
}

export function errorTabsClear() {
    return {
        type: 'ERROR_TABS_CLEAR'
    };
}

export function addAlert(message, view = null) {
    return {
        type: 'ADD_ALERT',
        message,
        view
    };
}

// title

export function setTitle(title, subTitle = '') {
    return {
        type: 'SET_TITLE',
        title, subTitle
    };
}

// link

export function setLink(link) {
    return {
        type: 'SET_LINK',
        link
    };
}


// back

export function goBack(previousState) {
    return {
        type: 'GO_BACK',
        previousState
    };
}