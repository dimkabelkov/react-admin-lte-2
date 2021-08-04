import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import 'jodit';
import JoditEditor from 'jodit-react';

import * as actionsCore from '../../actions/core';

class RichEditor extends React.Component {
    constructor(props) {
        super(props);

        let self = this;

        self.state = {
            editor: null,
        };

        self.config = {
            toolbarAdaptive: false,
            buttons: 'source,|,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,font,fontsize,paragraph,|,align,undo,redo,\n,selectall,cut,copy,paste,eraser,|,image,video,table,link,|,hr,symbol,fullsize,about',
            readonly: self.props.disabled,
            removeButtons: 'print',
            extraButtons: [],
            hotkeys: {
                redo: 'ctrl+z',
                undo: 'ctrl+y,ctrl+shift+z',
                bold: 'ctrl+b',
                italic: 'ctrl+i',
                removeFormat: 'ctrl+shift+m',
                openSearchDialog: 'ctrl+f',
                openReplaceDialog: 'ctrl+r',
            },
            uploader: {
                insertImageAsBase64URI: false,
                url: '/api/admin/files/upload.json',
                format: 'json',
                defaultHandlerSuccess: function (data) {
                    if (data['files'] && data['files'].length) {
                        for (let i = 0; i < data['files'].length; i += 1) {
                            this.selection.insertImage('/files/' + data['files'][i], null, 300);
                        }

                        for (let i = 0; i < data['messages'].length; i += 1) {
                            self.props.addAlert(data['messages'][i], 'success');
                        }
                    } else {
                        for (let i = 0; i < data['messages'].length; i += 1) {
                            self.props.addAlert(data['messages'][i], 'error');
                        }
                    }
                },
            },
        };

        self.jodit = React.createRef();

        self.isMount = true;
    }

    componentWillUnmount() {
        this.isMount = false;
    }

    onChange(value) {
        if (typeof this.props.onChangeCallback === 'function') {
            this.props.onChangeCallback(value);
        }
    };

    onBlur(value) {
        if (typeof this.props.onChangeCallback === 'function') {
            this.props.onChangeCallback(value);
        }
    };

    render() {
        return(
            <JoditEditor
                editorRef={(jodit) => this.jodit = jodit}
                value={this.props.value}
                config={this.config}
                onBlur={value => this.onBlur(value)} />
        );
    }
}

RichEditor.propTypes = {
    onChangeCallback: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool,
};

RichEditor.defaultProps = {
    disabled: false,
    value: '',
};

const mapStateToProps = () => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: bindActionCreators(actionsCore.addAlert, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RichEditor);
