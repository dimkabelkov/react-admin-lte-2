import React from 'react';
import {connect} from 'react-redux';

import WorkArea from '../../components/WorkArea';

import './style.scss';

class NotFound extends React.Component {
    render() {
        return (
            <WorkArea>404</WorkArea>
        );
    }
}

const mapStateToProps = () => {
    return {
    }
};

const mapDispatchToProps = () => {
    return {
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(NotFound))
