import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GeneralRequestDto } from './general-request.dto';
import { GeneralRequestEntity } from './general-request.entity';
import { GeneralRequestRepository } from './general-request.repository';

@Injectable()
export class GeneralRequestService {
    constructor(
        @InjectRepository(GeneralRequestRepository)
        private generalRequestRepository: GeneralRequestRepository,
    ) {}
    public async getGeneralRequestItems(): Promise<GeneralRequestEntity[]> {
        const generalRequestItems = await this.generalRequestRepository.find({ relations: ['master'] })
        if(!generalRequestItems) {
            throw new NotFoundException();
        }
        return generalRequestItems;
    }
    public async getGeneralRequestItem(id: number): Promise<GeneralRequestEntity> {
        const generalRequestItem = await this.generalRequestRepository.findOne(id, { relations: ['master'] });
        if(!generalRequestItem) {
            throw new NotFoundException();
        }
        return generalRequestItem
    }
    public async createGeneralRequestItem(generalRequestDto: GeneralRequestDto): Promise<GeneralRequestEntity> {
        return this.generalRequestRepository.createGeneralRequestItem(generalRequestDto);
    }
    public async deleteGeneralRequestItem(id: number): Promise<void> {
        const result = await this.generalRequestRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException();
        }
    }
    public async updateGeneralRequestItem(id: number, generalRequestDto: GeneralRequestDto): Promise<GeneralRequestEntity> {
        const generalRequestItem = await this.getGeneralRequestItem(id)
        generalRequestItem.quantity = generalRequestDto.quantity;
        generalRequestItem.department = generalRequestDto.department;
        generalRequestItem.status = generalRequestDto.status;
        generalRequestItem.time_updated = new Date();
        generalRequestItem.is_confirmed = generalRequestDto.is_confirmed
        generalRequestItem.comment = generalRequestDto.comment
        generalRequestItem.user = generalRequestDto.user
        await generalRequestItem.save();
        return generalRequestItem
    }
}
