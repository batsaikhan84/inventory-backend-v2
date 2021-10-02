import { RdDto } from './rd.dto';
import { RdEntity } from './rd.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RdEntity)
export class RdRepository extends Repository<RdEntity> {
  async createRdItem(rdDto: RdDto) {
    const { id, item_id, location, quantity, min_quantity, max_quantity } = rdDto
    const rdItem = new RdEntity();
    rdItem.id = id;
    rdItem.item_id = item_id;
    rdItem.location = location;
    rdItem.quantity = quantity;
    rdItem.min_quantity = min_quantity;
    rdItem.max_quantity = max_quantity;
    await rdItem.save();
    return rdItem;
  }
  getRdTotalItems(items: RdEntity[]): RdEntity[] {
    let totalItems = []
    items.reduce((resultObj, obj) => {
      if (!resultObj[obj.item_id]) {
        resultObj[obj.item_id] = {
          ...obj,
          total_quantity: 0,
          item: obj.master.item,
          purchase_unit: obj.master.purchase_unit,
          recent_cn: obj.master.recent_cn,
          comments: obj.master.comments,
          part_number: obj.master.part_number,
          category: obj.master.category,
          average_unit_price: obj.master.average_unit_price
        }
        totalItems.push(resultObj[obj.item_id])
      }
      resultObj[obj.item_id].total_quantity += obj.quantity;
      return resultObj
    }, {})
    return totalItems
  }

  getItemWithTotalQuantityByMasterId(items: RdEntity[]): RdEntity {
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

  getItemsForEmail(items: RdEntity[]): RdEntity[] {
    const itemsToBeEmailed: RdEntity[] = []
    this.getRdTotalItems(items).map(item => {
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