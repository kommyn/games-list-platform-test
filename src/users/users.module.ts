import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers';
import { UsersQueriesService, UsersService } from './services';
import { User } from '../database/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersQueriesService, UsersService],
})
export class UsersModule {}
