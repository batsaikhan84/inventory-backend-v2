import { EmailService } from './../email/email.service';
import { ScreeningEntity } from './screening.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScreeningRepository } from './screening.repository';
import { ScreeningDto } from './screening.dto';
import { Cron } from '@nestjs/schedule';
import { UserDto } from '../user/userDto';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { MasterService } from '../master/master.service';

@Injectable()
export class ScreeningService {
    constructor(
        @InjectRepository(ScreeningRepository)
        private screeningRepository: ScreeningRepository,
        private analyticsRepository: AnalyticsRepository,
        private emailService: EmailService,
        private masterService: MasterService,
    ) { }
    public async getScreeningTotalItems(): Promise<ScreeningEntity[]> {
        const screeningItems = await this.screeningRepository.find({ relations: ['master'] })
        if (!screeningItems) {
            throw new NotFoundException();
        }
        return this.screeningRepository.getScreeningTotalItems(screeningItems)
    }

    public async getTotalItemByMasterId(item_id: number): Promise<ScreeningEntity> {
        const itemRes = await this.screeningRepository.find({ relations: ['master'], where: { item_id: item_id } });
        if (itemRes.length === 0) {
            throw new NotFoundException();
        };
        return this.screeningRepository.getItemWithTotalQuantityByMasterId(itemRes)
    }

    public async getItemsByMasterId(item_id: number): Promise<ScreeningEntity[]> {
        const itemsRes = await this.screeningRepository.find({ relations: ['master'], where: { item_id: item_id } });
        if (itemsRes.length === 0) {
            throw new NotFoundException();
        };
        return itemsRes;
    }

    public async getScreeningItems(): Promise<ScreeningEntity[]> {
        const screeningItems = await this.screeningRepository.find({ relations: ['master'] })
        if (!screeningItems) {
            throw new NotFoundException();
        }
        return screeningItems;
    }
    public async getScreeningItem(id: number): Promise<ScreeningEntity> {
        const screeningItem = await this.screeningRepository.findOne(id);
        if (!screeningItem) {
            throw new NotFoundException();
        }
        return screeningItem
    }
    public async createScreeningItem(screeningDto: ScreeningDto): Promise<ScreeningEntity> {
        return this.screeningRepository.createScreeningItem(screeningDto);
    }
    public async deleteItem(id: number): Promise<void> {
        const result = await this.screeningRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException();
        }
    }

    public async updateScreeningItem(
        id: number, departmentDto: ScreeningDto, userDto: UserDto,): Promise<ScreeningEntity> {
          const departmentItemRes = await this.getScreeningItem(id)
          if(departmentItemRes.quantity !== departmentDto.quantity) {
            const masterItemRes = await this.masterService.masterItem(departmentDto.item_id)
            const received = departmentDto.quantity > departmentItemRes.quantity ? true : false
            const issued = departmentDto.quantity < departmentItemRes.quantity ? true: false
            const received_cost = departmentDto.quantity > departmentItemRes.quantity ? (departmentDto.quantity - departmentItemRes.quantity) * masterItemRes.average_unit_price : null
            const issued_cost = departmentDto.quantity < departmentItemRes.quantity ? (departmentItemRes.quantity - departmentDto.quantity) * masterItemRes.average_unit_price : null
            const number_received = departmentDto.quantity > departmentItemRes.quantity ? departmentDto.quantity - departmentItemRes.quantity : null
            const number_issued = departmentDto.quantity < departmentItemRes.quantity ? departmentItemRes.quantity - departmentDto.quantity : null
            const analytics = {
              item_id: departmentDto.item_id, 
              new_quantity: departmentDto.quantity, 
              old_quantity: departmentItemRes.quantity, 
              user: userDto.fullName, 
              department: 'screening',
              issued: issued,
              received: received,
              issued_cost: issued_cost,
              received_cost: received_cost,
              number_received: number_received,
              number_issued: number_issued
            }
            this.analyticsRepository.createAnalytics(analytics)
          }
      
          departmentItemRes.item_id = departmentDto.item_id;
          departmentItemRes.location = departmentDto.location;
          departmentItemRes.quantity = departmentDto.quantity;
          departmentItemRes.usage_level = departmentDto.usage_level;
          departmentItemRes.min_quantity = departmentDto.min_quantity;
          departmentItemRes.max_quantity = departmentDto.max_quantity;
      
          await departmentItemRes.save();
          return departmentItemRes;
    }
    @Cron('04 00 7 * * 2')
    // @Cron('44 * * * * *')
    public async scheduledScreeningItems() {
        const screeningItemsRes = await this.screeningRepository.find({ relations: ['master'] });
        if (!screeningItemsRes) {
            throw new NotFoundException();
        };
        const scheduledItems = this.screeningRepository.getItemsForEmail(screeningItemsRes);
        if (scheduledItems.length > 0) {
            this.emailService.sendScheduledEmail(scheduledItems, 'Screening')
        }
    }
}
