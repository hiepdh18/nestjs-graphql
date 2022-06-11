import { GlobalInterceptor } from './common/interceptor/global.interceptor';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AllExceptionFilter } from 'common/filter/exception.filter';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
// import { connect } from 'mongoose';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new GlobalInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  // const db = await connect(process.env.MONGO_URL);

  // console.log('Connected to: ', db.connection.name);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  Logger.log(
    `Listening member server on http://localhost:${PORT}/graphql`,
    'startServer',
  );
}
bootstrap();
