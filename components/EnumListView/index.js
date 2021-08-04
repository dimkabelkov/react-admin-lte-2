import React from 'react';
import PropTypes from 'prop-types';

class EnumListView extends React.Component {
    render() {
        let value = _.find(this.props.variants, {
            value: this.props.value
        });

        if (!value) {
            return 'Не указано';
        }

        return value.class ? <span className={'label label-' + value.class}>{ value.label }</span> : <span>{ value.label }</span>;
    }
}

EnumListView.propTypes = {
    variants: PropTypes.array,
    value: PropTypes.string,
};

export default EnumListView
