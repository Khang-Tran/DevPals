const validator = require('validator');

const isEmpty = require('./isEmpty');
const validateInput = require('./validateInputs');

const validatePostInput = data => {
    let errors = {};


    data.text = validateInput(data.text);

    if (!validator.isLength(data.text, {min: 10, max: 300})) {
        errors.text = 'Text must be between 10 and 300 characters';
    }

    if (isEmpty(data.text)) {
        errors.text = 'Text is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validatePostInput;