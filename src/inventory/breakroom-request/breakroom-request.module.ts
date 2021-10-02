import { Module } from '@nestjs/common';
import { BreakroomRequestService } from './breakroom-request.service';
import { BreakroomRequestController } from './breakroom-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreakroomRequestRepository } from './breakroom-request.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BreakroomRequestRepository]),
    // EmailModule
  ],
  providers: [BreakroomRequestService],
  controllers: [BreakroomRequestController]
})
export class BreakroomRequestModule {}
