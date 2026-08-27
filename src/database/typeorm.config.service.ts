import { join } from 'node:path';
import { Injectable, Inject } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { databaseConf } from '../shared/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(
        @Inject(databaseConf.KEY)
        private dbConfig: ConfigType<typeof databaseConf>,
    ) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.dbConfig.host,
            port: this.dbConfig.port,
            username: this.dbConfig.username,
            password: this.dbConfig.password,
            database: this.dbConfig.database,
            entities: [join(__dirname, '/entities/**/*.js')],
            migrations: [join(__dirname, '/migrations/*.js')],
        };
    }
}
