import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { create } from 'domain';
import { CreateRelationshipDto } from './dto/create-relationship.dto';

@Controller('api/relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) { }

  @Get()
  findMy(@Body() body) {
    return this.relationshipsService.findAllByUser(body.tokenUserId);
  }

  @Get(':id')
  findOne(@Param() params) {
    return this.relationshipsService.findOne(params.id);
  }

  @Post()
  create(@Body() createRelationshipDto: CreateRelationshipDto) {
    return this.relationshipsService.create(createRelationshipDto);
  }
}
