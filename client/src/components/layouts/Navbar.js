import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {logoutUser} from '../../actions/authAction';
import {clearProfile} from '../../actions/profileAction';

class Navbar extends React.Component {
    onLogout = e => {
        e.preventDefault();
        this.props.clearProfile();
        this.props.logoutUser();
    };

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLink = (
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/feed'>Post Feed</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/dashboard'>Dashboard</Link>
                </li>
                <li className='nav-item'>
                    <a href='#' onClick={this.onLogout} className='nav-link'>
                        <img className='rounded-circle' src={user.avatar} alt={user.name}
                             title={'You must have a Gravatar to display an image'}
                             style={{width: '25px', marginRight: '5px'}}/>
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLink = (
            <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/register'>Sign Up</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/login'>Login</Link>
                </li>
            </ul>
        );
        return (
            <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
                <div className='container'>
                    <Link className='navbar-brand' to='/'>DevPals</Link>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#mobile-nav'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <div className='collapse navbar-collapse' id='mobile-nav'>
                        <ul className='navbar-nav mr-auto'>
                            <li className='nav-item'>
                                <a className='nav-link' href='profiles.html'>
                                    Developers
                                </a>
                            </li>
                        </ul>
                        {isAuthenticated ? authLink : guestLink}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, {logoutUser, clearProfile})(Navbar);