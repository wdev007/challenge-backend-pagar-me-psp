import * as dotenv from 'dotenv';
import * as path from 'path';

import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Customer } from '../../modules/customers/entities/customer.entity';

const CONFIG_PATH: string = path.resolve(process.cwd(), '.env');

dotenv.config({ path: CONFIG_PATH });

export const databaseFactory = (
  configService: ConfigService,
): PostgresConnectionOptions => ({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [Customer],
  synchronize: false,
});
