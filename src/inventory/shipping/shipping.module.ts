import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { AnalyticsService } from '../analytics/analytics.service';
import { EmailModule } from '../email/email.module';
import { MasterRepository } from '../master/master.repository';
import { MasterService } from '../master/master.service';
import { ShippingController } from './shipping.controller';
import { ShippingRepository } from './shipping.repository';
import { ShippingService } from './shipping.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShippingRepository, MasterRepository, AnalyticsRepository]),
    EmailModule
  ],
  controllers: [ShippingController],
  providers: [ShippingService, MasterService, AnalyticsService,]
})
export class ShippingModule {}
