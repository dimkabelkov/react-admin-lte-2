import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    Router,
} from 'react-router-dom';

import {
    Route,
    Redirect,
    Switch
} from 'react-router';

import { SnackbarProvider } from 'notistack';

import {createBrowserHistory} from 'history';

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import {ThemeProvider} from '@material-ui/styles';

import * as actionsCore from '../actions/core';
import * as actionsAuth from '../actions/auth';

import AuthEmailPage from '../pages/Auth/EmailPage';
import AuthExitPage from '../pages/Auth/ExitPage';

import NotFoundPage from '../pages/NotFoundPage';
import LoadingPage from '../pages/LoadingPage';
import WorkArea from '../components/WorkArea';

import * as pageRouter from '../constants/page-routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/scss/font-awesome.scss';
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/skin-blue.min.css';

import './style.scss';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
        fontFamily: [
            '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif'
        ].join(','),

        fontSize: 14,
        htmlFontSize: 12
    },
    palette: {
        primary: {
            main: '#367fa9'
        },
        text: {
            disabled: '#000000'
        }
    }
});

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth,
        link: state.historyReducer.link,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authCheck: bindActionCreators(actionsAuth.authCheckAction, dispatch),
        setLink: bindActionCreators(actionsCore.setLink, dispatch),
        errorTabsClear: bindActionCreators(actionsCore.errorTabsClear, dispatch),
    }
};

export class PrivateRoute extends React.Component {
    render() {
        return this.props.auth
            ? <Route
                exact={this.props.exact}
                path={this.props.path}
                component={this.props.component}
            />
            : <Redirect to={{
                pathname: pageRouter.auth.auth
            }} />;
    };
}

PrivateRoute.propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.string,
    component: PropTypes.func
};

PrivateRoute.defaultProps = {
    exact: false
};

PrivateRoute = (connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));

class PublicRoute extends React.Component {
    render() {
        return this.props.auth
            ? <Redirect to={{
                pathname: pageRouter.auth.main,
            }} />
            : <Route
                exact={this.props.exact}
                path={this.props.path}
                component={this.props.component}
            />;
    };
}

PublicRoute.propTypes = {
    exact: PropTypes.bool,
    path: PropTypes.string,
    component: PropTypes.func
};

PublicRoute.defaultProps = {
    exact: false
};

PublicRoute = (connect(mapStateToProps, mapDispatchToProps)(PublicRoute));

class Routing extends React.Component {

    constructor(props) {
        super(props);

        this.history = createBrowserHistory();
    }

    componentDidMount() {
        this.props.authCheck().then().catch();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.link !== this.props.link) {
            this.history.push(nextProps.link);
        }

        return nextProps.link !== this.props.link || nextProps.auth !== this.props.auth;
    }

    componentDidUpdate() {
        this.props.errorTabsClear();
    }

    render() {
        return <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} autoHideDuration={2500}>
            <ThemeProvider theme={theme}>
                <div id={'app__layout'}>
                    <WorkArea footerText={this.props.footerText} statusBarResolver={this.props.statusBarResolver} sideBarResolver={this.props.sideBarResolver} show={!!this.props.auth} menu={this.props.menu}>
                        { !_.isNull(this.props.auth)
                            ? <Router history={this.history}>
                                <Switch>
                                    { this.props.privateRoutes.map(privateRoute => {
                                        return <PrivateRoute
                                            key={privateRoute.path}
                                            exact={privateRoute.exact}
                                            path={privateRoute.path}
                                            component={(props) => {
                                                return privateRoute.component(props);
                                            }}
                                        />
                                    }) }
                                    <PrivateRoute
                                        path={pageRouter.auth.exit}
                                        component={() => {
                                            return <AuthExitPage />
                                        }}
                                    />
                                    <PublicRoute
                                        path={pageRouter.auth.auth}
                                        component={() => {
                                            return <AuthEmailPage />
                                        }}
                                    />
                                    <PrivateRoute component={() => {
                                        return <NotFoundPage />
                                    }} />
                                </Switch>
                            </Router>
                            : <LoadingPage />
                        }
                    </WorkArea>
                </div>
            </ThemeProvider>
        </SnackbarProvider>
    }
}

Routing.propTypes = {
    statusBarResolver: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    menu: PropTypes.array,
    privateRoutes: PropTypes.array,
    footerText: PropTypes.string,
    sideBarResolver: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

Routing.defaultProps = {
    statusBarResolver: false,
    menu: [],
    privateRoutes: [],
    footerText: '',
    sideBarResolver: false,
};

export default (connect(mapStateToProps, mapDispatchToProps)(Routing))
