import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { AnalyticsService } from '../analytics/analytics.service';
import { EmailModule } from '../email/email.module';
import { MasterRepository } from '../master/master.repository';
import { MasterService } from '../master/master.service';
import { StoreRoomController } from './store-room.controller';
import { StoreRoomRepository } from './store-room.repository';
import { StoreRoomService } from './store-room.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreRoomRepository, AnalyticsRepository, MasterRepository,]),
    EmailModule
  ],
  controllers: [StoreRoomController],
  providers: [StoreRoomService, AnalyticsService, MasterService,]
})
export class StoreRoomModule {}
