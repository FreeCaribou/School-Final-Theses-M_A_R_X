import { Controller, Get, Post, Body, HttpException, HttpStatus, UseFilters, Req } from '@nestjs/common';
import { RelationshipTypesService } from './relationship-types.service';
import { CreateRelationshipTypeDto } from './dto/create-relationship-type.dto';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';

@Controller('api/relationshipTypes')
export class RelationshipTypesController {
  constructor(
    private readonly relationshipTypesService: RelationshipTypesService,
  ) {}
  @Get()
  findAll() {
    return this.relationshipTypesService.findAll();
  }

  @Post()
  create(@Body() createRelationshipTypeDto: CreateRelationshipTypeDto) {
    return this.relationshipTypesService.createFromUser(createRelationshipTypeDto);
    // return this.relationshipTypesService.create(createRelationshipTypeDto);
  }
}
