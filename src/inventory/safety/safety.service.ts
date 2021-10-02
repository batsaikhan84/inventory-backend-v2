import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SafetyDto } from './safety.dto';
import { SafetyEntity } from './safety.entity';
import { SafetyRepository } from './safety.repository';

@Injectable()
export class SafetyService {
    constructor(
        @InjectRepository(SafetyRepository)
        private safetyRepository: SafetyRepository
    ) {}
    public async getSafetyItems(): Promise<SafetyEntity[]> {
        const safetyItems = await this.safetyRepository.find({ relations: ['master'] })
        if(!safetyItems) {
            throw new NotFoundException();
        }
        return safetyItems;
    }
    public async getSafetyItem(id: number): Promise<SafetyEntity> {
        const safetyItem = await this.safetyRepository.findOne(id);
        if(!safetyItem) {
            throw new NotFoundException();
        }
        return safetyItem
    }
    public async createSafetyItem(safetyDto: SafetyDto): Promise<SafetyEntity> {
        return this.safetyRepository.createSafetyItem(safetyDto);
    }
    public async deleteSafetyItem(id: number): Promise<void> {
        const result = await this.safetyRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException();
        }
    }
    public async updateSafetyItem(id: number, safetyDto: SafetyDto): Promise<SafetyEntity> {
        const safetyItem = await this.getSafetyItem(id)
        safetyItem.item_id = safetyDto.item_id;
        safetyItem.location = safetyDto.location;
        safetyItem.quantity = safetyDto.quantity;
        safetyItem.usage_level = safetyDto.usage_level;
        safetyItem.min_quantity = safetyDto.max_quantity;
        safetyItem.max_quantity = safetyDto.min_quantity;
        await safetyItem.save();
        return safetyItem;
    }
}
