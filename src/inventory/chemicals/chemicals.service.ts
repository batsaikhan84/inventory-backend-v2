import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChemicalsEntity } from './chemicals.entity';
import { ChemicalsRepository } from './chemicals.repository';

@Injectable()
export class ChemicalsService {
    constructor(
        @InjectRepository(ChemicalsRepository)
        private chemicalsRepository: ChemicalsRepository
    ) {}
    public async chemicalItems(): Promise<ChemicalsEntity[]> {
        const chemicalsRes= await this.chemicalsRepository.find({ relations: ['master'] });
        if (!chemicalsRes) {
            throw new NotFoundException();
        };
        return chemicalsRes;
    };
    public async paginate(page: number, limit): Promise<any> {
        const [chemicalItems, totalPage] = await this.chemicalsRepository.findAndCount({
            relations: ['master'],
            take: limit,
            skip: (page-1) * limit
        });
        return {
            data: chemicalItems,
            
            meta: {
                totalPage,
                showing: limit,
                page,
                lastPage: Math.ceil(totalPage/limit)
            }
        }
    }
}
