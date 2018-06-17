import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../commons/TextFieldGroup';
import TextAreaFieldGroup from '../commons/TextAreaFieldGroup';
import {addExperience} from '../../actions/profileAction';

class AddExperience extends React.Component {
    state = {
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    };

    UNSAFE_componentWillReceiveProps = nextProps => {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    };
    onSubmit = e => {
        e.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };


        this.props.addExperience(expData, this.props.history);

    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onCheck = () => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        });
    };

    render() {
        const {errors} = this.state;
        return (
            <div className='section add-experience'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                            <Link to='/dashboard' className='btn btn-light'>
                                Go Back
                            </Link>
                            <h1 className='display-4 text-center'>Add Your Experience</h1>
                            <p className='lead text-center'>
                                Add any developer/programming positions that you have had in the past
                            </p>
                            <small className='d-block pb-3'>* = required field</small>
                            <form noValidate onSubmit={this.onSubmit}>

                                <TextFieldGroup name='title' placeholder='* Job Title' value={this.state.title}
                                                onChange={this.onChange} error={errors.title}/>

                                <TextFieldGroup name='company' placeholder='* Company' value={this.state.company}
                                                onChange={this.onChange} error={errors.company}/>

                                <TextFieldGroup name='location' placeholder='Location' value={this.state.location}
                                                onChange={this.onChange} error={errors.location}/>

                                <h6>From Date</h6>

                                <TextFieldGroup type='date' name='from' value={this.state.from} onChange={this.onChange}
                                                error={errors.from}/>

                                <h6>To Date</h6>
                                <TextFieldGroup type='date' name='to' value={this.state.to} onChange={this.onChange}
                                                error={errors.to} disabled={this.state.disabled ? 'disabled' : ''}/>

                                <div className='form-check mb-4'>
                                    <input className='form-check-input' type='checkbox' name='current'
                                           value={this.state.current} checked={this.state.current}
                                           onChange={this.onCheck}
                                           id='current'/>
                                    <label className='form-check-label' htmlFor='current'>
                                        Current Job
                                    </label>
                                </div>
                                <TextAreaFieldGroup info='Some of your responsibilities, etc'
                                                    placeholder='Job Description' name='description'
                                                    value={this.state.description}
                                                    onChange={this.onChange}/>
                                <input type='submit' className='btn btn-info btn-block mt-4'/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

AddExperience.propsTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, {addExperience})(withRouter(AddExperience));