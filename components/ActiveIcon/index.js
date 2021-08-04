import React from 'react';
import PropTypes from 'prop-types';

class ActiveIcon extends React.Component {
    render() {
        if (this.props.active) {
            return <span key={'active'} className='text-green fa fa-check'/>;
        } else {
            return this.props.showNoActive ? <span key={'no-active'} className='text-red fa fa-close'/> : null
        }
    }
}

ActiveIcon.propTypes = {
    active: PropTypes.bool,
    showNoActive: PropTypes.bool,
};

ActiveIcon.defaultProps = {
    active: false,
    showNoActive: true,
};

export default ActiveIcon;
