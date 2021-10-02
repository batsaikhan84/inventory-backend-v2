import { EntityRepository, Repository } from "typeorm";
import { ShippingDto } from "./shipping.dto";
import { ShippingEntity } from "./shipping.entity";


@EntityRepository(ShippingEntity)
export class ShippingRepository extends Repository<ShippingEntity> {
  async createShippingItem(shippingDto: ShippingDto) {
    const { id, item_id, location, quantity, min_quantity, max_quantity } = shippingDto
    const shippingItem = new ShippingEntity();
    shippingItem.id = id;
    shippingItem.item_id = item_id;
    shippingItem.location = location;
    shippingItem.quantity = quantity;
    shippingItem.min_quantity = min_quantity;
    shippingItem.max_quantity = max_quantity;
    await shippingItem.save();
    return shippingItem;
  }

  getItemWithTotalQuantityByMasterId(items: ShippingEntity[]): ShippingEntity {
    const itemWithTotalQuantity = items.reduce((resultObj: any, obj) => {
      if (Object.keys(resultObj).length === 0) {
        resultObj = {
          ...obj,
          item: obj.master.item,
          purchase_unit: obj.master.purchase_unit,
          recent_cn: obj.master.recent_cn,
          comments: obj.master.comments,
          part_number: obj.master.part_number,
          category: obj.master.category,
          average_unit_price: obj.master.average_unit_price
        }
      } else {
        resultObj.quantity += obj.quantity;
      }
      return resultObj
    }, {})
    return itemWithTotalQuantity
  }

  getItemsForEmail(items: ShippingEntity[]): ShippingEntity[] {
    const itemsToBeEmailed: ShippingEntity[] = []
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