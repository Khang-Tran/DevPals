import React from 'react';
import PropTypes from 'prop-types';
import {registerUser} from '../../actions/authAction';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import TextFieldGroup from '../commons/TextFieldGroup';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
    };

    componentDidMount = () => {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    };

    UNSAFE_componentWillReceiveProps = nextProps => {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    };

    render() {
        const {errors} = this.state;

        return (
            <div className='register'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                            <h1 className='display-4 text-center'>Sign Up</h1>
                            <p className='lead text-center'>Create your DevConnector account</p>
                            <form noValidate={true} onSubmit={this.onSubmit}>

                                <TextFieldGroup error={errors.name} placeholder={'Name'} name={'name'}
                                                value={this.state.name} onChange={this.onChange}/>

                                <TextFieldGroup error={errors.email} placeholder={'Email Address'} name={'email'}
                                                value={this.state.email} type={'text'} onChange={this.onChange}
                                                info={'This site uses Gravatar so if you want a profile image, use a Gravatar email'}/>

                                <TextFieldGroup error={errors.password} placeholder={'Password'} type={'password'}
                                                name={'password'}
                                                value={this.state.password} onChange={this.onChange}/>

                                <TextFieldGroup error={errors.password2} placeholder={'Confirm Password'}
                                                name={'password2'}
                                                value={this.state.password2} type={'password'}
                                                onChange={this.onChange}/>
                                <input type='submit' className='btn btn-info btn-block mt-4'/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    history: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
    // auth comes from the index of Reducers
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));