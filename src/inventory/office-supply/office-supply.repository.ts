import { EntityRepository, Repository } from "typeorm";
import { OfficeSupplyDto } from "./office-supply.dto";
import { OfficeSupplyEntity } from "./office-supply.entity";

@EntityRepository(OfficeSupplyEntity)
export class OfficeSupplyRepository extends Repository<OfficeSupplyEntity> {
  async createOfficeSupplyItem(officeSupplyDto: OfficeSupplyDto) {
    const { item_id, location, quantity, min_quantity, max_quantity, usage_level } = officeSupplyDto
    const officeSupplyItem = new OfficeSupplyEntity();
    officeSupplyItem.item_id = item_id;
    officeSupplyItem.location = location;
    officeSupplyItem.quantity = quantity;
    officeSupplyItem.min_quantity = min_quantity;
    officeSupplyItem.max_quantity = max_quantity;
    officeSupplyItem.usage_level = usage_level;
    await officeSupplyItem.save();
    return officeSupplyItem;
  }
}