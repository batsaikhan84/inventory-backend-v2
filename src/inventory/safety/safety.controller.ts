import { Body, Param, Post, ValidationPipe, Patch, Delete, ParseIntPipe, Controller, Get, UsePipes } from '@nestjs/common';
import { SafetyDto } from './safety.dto';
import { SafetyEntity } from './safety.entity';
import { SafetyService } from './safety.service';

@Controller('safety')
export class SafetyController {
    constructor(private safetyService: SafetyService) {}
    @Get()
    getSafetyItems(): Promise<SafetyEntity[]> {
        return this.safetyService.getSafetyItems();
    }
    @Get('/:id')
    getSafetyItem(@Param('id', ParseIntPipe) id: number): Promise<SafetyEntity> {
        return this.safetyService.getSafetyItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createSafety(@Body() safetyDto: SafetyDto): Promise<SafetyEntity> {
        return this.safetyService.createSafetyItem(safetyDto)
    }
    @Delete('/:id')
    deleteSafety(@Param('id', ParseIntPipe) id: number): void {
        this.safetyService.deleteSafetyItem(id);
    }
    @Patch('/:id')
    updateSafety(@Param('id', ParseIntPipe) id: number, @Body() safetyDto: SafetyDto): Promise<SafetyEntity> {
        return this.safetyService.updateSafetyItem(id, safetyDto)
    }
}
