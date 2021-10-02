import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChemicalsController } from './chemicals.controller';
import { ChemicalsRepository } from './chemicals.repository';
import { ChemicalsService } from './chemicals.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ChemicalsRepository])
    ],
    providers: [ChemicalsService],
    controllers: [ChemicalsController]
})
export class ChemicalModule {}