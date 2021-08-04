import React from 'react';
import PropTypes from 'prop-types';

import AlertTitle from '../AlertTitle';

import './style.scss';

class Box extends React.Component {
    render() {
        return (
            <div className='box box-primary'>
                <div className={'box-header' + (this.props.withOutBorder ? ' with-border' : '' )}>
                    <h3 className='box-title'>{ this.props.title }</h3>
                </div>
                { this.props.topAction
                    ? <div className={'box-header' + (this.props.withOutBorder ? ' with-border' : '' )}>
                        { this.props.topAction }
                    </div>
                    : null
                }
                <AlertTitle key={'alert'} showAlert={this.props.showAlert} alertText={this.props.alertText} />
                <div className={'box-body' + (this.props.noPadding ? ' no-padding' : '' )} style={this.props.bodyStyles}>
                    { this.props.children }
                </div>
                { !_.isEmpty(this.props.footer)
                    ? <div className='box-footer'>
                        { this.props.footer }
                    </div>
                    : null
                }
            </div>
        );
    }
}

Box.propTypes = {
    topAction: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    title: PropTypes.string,
    alertText: PropTypes.string,
    showAlert: PropTypes.bool,
    noPadding: PropTypes.bool,
    withOutBorder: PropTypes.bool,
    footer: PropTypes.node,
    bodyStyles: PropTypes.object,
};

Box.defaultProps = {
    topAction: null,
    noPadding: false,
    showAlert: false,
    withOutBorder: true,
    alertText: '',
    bodyStyles: {}
};

export default Box;
