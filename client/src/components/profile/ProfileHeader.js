import React from 'react';

import isEmpty from '../../validations/isEmpty';

class ProfileHeader extends React.Component {
    render() {
        const {profile} = this.props;
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <div className='card card-body bg-info text-white mb-3'>
                        <div className='row'>
                            <div className='col-4 col-md-3 m-auto'>
                                <img className='rounded-circle'
                                     src={profile.user.avatar}
                                     alt=''/>
                            </div>
                        </div>
                        <div className='text-center'>
                            <h1 className='display-4 text-center'>{profile.user.name}</h1>
                            <p className='lead text-center'>{profile.status}{' '} {isEmpty(profile.company) ? null :
                                <span>at {profile.company}</span>}
                            </p>
                            {isEmpty(profile.location) ? null : <p>{profile.location}</p>}

                            {isEmpty(profile.website) ? null :
                                <a className='text-white p-2' href={profile.website} rel='noopener noreferrer'
                                   target='_blank'>
                                    <i className='fas fa-globe fa-2x'/>
                                </a>}

                            {isEmpty(profile.social && profile.social.Google) ? null :

                                <a className='text-white p-2' href={profile.social.Google} rel='noopener noreferrer'
                                   target='_blank'>
                                    <i className='fab fa-google fa-2x'/>
                                </a>}
                            {isEmpty(profile.social && profile.social.Linkedin) ? null :
                                <a className='text-white p-2' href={profile.social.Linkedin}
                                   rel='noopener noreferrer'
                                   target='_blank'>
                                    <i className='fab fa-linkedin fa-2x'/>
                                </a>}
                            {isEmpty(profile.social && profile.social.Facebook) ? null :
                                <a className='text-white p-2' href={profile.social.Facebook}
                                   rel='noopener noreferrer'
                                   target='_blank'>
                                    <i className='fab fa-facebook fa-2x'/>
                                </a>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileHeader;