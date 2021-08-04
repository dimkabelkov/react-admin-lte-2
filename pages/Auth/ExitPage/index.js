import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';

import LoadingPage from '../../LoadingPage';

import * as actionsAuth from '../../../actions/auth'
import * as pageRouter from '../../../constants/page-routes';

class ExitPage extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.authExit();
    }

    render() {
        return (
            !this.props.auth
                ? <Redirect push to={{
                    pathname: pageRouter.auth.auth
                }} />
                : <LoadingPage />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authExit: bindActionCreators(actionsAuth.authExitAction, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(ExitPage))
