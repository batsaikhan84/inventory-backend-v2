import { ReceivingEntity } from './receving.entity';
import { ReceivingDto } from './receiving.dto';
import { ReceivingService } from './receiving.service';
import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe, Controller, Get, UsePipes, UseGuards } from '@nestjs/common';
import { UserDto } from '../user/userDto';

@Controller('receiving')
export class ReceivingController {
    constructor(private receivingService: ReceivingService) {}

    @Get()
    getReceivingItems(): Promise<ReceivingEntity[]> {
        return this.receivingService.getReceivingItems();
    }
    
    @Get('/email')
    sendEmailReport(): void {
        this.receivingService.scheduledReceivingItems()
    }
    @Get('/total')
    getReceivingTotalItems(): Promise<ReceivingEntity[]> {
        return this.receivingService.getReceivingTotalItems();
    }

    @Get('/total/:item_id')
    getExtractionsTotalItem(
        @Param('item_id', ParseIntPipe) item_id: number
    ): Promise<ReceivingEntity> {
        return this.receivingService.getTotalItemByMasterId(item_id);
    }

    @Get('/master/:item_id')
    getExtractionsItemsByMasterId(
        @Param('item_id', ParseIntPipe) item_id: number
    ): Promise<ReceivingEntity[]> {
        return this.receivingService.getItemsByMasterId(item_id);
    }

    @Get('/:id')
    getReceivingItem(@Param('id', ParseIntPipe) id: number): Promise<ReceivingEntity> {
        return this.receivingService.getReceivingItem(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createReceiving(@Body() receivingDto: ReceivingDto): Promise<ReceivingEntity> {
        return this.receivingService.createReceivingItem(receivingDto)
    }

    @Delete('/:id')
    deleteExtraction(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.receivingService.deleteItem(id);
    }

    @Patch('/:id')
    updateReceiving(
        @Param('id', ParseIntPipe) id: number, 
        @Body('departmentItem') receivingDto: ReceivingDto,
        @Body('currentUser') userDto: UserDto,
        ): Promise<ReceivingEntity> {
        return this.receivingService.updateReceivingItem(id, receivingDto, userDto,)
    }
}
