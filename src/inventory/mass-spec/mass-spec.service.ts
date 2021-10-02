import { EmailService } from './../email/email.service';
import { MassSpecDto } from './mass-spec.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MassSpecEntity } from './mass-spec.entity';
import { MassSpecRepository } from './mass-spec.repository';
import { Cron } from '@nestjs/schedule';
import { UserDto } from '../user/userDto';
import { MasterService } from '../master/master.service';
import { AnalyticsRepository } from '../analytics/analytics.repository';

@Injectable()
export class MassSpecService {
  constructor(
    @InjectRepository(MassSpecRepository)
    private massSpecRepository: MassSpecRepository,
    private analyticsRepository: AnalyticsRepository,
    private emailService: EmailService,
    private masterService: MasterService,
  ) { }

  public async getMassSpecTotalItems() {
    const massSpecItems = await this.getMassSpecItems()
    return this.massSpecRepository.getMassSpecTotalItems(massSpecItems)
  }

  public async getMassSpecItems(): Promise<MassSpecEntity[]> {
    const massSpecItems = await this.massSpecRepository.find({ relations: ['master'] })

    if (!massSpecItems) {
      throw new NotFoundException();
    }
    return massSpecItems;
  }

  public async getTotalItemByMasterId(item_id: number): Promise<MassSpecEntity> {
    const itemRes = await this.massSpecRepository.find({ relations: ['master'], where: { item_id: item_id } });
    if (itemRes.length === 0) {
      throw new NotFoundException();
    };
    return this.massSpecRepository.getItemWithTotalQuantityByMasterId(itemRes)
  }

  public async getItemsByMasterId(item_id: number): Promise<MassSpecEntity[]> {
    const itemsRes = await this.massSpecRepository.find({ relations: ['master'], where: { item_id: item_id } });
    if (itemsRes.length === 0) {
      throw new NotFoundException();
    };
    return itemsRes;
  }

  public async getMassSpecItem(id: number): Promise<MassSpecEntity> {
    const massSpecItem = await this.massSpecRepository.findOne(id);
    if (!massSpecItem) {
      throw new NotFoundException();
    }
    return massSpecItem
  }
  public async createMassSpecItem(massSpecDto: MassSpecDto): Promise<MassSpecEntity> {
    return this.massSpecRepository.createMassSpecItem(massSpecDto);
  }
  public async deleteItem(id: number): Promise<void> {
    const result = await this.massSpecRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException();
    }

  }
  public async updateMassSpecItem(
    id: number, departmentDto: MassSpecDto, userDto: UserDto,): Promise<MassSpecEntity> {
    const departmentItemRes = await this.getMassSpecItem(id)
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
        department: 'mass_spec',
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
  public async scheduledMassSpecItems() {
    const massSpecItemsRes = await this.massSpecRepository.find({ relations: ['master'] });
    if (!massSpecItemsRes) {
      throw new NotFoundException();
    };
    const scheduledItems = this.massSpecRepository.getItemsForEmail(massSpecItemsRes);
    if (scheduledItems.length > 0) {
      this.emailService.sendScheduledEmail(scheduledItems, 'Mass Spec')
    }
  }
}
