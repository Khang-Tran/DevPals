const validator = require('validator');

const validateInput = require('./validateInputs');
const isEmpty = require('./isEmpty');

const validateEducationInput = data => {
    let errors = {};

    data.school = validateInput(data.school);

    data.degree = validateInput(data.degree)

    data.fieldOfStudy = validateInput(data.fieldOfStudy);

    data.from = validateInput(data.from)


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