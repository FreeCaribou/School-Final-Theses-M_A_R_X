import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
declare var require: any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly repository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Users> {
    return this.repository.findOne(id);
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    let isPresent: any = await this.repository.findOne({
      where: { idAuth: createUserDto.idAuth },
    });
    if (isPresent === undefined) {
      isPresent = await this.repository.save(createUserDto);
    }

    let jwt = require('jsonwebtoken');
    let tokenPayload = {
      id: isPresent.id,
    };
    isPresent.token = jwt.sign(tokenPayload, 'iliketrainandflyandsomuchthing');

    return isPresent;
  }
}
