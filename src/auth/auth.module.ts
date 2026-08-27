import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './controllers';
import { AuthService, SessionSerializer } from './services';
import { LocalStrategy } from './strategies';
import { User } from '../database/entities';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ session: true }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
