import { EmailModule } from './../email/email.module';
import { MassSpecRepository } from './mass-spec.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MassSpecController } from './mass-spec.controller';
import { MassSpecService } from './mass-spec.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { MasterService } from '../master/master.service';
import { MasterRepository } from '../master/master.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MassSpecRepository, AnalyticsRepository, MasterRepository]),
    EmailModule
  ],
  controllers: [MassSpecController],
  providers: [MassSpecService, AnalyticsService, MasterService]
})
export class MassSpecModule {}
