const isEmpty = require('./isEmpty');

const validateInputs = input => {
    return !isEmpty(input) ? input : '';
};

module.exports = validateInputs;