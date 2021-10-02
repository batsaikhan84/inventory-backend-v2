import { MassSpecDto } from './mass-spec.dto';
import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe, Controller, Get, UsePipes } from '@nestjs/common';
import { MassSpecService } from './mass-spec.service';
import { MassSpecEntity } from './mass-spec.entity';
import { UserDto } from '../user/userDto';

@Controller('mass-spec')
export class MassSpecController {
  constructor(private massSpecService: MassSpecService) { }


  @Get()
  getMassSpecItems(): Promise<MassSpecEntity[]> {
    return this.massSpecService.getMassSpecItems();
  }

  @Get('/email')
  sendEmailReport(): void {
      this.massSpecService.scheduledMassSpecItems()
  }

  @Get('/master/:item_id')
  getExtractionsItemsByMasterId(
      @Param('item_id', ParseIntPipe) item_id: number
  ): Promise<MassSpecEntity[]> {
      return this.massSpecService.getItemsByMasterId(item_id);
  }

  @Get('/total')
  getMassSpecTotalItems(): Promise<MassSpecEntity[]> {
    return this.massSpecService.getMassSpecTotalItems();
  }

  @Get('/total/:item_id')
  getExtractionsTotalItem(
      @Param('item_id', ParseIntPipe) item_id: number
  ): Promise<MassSpecEntity> {
      return this.massSpecService.getTotalItemByMasterId(item_id);
  }


  @Get('/:id')
  getMassSpecItem(@Param('id', ParseIntPipe) id: number): Promise<MassSpecEntity> {
    return this.massSpecService.getMassSpecItem(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createMassSpec(@Body() massSpecDto: MassSpecDto): Promise<MassSpecEntity> {
    return this.massSpecService.createMassSpecItem(massSpecDto)
  }

  @Delete('/:id')
  deleteExtraction(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.massSpecService.deleteItem(id);
  }

  @Patch('/:id')
  updateMassSpec(
    @Param('id', ParseIntPipe) id: number,
    @Body('departmentItem') massSpecDto: MassSpecDto,
    @Body('currentUser') userDto: UserDto,
  ): Promise<MassSpecEntity> {
    return this.massSpecService.updateMassSpecItem(id, massSpecDto, userDto,)
  }
}
