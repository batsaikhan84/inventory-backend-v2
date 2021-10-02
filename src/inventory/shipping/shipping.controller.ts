import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe,Controller, Get, UsePipes } from '@nestjs/common';
import { UserDto } from '../user/userDto';
import { ShippingDto } from './shipping.dto';
import { ShippingEntity } from './shipping.entity';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
    constructor(private shippingService: ShippingService) {}
    @Get()
    getShippingItems(): Promise<ShippingEntity[]> {
        return this.shippingService.getShippingItems();
    }
    @Get('/email')
    sendEmailReport(): void {
        this.shippingService.scheduledItems()
    }

    @Get('/total/:item_id')
    getExtractionsTotalItem(
        @Param('item_id', ParseIntPipe) item_id: number
    ): Promise<ShippingEntity> {
        return this.shippingService.getTotalItemByMasterId(item_id);
    }

    @Get('/master/:item_id')
    getExtractionsItemsByMasterId(
        @Param('item_id', ParseIntPipe) item_id: number
    ): Promise<ShippingEntity[]> {
        return this.shippingService.getItemsByMasterId(item_id);
    }

    @Get('/:id')
    getShippingItem(@Param('id', ParseIntPipe) id: number): Promise<ShippingEntity> {
        return this.shippingService.getShippingItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createExtraction(@Body() shippingDto: ShippingDto): Promise<ShippingEntity> {
        return this.shippingService.createShippingItem(shippingDto)
    }
    @Delete('/:id')
    deleteExtraction(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.shippingService.deleteItem(id);
    }
    @Patch('/:id')
    updateExtraction(
        @Param('id', ParseIntPipe) id: number, 
        @Body('departmentItem') shippingDto: ShippingDto,
        @Body('currentUser') userDto: UserDto,
        ): Promise<ShippingEntity> {
        return this.shippingService.updateShippingItem(id, shippingDto, userDto)
    }
}
