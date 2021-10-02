import { ExtractionsDto } from './extractions.dto';
import { ExtractionsEntity } from './extractions.entity';
import { ExtractionsRepository } from './extractions.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { Cron } from '@nestjs/schedule';
import { UserDto } from '../user/userDto';
import { AnalyticsRepository } from '../analytics/analytics.repository';
import { MasterService } from '../master/master.service';

@Injectable()
export class ExtractionsService {
  constructor(
    @InjectRepository(ExtractionsRepository)
    private extractionsRepository: ExtractionsRepository,
    private analyticsRepository: AnalyticsRepository,
    private emailService: EmailService,
    private masterService: MasterService,
  ) { }
  public async getExtractionsTotalItems() {
    const extractionsItems = await this.getExtractionsItems()
    return this.extractionsRepository.getItemsWithTotalQuantityByMasterId(extractionsItems)
  }
  public async getExtractionsItems(): Promise<ExtractionsEntity[]> {
    const extractionsItemsRes = await this.extractionsRepository.find({ relations: ['master'] });
    if (!extractionsItemsRes) {
      throw new NotFoundException();
    };
    return extractionsItemsRes;
  }

  public async getExtractionsItemsByMasterId(item_id: number): Promise<ExtractionsEntity[]> {
    const extractionsItemsRes = await this.extractionsRepository.find({ relations: ['master'], where: { item_id: item_id } });
    if (extractionsItemsRes.length === 0) {
      throw new NotFoundException();
    };
    return extractionsItemsRes;
  }

  public async getExtractionsTotalItemByMasterId(item_id: number): Promise<ExtractionsEntity> {
    const extractionsItemsRes = await this.extractionsRepository.find({ relations: ['master'], where: { item_id: item_id } });
    if (extractionsItemsRes.length === 0) {
      throw new NotFoundException();
    };
    return this.extractionsRepository.getItemWithTotalQuantityByMasterId(extractionsItemsRes)
  }

  public async getExtractionsItem(id: number): Promise<ExtractionsEntity> {
    const extractionsItemRes = await this.extractionsRepository.findOne(id, { relations: ['master'] });
    if (!extractionsItemRes) {
      throw new NotFoundException();
    }
    return extractionsItemRes
  }
  public async createExtractionsItem(extractionDto: ExtractionsDto): Promise<ExtractionsEntity> {
    return this.extractionsRepository.createExtractionsItem(extractionDto);
  }
  public async deleteExtractionsItem(id: number): Promise<void> {
    const result = await this.extractionsRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  public async updateExtractionsItem(
    id: number, departmentDto: ExtractionsDto, userDto: UserDto,): Promise<ExtractionsEntity> {
    const departmentItemRes = await this.getExtractionsItem(id)

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
        department: 'extractions',
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
    departmentItemRes.expiration_date = departmentDto.expiration_date;
    departmentItemRes.received_date = departmentDto.received_date;
    departmentItemRes.lot_number = departmentDto.lot_number;

    await departmentItemRes.save();
    return departmentItemRes;
  }

  @Cron('01 00 7 * * 2')
  // @Cron('46 * * * * *')
  public async scheduledExtractionItems() {
    const extractionsItemsRes = await this.extractionsRepository.find({ relations: ['master'] });
    if (!extractionsItemsRes) {
      throw new NotFoundException();
    };
    const scheduledItems = this.extractionsRepository.getItemsForEmail(extractionsItemsRes);
    if (scheduledItems.length > 0) {
      this.emailService.sendScheduledEmail(scheduledItems, 'Extraction')
    }
  }
}