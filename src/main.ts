import { NestFactory } from '@nestjs/core';
import { InventoryModule } from './inventory.module';

async function bootstrap() {
  const app = await NestFactory.create(InventoryModule, { cors: true });
  await app.listen(3200);
}
bootstrap();
