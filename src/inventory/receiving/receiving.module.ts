import { EmailModule } from './../email/email.module';
import { ReceivingRepository } from './receiving.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceivingController } from './receiving.controller';
import { ReceivingService } from './receiving.service';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { MasterRepository } from '../master/master.repository';
import { AnalyticsService } from '../analytics/analytics.service';
import { MasterService } from '../master/master.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceivingRepository, AnalyticsRepository, MasterRepository,]),
    EmailModule
  ],
  controllers: [ReceivingController],
  providers: [ReceivingService, AnalyticsService, MasterService,]
})
export class ReceivingModule {}
