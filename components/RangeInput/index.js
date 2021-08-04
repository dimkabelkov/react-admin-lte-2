import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

class RangeInput extends React.Component {
    constructor(props) {
        super(props);
    }

    getControl = (prefix) => {
        if (typeof prefix !== 'string' && prefix !== 'from' && prefix !== 'to') prefix = 'from';

        return <TextField 
                fullWidth 
                type={'number'}
                label={(prefix === 'from') ? this.props.labelFrom : this.props.labelTo}
                value={(prefix === 'from') ? this.props.valueFrom : this.props.valueTo}
                disabled={this.props.disabled} 
                onChange={e => {
                    let value = e.target.value;

                    if (value) {
                        value = (this.props.withDecimals) ? parseFloat(value) : parseInt(value);
                    }

                    if ((prefix === 'from') && typeof this.props.onChangeCallbackFrom === 'function') {
                        this.props.onChangeCallbackFrom(value);
                    } else if ((prefix === 'to') && typeof this.props.onChangeCallbackTo === 'function') {
                        this.props.onChangeCallbackTo(value);
                    }
                }} />;
    }

    render() {
        return (
            <Grid key={this.props.id + '-range'} xs={12} md={12} lg={12} item>
                <Grid container justify='flex-start' spacing={3} >
                    <Grid key={this.props.id + '-from'} xs={12} md={6} lg={6} item>
                        {this.getControl('from')}
                    </Grid>
                    <Grid key={this.props.id + '-to'} xs={12} md={6} lg={6} item>
                        {this.getControl('to')}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

RangeInput.propTypes = {
    labelFrom: PropTypes.string,
    labelTo: PropTypes.string,
    disabled: PropTypes.bool,
    withDecimals: PropTypes.bool,
    id: PropTypes.string,
    valueFrom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    valueTo: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChangeCallbackFrom: PropTypes.func,
    onChangeCallbackTo: PropTypes.func,
};

RangeInput.defaultProps = {
    labelFrom: 'От',
    labelTo: 'До',
    id: 'number',
    disabled: false,
    withDecimals: false,
    valueFrom: 0,
    valueTo: 1000,
};

export default RangeInput;
