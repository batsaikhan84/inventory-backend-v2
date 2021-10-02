import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeSupplyController } from './office-supply.controller';
import { OfficeSupplyRepository } from './office-supply.repository';
import { OfficeSupplyService } from './office-supply.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OfficeSupplyRepository]),
    // EmailModule
  ],
  controllers: [OfficeSupplyController],
  providers: [OfficeSupplyService]
})
export class OfficeSupplyModule {}
