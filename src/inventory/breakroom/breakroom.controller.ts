import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BreakroomDto } from './breakroom.dto';
import { BreakroomEntity } from './breakroom.entity';
import { BreakroomService } from './breakroom.service';

@Controller('breakroom')
export class BreakroomController {
  constructor(
    private breakroomService: BreakroomService
  ) { }

  @Get()
  getBreakroomItems(): Promise<BreakroomEntity[]> {
    return this.breakroomService.getBreakroomItems();
  }

  @Get('/:id')
  getBreakroomItem(@Param('id', ParseIntPipe) id: number): Promise<BreakroomEntity> {
    return this.breakroomService.getBreakroomItem(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createStoreRoomRequest(@Body() breakroomDto: BreakroomDto): Promise<BreakroomEntity> {
    return this.breakroomService.createBreakroomItem(breakroomDto)
  }

  @Delete('/:id')
  deleteSpecialRequest(@Param('id', ParseIntPipe) id: number): void {
    this.breakroomService.deleteBreakroomItem(id);
  }

  @Patch('/:id')
  updateSpecialRequest(@Param('id', ParseIntPipe) id: number, @Body() breakroomDto: BreakroomDto): Promise<BreakroomEntity> {
    return this.breakroomService.updateBreakroomItem(id, breakroomDto)
  }

}
