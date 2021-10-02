import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe, Controller, Get, UsePipes } from '@nestjs/common';
import { UserDto } from '../user/userDto';
import { ScreeningDto } from './screening.dto';
import { ScreeningEntity } from './screening.entity';
import { ScreeningService } from './screening.service';

@Controller('screening')
export class ScreeningController {
    constructor(private screeningService: ScreeningService) {}
    @Get()
    getScreeningItems(): Promise<ScreeningEntity[]> {
        return this.screeningService.getScreeningItems();
    }
    @Get('/email')
    sendEmailReport(): void {
        this.screeningService.scheduledScreeningItems()
    }
    @Get('/total')
    getScreeningTotalItems(): Promise<ScreeningEntity[]> {
        return this.screeningService.getScreeningTotalItems();
    }

    @Get('/total/:item_id')
    getExtractionsTotalItem(
        @Param('item_id', ParseIntPipe) item_id: number
    ): Promise<ScreeningEntity> {
        return this.screeningService.getTotalItemByMasterId(item_id);
    }

    @Get('/master/:item_id')
    getExtractionsItemsByMasterId(
        @Param('item_id', ParseIntPipe) item_id: number
    ): Promise<ScreeningEntity[]> {
        return this.screeningService.getItemsByMasterId(item_id);
    }


    @Get('/:id')
    getScreeningItem(@Param('id', ParseIntPipe) id: number): Promise<ScreeningEntity> {
        return this.screeningService.getScreeningItem(id);
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    createScreening(@Body() screeningDto: ScreeningDto): Promise<ScreeningEntity> {
        return this.screeningService.createScreeningItem(screeningDto)
    }
    @Delete('/:id')
    deleteScreening(@Param('id', ParseIntPipe) id: number): void {
        this.screeningService.deleteItem(id);
    }
    @Patch('/:id')
    updateScreening(
        @Param('id', ParseIntPipe) id: number, 
        @Body('departmentItem') screeningDto: ScreeningDto,
        @Body('currentUser') userDto: UserDto,
        ): Promise<ScreeningEntity> {
        return this.screeningService.updateScreeningItem(id, screeningDto, userDto)
    }
}
