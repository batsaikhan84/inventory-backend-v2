import { EmailService } from './../email/email.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { RdDto } from './rd.dto';
import { RdEntity } from './rd.entity';
import { RdRepository } from './rd.repository';
import { UserDto } from '../user/userDto';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { MasterService } from '../master/master.service';

@Injectable()
export class RdService {
    constructor(
        @InjectRepository(RdRepository)
        private rdRepository: RdRepository,
        private analyticsRepository: AnalyticsRepository,
        private emailService: EmailService,
        private masterService: MasterService,
    ) { }
    public async getRdTotalItems(): Promise<RdEntity[]> {
        const rdItems = await this.rdRepository.find({ relations: ['master'] })
        if (!rdItems) {
            throw new NotFoundException();
        }
        return this.rdRepository.getRdTotalItems(rdItems)
    }

    public async getTotalItemByMasterId(item_id: number): Promise<RdEntity> {
        const itemRes = await this.rdRepository.find({ relations: ['master'], where: { item_id: item_id } });
        if (itemRes.length === 0) {
            throw new NotFoundException();
        };
        return this.rdRepository.getItemWithTotalQuantityByMasterId(itemRes)
    }

    public async getItemsByMasterId(item_id: number): Promise<RdEntity[]> {
        const itemsRes = await this.rdRepository.find({ relations: ['master'], where: { item_id: item_id } });
        if (itemsRes.length === 0) {
            throw new NotFoundException();
        };
        return itemsRes;
    }

    public async getRdItems(): Promise<RdEntity[]> {
        const rdItems = await this.rdRepository.find({ relations: ['master'] })
        if (!rdItems) {
            throw new NotFoundException();
        }
        return rdItems;
    }
    public async getRdItem(id: number): Promise<RdEntity> {
        const rdItem = await this.rdRepository.findOne(id);
        if (!rdItem) {
            throw new NotFoundException();
        }
        return rdItem
    }
    public async createRdItem(rdDto: RdDto): Promise<RdEntity> {
        return this.rdRepository.createRdItem(rdDto);
    }
    public async deleteRdItem(id: number): Promise<void> {
        const result = await this.rdRepository.delete(id)
        if (result.affected === 0) {
            throw new NotFoundException();
        }
    }
    public async updateRdItem(
        id: number, departmentDto: RdDto, userDto: UserDto,): Promise<RdEntity> {
        const departmentItemRes = await this.getRdItem(id)
        if (departmentItemRes.quantity !== departmentDto.quantity) {
            const masterItemRes = await this.masterService.masterItem(departmentDto.item_id)
            const received = departmentDto.quantity > departmentItemRes.quantity ? true : false
            const issued = departmentDto.quantity < departmentItemRes.quantity ? true : false
            const received_cost = departmentDto.quantity > departmentItemRes.quantity ? (departmentDto.quantity - departmentItemRes.quantity) * masterItemRes.average_unit_price : null
            const issued_cost = departmentDto.quantity < departmentItemRes.quantity ? (departmentItemRes.quantity - departmentDto.quantity) * masterItemRes.average_unit_price : null
            const number_received = departmentDto.quantity > departmentItemRes.quantity ? departmentDto.quantity - departmentItemRes.quantity : null
            const number_issued = departmentDto.quantity < departmentItemRes.quantity ? departmentItemRes.quantity - departmentDto.quantity : null
            const analytics = {
                item_id: departmentDto.item_id,
                new_quantity: departmentDto.quantity,
                old_quantity: departmentItemRes.quantity,
                user: userDto.fullName,
                department: 'rd',
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
    @Cron('02 00 7 * * 2')
    // @Cron('48 * * * * *')
    public async scheduledRdItems() {
        const rdItemsRes = await this.rdRepository.find({ relations: ['master'] });
        if (!rdItemsRes) {
            throw new NotFoundException();
        };
        const scheduledItems = this.rdRepository.getItemsForEmail(rdItemsRes);
        if (scheduledItems.length > 0) {
            this.emailService.sendScheduledEmail(scheduledItems, 'R&D')
        }
    }
}
