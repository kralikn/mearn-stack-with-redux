const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTopicInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  // data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isLength(data.title, { min: 4, max: 30 })) {
    errors.msg = 'A témakör minimum 4, maximum 30 karakter lehet';
  }

  if (Validator.isEmpty(data.title)) {
    errors.msg = 'A témakör kitöltése kötelező';
  }

  // if (Validator.isEmpty(data.password)) {
  //   errors.password = 'A jelszó kitöltése kötelező';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
