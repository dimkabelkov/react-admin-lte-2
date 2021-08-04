import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionsCore from 'react-admin-lte-2/actions/core';

class GeneralTabContent extends React.Component {
    constructor(props) {
        super(props);

        this.find = false;
        this.error = false;
    }

    recursiveChild(children) {
        React.Children.map(children, item => {
            if (!_.isNull(item) && typeof item === 'object') {
                if (!!item.props && _.isArray(item.props.children)) {
                    item.props.children.map(children => {
                        this.recursiveChild(children)
                    });
                } else if (!!item.props && !_.isEmpty(item.props.children)) {
                    this.recursiveChild(item.props.children);
                }

                if (item.type.displayName && item.type.displayName.indexOf('TextField')) {
                    this.find = true;

                    if (item.props.error) {
                        this.error = true;
                    }
                }
            }
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.error = false;
        this.find = false;

        this.recursiveChild(nextProps.children);

        if (this.find) {
            this.props.errorTabAdd(this.props.tabIndex, this.error);
        }

        return true;
    }

    render() {
        return (
            <div className={this.props.active ? 'tab_pane active' : 'tab_pane'}>
                { this.props.children }
            </div>
        );
    }
}

GeneralTabContent.propTypes = {
    active: PropTypes.bool,
    tabIndex: PropTypes.number,
};

GeneralTabContent.defaultProps = {
    active: false,
    tabIndex: 0,
};

const mapStateToProps = () => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        errorTabAdd: bindActionCreators(actionsCore.errorTabAdd, dispatch),
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(GeneralTabContent))
