import { EntityRepository, Repository } from "typeorm";
import { StoreRoomDto } from "./store-room.dto";
import { StoreRoomEntity } from "./store-room.entity";

@EntityRepository(StoreRoomEntity)
export class StoreRoomRepository extends Repository<StoreRoomEntity> {
    async createStoreRoomItem(storeRoomDto: StoreRoomDto) {
        const { item_id, location, quantity, min_quantity, max_quantity, usage_level } = storeRoomDto
        const storeRoomItem = new StoreRoomEntity();
        storeRoomItem.item_id = item_id;
        storeRoomItem.location = location;
        storeRoomItem.quantity = quantity;
        storeRoomItem.min_quantity = min_quantity;
        storeRoomItem.max_quantity = max_quantity;
        storeRoomItem.usage_level = usage_level;
        await storeRoomItem.save();
        return storeRoomItem;
    }
    getStoreRoomItemsForEmail(items: StoreRoomEntity[]): StoreRoomEntity[] {
        const itemsToBeEmailed: StoreRoomEntity[] = []
        items.map(item => {
          if (item.max_quantity && item.min_quantity) {
            if (item.max_quantity === 1 && item.min_quantity === 1) {
              if (item.quantity === 0) {
                itemsToBeEmailed.push(item);
              }
            } else if (item.min_quantity >= item.quantity) {
              itemsToBeEmailed.push(item);
            }
          }
        })
        return itemsToBeEmailed;
      }
}