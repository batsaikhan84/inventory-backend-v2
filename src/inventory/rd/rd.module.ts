import { EmailModule } from './../email/email.module';
import { RdRepository } from './rd.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RdService } from './rd.service';
import { RdController } from './rd.controller';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { MasterRepository } from '../master/master.repository';
import { AnalyticsService } from '../analytics/analytics.service';
import { MasterService } from '../master/master.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RdRepository, AnalyticsRepository, MasterRepository,]),
    EmailModule
  ],
  controllers: [RdController],
  providers: [RdService, AnalyticsService, MasterService]
})
export class RdModule {}
