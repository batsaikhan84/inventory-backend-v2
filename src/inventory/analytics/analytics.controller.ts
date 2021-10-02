import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnalyticsEntity } from './analytics.entity';
import { AnalyticsService } from './analytics.service';
import { AnalyticsDto } from './analytics-dto';

@Controller('analytics')
export class AnalyticsController {
    constructor(private analyticsService: AnalyticsService) { }
    @Post()
    createAnalytics(@Body() analyticsDto: AnalyticsDto): Promise<AnalyticsEntity> {
        return this.analyticsService.createAnalytics(analyticsDto)
    }
    @Get()
    getAnalytics(): Promise<AnalyticsEntity[]> {
        return this.analyticsService.getAnalytics()
    }
}
