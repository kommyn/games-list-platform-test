import { Routes } from '@nestjs/core';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';

export const ROUTES: Routes = [
    {
        path: '/auth',
        module: AuthModule,
    },
    {
        path: '/users',
        module: UsersModule,
    },
    {
        path: '/games',
        module: GamesModule,
    },
];
