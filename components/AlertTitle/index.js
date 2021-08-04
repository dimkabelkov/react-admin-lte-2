import React from 'react';
import PropTypes from 'prop-types';

class AlertTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.showAlert) {
            return <div style={{'margin': 10}} className='alert alert-warning alert-dismissible'>
                <h4><i className='icon fa fa-warning'/> Внимание!</h4>
                { this.props.alertText }
            </div>
        } else {
            return null;
        }
    }
}

AlertTitle.propTypes = {
    alertText: PropTypes.string,
    showAlert: PropTypes.bool
};

AlertTitle.defaultProps = {
    alertText: '',
    showAlert: false
};

export default AlertTitle;