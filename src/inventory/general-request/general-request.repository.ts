import { EntityRepository, Repository } from "typeorm";
import { GeneralRequestDto } from "./general-request.dto";
import { GeneralRequestEntity } from "./general-request.entity";

@EntityRepository(GeneralRequestEntity)
export class GeneralRequestRepository extends Repository<GeneralRequestEntity> {
    async createGeneralRequestItem(generalRequestDto: GeneralRequestDto) {
        const { item_id, quantity, department, user, location, is_confirmed, comment, status} = generalRequestDto
        const generalRequestItem = new GeneralRequestEntity();
        generalRequestItem.item_id = item_id;
        generalRequestItem.quantity = quantity;
        generalRequestItem.department = department;
        generalRequestItem.status = status;
        generalRequestItem.is_confirmed = is_confirmed;
        generalRequestItem.location = location
        generalRequestItem.comment = comment
        generalRequestItem.user = user
        await generalRequestItem.save();
        return generalRequestItem;
    }
}