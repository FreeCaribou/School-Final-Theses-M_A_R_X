import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { RelationshipTypesModule } from './relationship-types/relationship-types.module';
import { UserRelationshipTypesModule } from './user-relationship-types/user-relationship-types.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { UsersController } from './users/users.controller';
import { RelationshipTypesController } from './relationship-types/relationship-types.controller';
import { UserRelationshipTypesController } from './user-relationship-types/user-relationship-types.controller';
import { RelationshipsModule } from './relationships/relationships.module';
import { RelationshipsController } from './relationships/relationships.controller';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'test.sqlite',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    //   logging: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'test',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    RelationshipTypesModule,
    UserRelationshipTypesModule,
    RelationshipsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'api/users/login', method: RequestMethod.POST })
      .forRoutes(UsersController, RelationshipTypesController, UserRelationshipTypesController, RelationshipsController);
  }
}
