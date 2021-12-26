import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNotWhiteSpace', async: false })
export class IsNotWhiteSpace implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    if (text.trim() == '') {
      return false;
    } else {
      return true;
    }
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return '$property cannot only contain white space...';
  }
}
