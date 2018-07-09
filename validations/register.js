const validator = require('validator');

const isEmpty = require('./isEmpty');
const validateInput = require('./validateInputs');

const validateRegisterInput = data => {
    let errors = {};

    data.name = validateInput(data.name);

    data.email = validateInput(data.email);

    data.password = validateInput(data.password);

    data.password2 = validateInput(data.password2);

    if (!validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }


    if (!validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be at least 6 characters';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password is required';
    }

    if (!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateRegisterInput;