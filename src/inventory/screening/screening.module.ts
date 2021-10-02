import { EmailModule } from './../email/email.module';
import { ScreeningService } from './screening.service';
import { ScreeningController } from './screening.controller';
import { ScreeningRepository } from './screening.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { MasterRepository } from '../master/master.repository';
import { AnalyticsService } from '../analytics/analytics.service';
import { MasterService } from '../master/master.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ScreeningRepository, AnalyticsRepository, MasterRepository,]),
    EmailModule
  ],
  controllers: [ScreeningController],
  providers: [ScreeningService, AnalyticsService, MasterService,]
})
export class ScreeningModule {}
