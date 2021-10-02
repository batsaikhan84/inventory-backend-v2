import { MasterDto } from './master.dto';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MasterEntity } from "./master.entity";
import { MasterRepository } from "./master.repository";
import { ExtractionsEntity } from '../extractions/extractions.entity';
import { MassSpecEntity } from '../mass-spec/mass-spec.entity';
import { ReceivingEntity } from '../receiving/receving.entity';
import { ScreeningEntity } from '../screening/screening.entity';
import { QualityEntity } from '../quality/quality.entity';
import { StoreRoomEntity } from '../store-room/store-room.entity';
import { ShippingEntity } from '../shipping/shipping.entity';
import { RdEntity } from '../rd/rd.entity';
import { BreakroomEntity } from '../breakroom/breakroom.entity';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(MasterRepository)
    private masterRepository: MasterRepository,
  ) { }

  public async masterItems(): Promise<MasterEntity[]> {
    const masterRes = await this.masterRepository.find();
    if (!masterRes) {
      throw new NotFoundException();
    };
    return masterRes;
  };

  public async masterChemicalItems(): Promise<MasterEntity[]> {
    const masterRes = await this.masterRepository.find({ relations: [
      'chemicals',
      'extractions', 
      'massSpec', 
      'receiving', 
      'screening', 
      'quality', 
      'rd', 
      'shipping', 
      'safety', 
    ] });
    if (!masterRes) {
      throw new NotFoundException();
    };
    const masterChemicalItems = masterRes.filter(masterItem => masterItem.type === 'Chemical')
    return masterChemicalItems
  }

  public async masterItem(id: number): Promise<MasterEntity> {
    const masterItemRes = await this.masterRepository.findOne(id, { relations: [
        'extractions', 
        'massSpec', 
        'receiving', 
        'screening', 
        'quality', 
        'storeRoom', 
        'rd', 
        'shipping', 
        'safety', 
        'chemicals', 
        'general',
        'generalRequest',
        'storeRoomRequest',
        'officeSupply',
        'officeSupplyRequest',
        'breakroom'
      ]});
    if (!masterItemRes) {
      throw new NotFoundException();
    };
    return masterItemRes;
  }
  public async createMasterItem(masterDto: MasterDto): Promise<MasterEntity> {
    return this.masterRepository.createMasterItem(masterDto);
  }
  public async deleteMasterItem(id: number): Promise<void> {
    const result = await this.masterRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  public async updateMasterItem(id: number, masterDto: MasterDto): Promise<MasterEntity> {
    const masterItem = await this.masterItem(id)
    masterItem.item = masterDto.item;
    masterItem.purchase_unit = masterDto.purchase_unit;
    masterItem.part_number = masterDto.part_number;
    masterItem.average_unit_price = masterDto.average_unit_price;
    masterItem.manufacturer = masterDto.manufacturer
    masterItem.recent_cn = masterDto.recent_cn;
    masterItem.recent_vendor = masterDto.recent_vendor;
    masterItem.fisher_cn = masterDto.fisher_cn;
    masterItem.vwr_cn = masterDto.vwr_cn;
    masterItem.lab_source_cn = masterDto.lab_source_cn;
    masterItem.next_advance_cn = masterDto.next_advance_cn;
    masterItem.average_unit_price = Number(masterDto.average_unit_price);
    masterItem.category = masterDto.category;
    masterItem.comments = masterDto.comments;
    masterItem.type = masterDto.type;
    masterItem.group = masterDto.group;
    masterItem.is_active = masterDto.is_active
    await masterItem.save();
    console.log(masterItem.average_unit_price)
    return masterItem;
  }

  public async assignItem(id: number, departments: string[]): Promise<MasterEntity> {
    const masterItem = await this.masterItem(id)
    departments.map(async department => {
      if (department === 'extraction') {
        const extraction = new ExtractionsEntity();
        extraction.master = masterItem
        await extraction.save();
      }
      if (department === 'mass_spec') {
        const massSpec = new MassSpecEntity()
        massSpec.master = masterItem
        await massSpec.save()
      }
      if (department === 'receiving') {
        const receiving = new ReceivingEntity()
        receiving.master = masterItem
        await receiving.save()
      }
      if (department === 'screening') {
        const screening = new ScreeningEntity();
        screening.master = masterItem
        await screening.save();
      }
      if (department === 'quality') {
        const quality = new QualityEntity()
        quality.master = masterItem
        await quality.save()
      }
      if (department === 'rd') {
        const rd = new RdEntity()
        rd.master = masterItem
        await rd.save()
      }
      if (department === 'store_room') {
        const storeRoom = new StoreRoomEntity()
        storeRoom.master = masterItem
        await storeRoom.save()
      }
      if (department === 'shipping') {
        const shipping = new ShippingEntity()
        shipping.master = masterItem
        await shipping.save()
      }
      if (department === 'general') {
        const shipping = new ShippingEntity()
        shipping.master = masterItem
        await shipping.save()
      }
      if (department === 'office_supply') {
        const shipping = new ShippingEntity()
        shipping.master = masterItem
        await shipping.save()
      }
      if (department === 'breakroom') {
        const breakroom = new BreakroomEntity()
        breakroom.master = masterItem
        await breakroom.save()
      }
    })

    return masterItem
  }
};