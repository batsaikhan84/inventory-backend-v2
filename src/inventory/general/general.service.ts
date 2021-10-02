import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GeneralDto } from "./general.dto";
import { GeneralEntity } from "./general.entity";
import { GeneralRepository } from "./general.repository";


@Injectable()
export class GeneralService {
  constructor(
    @InjectRepository(GeneralRepository)
    private generalRepository: GeneralRepository,
  ) { }
public async getGeneralItems(): Promise<GeneralEntity[]> {
  const generalItemsRes = await this.generalRepository.find({ relations: ['master'] })
  if (!generalItemsRes) {
    throw new NotFoundException();
  }
  return generalItemsRes;
}
public async getGeneralItem(id: number): Promise<GeneralEntity> {
  const generalItemRes = await this.generalRepository.findOne(id, { relations: ['master'] });
  if (!generalItemRes) {
    throw new NotFoundException();
  }
  return generalItemRes
}
public async createGeneralItem(generalDto: GeneralDto): Promise<GeneralEntity> {
  return this.generalRepository.createGeneralItem(generalDto);
}
public async deleteGeneralItem(id: number): Promise<void> {
  const result = await this.generalRepository.delete(id)
  if (result.affected === 0) {
    throw new NotFoundException();
  }
}
public async updateGeneralItem(id: number, generalDto: GeneralDto): Promise<GeneralEntity> {
    const generalItem = await this.getGeneralItem(id)
    generalItem.item_id = generalDto.item_id;
    generalItem.location = generalDto.location;
    generalItem.quantity = generalDto.quantity;
    generalItem.usage_level = generalDto.usage_level
    generalItem.min_quantity = generalDto.min_quantity;
    generalItem.max_quantity = generalDto.max_quantity;
    generalItem.updated_on = new Date()
    await generalItem.save();
    return generalItem
  }
}


