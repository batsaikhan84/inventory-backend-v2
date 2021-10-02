import { EntityRepository, Repository } from "typeorm";
import { MasterEntity } from "./master.entity";
import { MasterDto } from "./master.dto";
import { GeneralEntity } from "../general/general.entity";
import { ShippingEntity } from "../shipping/shipping.entity";
import { SafetyEntity } from "../safety/safety.entity";
import { StoreRoomEntity } from "../store-room/store-room.entity";
import { QualityEntity } from "../quality/quality.entity";
import { ScreeningEntity } from "../screening/screening.entity";
import { ReceivingEntity } from "../receiving/receving.entity";
import { MassSpecEntity } from "../mass-spec/mass-spec.entity";
import { ExtractionsEntity } from "../extractions/extractions.entity";
import { RdEntity } from "../rd/rd.entity";
import { OfficeSupplyEntity } from "../office-supply/office-supply.entity";
import { BreakroomEntity } from "../breakroom/breakroom.entity";

@EntityRepository(MasterEntity)
export class MasterRepository extends Repository<MasterEntity> {
  async createMasterItem(masterDto: MasterDto) {
    const { item,
      purchase_unit,
      manufacturer,
      part_number,
      recent_cn,
      recent_vendor,
      fisher_cn,
      vwr_cn,
      lab_source_cn,
      next_advance_cn,
      average_unit_price,
      category,
      comments,
      type,
      group,
      extractions,
      mass_spec,
      receiving,
      rd,
      screening,
      quality,
      shipping,
      safety,
      general,
      store_room,
      office_supply,
      breakroom,
    } = masterDto

    const masterItem = new MasterEntity();
    masterItem.item = item;
    masterItem.purchase_unit = purchase_unit;
    masterItem.part_number = part_number;
    masterItem.manufacturer = manufacturer;
    masterItem.average_unit_price = average_unit_price;
    masterItem.recent_cn = recent_cn;
    masterItem.recent_vendor = recent_vendor;
    masterItem.fisher_cn = fisher_cn;
    masterItem.vwr_cn = vwr_cn;
    masterItem.lab_source_cn = lab_source_cn;
    masterItem.next_advance_cn = next_advance_cn;
    masterItem.average_unit_price = average_unit_price;
    masterItem.category = category;
    masterItem.comments = comments;
    masterItem.type = type;
    masterItem.group = group;
    masterItem.is_active = true;
    await masterItem.save();
    if (extractions) {
      const extraction = new ExtractionsEntity();
      extraction.master = masterItem
      await extraction.save();
    }
    if (mass_spec) {
      const massSpec = new MassSpecEntity()
      massSpec.master = masterItem
      await massSpec.save()
    }
    if (receiving) {
      const receiving = new ReceivingEntity()
      receiving.master = masterItem
      await receiving.save()
    }
    if (rd) {
      const rd = new RdEntity()
      rd.master = masterItem
      await rd.save()
    }
    if (screening) {
      const screening = new ScreeningEntity();
      screening.master = masterItem
      await screening.save();
    }
    if (quality) {
      const quality = new QualityEntity()
      quality.master = masterItem
      await quality.save()
    }
    if (shipping) {
      const shipping = new ShippingEntity()
      shipping.master = masterItem
      await shipping.save()
    }
    if (safety) {
      const shipping = new SafetyEntity()
      shipping.master = masterItem
      await shipping.save()
    }
    if (general) {
      const rd = new GeneralEntity()
      rd.master = masterItem
      await rd.save()
    }
    if (office_supply) {
      const rd = new OfficeSupplyEntity()
      rd.master = masterItem
      await rd.save()
    }
    if (store_room) {
      const storeRoom = new StoreRoomEntity()
      storeRoom.master = masterItem
      await storeRoom.save()
    }
    if (breakroom) {
      const breakroom = new BreakroomEntity()
      breakroom.master = masterItem
      await breakroom.save()
    }
    return masterItem;  
  }
}