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

export class CreateUserRelationshipTypeDto {
  @IsNotEmpty()
  readonly relationshipTypeId: number;
  @IsNotEmpty()
  readonly userId: number;
}
