import { Module } from '@nestjs/common';
import { OfficeSupplyRequestService } from './office-supply-request.service';
import { OfficeSupplyRequestController } from './office-supply-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeSupplyRequestRepository } from './office-supply-request.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OfficeSupplyRequestRepository]),
    // EmailModule
  ],
  providers: [OfficeSupplyRequestService],
  controllers: [OfficeSupplyRequestController]
})
export class OfficeSupplyRequestModule {}
