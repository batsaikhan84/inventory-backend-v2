import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OfficeSupplyDto } from './office-supply.dto';
import { OfficeSupplyEntity } from './office-supply.entity';
import { OfficeSupplyService } from './office-supply.service';

@Controller('office-supply')
export class OfficeSupplyController {
    constructor(
      private officeSupplyService: OfficeSupplyService
    ) { }

  @Get()
  getOfficeSupplyItems(): Promise<OfficeSupplyEntity[]> {
    return this.officeSupplyService.getOfficeSupplyItems();
  }

  @Get('/:id')
  getOfficeSupplyItem(@Param('id', ParseIntPipe) id: number): Promise<OfficeSupplyEntity> {
    return this.officeSupplyService.getOfficeSupplyItem(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createStoreRoomRequest(@Body() officeSupplyDto: OfficeSupplyDto): Promise<OfficeSupplyEntity> {
    return this.officeSupplyService.createOfficeSupplyItem(officeSupplyDto)
  }

  @Delete('/:id')
  deleteSpecialRequest(@Param('id', ParseIntPipe) id: number): void {
    this.officeSupplyService.deleteOfficeSupplyItem(id);
  }

  @Patch('/:id')
  updateSpecialRequest(@Param('id', ParseIntPipe) id: number, @Body() OfficeSupplyDto: OfficeSupplyDto): Promise<OfficeSupplyEntity> {
    return this.officeSupplyService.updateOfficeSupplyItem(id, OfficeSupplyDto)
  }

}
