const validator = require('validator');

const isEmpty = require('./isEmpty');

const validateExperienceInput = data => {
    let errors = {};

    // TODO: refactor this
    data.title = !isEmpty(data.title)
        ? data.title
        : '';

    data.company = !isEmpty(data.company)
        ? data.company
        : '';

    data.from = !isEmpty(data.from)
        ? data.from
        : '';


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