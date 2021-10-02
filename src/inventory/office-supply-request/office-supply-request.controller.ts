import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OfficeSupplyRequestDto } from './office-supply-request.dto';
import { OfficeSupplyRequestEntity } from './office-supply-request.entity';
import { OfficeSupplyRequestService } from './office-supply-request.service';

@Controller('office-supply-requests')
export class OfficeSupplyRequestController {
    constructor(
      private officeSupplyRequestService: OfficeSupplyRequestService
    ) { }

  @Get()
  getOfficeSupplyRequestItems(): Promise<OfficeSupplyRequestEntity[]> {
    return this.officeSupplyRequestService.getOfficeSupplyRequestItems();
  }

  @Get('/:id')
  getOfficeSupplyRequestItem(@Param('id', ParseIntPipe) id: number): Promise<OfficeSupplyRequestEntity> {
    return this.officeSupplyRequestService.getOfficeSupplyRequestItem(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createOfficeSupplyRequestItem(@Body() officeSupplyRequestDto: OfficeSupplyRequestDto): Promise<OfficeSupplyRequestEntity> {
    return this.officeSupplyRequestService.createOfficeSupplyRequestItem(officeSupplyRequestDto)
  }

  @Delete('/:id')
  deleteOfficeSupplyRequestItem(@Param('id', ParseIntPipe) id: number): void {
    this.officeSupplyRequestService.deleteOfficeSupplyRequestItem(id);
  }
  
  @Patch('/:id')
  updateOfficeSupplyRequestItem(@Param('id', ParseIntPipe) id: number, @Body() officeSupplyRequestDto: OfficeSupplyRequestDto): Promise<OfficeSupplyRequestEntity> {
    return this.officeSupplyRequestService.updateOfficeSupplyRequestItem(id, officeSupplyRequestDto)
  }

}
