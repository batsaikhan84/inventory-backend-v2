import { EntityRepository, Repository } from "typeorm";
import { OfficeSupplyRequestDto } from "./office-supply-request.dto";
import { OfficeSupplyRequestEntity } from "./office-supply-request.entity";

@EntityRepository(OfficeSupplyRequestEntity)
export class OfficeSupplyRequestRepository extends Repository<OfficeSupplyRequestEntity> {
  async createOfficeSupplyRequestItem(officeSupplyRequestDto: OfficeSupplyRequestDto) {
    const { item_id, quantity, department, user, location, is_confirmed, comment, status} = officeSupplyRequestDto
    const officeSupplyRequestItem = new OfficeSupplyRequestEntity();
    officeSupplyRequestItem.item_id = item_id;
    officeSupplyRequestItem.quantity = quantity;
    officeSupplyRequestItem.department = department;
    officeSupplyRequestItem.status = status;
    officeSupplyRequestItem.is_confirmed = is_confirmed;
    officeSupplyRequestItem.location = location
    officeSupplyRequestItem.comment = comment
    officeSupplyRequestItem.user = user
    await officeSupplyRequestItem.save();
    return officeSupplyRequestItem;
}
}