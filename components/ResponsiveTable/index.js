import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import moment from 'moment'
import qs from 'qs';

import TableSortLabel from '@material-ui/core/TableSortLabel';
import {ArrowDropDown} from '@material-ui/icons';

import {getFormatFileSize} from '../../helpers/formats';
import {makeStateParams, withObject} from '../../helpers/query';

import * as actionsCore from '../../actions/core';

import './style.scss';

class ResponsiveTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: makeStateParams({
                sort: this.props.defaultSort,
                by: this.props.defaultOrder
            }, 'sort'),

            send: false
        };
    }

    renderTree(tree, index) {
        return tree.map((row, indexRow) => {
            let items = [];
            items.push(<tr onClick={(event) => {
                if (event.target.tagName === 'TD' && this.props.onClickRow) {
                    this.props.onClickRow(row);
                }
            }} key={'row_' + indexRow}>
                { this.props.headers.map((header, indexColumn) => {
                    if (!header) {
                        return null
                    }
                    return <td style={_.merge({
                            width: header.width ? header.width : 'initial',
                        }, header.noPadding
                        ? {
                            padding: '0'
                        }
                        : {}
                    )} key={'column_' + indexRow + '_' + indexColumn}>
                        { this.props.tree && this.props.columnTree === header.code
                            ? <span style={{
                                paddingLeft: index * 12
                            }}> </span>
                            : null
                        }
                        { this.props.tree && this.props.columnTree === header.code
                            ? row[this.props.fieldsChildren] && row[this.props.fieldsChildren].length
                                ? <span className='responsive-table__controll--tree'><i className='fa fa-minus-square-o' /></span>
                                : index
                                    ? <span className='responsive-table__controll--empty' />
                                    : null
                            : null
                        }
                        { header.render ? header.render(row[header.code], row) : this.renderType(row[header.code], header) }
                    </td>
                }) }
            </tr>);
            if (this.props.tree && !!row[this.props.fieldsChildren]) {
                let extendTree = this.renderTree(row[this.props.fieldsChildren], index + 1)
                extendTree.map(item => {
                    items.push(item)
                })            }
            return items;
        })
    }

    renderType(value, header) {

        if (!!header.type && header.type === 'date' && value) {
            return moment(value).format('DD.MM.YYYY')
        } else if (!!header.type && header.type === 'datetime' && value) {
            return moment(value).format('DD.MM.YYYY HH:mm:ss')
        } else if (!!header.type && header.type === 'currency' && value) {
            return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0}).format(value)
        } else if (!!header.type && header.type === 'fileSize' && value) {
            return getFormatFileSize(value, 1);
        }
        return value
    }

    render() {
        const divStyle={
            overflowX: 'auto',
        };

        return (
            <div style={divStyle}>
                <table className='table table-hover responsive-table'>
                    <tbody>
                        <tr>
                            { this.props.headers.map((header, index) => {
                                if (!header) {
                                    return null;
                                }
                                return <th key={'column_' + index}>
                                        <TableSortLabel
                                            IconComponent={ArrowDropDown}
                                            active={this.state.values.sort === header.code}
                                            direction={this.state.values.by}
                                            disabled={!(header.isSortable)}
                                            onClick={() => {
                                                if (this.props.path.length > 0) {

                                                    let link = this.props.path + '?' + qs.stringify(withObject({
                                                        sort: header.code,
                                                        by: (this.state.values.by === 'desc') ? 'asc' : 'desc'
                                                    }, 'sort'));

                                                    this.props.setLink(link);
                                                }
                                            }}>
                                        { header.name }
                                    </TableSortLabel>
                                </th>
                            }) }
                        </tr>
                        { this.renderTree(this.props.source, 0) }
                    </tbody>
                </table>
            </div>
        );
    }
}

ResponsiveTable.propTypes = {
    headers: PropTypes.arrayOf(PropTypes.object),
    source: PropTypes.arrayOf(PropTypes.object),
    onClickRow: PropTypes.func,
    tree: PropTypes.bool,
    columnTree: PropTypes.string,
    fieldsChildren: PropTypes.string,
    defaultSort: PropTypes.string,
    defaultOrder: PropTypes.string,
    path: PropTypes.string,
};

ResponsiveTable.defaultProps = {
    tree: true,
    columnTree: 'title',
    fieldsChildren: 'children',
    defaultSort: 'updatedAt',
    defaultOrder: 'desc',
};

const mapStateToProps = () => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLink: bindActionCreators(actionsCore.setLink, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(ResponsiveTable));
