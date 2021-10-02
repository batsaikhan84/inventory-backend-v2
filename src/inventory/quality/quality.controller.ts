import { QualityDto } from './quality.dto';
import { QualityEntity } from './quality.entity';
import { QualityService } from './quality.service';
import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe, Controller, Get, UsePipes } from '@nestjs/common';
import { UserDto } from '../user/userDto';

@Controller('quality')
export class QualityController {
    constructor(private qualityService: QualityService) {}
    @Get()
    getQualityItems(): Promise<QualityEntity[]> {
        return this.qualityService.getQualityItems();
    }
    @Get('/email')
    sendEmailReport(): void {
        this.qualityService.scheduledQualityItems()
    }

    @Get('/total/:item_id')
    getExtractionsTotalItem(
        @Param('item_id', ParseIntPipe) item_id: number
    ): Promise<QualityEntity> {
        return this.qualityService.getTotalItemByMasterId(item_id);
    }

    @Get('/master/:item_id')
    getExtractionsItemsByMasterId(
        @Param('item_id', ParseIntPipe) item_id: number
    ): Promise<QualityEntity[]> {
        return this.qualityService.getItemsByMasterId(item_id);
    }

    @Get('/total')
    getQualityTotalItems(): Promise<QualityEntity[]> {
        return this.qualityService.getQualityTotalItems();
    }
    @Get('/:id')
    getQualityItem(@Param('id', ParseIntPipe) id: number): Promise<QualityEntity> {
        return this.qualityService.getQualityItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createQuality(@Body() qualityDto: QualityDto): Promise<QualityEntity> {
        return this.qualityService.createQualityItem(qualityDto)
    }
    @Delete('/:id')
    deleteQuality(@Param('id', ParseIntPipe) id: number): void {
        this.qualityService.deleteQualityItem(id);
    }
    @Patch('/:id')
    updateQuality(
        @Param('id', ParseIntPipe) id: number, 
        @Body('departmentItem') qualityDto: QualityDto,
        @Body('currentUser') userDto: UserDto,
        ): Promise<QualityEntity> {
        return this.qualityService.updateQualityItem(id, qualityDto, userDto,)
    }
}
