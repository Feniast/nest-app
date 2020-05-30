import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const isProd = process.env.NODE_ENV === 'production';

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
    logging: isProd ? ['error'] : ['query', 'error', 'schema'],
    entities: ['**/*.entity{ .ts,.js}'],
    migrationsTableName: 'migration',
    migrations: ['src/migrations/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    namingStrategy: new SnakeNamingStrategy(),
  },
});