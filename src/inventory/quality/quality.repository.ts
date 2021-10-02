import { QualityDto } from './quality.dto';
import { QualityEntity } from './quality.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(QualityEntity)
export class QualityRepository extends Repository<QualityEntity> {
  async createQualityItem(qualityDto: QualityDto) {
    const { id, item_id, location, quantity, min_quantity, max_quantity } = qualityDto
    const qualityItem = new QualityEntity();
    qualityItem.id = id;
    qualityItem.item_id = item_id;
    qualityItem.location = location;
    qualityItem.quantity = quantity;
    qualityItem.min_quantity = min_quantity;
    qualityItem.max_quantity = max_quantity;
    await qualityItem.save();
    return qualityItem;
  }
  getQuantityTotalItems(items: QualityEntity[]): QualityEntity[] {
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

  getItemWithTotalQuantityByMasterId(items: QualityEntity[]): QualityEntity {
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

  getItemsForEmail(items: QualityEntity[]): QualityEntity[] {
    const itemsToBeEmailed: QualityEntity[] = []
    this.getQuantityTotalItems(items).map(item => {
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
