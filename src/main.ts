import { NestFactory } from '@nestjs/core';
import * as methodOverride from 'method-override';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  nunjucks.configure(join(__dirname, '..', 'dist'), {
    autoescape: true,
    express: app,
  });
  app.use(methodOverride('_method'));
  app.useStaticAssets(join(__dirname, '..', 'dist', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'dist'));
  await app.listen(3000);
}
bootstrap();
