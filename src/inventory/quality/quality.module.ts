import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { AnalyticsService } from '../analytics/analytics.service';
import { EmailModule } from '../email/email.module';
import { MasterRepository } from '../master/master.repository';
import { MasterService } from '../master/master.service';
import { QualityController } from './quality.controller';
import { QualityRepository } from './quality.repository';
import { QualityService } from './quality.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QualityRepository, AnalyticsRepository, MasterRepository,]),
    EmailModule
  ],
  controllers: [QualityController],
  providers: [QualityService, AnalyticsService, MasterService,]
})
export class QualityModule {}
