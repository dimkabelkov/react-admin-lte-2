import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import './style.scss';

class GeneralTab extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(e) {
        e.preventDefault();

        if (typeof this.props.onClickCallback === 'function') {
            this.props.onClickCallback(this.props.tabIndex);
        }
    }

    render() {
        let hasError = this.props.tabs.indexOf(this.props.tabIndex) !== -1,
            className = this.props.active ? 'active' : ''

        if (hasError) {
            className += ' danger';
        }

        return (
            <li className={className}>
                <a onClick={(e) => {
                    this.onClick(e)
                }} href='#' data-toggle='tab' aria-expanded='false'>{hasError ? <i className='icon fa fa-warning' /> : null} {this.props.title}</a>
            </li>
        );
    }
}

GeneralTab.propTypes = {
    onClickCallback: PropTypes.func,
    tabIndex: PropTypes.number,
    active: PropTypes.bool,
    title: PropTypes.string,
};

GeneralTab.defaultProps = {
    tabIndex: 0,
    active: false,
    title: 'Заголовок',
};

const mapStateToProps = (state) => {
    return {
        tabs: state.infoReducer.tabs,
        updateTabIndex: state.infoReducer.updateTabIndex,
    }
};

export default (connect(mapStateToProps, {})(GeneralTab))
