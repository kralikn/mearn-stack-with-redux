const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'A felhasználónév kitöltése kötelező';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'A jelszó kitöltése kötelező';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
