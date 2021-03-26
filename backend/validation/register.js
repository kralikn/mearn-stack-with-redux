const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  
  if (!Validator.isLength(data.name, { min: 4, max: 30 })) {
    errors.name = 'A felhasználónév minimum 4, maximum 30 karakter lehet';
  }
  
  if (Validator.isEmpty(data.name)) {
    errors.name = 'A felhasználónév kitöltése kötelező';
  }
  
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'A jelszó minimum 6, maximum 30 karakter lehet';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'A jelszó kitöltése kötelező';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'A megerősítő jelszó kitöltése kötelező';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'A jelszavak nem egyeznek';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
