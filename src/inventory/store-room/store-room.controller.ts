import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from '../user/userDto';
import { StoreRoomDto } from './store-room.dto';
import { StoreRoomEntity } from './store-room.entity';
import { StoreRoomService } from './store-room.service';

@Controller('store-room')
export class StoreRoomController {
    constructor(private storeRoomService: StoreRoomService) { }
    @Get()
    getStoreRoomItems(): Promise<StoreRoomEntity[]> {
        return this.storeRoomService.getStoreRoomItems();
    }
    @Get('/email')
    sendEmailReport(): void {
        this.storeRoomService.scheduledStoreRoomItems()
    }
    @Get('/:id')
    getStoreRoomItem(@Param('id', ParseIntPipe) id: number): Promise<StoreRoomEntity> {
        return this.storeRoomService.getStoreRoomItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createStoreRoom(@Body() storeRoomDto: StoreRoomDto): Promise<StoreRoomEntity> {
        return this.storeRoomService.createStoreRoomItem(storeRoomDto)
    }
    @Delete('/:id')
    deleteStoreRoom(@Param('id', ParseIntPipe) id: number): void {
        this.storeRoomService.deleteStoreRoomItem(id);
    }
    @Patch('/:id')
    updateStoreRoomItem(
        @Param('id', ParseIntPipe) id: number, 
        @Body('storeRoomItem') storeRoomDto: StoreRoomDto,
        @Body('currentUser') userDto: UserDto,
        ): Promise<StoreRoomEntity> {
        return this.storeRoomService.updateStoreRoomItem(id, storeRoomDto, userDto)
    }
}
