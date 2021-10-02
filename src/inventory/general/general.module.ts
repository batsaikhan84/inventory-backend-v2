import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GeneralController } from "./general.controller";
import { GeneralRepository } from './general.repository';
import { GeneralService } from "./general.service";



@Module({
  imports: [
    TypeOrmModule.forFeature([
      GeneralRepository,
    ])
  ],
  providers: [GeneralService],
  controllers: [GeneralController]
})
export class GeneralModule { }