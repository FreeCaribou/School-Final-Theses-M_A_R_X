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

export class CreateRelationshipDto {
  @IsNotEmpty()
  @Length(1, 50)
  @IsString()
  // @Validate(IsNotWhiteSpace)
  readonly name: string;
  readonly userRelationshipTypeId: number;
  @IsNotEmpty()
  readonly tokenUserId: number;
}
