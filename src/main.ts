import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const logger = new Logger(NestApplication.name);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  // validate incoming request entity
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, disableErrorMessages: false }),
  );

  // transform response entity
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port);
  logger.log('server has started, listening on ' + port);
}
bootstrap();
