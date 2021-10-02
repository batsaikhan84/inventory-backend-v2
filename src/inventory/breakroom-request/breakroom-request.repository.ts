import { EntityRepository, Repository } from "typeorm";
import { BreakroomRequestDto } from "./breakroom-request.dto";
import { BreakroomRequestEntity } from "./breakroom-request.entity";

@EntityRepository(BreakroomRequestEntity)
export class BreakroomRequestRepository extends Repository<BreakroomRequestEntity> {
  async createBreakroomRequestItem(breakroomRequestDto: BreakroomRequestDto) {
    const { item_id, quantity, department, user, location, is_confirmed, comment, status} = breakroomRequestDto
    const breakroomRequestItem = new BreakroomRequestEntity();
    breakroomRequestItem.item_id = item_id;
    breakroomRequestItem.quantity = quantity;
    breakroomRequestItem.department = department;
    breakroomRequestItem.status = status;
    breakroomRequestItem.is_confirmed = is_confirmed;
    breakroomRequestItem.location = location
    breakroomRequestItem.comment = comment
    breakroomRequestItem.user = user
    await breakroomRequestItem.save();
    return breakroomRequestItem;
}
}