import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalyticsEntity } from './analytics.entity';
import { AnalyticsRepository } from './analytics.repository';
import { AnalyticsDto } from './analytics-dto';

@Injectable()
export class AnalyticsService {
    constructor(
        @InjectRepository(AnalyticsRepository)
        private analyticsRepository: AnalyticsRepository
    ) { }
    async createAnalytics(analyticsDto: AnalyticsDto): Promise<AnalyticsEntity> {
        return this.analyticsRepository.createAnalytics(analyticsDto)
    }
    async getAnalytics(): Promise<AnalyticsEntity[]> {
        const analytics = await this.analyticsRepository.find({ relations: ['master'] });
        if (!analytics) {
            throw new NotFoundException();
        };
        return analytics;
    }

}
