import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import qs from 'qs';

import './style.scss';

export class Suggestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            loading: false,
            options: [],
            values: this.props.multiple ? [] : null,
            showOptions: false,
            selected: this.props.selected,
        };

        this.isMount = true;
    }

    componentWillUnmount() {
        this.isMount = false;
    }

    componentDidMount() {
        let selected = this.state.selected;

        if (selected) {
            this._getOptions(selected);
        }
    }

    onChange(e, values) {
        let selected = [];

        if (_.isArray(values)) {
            values.map(item => {
                selected.push(item.value);
            });
        } else if (values) {
            selected = values.value;
        } else {
            selected = '';
        }

        if (this.isMount) {
            this.setState({
                selected,
                values,
            });
        }

        if (typeof this.props.onChangeCallback === 'function') {
            this.props.onChangeCallback(selected);
        }
    };

    setOpen() {
        if (this.isMount) {
            this.setState({
                open: !this.state.open,
            });
        }
    };

    onTextChange(value) {
        _.debounce(() => {
            this._getOptions(value);
        }, 300);
    };

    onTextFocus() {
        this._getOptions();
    };

    handleKeyDown(evt) {
        switch (evt.key) {
            case 'Home':
                evt.preventDefault();
                if (evt.shiftKey) {
                    evt.target.selectionStart = 0;
                } else {
                    evt.target.setSelectionRange(0,0);
                }
                break;
            case 'End':
                evt.preventDefault();
                const len = evt.target.value.length;
                if (evt.shiftKey) {
                    evt.target.selectionEnd = len;
                } else {
                    evt.target.setSelectionRange(len,len);
                }
                break;
        }
    };

    _getOptions(value){
        if (this.isMount) {
            this.setState({
                loading: true,
            });
        }

        if (typeof value === 'undefined') {
            value = '';
        } else if (_.isArray(value)) {
            value = value.join('|');
        } else {
            value = value.toString();
        }

        let options = [];
        let values = this.state.values;

        if (typeof this.props.selectMethod === 'function') {
            let params = this.props.additionalParams;

            params['query'] = value;

            let paramsString = qs.stringify(params);

            this.props.selectMethod(paramsString).then(response => {
                let res = this._mapOptions(response.value, values);

                if (this.isMount) {
                    this.setState({
                        options: res.options,
                        values: res.values,
                        loading: false,
                    });
                }
            }).catch(() => {
                if (this.isMount) {
                    this.setState({
                        options,
                        values,
                        loading: false,
                    });
                }
            });
        } else if (typeof this.props.options === 'object') {
            let res = this._mapOptions(this.props.options, values);

            if (this.isMount) {
                this.setState({
                    options: res.options,
                    values: res.values,
                    loading: false,
                });
            }
        }
    };

    _mapOptions(items, values) {
        let options = [],
            selected = this.props.selected;

        if (_.isArray(items)) {
            items.map(item => {
                options.push(item);

                if (this.props.multiple) {
                    if (selected.indexOf(item.value) > -1 && !values.find(x => x.value === item.value)) {
                        values.push(item);
                    }
                } else {
                    if (item.value.toString() === selected.toString()) {
                        values = item;
                    }
                }
            });
        }

        return {
            options: options,
            values: values,
        };
    };

    render() {
        let values = this.state.values;

        if (!this.props.selected) {
            values = this.props.multiple ? [] : null;
        }

        return (
            <Autocomplete
                disabled={this.props.disabled}
                open={this.state.open}
                onOpen={() => {
                    this.setOpen();
                }}
                onClose={() => {
                    this.setOpen();
                }}
                size='small'
                noOptionsText={'Ничего не найдено'}
                loadingText={'Поиск...'}
                onChange={(e, values) => {
                    this.onChange(e, values)
                }}
                multiple={this.props.multiple}
                value={values}
                getOptionSelected={(option, value) => option.value === value.value}
                getOptionLabel={option => option.label}
                getOptionDisabled={option => this.props.disabledOptions.length && this.props.disabledOptions.indexOf(option.value.toString()) > -1}
                options={this.state.options}
                loading={this.state.loading}
                renderInput={params => (
                    <TextField
                        {...params}
                        label={this.props.label}
                        error={!!this.props.error}
                        value={values || ''}
                        fullWidth
                        disabled={this.props.disabled}
                        variant='standard'
                        onChange={(e) => (
                            this.onTextChange(e.target.value)
                        )}
                        onKeyDown={(e) => {
                            this.handleKeyDown(e);
                        }}
                        onFocus={() => {
                            this.onTextFocus();
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {this.state.loading ? <CircularProgress color='inherit' size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        );
    }

}

Suggestion.propTypes = {
    options: PropTypes.array,
    onChangeCallback: PropTypes.func,
    selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    label: PropTypes.string,
    disabled: PropTypes.bool,
    selectMethod: PropTypes.func,
    error: PropTypes.bool,
    disabledOptions: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array])),
    multiple: PropTypes.bool,
    additionalParams: PropTypes.object,
};

Suggestion.defaultProps = {
    options: [],
    selected: '',
    label: '',
    disabled: false,
    error: false,
    disabledOptions: [],
    multiple: false,
    additionalParams: {},
};

export default Suggestion;
