import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import * as responsesLogin from '../../../actions/auth';
import * as actionsCore from '../../../actions/core';
import * as pageRouter from '../../../constants/page-routes';

import './style.scss';

class EmailForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            values: {
                email: '',
                password: '',
            },

            errors: {
                email: '',
                password: '',
            },

            send: false
        };
    }

    componentDidMount() {
        let email = this.getFromCookie('last_email');

        if (typeof email === 'string' && email.length > 0) {
            let values = this.state.values;

            values.email = email;

            this.setState({
                values: values
            });
        }
    }

    updateField(field, value) {
        let values = this.state.values;
        let errors = this.state.errors;
        values[field] = value;
        errors[field] = null;
        this.setState({
            values,
            errors
        })
    };

    getFromCookie(field) {
        return Cookies.get(field);
    };

    saveInCookie(field, value) {
        Cookies.set(field, value, { expires: 365, path: '/' });
    };

    emailHandle() {
        this.setState({
            send: true,
        });
        if (this.state.values.email) {
            this.saveInCookie('last_email', this.state.values.email);
        }
        this.props.authEmail(this.state.values.email, this.state.values.password).then(response => {
        }).catch(error => {
            this.setState({
                errors: error.error.data,
                send: false,
            });
        });
    };

    render() {
        return (
            this.props.auth
                ? <Redirect to={{
                    pathname: pageRouter.auth.main
                }} />
                : <div className={'auth-form'} onKeyUp={(e) => {
                    if (e.keyCode === 13) {
                        this.emailHandle();
                    }
                }}>
                    <Typography variant='h6' gutterBottom align={'center'}>
                        Панель управления
                    </Typography>
                    <br />
                    <TextField fullWidth label='E-mail' value={this.state.values.email} error={!!this.state.errors.email} helperText={this.state.errors.email} disabled={this.state.send} autoFocus onChange={(e) => {
                        this.updateField('email', e.target.value)
                    }} />
                    <br />
                    <br />
                    <TextField type={'password'} fullWidth label='Пароль' value={this.state.values.password} error={!!this.state.errors.password} helperText={this.state.errors.password} disabled={this.state.send} autoFocus onChange={(e) => {
                        this.updateField('password', e.target.value)
                    }} />
                    <br />
                    <br />
                    { !!this.state.errors.code ? null : <br /> }
                    <Button variant='contained' disabled={this.state.send} color='primary' size='small' fullWidth onClick={() => {
                        this.emailHandle();
                    }}>{ this.state.send ? <CircularProgress size={23} /> : 'Далее' }</Button>
                </div>
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
        authEmail: bindActionCreators(responsesLogin.authEmailAction, dispatch),
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(EmailForm))
