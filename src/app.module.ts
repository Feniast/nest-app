import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SysAdminModule } from './modules/sys-admin/sys-admin.module';
import { SysAdminRoleModule } from './modules/sys-admin-role/sys-admin-role.module';
import { AuthModule } from './modules/auth/auth.module';
import configuration from './config/configuration';
import { RedisModule } from 'nestjs-redis';

const env = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get('db');
      },
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return configService.get('redis');
      },
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${env}.local`, `.env.${env}`, '.env'],
      load: [configuration],
    }),
    SysAdminModule,
    SysAdminRoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
