import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BreakroomRequestDto } from './breakroom-request.dto';
import { BreakroomRequestEntity } from './breakroom-request.entity';
import { BreakroomRequestService } from './breakroom-request.service';

@Controller('breakroom-requests')
export class BreakroomRequestController {
    constructor(
      private breakroomRequestService: BreakroomRequestService
    ) { }

  @Get()
  getBreakroomRequestItems(): Promise<BreakroomRequestEntity[]> {
    return this.breakroomRequestService.getBreakroomRequestItems();
  }

  @Get('/:id')
  getBreakroomRequestItem(@Param('id', ParseIntPipe) id: number): Promise<BreakroomRequestEntity> {
    return this.breakroomRequestService.getBreakroomRequestItem(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBreakroomRequestItem(@Body() breakroomRequestDto: BreakroomRequestDto): Promise<BreakroomRequestEntity> {
    return this.breakroomRequestService.createBreakroomRequestItem(breakroomRequestDto)
  }

  @Delete('/:id')
  deleteBreakroomRequestItem(@Param('id', ParseIntPipe) id: number): void {
    this.breakroomRequestService.deleteBreakroomRequestItem(id);
  }
  
  @Patch('/:id')
  updateBreakroomRequestItem(@Param('id', ParseIntPipe) id: number, @Body() breakroomRequestDto: BreakroomRequestDto): Promise<BreakroomRequestEntity> {
    return this.breakroomRequestService.updateBreakroomRequestItem(id, breakroomRequestDto)
  }

}
