import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormOptions: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/code-challenge.db',
  logging: true,
  entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
  migrations: [path.resolve(__dirname, '..', 'db', 'migrations', '*')],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export { ormOptions };
