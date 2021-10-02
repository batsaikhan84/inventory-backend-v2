import { EntityRepository, Repository } from "typeorm";
import { SafetyDto } from "./safety.dto";
import { SafetyEntity } from "./safety.entity";

@EntityRepository(SafetyEntity)
export class SafetyRepository extends Repository<SafetyEntity> {
    async createSafetyItem(safetyDto: SafetyDto) {
        const { id, item_id, location, quantity, min_quantity, max_quantity } = safetyDto
        const safetyItem = new SafetyEntity();
        safetyItem.id = id;
        safetyItem.item_id = item_id;
        safetyItem.location = location;
        safetyItem.quantity = quantity;
        safetyItem.min_quantity = min_quantity;
        safetyItem.max_quantity = max_quantity;
        await safetyItem.save();
        return safetyItem;
    }
}