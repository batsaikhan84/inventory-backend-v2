import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BreakroomDto } from './breakroom.dto';
import { BreakroomEntity } from './breakroom.entity';
import { BreakroomRepository } from './breakroom.repository';


@Injectable()
export class BreakroomService {
  constructor(
    @InjectRepository(BreakroomRepository)
    private breakroomRepository: BreakroomRepository,
  ) { }
  public async getBreakroomItems(): Promise<BreakroomEntity[]> {
    const breakroomRequestItems = await this.breakroomRepository.find({ relations: ['master'] })
    if (!breakroomRequestItems) {
      throw new NotFoundException();
    }
    return breakroomRequestItems;
  }
  public async getBreakroomItem(id: number): Promise<BreakroomEntity> {
    const breakroomRequestItem = await this.breakroomRepository.findOne(id, { relations: ['master'] });
    if (!breakroomRequestItem) {
      throw new NotFoundException();
    }
    return breakroomRequestItem
  }
  public async createBreakroomItem(breakroomDto: BreakroomDto): Promise<BreakroomEntity> {
    return this.breakroomRepository.createBreakroomItem(breakroomDto);
  }
  public async deleteBreakroomItem(id: number): Promise<void> {
    const result = await this.breakroomRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  public async updateBreakroomItem(id: number, breakroomDto: BreakroomDto): Promise<BreakroomEntity> {
    const breakroomItem = await this.getBreakroomItem(id)
    breakroomItem.item_id = breakroomDto.item_id;
    breakroomItem.location = breakroomDto.location;
    breakroomItem.quantity = breakroomDto.quantity;
    breakroomItem.usage_level = breakroomDto.usage_level
    breakroomItem.min_quantity = breakroomDto.min_quantity;
    breakroomItem.max_quantity = breakroomDto.max_quantity;
    breakroomItem.updated_on = new Date()
    await breakroomItem.save();
    return breakroomItem
  }
}
