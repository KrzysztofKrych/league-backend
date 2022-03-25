import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DEFAULT_SERIALIZE_OPTIONS,
  DEFAULT_VALIDATION_PIPE_OPTIONS,
} from './utils/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      ...DEFAULT_VALIDATION_PIPE_OPTIONS,
    }),
  );

  app.useGlobalInterceptors(
    // new PromiseCheckerInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector), {
      ...DEFAULT_SERIALIZE_OPTIONS,
    }),
  );
  await app.listen(3000);
}
bootstrap();
