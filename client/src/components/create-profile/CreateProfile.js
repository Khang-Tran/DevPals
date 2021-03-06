import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

import TextFieldGroup from '../commons/TextFieldGroup';
import SelectListGroup from '../commons/SelectListGroup';
import TextAreaFieldGroup from '../commons/TextAreaFieldGroup';
import InputGroup from '../commons/InputGroup';

import {createProfile} from '../../actions/profileAction';

class CreateProfile extends React.Component {
    state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubUserName: '',
        bio: '',
        Facebook: '',
        Google: '',
        Linkedin: '',
        errors: {}
    };
    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        // TODO: Refactor this
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubUserName: this.state.githubUserName,
            bio: this.state.bio,
            Facebook: this.state.Facebook,
            Google: this.state.Google,
            Linkedin: this.state.Linkedin
        };

        this.props.createProfile(profileData, this.props.history);
    };

    UNSAFE_componentWillReceiveProps = nextProps => {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    };

    render() {
        const {errors, displaySocialInputs} = this.state;

        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup name='Facebook' placeholder='Facebook Profile URL' icon='fab fab-facebook'
                                value={this.state.Facebook}
                                onChange={this.onChange} error={errors.Facebook}/>

                    <InputGroup name='Linkedin' placeholder='Linkedin Profile URL' icon='fab fab-linkedin'
                                value={this.state.Linkedin}
                                onChange={this.onChange} error={errors.Linkedin}/>

                    <InputGroup name='Google' placeholder='Google Profile URL' icon='fab fab-google'
                                value={this.state.Google}
                                onChange={this.onChange} error={errors.Google}/>
                </div>
            );
        }
        const options = [
            {label: '* Select Professional Status', value: '0'},
            {label: 'Developer', value: 'Developer'},
            {label: 'Junior Developer', value: 'Junior Developer'},
            {label: 'Senior Developer', value: 'Senior Developer'},
            {label: 'Student or Learning', value: 'Student or Learning'},
            {label: 'Instructor', value: 'Instructor or Teacher'},
            {label: 'Intern', value: 'Intern'},
            {label: 'Other', value: 'Other'}
        ];
        return (
            <div className='create-profile'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                            <Link to='/dashboard' className='btn btn-light'>
                                Go Back
                            </Link>
                            <h1 className='display-4 text-center'>Create Your Profile</h1>
                            <p className='lead text-center'>
                                {`Let's get some information to make your profile stand out`}
                            </p>
                            <small className='d-block pb-3'>* = required field</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup name='handle' value={this.state.handle} onChange={this.onChange}
                                                placeholder='* Profile handle' error={errors.handle}
                                                info={`A unique handle for your profile URL. Your
                                                       full name, company name, nickname, etc (This CAN' T be changed later)`}/>

                                <SelectListGroup placeholder='Status' error={errors.status} name='status'
                                                 value={this.state.status} onChange={this.onChange} options={options}
                                                 info='Give us an idea of where you are at in your career'/>

                                <TextFieldGroup name='company' value={this.state.company} onChange={this.onChange}
                                                error={errors.company} placeholder='Company'
                                                info='Could be your own company or one you work for'/>

                                <TextFieldGroup name='website' value={this.state.website} onChange={this.onChange}
                                                error={errors.website} placeholder='Website'
                                                info='Could be your own or a company website'/>

                                <TextFieldGroup name='location' value={this.state.location}
                                                onChange={this.onChange}
                                                error={errors.location} placeholder='Location'
                                                info='City & state suggested (eg. Boston, MA)'/>

                                <TextFieldGroup name='skills' value={this.state.skills}
                                                onChange={this.onChange}
                                                error={errors.skills} placeholder='Skills'
                                                info='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)'/>

                                <TextFieldGroup name='githubUserName' value={this.state.githubUserName}
                                                onChange={this.onChange}
                                                error={errors.githubUserName} placeholder='Github Username'
                                                info='If you want your latest repos and a Github link, include your username'/>

                                <TextAreaFieldGroup name='bio' value={this.state.bio} onChange={this.onChange}
                                                    placeholder='A short bio of yourself' error={errors.bio}
                                                    info='Tell us a little about yourself'/>

                                <div className='mb-3'>
                                    <button type='button' className='btn btn-light'
                                            onClick={() => this.setState(prevState =>
                                                ({displaySocialInputs: !prevState.displaySocialInputs}))}>
                                        Add Social Network Links
                                    </button>
                                    <span className='text-muted'>Optional</span>
                                </div>
                                {socialInputs}
                                <input type='submit' className='btn btn-info btn-block mt-4'/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));