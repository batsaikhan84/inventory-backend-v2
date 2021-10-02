import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { AnalyticsService } from '../analytics/analytics.service';
import { MasterRepository } from '../master/master.repository';
import { MasterService } from '../master/master.service';
import { SafetyController } from './safety.controller';
import { SafetyRepository } from './safety.repository';
import { SafetyService } from './safety.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([SafetyRepository, AnalyticsRepository, MasterRepository])
  ],
  controllers: [SafetyController],
  providers: [SafetyService, MasterService, AnalyticsService,]
})
export class SafetyModule {}
