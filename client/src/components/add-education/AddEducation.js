import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import TextFieldGroup from '../commons/TextFieldGroup';
import TextAreaFieldGroup from '../commons/TextAreaFieldGroup';
import {addEducation} from '../../actions/profileAction';

class AddEducation extends React.Component {
    state = {
        school: '',
        degree: '',
        fieldOfStudy: '',
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

        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldOfStudy: this.state.fieldOfStudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };


        this.props.addEducation(eduData, this.props.history);

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
            <div className='section add-education'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                            <Link to='/dashboard' className='btn btn-light'>
                                Go Back
                            </Link>
                            <h1 className='display-4 text-center'>Add Your Education</h1>
                            <p className='lead text-center'>
                                Add any school, bootcamp, etc that you have attended
                            </p>
                            <small className='d-block pb-3'>* = required field</small>
                            <form noValidate onSubmit={this.onSubmit}>

                                <TextFieldGroup name='school' placeholder='* School' value={this.state.school}
                                                onChange={this.onChange} error={errors.school}/>

                                <TextFieldGroup name='degree' placeholder='* Degree or Certification'
                                                value={this.state.degree}
                                                onChange={this.onChange} error={errors.degree}/>

                                <TextFieldGroup name='fieldOfStudy' placeholder='* Field of Study'
                                                value={this.state.fieldOfStudy}
                                                onChange={this.onChange} error={errors.fieldOfStudy}/>

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
                                        Still studying
                                    </label>
                                </div>
                                <TextAreaFieldGroup info='Tell us about the program that you were in'
                                                    placeholder='Program Description' name='description'
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

AddEducation.propsTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));