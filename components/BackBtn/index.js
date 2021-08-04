import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Button from '@material-ui/core/Button';

import * as actionsCore from '../../actions/core';

import './style.scss';

class BackBtn extends Component {
    constructor(props) {
        super(props);
    }

    goBack() {
        if (this.props.useHistory && this.props.history && this.props.history.location.state && this.props.history.location.state.link.indexOf('/add') <= -1) {
            this.props.goBack(this.props.history.location.state);
        } else {
            this.props.setLink(this.props.href);
        }
    }

    render() {
        return <Button variant={this.props.variant} color={this.props.color} size={this.props.size} onClick={() => {
            this.goBack();
        }}>Назад</Button>
    }
}

BackBtn.propTypes = {
    href: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    useHistory: PropTypes.bool,
};

BackBtn.defaultProps = {
    href: '#',
    variant: 'contained',
    color: 'primary',
    size: 'small',
    useHistory: true,
};

const mapStateToProps = () => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLink: bindActionCreators(actionsCore.setLink, dispatch),
        goBack: bindActionCreators(actionsCore.goBack, dispatch),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BackBtn));
