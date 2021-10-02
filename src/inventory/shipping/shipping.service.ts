import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { Cron } from '@nestjs/schedule';
import { ShippingRepository } from './shipping.repository';
import { ShippingEntity } from './shipping.entity';
import { ShippingDto } from './shipping.dto';
import { UserDto } from '../user/userDto';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { MasterService } from '../master/master.service';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(ShippingRepository)
    private shippingRepository: ShippingRepository,
    private analyticsRepository: AnalyticsRepository,
    private emailService: EmailService,
    private masterService: MasterService,
  ) { }

  public async getShippingItems(): Promise<ShippingEntity[]> {
    const shippingItemsRes = await this.shippingRepository.find({ relations: ['master'] });
    if (!shippingItemsRes) {
      throw new NotFoundException();
    };
    return shippingItemsRes;
  }

  public async getTotalItemByMasterId(item_id: number): Promise<ShippingEntity> {
    const itemRes = await this.shippingRepository.find({ relations: ['master'], where: { item_id: item_id } });
    if (itemRes.length === 0) {
        throw new NotFoundException();
    };
    return this.shippingRepository.getItemWithTotalQuantityByMasterId(itemRes)
}

public async getItemsByMasterId(item_id: number): Promise<ShippingEntity[]> {
    const itemsRes = await this.shippingRepository.find({ relations: ['master'], where: { item_id: item_id } });
    if (itemsRes.length === 0) {
        throw new NotFoundException();
    };
    return itemsRes;
}

  public async getShippingItem(id: number): Promise<ShippingEntity> {
    const shippingItem = await this.shippingRepository.findOne(id, { relations: ['master'] });
    if (!shippingItem) {
      throw new NotFoundException();
    }
    return shippingItem
  }
  public async createShippingItem(shippingDto: ShippingDto): Promise<ShippingEntity> {
    return this.shippingRepository.createShippingItem(shippingDto);
  }
  public async deleteItem(id: number): Promise<void> {
    const result = await this.shippingRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  public async updateShippingItem(
    id: number, departmentDto: ShippingDto, userDto: UserDto): Promise<ShippingEntity> {
      const departmentItemRes = await this.getShippingItem(id)
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
          department: 'shipping',
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
  @Cron('01 00 7 * * 2')
  // @Cron('46 * * * * *')
  public async scheduledItems() {
    const itemsRes = await this.shippingRepository.find({ relations: ['master'] });
    if (!itemsRes) {
      throw new NotFoundException();
    };
    const scheduledItems = this.shippingRepository.getItemsForEmail(itemsRes);
    if (scheduledItems.length > 0) {
      this.emailService.sendScheduledEmail(scheduledItems, 'Shipping')
    }
  }
}
