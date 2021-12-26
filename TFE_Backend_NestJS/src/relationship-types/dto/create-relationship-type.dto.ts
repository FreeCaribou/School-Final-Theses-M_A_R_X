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
  IsString,
  Validate,
} from 'class-validator';
// import { IsNotWhiteSpace } from 'src/common/validator/IsNotWhiteSpace.pipe';

export class CreateRelationshipTypeDto {
  @IsNotEmpty()
  @Length(1, 50)
  @IsString()
  // @Validate(IsNotWhiteSpace)
  readonly name: string;

  readonly tokenUserId: number;
}
