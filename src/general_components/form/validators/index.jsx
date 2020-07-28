const validatePhone = function validatePhoneNumberReturningErrorMessage({ value }) {
  if (value.length === 0) {
    return 'Phone number is a required field';
  }
  if (!/^\+\d{1,3} \d{6,14}$/.test(value)) {
    return 'Phone number must be in the format of +1 123456789 where 1 is the country code, followed by the phone number';
  }
  return '';
};

const validateEmail = function validatePhoneNumberReturningErrorMessage({ value }) {
  if (value.length === 0) {
    return 'Email is a required field';
  }
  if (!/^[\w\-_.+]*[\w\-_.]@([\w]+\.)+[\w]+[\w]$/.test(value)) {
    return 'Email must be properly formatted';
  }
  return '';
};

const requiredValidator = function returnErrorMessageIfEmpty({ value, name }) {
  if (value.length === 0) {
    return `${name} is a required field`;
  }
  return '';
};

export { validatePhone, validateEmail, requiredValidator };
