import React from 'react';
import PropTypes from 'prop-types';
import {KeyboardDatePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import DateTimeFnsUtils from '@date-io/date-fns';

class DoubleDatePicker extends React.Component {
    constructor(props) {
        super(props);
    }

    getControl(prefix) {
        if (typeof prefix !== 'string' && prefix !== 'from' && prefix !== 'to') prefix = 'from';

        if (this.props.timeEnabled) {
            return <MuiPickersUtilsProvider utils={DateTimeFnsUtils}>
                <KeyboardDateTimePicker
                    fullWidth
                    autoOk={true}
                    label={(prefix === 'from') ? this.props.labelFrom : this.props.labelTo}
                    id={this.props.id + '-' + prefix}
                    disabled={this.props.disabled}
                    openTo={'date'}
                    ampm={false}
                    hideTabs={false}
                    value={(prefix === 'from') ? this.props.valueFrom : this.props.valueTo}
                    onChange={(value) => {
                        if ((prefix === 'from') && typeof this.props.onChangeCallbackFrom === 'function') {
                            this.props.onChangeCallbackFrom(value);
                        } else if ((prefix === 'to') && typeof this.props.onChangeCallbackTo === 'function') {
                            this.props.onChangeCallbackTo(value);
                        }
                    }}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    format={this.props.format + ' ' + this.props.timeFormat}
                    variant={this.props.variant}
                />
            </MuiPickersUtilsProvider>
        } else {
            return <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    fullWidth
                    autoOk={true}
                    label={(prefix === 'from') ? this.props.labelFrom : this.props.labelTo}
                    id={this.props.id + '-' + prefix}
                    disabled={this.props.disabled}
                    openTo={'date'}
                    hideTabs={false}
                    value={(prefix === 'from') ? this.props.valueFrom : this.props.valueTo}
                    onChange={(value) => {
                        if ((prefix === 'from') && typeof this.props.onChangeCallbackFrom === 'function') {
                            this.props.onChangeCallbackFrom(value);
                        } else if ((prefix === 'to') && typeof this.props.onChangeCallbackTo === 'function') {
                            this.props.onChangeCallbackTo(value);
                        }
                    }}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    format={this.props.format}
                    variant={this.props.variant}
                />
            </MuiPickersUtilsProvider>
        }
    }

    render() {
        return (
            <Grid key={this.props.id + '-dates'} xs={12} md={12} lg={12} item>
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

DoubleDatePicker.propTypes = {
    labelFrom: PropTypes.string,
    labelTo: PropTypes.string,
    id: PropTypes.string,
    disabled: PropTypes.bool,
    valueFrom: PropTypes.string,
    valueTo: PropTypes.string,
    format: PropTypes.string,
    timeFormat: PropTypes.string,
    variant: PropTypes.string,
    onChangeCallbackFrom: PropTypes.func,
    onChangeCallbackTo: PropTypes.func,
    timeEnabled: PropTypes.bool,
};

DoubleDatePicker.defaultProps = {
    labelFrom: 'C',
    labelTo: 'По',
    id: 'date',
    disabled: false,
    valueFrom: null,
    valueTo: null,
    format: 'dd.MM.yyyy',
    timeFormat: 'HH:mm:ss',
    variant: 'inline',
    timeEnabled: false,
};

export default DoubleDatePicker;
