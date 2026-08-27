import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmConfigService } from '../database/typeorm.config.service';
import { validationSchema } from './validation-schema';
import * as config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [...Object.values(config)],
      validationSchema,
      validationOptions: { abortEarly: true },
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
  ],
})
export class SharedModule {}
