const validator = require('validator');

const isEmpty = require('./isEmpty');

const validateProfileInput = data => {
    let errors = {};

    // TODO: refactor this
    data.handle = !isEmpty(data.handle)
        ? data.handle
        : '';

    data.status = !isEmpty(data.status)
        ? data.status
        : '';
    data.skills = !isEmpty(data.skills)
        ? data.skills
        : '';


    if (!validator.isLength(data.handle, {min: 2, max: 40})) {
        errors.handle = 'Handle needs to be between 2 and 40 characters';
    }

    if (validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }


    if (validator.isEmpty(data.status)) {
        errors.status = 'Status is required';
    }

    if (validator.isEmpty(data.skills)) {
        errors.skills = 'Skills is required';
    }

    if (!isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.Facebook)) {
        if (!validator.isURL(data.Facebook)) {
            errors.Facebook = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.Google)) {
        if (!validator.isURL(data.Google)) {
            errors.Google = 'Not a valid URL';
        }
    }

    if (!isEmpty(data.Linkedin)) {
        if (!validator.isURL(data.Linkedin)) {
            errors.Linkedin = 'Not a valid URL';
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
    };
};

module.exports = validateProfileInput;