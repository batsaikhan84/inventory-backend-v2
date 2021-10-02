import { ReceivingDto } from './receiving.dto';
import { ReceivingEntity } from './receving.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ReceivingEntity)
export class ReceivingRepository extends Repository<ReceivingEntity> {
  async createReceivingItem(receivingDto: ReceivingDto) {
    const { id, item_id, location, quantity, min_quantity, max_quantity } = receivingDto
    const receivingItem = new ReceivingEntity();
    receivingItem.id = id;
    receivingItem.item_id = item_id;
    receivingItem.location = location;
    receivingItem.quantity = quantity;
    receivingItem.min_quantity = min_quantity;
    receivingItem.max_quantity = max_quantity;
    await receivingItem.save();
    return receivingItem;
  }

  getItemsWithTotalQuantityByMasterId(items: ReceivingEntity[]): ReceivingEntity[] {
    let itemsWithTotalQuantity = []
    items.map(item => ({
      ...item,
      item: item.master.item,
      purchase_unit: item.master.purchase_unit,
      recent_cn: item.master.recent_cn,
      comments: item.master.comments,
      part_number: item.master.part_number,
      category: item.master.category,
      average_unit_price: item.master.average_unit_price
    })).map(item => {
      if(itemsWithTotalQuantity.length === 0) {
        itemsWithTotalQuantity.push(item)
      } else {
        if (itemsWithTotalQuantity.findIndex(itemWithTotalQuantity => itemWithTotalQuantity.item_id === item.item_id) === -1) {
          itemsWithTotalQuantity.push(item)
        } else {
          const index = itemsWithTotalQuantity.findIndex(itemWithTotalQuantity => itemWithTotalQuantity.item_id === item.item_id)
          itemsWithTotalQuantity[index].quantity += item.quantity
        }
      }
    })
    return itemsWithTotalQuantity
  }

  getItemWithTotalQuantityByMasterId(items: ReceivingEntity[]): ReceivingEntity {
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

  getItemsForEmail(items: ReceivingEntity[]): ReceivingEntity[] {
    const itemsToBeEmailed: ReceivingEntity[] = []
    this.getItemsWithTotalQuantityByMasterId(items).map(item => {
      if (item.max_quantity && item.min_quantity) {
        if (item.max_quantity === 1 && item.min_quantity === 1) {
          if (item.quantity === 0) {
            itemsToBeEmailed.push(item)
          }
        } else if (item.min_quantity >= item.quantity) {
          itemsToBeEmailed.push(item)
        }
      }
    })
    return itemsToBeEmailed
  }
}