import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import './style.scss';

class LoadingPage extends React.Component {
    render() {
        return (
            <div className={'loading-page'}>
                <CircularProgress size={80} thickness={5} />
            </div>
        );
    }
}

export default LoadingPage;
