const validator = require('validator');

const validateInput = require('./validateInputs');
const isEmpty = require('./isEmpty');

const validateExperienceInput = data => {
    let errors = {};

    data.title = validateInput(data.title);

    data.company = validateInput(data.company);

    data.from = validateInput(data.from)


    if (validator.isEmpty(data.title)) {
        errors.title = 'Job title is required';
    }


    if (validator.isEmpty(data.company)) {
        errors.company = 'Company is required';
    }

    if (validator.isEmpty(data.from)) {
        errors.from = 'From date is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateExperienceInput;