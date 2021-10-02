import { EntityRepository, Repository } from "typeorm";
import { StoreRoomRequestDto } from "./store-room-request.dto";
import { StoreRoomRequestEntity } from "./store-room-request.entity";

@EntityRepository(StoreRoomRequestEntity)
export class StoreRoomRequestRepository extends Repository<StoreRoomRequestEntity> {
     async createStoreRoomRequestItem(storeRoomRequestDto: StoreRoomRequestDto) {
        const { item_id, quantity, department, user, location, is_confirmed, comment, status} = storeRoomRequestDto
        const specialRequestItem = new StoreRoomRequestEntity();
        specialRequestItem.item_id = item_id;
        specialRequestItem.quantity = quantity;
        specialRequestItem.department = department;
        specialRequestItem.status = status;
        specialRequestItem.is_confirmed = is_confirmed;
        specialRequestItem.location = location
        specialRequestItem.comment = comment
        specialRequestItem.user = user
        await specialRequestItem.save();
        return specialRequestItem;
    }
}