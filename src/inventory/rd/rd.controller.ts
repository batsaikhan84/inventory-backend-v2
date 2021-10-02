import { RdService } from './rd.service';
import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe, Controller, Get, UsePipes } from '@nestjs/common';
import { RdEntity } from './rd.entity';
import { RdDto } from './rd.dto';
import { UserDto } from '../user/userDto';

@Controller('r&d')
export class RdController {
    constructor(private rdService: RdService) {}
    @Get()
    getRdItems(): Promise<RdEntity[]> {
        return this.rdService.getRdItems();
    }
    @Get('/email')
    sendEmailReport(): void {
        this.rdService.scheduledRdItems()
    }
    @Get('/total')
    getRdTotalItems(): Promise<RdEntity[]> {
        return this.rdService.getRdTotalItems();
    }

    @Get('/total/:item_id')
    getExtractionsTotalItem(
        @Param('item_id', ParseIntPipe) item_id: number
    ): Promise<RdEntity> {
        return this.rdService.getTotalItemByMasterId(item_id);
    }

    @Get('/master/:item_id')
    getExtractionsItemsByMasterId(
        @Param('item_id', ParseIntPipe) item_id: number
    ): Promise<RdEntity[]> {
        return this.rdService.getItemsByMasterId(item_id);
    }

    @Get('/:id')
    getRdItem(@Param('id', ParseIntPipe) id: number): Promise<RdEntity> {
        return this.rdService.getRdItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createRd(@Body() rdDto: RdDto): Promise<RdEntity> {
        return this.rdService.createRdItem(rdDto)
    }
    @Delete('/:id')
    deleteRd(@Param('id', ParseIntPipe) id: number): void {
        this.rdService.deleteRdItem(id);
    }
    @Patch('/:id')
    updateRd(
        @Param('id', ParseIntPipe) id: number, 
        @Body('departmentItem') rdDto: RdDto,
        @Body('currentUser') userDto: UserDto,
        ): Promise<RdEntity> {
        return this.rdService.updateRdItem(id, rdDto, userDto,)
    }
}
