import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmBtn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
        
        this.toggleDialogState = this._toggleDialogState.bind(this);

        this.isMount = true;
    }

    componentWillUnmount() {
        this.isMount = false;
    }
    
    _toggleDialogState() {
        let isOpen = (!this.state.isOpen);

        if (this.isMount) {
            this.setState({ isOpen });
        }
    };

    render() {
        return (
            <React.Fragment>
                {!this.props.likeIcon ? (
                    <Button variant={ this.props.btnVariant } color={ this.props.btnColor } size={ this.props.btnSize } onClick={() => {
                        this.toggleDialogState();
                    }} disabled={ this.props.btnDisabled }>{ this.props.btnLabel }</Button>
                ) : (
                    <a href={'#'} className='btn btn-box-tool' onClick={(event) => {
                        event.preventDefault();

                        this.toggleDialogState();
                    }}><i className={this.props.icon} /></a>
                )}
                <Dialog
                    open={ this.state.isOpen }
                    fullScreen={ this.state.fullScreen }
                    keepMounted
                    onClose={() => {
                        this.toggleDialogState();
                    }}
                    onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                            if (typeof this.props.onClick === 'function')
                                this.props.onClick();

                            this.toggleDialogState();
                        }
                    }}
                    aria-labelledby='alert-dialog-slide-title'
                    aria-describedby='alert-dialog-slide-description'>
                    <DialogTitle>{ this.props.dialogTitle }</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{ this.props.dialogText }</DialogContentText>
                    </DialogContent>
                    {
                        this.props.dialogVariants.length > 1
                            ? <DialogActions>
                                <Button onClick={() => {

                                    if (typeof this.props.onClick === 'function')
                                        this.props.onClick();

                                    this.toggleDialogState();
                                }} color='primary'>
                                    { this.props.dialogVariants[0] }
                                </Button>
                                <Button onClick={() => {
                                    this.toggleDialogState();
                                }} color='secondary'>
                                    { this.props.dialogVariants[1] }
                                </Button>
                            </DialogActions>
                            : <DialogActions>
                                <Button onClick={() => {
                                    this.toggleDialogState();
                                }} color='secondary'>
                                    { this.props.dialogVariants[0] }
                                </Button>
                            </DialogActions>
                    }
                </Dialog>
            </React.Fragment>
        )
    }
}

ConfirmBtn.propTypes = {
    likeIcon: PropTypes.bool,
    icon: PropTypes.string,
    btnLabel: PropTypes.string,
    btnColor: PropTypes.string,
    btnVariant: PropTypes.string,
    btnSize: PropTypes.string,
    btnDisabled: PropTypes.bool,
    dialogTitle: PropTypes.string,
    dialogText: PropTypes.string,
    dialogVariants: PropTypes.arrayOf(PropTypes.string)
};

ConfirmBtn.defaultProps = {
    likeIcon: false,
    btnLabel: 'Удалить',
    btnColor: 'secondary',
    btnVariant: 'contained',
    btnDisabled: false,
    btnSize: 'small',
    dialogTitle: 'Внимание!',
    dialogText: 'Подтвердить действие',
    dialogVariants: ['Да', 'Нет'],
    icon: 'fa fa-trash-o'
};

export default ConfirmBtn;
