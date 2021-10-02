import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { GeneralDto } from "./general.dto";
import { GeneralEntity } from "./general.entity";
import { GeneralService } from "./general.service";

@Controller('general')
export class GeneralController {
    constructor(
        private generalService: GeneralService
      ) { }
  
    @Get()
    getGeneralItems(): Promise<GeneralEntity[]> {
      return this.generalService.getGeneralItems();
    }
  
    @Get('/:id')
    getGeneralItem(@Param('id', ParseIntPipe) id: number): Promise<GeneralEntity> {
      return this.generalService.getGeneralItem(id);
    }
  
    @Post()
    @UsePipes(ValidationPipe)
    createGeneralItem(@Body() generalDto: GeneralDto): Promise<GeneralEntity> {
      return this.generalService.createGeneralItem(generalDto)
    }
  
    @Delete('/:id')
    deleteGeneralItem(@Param('id', ParseIntPipe) id: number): void {
      this.generalService.deleteGeneralItem(id);
    }
  
    @Patch('/:id')
    updateGeneralItem(@Param('id', ParseIntPipe) id: number, @Body() generalDto: GeneralDto): Promise<GeneralEntity> {
      return this.generalService.updateGeneralItem(id, generalDto)
    }
  
  }
  