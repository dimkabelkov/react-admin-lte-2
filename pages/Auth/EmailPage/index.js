import React from 'react';

import Paper from '@material-ui/core/Paper';

import AuthEmailForm from '../../../forms/Auth/EmailForm';

import './style.scss';

class EmailPage extends React.Component {
    render() {
        return (
            <div className={'auth-email-page'} style={{
                backgroundImage: 'url(/assets/images/bg.jpg)'
            }}>
                <img src={'/assets/images/logo.png'} alt={'Логотип'} />
                <Paper className={'auth-email-page__paper'} elevation={3}>
                    <AuthEmailForm />
                </Paper>
            </div>
        );
    }
}

export default EmailPage
