import {
  validate,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly idAuth: string;
  @IsNotEmpty()
  @Length(1, 50)
  readonly username: string;
  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;
}
