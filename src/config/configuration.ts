import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';
import { getMetadataArgsStorage } from 'typeorm';

const isProd = process.env.NODE_ENV === 'production';

const isHMROn = process.env.HMR === 'true';

const synchroize = isProd ? false : process.env.DATABASE_SYNCHRONIZE === 'true';

export default () => ({
  serverPort: parseInt(process.env.PORT, 10) || 3000,
  security: {
    saltRounds: parseInt(process.env.PASSWD_SALT_ROUNDS, 10) || 10,
    jwt: {
      secret: process.env.JWT_SECRET || 'provide_a_jwt_secret',
      expires: parseInt(process.env.JWT_EXPIRE, 10) || 12000,
    },
  },
  db: {
    type: process.env.DATABASE_TYPE || 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    charset: 'utf8mb4',
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    database: process.env.DATABASE_DATABASE || 'test',
    synchroize,
    logging: isProd ? ['error'] : ['error', 'schema'],
    // entities: [path.join(__dirname, '**/*.entity{.ts,.js}')], // this cannot work with webpack
    entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
    migrationsTableName: 'migration',
    migrations: ['src/migrations/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    namingStrategy: new SnakeNamingStrategy(),
    keepConnectionAlive: isHMROn,
  },
});