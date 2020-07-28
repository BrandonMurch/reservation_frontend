// Dependencies
import {
  validatePhone,
  validateEmail,
  requiredValidator,
} from 'general_components/form/validators';

describe('Validators', () => {
  it('should validate a phone number', () => {
    let phone = { value: '+1 123456789' };
    let result = validatePhone(phone);
    expect(result).toEqual('');
    phone = { value: '23456789' };
    result = validatePhone(phone);
    expect(result).toEqual(
      'Phone number must be in the format of +1 123456789 where 1 is the country code, followed by the phone number',
    );
    phone = { value: '' };
    result = validatePhone(phone);
    expect(result).toEqual('Phone number is a required field');
  });
  it('should validate an email', () => {
    let email = { value: 'email@email.com' };
    let result = validateEmail(email);
    expect(result).toEqual('');
    email = { value: 'notanemail' };
    result = validateEmail(email);
    expect(result).toEqual('Email must be properly formatted');
    email = { value: '' };
    result = validateEmail(email);
    expect(result).toEqual('Email is a required field');
  });
  it('should validate a required field', () => {
    const field = { value: 'email@email.com', name: 'fieldName' };
    let result = requiredValidator(field);
    expect(result).toEqual('');
    field.value = '';
    result = requiredValidator(field);
    expect(result).toEqual('fieldName is a required field');
  });
});
