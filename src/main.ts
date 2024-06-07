import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
   .setTitle('MKS Challenge')
   .setDescription('The MKS Challenge API description')
   .setVersion('1.0')
   .addBearerAuth()
  await app.listen(process.env.PORT);
}
bootstrap();
