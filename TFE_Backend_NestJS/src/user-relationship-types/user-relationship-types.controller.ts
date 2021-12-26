import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserRelationshipTypesService } from './user-relationship-types.service';
import { CreateUserRelationshipTypeDto } from './dto/create-user-relationship-type.dto';

@Controller('api/userRelationshipTypes')
export class UserRelationshipTypesController {
  constructor(
    private readonly userRelationshipTypesService: UserRelationshipTypesService,
  ) {}
  @Get()
  findMy(@Body() body) {
    return this.userRelationshipTypesService.findAllByUser(body.tokenUserId);
  }

  @Post()
  create(@Body() createUserRelationshipTypeDto: CreateUserRelationshipTypeDto) {
    return this.userRelationshipTypesService.create(
      createUserRelationshipTypeDto,
    );
  }
}
