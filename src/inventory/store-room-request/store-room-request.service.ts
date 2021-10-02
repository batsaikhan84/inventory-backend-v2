import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreRoomRequestDto } from './store-room-request.dto';
import { StoreRoomRequestEntity } from './store-room-request.entity';
import { StoreRoomRequestRepository } from './store-room-request.repository';

@Injectable()
export class StoreRoomRequestService {
  constructor(
    @InjectRepository(StoreRoomRequestRepository)
    private storeRoomRequestRepository: StoreRoomRequestRepository,
  ) { }
  public async storeRoomRequestItems(): Promise<StoreRoomRequestEntity[]> {
    const storeRoomRequestItems = await this.storeRoomRequestRepository.find({ relations: ['master'] })
    if (!storeRoomRequestItems) {
      throw new NotFoundException();
    }
    return storeRoomRequestItems;
  }
  public async storeRoomRequestItem(id: number): Promise<StoreRoomRequestEntity> {
    const storeRoomRequestItem = await this.storeRoomRequestRepository.findOne(id, { relations: ['master'] });
    if (!storeRoomRequestItem) {
      throw new NotFoundException();
    }
    return storeRoomRequestItem
  }
  public async createStoreRoomRequestItem(storeRoomRequestDto: StoreRoomRequestDto): Promise<StoreRoomRequestEntity> {
    return this.storeRoomRequestRepository.createStoreRoomRequestItem(storeRoomRequestDto);
  }
  public async deleteStoreRoomRequestItem(id: number): Promise<void> {
    const result = await this.storeRoomRequestRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  public async updateStoreRoomRequestItem(id: number, storeRoomRequestDto: StoreRoomRequestDto): Promise<StoreRoomRequestEntity> {
    const storeRoomRequestItem = await this.storeRoomRequestItem(id)
    storeRoomRequestItem.quantity = storeRoomRequestDto.quantity;
    storeRoomRequestItem.department = storeRoomRequestDto.department;
    storeRoomRequestItem.status = storeRoomRequestDto.status;
    storeRoomRequestItem.time_updated = storeRoomRequestDto.time_updated
    storeRoomRequestItem.is_confirmed = storeRoomRequestDto.is_confirmed
    storeRoomRequestItem.comment = storeRoomRequestDto.comment
    storeRoomRequestItem.user = storeRoomRequestDto.user
    await storeRoomRequestItem.save();
    return storeRoomRequestItem
  }
}
