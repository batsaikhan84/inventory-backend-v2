import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { EmailService } from '../email/email.service';
import { MasterService } from '../master/master.service';
import { UserDto } from '../user/userDto';
import { StoreRoomDto } from './store-room.dto';
import { StoreRoomEntity } from './store-room.entity';
import { StoreRoomRepository } from './store-room.repository';

@Injectable()
export class StoreRoomService {
  constructor(
    @InjectRepository(StoreRoomRepository)
    private storeRoomRepository: StoreRoomRepository,
    private analyticsRepository: AnalyticsRepository,
    private emailService: EmailService,
    private masterService: MasterService,
  ) { }
  public async getStoreRoomItems(): Promise<StoreRoomEntity[]> {
    const storeRoomItemsRes = await this.storeRoomRepository.find({ relations: ['master'] });
    if (!storeRoomItemsRes) {
      throw new NotFoundException();
    }
    return storeRoomItemsRes;
  }
  public async getStoreRoomItem(id: number): Promise<StoreRoomEntity> {
    const storeRoomItem = await this.storeRoomRepository.findOne(id, { relations: ['master'] });
    if (!storeRoomItem) {
      throw new NotFoundException();
    }
    return storeRoomItem
  }
  public async createStoreRoomItem(storeRoomDto: StoreRoomDto): Promise<StoreRoomEntity> {
    return this.storeRoomRepository.createStoreRoomItem(storeRoomDto);
  }
  public async deleteStoreRoomItem(id: number): Promise<void> {
    const result = await this.storeRoomRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  public async updateStoreRoomItem(
    id: number, departmentDto: StoreRoomDto, userDto: UserDto): Promise<StoreRoomEntity> {
      const departmentItemRes = await this.getStoreRoomItem(id)
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
          department: 'store_room',
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
  // @Cron('43 * * * * *')
  public async scheduledStoreRoomItems() {
    const storeRoomItemsRes = await this.storeRoomRepository.find({ relations: ['master'] });
    if (!storeRoomItemsRes) {
      throw new NotFoundException();
    };
    const items = this.storeRoomRepository.getStoreRoomItemsForEmail(storeRoomItemsRes);
    if (items.length > 0) {
      this.emailService.sendScheduledEmail(items, 'Store Room')
    }
  }
}