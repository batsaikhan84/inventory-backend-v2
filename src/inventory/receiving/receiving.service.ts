import { EmailService } from './../email/email.service';
import { ReceivingDto } from './receiving.dto';
import { ReceivingEntity } from './receving.entity';
import { ReceivingRepository } from './receiving.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { MasterService } from '../master/master.service';
import { UserDto } from '../user/userDto';

@Injectable()
export class ReceivingService {
  constructor(
    @InjectRepository(ReceivingRepository)
    private recevingRepository: ReceivingRepository,
    private analyticsRepository: AnalyticsRepository,
    private emailService: EmailService,
    private masterService: MasterService,
  ) { }

  public async getReceivingTotalItems(): Promise<ReceivingEntity[]> {
    const receivingItems = await this.recevingRepository.find({ relations: ['master'] })
    if (!receivingItems) {
      throw new NotFoundException();
    }
    return this.recevingRepository.getItemsWithTotalQuantityByMasterId(receivingItems)
  }

  public async getExtractionsTotalItemByMasterId(item_id: number): Promise<ReceivingEntity> {
    const extractionsItemsRes = await this.recevingRepository.find({ relations: ['master'], where: { item_id: item_id } });
    if (extractionsItemsRes.length === 0) {
      throw new NotFoundException();
    };
    return this.recevingRepository.getItemWithTotalQuantityByMasterId(extractionsItemsRes)
  }

  public async getTotalItemByMasterId(item_id: number): Promise<ReceivingEntity> {
    const itemRes = await this.recevingRepository.find({ relations: ['master'], where: { item_id: item_id } });
    if (itemRes.length === 0) {
      throw new NotFoundException();
    };
    return this.recevingRepository.getItemWithTotalQuantityByMasterId(itemRes)
  }

  public async getItemsByMasterId(item_id: number): Promise<ReceivingEntity[]> {
    const itemsRes = await this.recevingRepository.find({ relations: ['master'], where: { item_id: item_id } });
    if (itemsRes.length === 0) {
      throw new NotFoundException();
    };
    return itemsRes;
  }

  public async getReceivingItems(): Promise<ReceivingEntity[]> {
    const receivingItems = await this.recevingRepository.find({ relations: ['master'] })
    if (!receivingItems) {
      throw new NotFoundException();
    }
    return receivingItems;
  }

  public async getReceivingItem(id: number): Promise<ReceivingEntity> {
    const receivingItem = await this.recevingRepository.findOne(id, { relations: ['master'] });
    if (!receivingItem) {
      throw new NotFoundException();
    }
    return receivingItem
  }

  public async createReceivingItem(receivingDto: ReceivingDto): Promise<ReceivingEntity> {
    return this.recevingRepository.createReceivingItem(receivingDto);
  }

  public async deleteItem(id: number): Promise<void> {
    const result = await this.recevingRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  public async updateReceivingItem(
    id: number, departmentDto: ReceivingDto, userDto: UserDto,): Promise<ReceivingEntity> {
    const departmentItemRes = await this.getReceivingItem(id)
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
        department: 'receiving',
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
  @Cron('03 00 7 * * 2')
  // @Cron('49 * * * * *')
  public async scheduledReceivingItems() {
    const receivingItemsRes = await this.recevingRepository.find({ relations: ['master'] });
    if (!receivingItemsRes) {
      throw new NotFoundException();
    };
    const scheduledItems = this.recevingRepository.getItemsForEmail(receivingItemsRes);
    if (scheduledItems.length > 0) {
      this.emailService.sendScheduledEmail(scheduledItems, 'Receiving')
    }
  }
}
