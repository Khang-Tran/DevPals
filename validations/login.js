const validator = require('validator');

const isEmpty = require('./isEmpty');
const validateInput = require('./validateInputs');

const validateLoginInput = data => {
    let errors = {};

    data.email = validateInput(data.email);

    data.password = validateInput(data.password)


    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }


    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateLoginInput;