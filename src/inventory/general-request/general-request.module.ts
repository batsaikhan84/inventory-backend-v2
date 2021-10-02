import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from '../email/email.module';
import { MasterRepository } from '../master/master.repository';
import { GeneralRequestController } from './general-request.controller';
import { GeneralRequestRepository } from './general-request.repository';
import { GeneralRequestService } from './general-request.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([GeneralRequestRepository, MasterRepository]),
    EmailModule

  ],
  controllers: [GeneralRequestController],
  providers: [GeneralRequestService]
})
export class GeneralRequestModule {}
