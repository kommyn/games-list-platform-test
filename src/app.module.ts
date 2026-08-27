import { MiddlewareConsumer, Module, NestModule, Inject } from '@nestjs/common';
import type { RequestHandler } from '@nestjs/common/interfaces';
import { RouterModule } from '@nestjs/core';
import type { ConfigType } from '@nestjs/config';
import passport from 'passport';
import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';

import { ROUTES } from './routes';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { databaseConf, sessionConf } from './shared/config';
import { GamesModule } from './games/games.module';

@Module({
    imports: [
        SharedModule,
        UsersModule,
        AuthModule,
        GamesModule,
        RouterModule.register(ROUTES),
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    constructor(
        @Inject(databaseConf.KEY)
        private dbConfig: ConfigType<typeof databaseConf>,
        @Inject(sessionConf.KEY)
        private sessionConfig: ConfigType<typeof sessionConf>,
    ) {}

    configure(consumer: MiddlewareConsumer) {
        const store = new (connectPgSimple(session))({
            conObject: {
                host: this.dbConfig.host,
                port: this.dbConfig.port,
                password: this.dbConfig.password,
                user: this.dbConfig.username,
                database: this.dbConfig.database,
            },
            tableName: 'sessions',
            createTableIfMissing: true,
        });

        consumer
            .apply(
                session({
                    secret: this.sessionConfig.secret,
                    resave: false,
                    saveUninitialized: false,
                    name: 'connect.sid',
                    cookie: { secure: false },
                    store,
                }),
                passport.initialize(),
                passport.session() as RequestHandler,
            )
            .forRoutes('*');
    }
}
