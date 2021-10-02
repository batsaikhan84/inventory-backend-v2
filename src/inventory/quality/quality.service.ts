import { QualityDto } from './quality.dto';
import { QualityEntity } from './quality.entity';
import { QualityRepository } from './quality.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { EmailService } from '../email/email.service';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { MasterService } from '../master/master.service';
import { UserDto } from '../user/userDto';

@Injectable()
export class QualityService {
  constructor(
    @InjectRepository(QualityRepository)
    private qualityRepository: QualityRepository,
    private analyticsRepository: AnalyticsRepository,
    private emailService: EmailService,
    private masterService: MasterService,
  ) { }

  public async getQualityTotalItems(): Promise<QualityEntity[]> {
    const qualityItems = await this.qualityRepository.find({ relations: ['master'] })
    if (!qualityItems) {
      throw new NotFoundException();
    }
    return this.qualityRepository.getQuantityTotalItems(qualityItems)
  }

  public async getTotalItemByMasterId(item_id: number): Promise<QualityEntity> {
    const itemRes = await this.qualityRepository.find({ relations: ['master'], where: { item_id: item_id } });
    if (itemRes.length === 0) {
        throw new NotFoundException();
    };
    return this.qualityRepository.getItemWithTotalQuantityByMasterId(itemRes)
}

public async getItemsByMasterId(item_id: number): Promise<QualityEntity[]> {
    const itemsRes = await this.qualityRepository.find({ relations: ['master'], where: { item_id: item_id } });
    if (itemsRes.length === 0) {
        throw new NotFoundException();
    };
    return itemsRes;
}

  public async getQualityItems(): Promise<QualityEntity[]> {
    const qualityItems = await this.qualityRepository.find({ relations: ['master'] })
    if (!qualityItems) {
      throw new NotFoundException();
    }
    return qualityItems;
  }
  public async getQualityItem(id: number): Promise<QualityEntity> {
    const qualityItem = await this.qualityRepository.findOne(id);
    if (!qualityItem) {
      throw new NotFoundException();
    }
    return qualityItem
  }
  public async createQualityItem(qualityDto: QualityDto): Promise<QualityEntity> {
    return this.qualityRepository.createQualityItem(qualityDto);
  }
  public async deleteQualityItem(id: number): Promise<void> {
    const result = await this.qualityRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  public async updateQualityItem(
    id: number, departmentDto: QualityDto, userDto: UserDto,): Promise<QualityEntity> {
    const departmentItemRes = await this.getQualityItem(id)
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
        department: 'quality',
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
  // @Cron('47 * * * * *')
  public async scheduledQualityItems() {
    const qualityItemsRes = await this.qualityRepository.find({ relations: ['master'] });
    if (!qualityItemsRes) {
      throw new NotFoundException();
    };
    const scheduledItems = this.qualityRepository.getItemsForEmail(qualityItemsRes);
    if (scheduledItems.length > 0) {
      this.emailService.sendScheduledEmail(scheduledItems, 'Quality')
    }
  }
}
