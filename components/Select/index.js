import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class CustomSelect extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return [
            <InputLabel key={'label'}>{this.props.label}</InputLabel>,
            <Select
                multiple={this.props.multiple}
                disabled={this.props.disabled}
                key={'select'}
                value={this.props.value}
                onChange={(event) => {
                    if (typeof this.props.onChange === 'function') this.props.onChange(event.target.value);
                }}>
                {
                    this.props.showEmpty && !this.props.multiple
                        ? <MenuItem value=''>
                            <em>{this.props.label}</em>
                        </MenuItem> : ''
                }
                { this.props.variants.map(registrationStatus => {
                return <MenuItem value={registrationStatus.value} key={registrationStatus.value}>{registrationStatus.label}</MenuItem>
                }) }
            </Select>
        ]
    }
}

CustomSelect.propTypes = {
    multiple: PropTypes.bool,
    showEmpty: PropTypes.bool,
    variants: PropTypes.array,
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool
};

CustomSelect.defaultProps = {
    multiple: false,
    showEmpty: true,
    disabled: false
};

export default CustomSelect;
