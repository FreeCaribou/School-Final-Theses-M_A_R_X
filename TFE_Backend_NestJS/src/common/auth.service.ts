
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  validateToken(token: string): boolean {
    // Validate if token passed along with HTTP request
    // is associated with any registered account in the database

    return true;
  }

  createToken(): string {

    return "";
  }
}