import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { StoreRoomRequestDto } from './store-room-request.dto';
import { StoreRoomRequestEntity } from './store-room-request.entity';
import { StoreRoomRequestService } from './store-room-request.service';

@Controller('store-room-requests')
export class SpecialRequestController {
    constructor(
        private storeRoomRequestService: StoreRoomRequestService
    ) { }
    @Get()
    getAllSpecialRequest(): Promise<StoreRoomRequestEntity[]> {
        return this.storeRoomRequestService.storeRoomRequestItems();
    }
    @Get('/:id')
    getSingleSpecialRequest(@Param('id', ParseIntPipe) id: number): Promise<StoreRoomRequestEntity> {
        return this.storeRoomRequestService.storeRoomRequestItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createStoreRoomRequest(@Body() storeRoomRequestDto: StoreRoomRequestDto): Promise<StoreRoomRequestEntity> {
        return this.storeRoomRequestService.createStoreRoomRequestItem(storeRoomRequestDto)
    }
    @Delete('/:id')
    deleteSpecialRequest(@Param('id', ParseIntPipe) id: number): void {
        this.storeRoomRequestService.deleteStoreRoomRequestItem(id);
    }
    @Patch('/:id')
    updateSpecialRequest(@Param('id', ParseIntPipe) id: number, @Body() storeRoomRequestDto: StoreRoomRequestDto): Promise<StoreRoomRequestEntity> {
        return this.storeRoomRequestService.updateStoreRoomRequestItem(id, storeRoomRequestDto)
    }

}
