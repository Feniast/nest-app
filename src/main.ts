import { NestFactory, NestApplication } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';

declare const module: any;

async function bootstrap() {
  const logger = new Logger(NestApplication.name);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  // validate incoming request entity
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, disableErrorMessages: false, whitelist: true }),
  );

  // transform response entity
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port);
  logger.log('server has started, listening on ' + port);
  // hmr
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
