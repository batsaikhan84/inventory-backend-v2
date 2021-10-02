import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GeneralRequestDto } from './general-request.dto';
import { GeneralRequestEntity } from './general-request.entity';
import { GeneralRequestService } from './general-request.service';

@Controller('general-requests')
export class GeneralRequestController {
    constructor(
        private generalRequestService: GeneralRequestService
    ) { }
    @Get()
    getGeneralRequestItems(): Promise<GeneralRequestEntity[]> {
        return this.generalRequestService.getGeneralRequestItems();
    }
    @Get('/:id')
    getGeneralRequestItem(@Param('id', ParseIntPipe) id: number): Promise<GeneralRequestEntity> {
        return this.generalRequestService.getGeneralRequestItem(id);
    }
    @Post()
    @UsePipes(ValidationPipe)
    createGeneralRequestItem(@Body() generalRequestDto: GeneralRequestDto): Promise<GeneralRequestEntity> {
        return this.generalRequestService.createGeneralRequestItem(generalRequestDto)
    }
    @Delete('/:id')
    deleteGeneralRequestItem(@Param('id', ParseIntPipe) id: number): void {
        this.generalRequestService.deleteGeneralRequestItem(id);
    }
    @Patch('/:id')
    updateGeneralRequestItem(@Param('id', ParseIntPipe) id: number, @Body() generalRequestDto: GeneralRequestDto): Promise<GeneralRequestEntity> {
        return this.generalRequestService.updateGeneralRequestItem(id, generalRequestDto)
    }

}
