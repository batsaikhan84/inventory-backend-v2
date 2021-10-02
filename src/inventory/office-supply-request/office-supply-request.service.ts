import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OfficeSupplyRequestDto } from './office-supply-request.dto';
import { OfficeSupplyRequestEntity } from './office-supply-request.entity';
import { OfficeSupplyRequestRepository } from './office-supply-request.repository';

@Injectable()
export class OfficeSupplyRequestService {
    constructor(
      @InjectRepository(OfficeSupplyRequestRepository)
      private officeSupplyRequestRepository: OfficeSupplyRequestRepository,
    ) { }
  public async getOfficeSupplyRequestItems(): Promise<OfficeSupplyRequestEntity[]> {
    const officeSupplyRequestItems = await this.officeSupplyRequestRepository.find({ relations: ['master'] })
    if (!officeSupplyRequestItems) {
      throw new NotFoundException();
    }
    return officeSupplyRequestItems;
  }
  public async getOfficeSupplyRequestItem(id: number): Promise<OfficeSupplyRequestEntity> {
    const officeSupplyRequestItem = await this.officeSupplyRequestRepository.findOne(id, { relations: ['master'] });
    if (!officeSupplyRequestItem) {
      throw new NotFoundException();
    }
    return officeSupplyRequestItem
  }
  public async createOfficeSupplyRequestItem(officeSupplyRequestDto: OfficeSupplyRequestDto): Promise<OfficeSupplyRequestEntity> {
    return this.officeSupplyRequestRepository.createOfficeSupplyRequestItem(officeSupplyRequestDto);
  }
  public async deleteOfficeSupplyRequestItem(id: number): Promise<void> {
    const result = await this.officeSupplyRequestRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  public async updateOfficeSupplyRequestItem(id: number, officeSupplyRequestDto: OfficeSupplyRequestDto): Promise<OfficeSupplyRequestEntity> {
    const officeSupplyRequestItem = await this.getOfficeSupplyRequestItem(id)
    officeSupplyRequestItem.quantity = officeSupplyRequestDto.quantity;
    officeSupplyRequestItem.department = officeSupplyRequestDto.department;
    officeSupplyRequestItem.status = officeSupplyRequestDto.status;
    officeSupplyRequestItem.time_updated = officeSupplyRequestDto.time_updated
    officeSupplyRequestItem.is_confirmed = officeSupplyRequestDto.is_confirmed
    officeSupplyRequestItem.comment = officeSupplyRequestDto.comment
    officeSupplyRequestItem.user = officeSupplyRequestDto.user
    await officeSupplyRequestItem.save();
    return officeSupplyRequestItem
  }
}
