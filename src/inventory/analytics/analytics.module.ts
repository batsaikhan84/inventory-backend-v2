import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsRepository } from './analytics.repository';
import { AnalyticsService } from './analytics.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([AnalyticsRepository])
      ],
      controllers: [AnalyticsController],
      providers: [AnalyticsService]
})
export class AnalyticsModule {}
