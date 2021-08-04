import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import qs from 'qs';

import {makeStateParams, withObject} from '../../helpers/query';
import {Select} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

import * as actionsCore from '../../actions/core';

import './style.scss';

class PaginateTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = makeStateParams({
            limit: 25,
            skip: 0
        }, 'paging');

        this.pages = parseInt(this.props.count / this.state.limit) + (this.props.count % this.state.limit ? 1 : 0);

        this.prevPage = null;
        this.currentPage = 0;
        this.nextPage = null;

        if (!_.isNull(this.props.prev)) {
            this.prevPage =  parseInt(this.props.prev / this.state.limit);

            this.currentPage = this.props.prev / this.state.limit + 1;
        }

        if (!_.isNull(this.props.next)) {
            this.nextPage =  parseInt(this.props.next / this.state.limit);

            this.currentPage = this.props.next / this.state.limit - 1;
        }
    }

    componentDidMount() {
        if (this.state.skip > this.props.count) {
            this.props.setLink(this.makeLink(0, this.state.limit));
        }
    }

    makeLink(skip, limit) {
        return this.props.path + '?' + qs.stringify(withObject({
            skip: skip,
            limit: limit,
        }, 'paging'))
    }

    renderPaginate() {

        let left = this.currentPage - 3;
        let right = this.currentPage + 3 + 1;

        if (left < 0) {
            right += left * - 1;
            left = 0;
        }

        if (this.pages - right < 0) {
            left += this.pages - right;
        }

        let pages = [];

        for(let i=left;i<this.currentPage;i++) {
            if (i>=0) {
                pages.push(<li key={i}><a onClick={() => {
                    event.preventDefault();
                    this.props.setLink(this.makeLink(i * this.state.limit, this.state.limit));
                }} href={this.makeLink(i * this.state.limit, this.state.limit)}>{ i + 1 }</a></li>);
            }
        }

        pages.push(<li className={'disabled'} key={this.currentPage}><a onClick={() => {
            event.preventDefault();
            this.props.setLink(this.makeLink(this.currentPage * this.state.limit, this.state.limit));
        }} href={this.makeLink(this.currentPage * this.state.limit, this.state.limit)}>{ this.currentPage + 1 }</a></li>);

        for(let i=this.currentPage+1;i<right;i++) {
            if (i<this.pages) {
                pages.push(<li key={i}><a onClick={() => {
                    event.preventDefault();
                    this.props.setLink(this.makeLink(i * this.state.limit, this.state.limit));
                }} href={this.makeLink(i * this.state.limit, this.state.limit)}>{ i + 1 }</a></li>);
            }
        }

        return pages;
    }

    render() {
        return <div className={'paginate-table'}>
            <div key={'info'} className={'pull-left'}>
                {(this.props.count > 0) ? (<span>c { this.currentPage * this.state.limit + 1 } по { this.currentPage * this.state.limit + this.props.length } &nbsp; <b>из</b> &nbsp; { this.props.count }</span>) : ('')}
            </div>
            {
                this.props.sizes.length > 0
                    ? <Select value={this.state.limit} onChange={(event) => {
                        event.preventDefault();
                        this.props.setLink(this.makeLink(this.state.skip, event.target.value));
                    }}>
                            {
                                this.props.sizes.map((value, key) => {
                                    return <MenuItem key={ key } value={ value }>{ value }</MenuItem>
                                })
                            }
                        </Select>
                    : null
            }
            <ul key={'paginate'} className='pagination pagination-sm no-margin pull-right'>
                { !_.isNull(this.prevPage)
                    ? <li><a onClick={(event) => {
                        event.preventDefault();
                        this.props.setLink(this.makeLink(this.prevPage * this.state.limit, this.state.limit));
                    }} href={this.makeLink(this.prevPage * this.state.limit, this.state.limit)}>«</a></li>
                    : null
                }
                { this.renderPaginate() }
                { !_.isNull(this.nextPage)
                    ? <li><a onClick={() => {
                        event.preventDefault();
                        this.props.setLink(this.makeLink(this.nextPage * this.state.limit, this.state.limit));
                    }} href={this.makeLink(this.nextPage * this.state.limit, this.state.limit)}>»</a></li>
                    : null
                }

            </ul>
        </div>
    }
}

PaginateTable.propTypes = {
    path: PropTypes.string,
    sizes: PropTypes.array,
    prev: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    next: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    count: PropTypes.number,
    length: PropTypes.number
};

PaginateTable.defaultProps = {
    sizes: [10, 25, 50, 100, 250],
};

const mapStateToProps = () => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLink: bindActionCreators(actionsCore.setLink, dispatch),
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(PaginateTable))
