import { ExtractionsDto } from './extractions.dto';
import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe, Controller, Get, UsePipes } from '@nestjs/common';
import { ExtractionsEntity } from './extractions.entity';
import { ExtractionsService } from './extractions.service';
import { UserDto } from '../user/userDto';

@Controller('extractions')
export class ExtractionsController {
    constructor(private extractionsService: ExtractionsService) { }

    @Get()
    getExtractionsItems(): Promise<ExtractionsEntity[]> {
        return this.extractionsService.getExtractionsItems();
    }

    @Get('/email')
    sendEmailReport(): void {
        this.extractionsService.scheduledExtractionItems()
    }
    
    @Get('/total')
    getExtractionsTotalItems(): Promise<ExtractionsEntity[]> {
        return this.extractionsService.getExtractionsTotalItems();
    }

    @Get('/total/:item_id')
    getExtractionsTotalItem(
        @Param('item_id', ParseIntPipe) item_id: number
    ): Promise<ExtractionsEntity> {
        return this.extractionsService.getExtractionsTotalItemByMasterId(item_id);
    }

    @Get('/master/:item_id')
    getExtractionsItemsByMasterId(
        @Param('item_id', ParseIntPipe) item_id: number
    ): Promise<ExtractionsEntity[]> {
        return this.extractionsService.getExtractionsItemsByMasterId(item_id);
    }

    @Get('/:id')
    getExtractionsItem(@Param('id', ParseIntPipe) id: number): Promise<ExtractionsEntity> {
        return this.extractionsService.getExtractionsItem(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createExtraction(@Body() extractionsDto: ExtractionsDto): Promise<ExtractionsEntity> {
        return this.extractionsService.createExtractionsItem(extractionsDto)
    }

    @Delete('/:id')
    deleteExtraction(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.extractionsService.deleteExtractionsItem(id);
    }

    @Patch('/:id')
    updateExtractionsItem(
        @Param('id', ParseIntPipe) id: number, 
        @Body('departmentItem') extractionsDto: ExtractionsDto,
        @Body('currentUser') userDto: UserDto,
        ): Promise<ExtractionsEntity> {
        return this.extractionsService.updateExtractionsItem(id, extractionsDto, userDto,)
    }
}
