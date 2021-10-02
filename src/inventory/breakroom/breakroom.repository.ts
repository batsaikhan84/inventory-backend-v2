import { EntityRepository, Repository } from "typeorm";
import { BreakroomDto } from "./breakroom.dto";
import { BreakroomEntity } from "./breakroom.entity";

@EntityRepository(BreakroomEntity)
export class BreakroomRepository extends Repository<BreakroomEntity> {
  async createBreakroomItem(breakroomDto: BreakroomDto) {
    const { item_id, location, quantity, min_quantity, max_quantity, usage_level } = breakroomDto
    const breakroomItem = new BreakroomEntity();
    breakroomItem.item_id = item_id;
    breakroomItem.location = location;
    breakroomItem.quantity = quantity;
    breakroomItem.min_quantity = min_quantity;
    breakroomItem.max_quantity = max_quantity;
    breakroomItem.usage_level = usage_level;
    await breakroomItem.save();
    return breakroomItem;
  }
}