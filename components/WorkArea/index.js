import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

import {withSnackbar} from 'notistack';

import * as actionsCore from '../../actions/core';
import * as actionsAuth from '../../actions/auth';
import * as pageRouter from '../../constants/page-routes';

import './style.scss';

class WorkArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openMenu: true,
            stub: false,
            openItemMenu: this.getUrlCode(this.props.link),
            activeItemMenu: this.getUrlCode(this.props.link),
        };

        this.menu = this.props.menu;

        this.isMount = true;
        this.ttlInterval = null;
    }

    componentDidMount() {
        this.ttlInterval = setInterval(() => {
            this.props.authTtl();
        }, 1000);
    }

    componentWillUnmount() {
        this.isMount = false;
        clearInterval(this.ttlInterval);
    }

    hasAccessMode(item) {
        if (!item.accessModes || !item.accessModes.length) {
            return true;
        }
        let result = _.intersectionWith(item.accessModes, this.props.auth.accessModes, (a, b) => a === b);
        return result.length > 0;
    }

    renderTtl(ttl) {
        let seconds = ttl % 60;
        let minutes = parseInt(ttl / 60) % 60;
        let hours = parseInt(ttl / 60 / 60) % 24;

        let all = [];

        all.push(hours < 10 ? '0' + hours : hours);
        all.push(minutes < 10 ? '0' + minutes : minutes);
        all.push(seconds < 10 ? '0' + seconds : seconds);

        return all.join(':');
    }

    renderRecursiveMenu(items) {
        let menu = [];

        items.map((item, index) => {

            if (item.items && this.hasAccessMode(item)) {
                let itemCode = this.getUrlCode(item.url),
                    isActive = (this.state.openItemMenu.indexOf(itemCode) > -1);

                menu.push(<li key={index} className={'treeview' + (itemCode && this.state.openItemMenu.indexOf(itemCode) > -1 ? ' menu-open' : '') + (isActive ? ' active' : '')}>
                    <a href={''} onClick={(event) => {
                        if (!event.ctrlKey) {
                            event.preventDefault();
                            this.toggleItemMenu(this.getUrlCode(item.url))
                        }
                    }}>
                        <i className={'fa ' + item.icon} />
                        <span>{ item.title }</span>
                        <span className='pull-right-container'>
                            <i className='fa fa-angle-left pull-right' />
                        </span>
                    </a>
                    <ul className='treeview-menu' style={{display: itemCode && this.state.openItemMenu.indexOf(itemCode) > -1 ? 'block' : (isActive ? 'none' : '')}}>
                        { this.renderRecursiveMenu(item.items) }
                    </ul>
                </li>);
            } else if (this.hasAccessMode(item)) {
                let isActive = ((this.props.link.indexOf(item.url) === 0 && item.url !== '/') || item.url === this.props.link);

                menu.push(<li key={index} className={(isActive ? ' active' : '')}>
                    <a href={item.url} onClick={(event) => {
                        event.preventDefault();
                        this.props.setLink(item.url);
                    }}>
                        <i className={'fa ' + ((isActive && item.icon === 'fa-circle-o') ? 'fa-circle' : item.icon)} />
                        <span>{ item.title }</span>
                    </a>
                </li>);
            }

        });

        return menu;
    }

    getUrlCode(link) {
        let linkArray = link.split('/');

        if (linkArray) {
            return linkArray.join('/');
        }

        return '';
    }

    toggleMenu() {
        let openMenu = this.state.openMenu;

        if (window.innerWidth >= 768) {
            document.body.classList.toggle('sidebar-collapse', openMenu);
        } else {
            document.body.classList.toggle('sidebar-open', openMenu);
        }

        this.setState({
            openMenu: !openMenu
        });
    }

    toggleItemMenu(item) {
        let openItemMenu = item;

        if (item === this.state.openItemMenu) {
            openItemMenu = '';
        } else if (this.state.openItemMenu.indexOf(item) > -1) {
            let itemArray = item.split('/').splice(-1, 1);

            openItemMenu = itemArray.join('/');
        }

        this.setState({
            openItemMenu
        });
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.updateIndex !== this.props.updateIndex && nextProps.updateIndex > 0) {
            this.props.enqueueSnackbar(nextProps.alert.message, {
                variant: (nextProps.alert.variant) ? nextProps.alert.variant : 'default',
            });
        }
        if (nextProps.updateIndex !== this.props.updateIndex && nextProps.updateIndex > 0 && nextProps.alert.stub) {
            if (this.isMount) {
                this.setState({
                    stub: true
                });
            }
            return false;
        }

        return true;
    }

    render() {
        this.version = adminVersion;

        if (!this.props.show) {
            return this.props.children;
        }

        return <div className='wrapper'>
            <header className='main-header'>
                <a href={'#'} className='logo'>
                    <span className='logo-mini'><b>A</b>M</span>
                    <span className='logo-lg'><b>Admin</b>M</span>
                </a>
                <nav className='navbar navbar-static-top'>
                    <a href={'#'} onClick={() => {
                        this.toggleMenu();
                    }}  className='sidebar-toggle' />
                    <div className='navbar-custom-menu'>
                        <ul className='nav navbar-nav'>
                            { !!this.props.auth
                                ? <li>
                                    { this.props.statusBarResolver ? this.props.statusBarResolver(this.props.auth, this.props.ttl) : <a title={ this.props.auth.email } className='dropdown-toggle'>{ this.props.auth.name } ({this.renderTtl(this.props.ttl)})</a> }
                                </li>
                                : null
                            }
                            <li>
                                <a href={'/exit'} onClick={(event) => {
                                    event.preventDefault();
                                    this.props.setLink('/exit');
                                }} data-toggle='control-sidebar'><i className='fa fa-sign-out' /></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <aside className='main-sidebar'>
                <section className='sidebar'>
                    <ul className='sidebar-menu tree' data-widget='tree'>
                        <li className='header'>Навигация</li>
                        { this.renderRecursiveMenu(this.menu) }
                    </ul>
                </section>
            </aside>
            <div className='content-wrapper'>
                <section className='content-header'>
                    <h1>
                        { this.props.title }
                        { this.props.subTitle ? <small>{ this.props.subTitle }</small> : null }
                    </h1>
                </section>
                <section className='content'>
                    { !this.state.stub ? this.props.children : null }
                </section>
            </div>
            <footer className='main-footer'>
                <div className='pull-right hidden-xs'>
                    <b>Version</b> {this.version}
                </div>
                { this.props.footerText }
            </footer>
            { this.props.sideBarResolver
                ? <aside className="control-sidebar control-sidebar-dark control-sidebar-open">{ this.props.sideBarResolver() }</aside>
                : null
            }
        </div>
    }
}

WorkArea.propTypes = {
    statusBarResolver: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    show: PropTypes.bool,
    menu: PropTypes.array,
    footerText: PropTypes.string,
    sideBarResolver: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

WorkArea.defaultProps = {
    statusBarResolver: false,
    show: false,
    menu: [],
    footerText: '',
    sideBarResolver: false,
};

const mapStateToProps = (state) => {
    return {
        auth: state.authReducer.auth,
        ttl: state.authReducer.ttl,

        link: state.historyReducer.link,

        alert: state.infoReducer.alert,
        stub: state.infoReducer.stub,
        updateIndex: state.infoReducer.updateIndex,

        title: state.titleReducer.title,
        subTitle: state.titleReducer.subTitle,
        breadCrumbs: state.titleReducer.breadCrumbs
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setLink: bindActionCreators(actionsCore.setLink, dispatch),
        authTtl: bindActionCreators(actionsAuth.authTtl, dispatch)
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(withSnackbar(WorkArea)))
