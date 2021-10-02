import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../email/email.module';
import { MasterRepository } from '../master/master.repository';
import { SpecialRequestController } from './store-room-request.controller';
import { StoreRoomRequestService } from './store-room-request.service';
import { StoreRoomRequestRepository } from './store-room-request.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreRoomRequestRepository, MasterRepository]),
    EmailModule

  ],
  controllers: [SpecialRequestController],
  providers: [StoreRoomRequestService]
})
export class StoreRoomRequestModule {}
