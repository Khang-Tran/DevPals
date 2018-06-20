import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteAccount, getCurrentProfile} from '../../actions/profileAction';
import {Link} from 'react-router-dom';

import Spinner from '../commons/Spinner';
import ProfileAction from './ProfileAction';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends React.Component {
    componentDidMount = () => {
        this.props.getCurrentProfile();
    };

    onDelete = () => {
        this.props.deleteAccount();
    };

    render() {
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner/>;
        }
        else {
            if (Object.keys(profile).length > 0) {
                dashboardContent = <div>
                    <p className='lead text-muted'> Welcome <Link to={`/profiles/${profile.handle}`}>{user.name}</Link>
                    </p>
                    <ProfileAction/>
                    <Experience experience={profile.experience}/>
                    <Education education={profile.education}/>
                    <div style={{marginBottom: '60px'}}>
                        <button onClick={this.onDelete} className='btn btn-danger'>Delete My Account</button>
                    </div>
                </div>;
            }
            else {
                dashboardContent = <div>
                    <p className='lead text-muted'> Welcome {user.name}</p>
                    <p>You have not set up a profile, please add some info</p>
                    <Link to='/create-profile' className='btn btn-lg btn-info'>
                        Create Profile
                    </Link>
                </div>;
            }
        }
        return (
            <div className='dashboard'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h1 className='display-4'>Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});
export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);