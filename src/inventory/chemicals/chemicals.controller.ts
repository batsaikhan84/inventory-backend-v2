import { Controller, Get, Query } from '@nestjs/common';
import { ChemicalsEntity } from './chemicals.entity';
import { ChemicalsService } from './chemicals.service';

@Controller('chemicals')
export class ChemicalsController {
    constructor(private chemicalsService: ChemicalsService) {}
    @Get()
    getChemicalsItem(): Promise<ChemicalsEntity[]> {
        return this.chemicalsService.chemicalItems();
    };
    @Get('/paginate')
    getPaginatedChemical(@Query('page') page: number = 1, @Query('limit') limit: number = 5): Promise<ChemicalsEntity[]> {
        return this.chemicalsService.paginate(page, limit);
    }
}
