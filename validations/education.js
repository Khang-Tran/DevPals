const validator = require('validator');

const isEmpty = require('./isEmpty');

const validateEducationInput = data => {
    let errors = {};

    // TODO: refactor this
    data.school = !isEmpty(data.school)
        ? data.school
        : '';

    data.degree = !isEmpty(data.degree)
        ? data.degree
        : '';

    data.fieldOfStudy = !isEmpty(data.fieldOfStudy)
        ? data.fieldOfStudy
        : '';

    data.from = !isEmpty(data.from)
        ? data.from
        : '';


    if (validator.isEmpty(data.school)) {
        errors.school = 'School is required';
    }


    if (validator.isEmpty(data.degree)) {
        errors.degree = 'Degree is required';
    }

    if (validator.isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = 'Field of study is required';
    }

    if (validator.isEmpty(data.from)) {
        errors.from = 'From date is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateEducationInput;