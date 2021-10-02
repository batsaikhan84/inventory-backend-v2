import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { EmailModule } from '../email/email.module';
import { MasterRepository } from '../master/master.repository';
import { MasterService } from '../master/master.service';
import { ExtractionsController } from './extractions.controller';
import { ExtractionsRepository } from './extractions.repository';
import { ExtractionsService } from './extractions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExtractionsRepository, MasterRepository, AnalyticsRepository,]),
    EmailModule
  ],
  controllers: [ExtractionsController,],
  providers: [ExtractionsService, MasterService,]
})
export class ExtractionsModule {}
