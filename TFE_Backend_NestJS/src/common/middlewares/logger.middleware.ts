import {
  Injectable,
  NestMiddleware,
  MiddlewareFunction,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';
declare var require: any;

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      let jwt = require('jsonwebtoken');
      console.log('Hello Middleware');
      let token: string = req.headers.authorization;
      if (token === undefined) {
        throw new UnauthorizedException();
      }
      token = token.slice(7);

      try {
        let decoded = jwt.verify(token, 'iliketrainandflyandsomuchthing');
        // pass the id from the user for the next
        req.body.tokenUserId = decoded.id;
      } catch (err) {
        throw new UnauthorizedException();
      }

      next();
    };
  }
}
