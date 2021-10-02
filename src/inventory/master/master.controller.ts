// import { Rd } from './../rd/rd.entity';
// import { Quality } from './../quality/quality.entity';
// import { StoreRoom } from './../store-room/store-room.entity';
// import { Screening } from './../screening/screening.entity';
// import { Receiving } from './../receiving/receving.entity';
// import { MassSpec } from './../mass-spec/mass-spec.entity';
// import { Extraction } from '../extraction/extraction.entity';
import { MasterDto } from './master.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { MasterEntity } from "./master.entity";
import { MasterService } from "./master.service";

@Controller('master')
export class MasterController {
    constructor(private masterService: MasterService) {}
    @Get()
    getAllMaster(): Promise<MasterEntity[]> {
        return this.masterService.masterItems();
    };
    @Get('/chemicals')
    getMasterChemical(): Promise<MasterEntity[]> {
        return this.masterService.masterChemicalItems()
    }
    @Get('/:id')
    getSingleMaster(@Param('id', ParseIntPipe) id: number): Promise<MasterEntity> {
        return this.masterService.masterItem(id)
    }
    @Post()
    createMater(@Body() masterDto: MasterDto): Promise<MasterEntity> {
        return this.masterService.createMasterItem(masterDto)
    }
    @Patch('/:id')
    updateMasterItem(
        @Param('id', ParseIntPipe) id: number,
        @Body() masterDto: MasterDto
    ): Promise<MasterEntity> {
        return this.masterService.updateMasterItem(id, masterDto) 
    }
    @Patch(':id/assign')
    assignItem(@Param('id', ParseIntPipe) id: number, @Body() departments: string[]): Promise<MasterEntity> {
        return this.masterService.assignItem(id, departments)
    }
    @Delete('/:id')
    deleteMasterItem(
        @Param('id', ParseIntPipe) id: number
    ): Promise<void> {
        return this.masterService.deleteMasterItem(id)
    }
};