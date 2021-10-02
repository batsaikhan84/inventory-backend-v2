import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BreakroomRequestDto } from './breakroom-request.dto';
import { BreakroomRequestEntity } from './breakroom-request.entity';
import { BreakroomRequestRepository } from './breakroom-request.repository';

@Injectable()
export class BreakroomRequestService {
    constructor(
      @InjectRepository(BreakroomRequestRepository)
      private breakroomRequestRepository: BreakroomRequestRepository,
    ) { }
  public async getBreakroomRequestItems(): Promise<BreakroomRequestEntity[]> {
    const BreakroomRequestItems = await this.breakroomRequestRepository.find({ relations: ['master'] })
    if (!BreakroomRequestItems) {
      throw new NotFoundException();
    }
    return BreakroomRequestItems;
  }
  public async getBreakroomRequestItem(id: number): Promise<BreakroomRequestEntity> {
    const BreakroomRequestItem = await this.breakroomRequestRepository.findOne(id, { relations: ['master'] });
    if (!BreakroomRequestItem) {
      throw new NotFoundException();
    }
    return BreakroomRequestItem
  }
  public async createBreakroomRequestItem(breakroomRequestDto: BreakroomRequestDto): Promise<BreakroomRequestEntity> {
    return this.breakroomRequestRepository.createBreakroomRequestItem(breakroomRequestDto);
  }
  public async deleteBreakroomRequestItem(id: number): Promise<void> {
    const result = await this.breakroomRequestRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  public async updateBreakroomRequestItem(id: number, breakroomRequestDto: BreakroomRequestDto): Promise<BreakroomRequestEntity> {
    const breakroomRequestItem = await this.getBreakroomRequestItem(id)
    breakroomRequestItem.quantity = breakroomRequestDto.quantity;
    breakroomRequestItem.department = breakroomRequestDto.department;
    breakroomRequestItem.status = breakroomRequestDto.status;
    breakroomRequestItem.time_updated = breakroomRequestDto.time_updated
    breakroomRequestItem.is_confirmed = breakroomRequestDto.is_confirmed
    breakroomRequestItem.comment = breakroomRequestDto.comment
    breakroomRequestItem.user = breakroomRequestDto.user
    await breakroomRequestItem.save();
    return breakroomRequestItem
  }
}
