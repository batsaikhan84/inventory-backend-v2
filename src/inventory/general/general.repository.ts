import { EntityRepository, Repository } from "typeorm";
import { GeneralDto } from "./general.dto";
import { GeneralEntity } from "./general.entity";

@EntityRepository(GeneralEntity)
export class GeneralRepository extends Repository<GeneralEntity> {
  async createGeneralItem(generalDto: GeneralDto) {
    const { item_id, location, quantity, min_quantity, max_quantity, usage_level } = generalDto
    const general = new GeneralEntity();
    general.item_id = item_id;
    general.location = location;
    general.quantity = quantity;
    general.min_quantity = min_quantity;
    general.max_quantity = max_quantity;
    general.usage_level = usage_level;
    await general.save();
    return general;
}
}