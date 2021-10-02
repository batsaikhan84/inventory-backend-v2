import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BreakroomController } from './breakroom.controller';
import { BreakroomRepository } from './breakroom.repository';
import { BreakroomService } from './breakroom.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BreakroomRepository]),
    // EmailModule
  ],
  controllers: [BreakroomController],
  providers: [BreakroomService]
})
export class BreakroomModule {}
