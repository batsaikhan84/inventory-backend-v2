import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficeSupplyDto } from './office-supply.dto';
import { OfficeSupplyEntity } from './office-supply.entity';
import { OfficeSupplyRepository } from './office-supply.repository';


@Injectable()
export class OfficeSupplyService {
  constructor(
    @InjectRepository(OfficeSupplyRepository)
    private officeSupplyRepository: OfficeSupplyRepository,
  ) { }
  public async getOfficeSupplyItems(): Promise<OfficeSupplyEntity[]> {
    const officeSupplyRequestItems = await this.officeSupplyRepository.find({ relations: ['master'] })
    if (!officeSupplyRequestItems) {
      throw new NotFoundException();
    }
    return officeSupplyRequestItems;
  }
  public async getOfficeSupplyItem(id: number): Promise<OfficeSupplyEntity> {
    const officeSupplyRequestItem = await this.officeSupplyRepository.findOne(id, { relations: ['master'] });
    if (!officeSupplyRequestItem) {
      throw new NotFoundException();
    }
    return officeSupplyRequestItem
  }
  public async createOfficeSupplyItem(officeSupplyDto: OfficeSupplyDto): Promise<OfficeSupplyEntity> {
    return this.officeSupplyRepository.createOfficeSupplyItem(officeSupplyDto);
  }
  public async deleteOfficeSupplyItem(id: number): Promise<void> {
    const result = await this.officeSupplyRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  public async updateOfficeSupplyItem(id: number, officeSupplyDto: OfficeSupplyDto): Promise<OfficeSupplyEntity> {
    const officeSupplyItem = await this.getOfficeSupplyItem(id)
    officeSupplyItem.item_id = officeSupplyDto.item_id;
    officeSupplyItem.location = officeSupplyDto.location;
    officeSupplyItem.quantity = officeSupplyDto.quantity;
    officeSupplyItem.usage_level = officeSupplyDto.usage_level
    officeSupplyItem.min_quantity = officeSupplyDto.min_quantity;
    officeSupplyItem.max_quantity = officeSupplyDto.max_quantity;
    officeSupplyItem.updated_on = new Date()
    await officeSupplyItem.save();
    return officeSupplyItem
  }
}
