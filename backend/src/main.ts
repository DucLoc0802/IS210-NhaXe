import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3001);
  console.log('🚀 Backend NestJS đang chạy rầm rầm tại: http://localhost:3001');
}
bootstrap();
