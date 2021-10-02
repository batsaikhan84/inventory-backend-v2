import { ExtractionsEntity } from "../extractions/extractions.entity";
import { StoreRoomRequestEntity } from '../store-room-request/store-room-request.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StoreRoomEntity } from './../store-room/store-room.entity';
import { RdEntity } from './../rd/rd.entity';
import { QualityEntity } from './../quality/quality.entity';
import { ChemicalsEntity } from '../chemicals/chemicals.entity';
import { ShippingEntity } from '../shipping/shipping.entity';
import { MassSpecEntity } from "../mass-spec/mass-spec.entity";
import { ReceivingEntity } from "../receiving/receving.entity";
import { ScreeningEntity } from '../screening/screening.entity';
import { SafetyEntity } from '../safety/safety.entity';
import { GeneralRequestEntity } from "../general-request/general-request.entity";
import { OfficeSupplyEntity } from "../office-supply/office-supply.entity";
import { OfficeSupplyRequestEntity } from "../office-supply-request/office-supply-request.entity";
import { GeneralEntity } from "../general/general.entity";
import { AnalyticsEntity } from "../analytics/analytics.entity";
import { BreakroomEntity } from "../breakroom/breakroom.entity";
import { BreakroomRequestEntity } from "../breakroom-request/breakroom-request.entity";

@Entity({ name: 'master' })
export class MasterEntity extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'id', type: 'int'})
    id: number;
    @Column({ name: 'item', type: 'varchar', nullable: false})
    item: string;
    @Column({name: 'manufacturer', type: 'varchar', nullable: true})
    manufacturer: string;
    @Column({name: 'part_number', type: 'varchar', nullable: false})
    part_number: string;
    @Column({name: 'recent_cn', type: 'varchar', nullable: false})
    recent_cn: string;
    @Column({name: 'recent_vendor', type: 'varchar', nullable: false})
    recent_vendor: string;
    @Column({name: 'fisher_cn', type: 'varchar', nullable: false})
    fisher_cn: string;
    @Column({name: 'vwr_cn', type: 'varchar', nullable: false})
    vwr_cn: string;
    @Column({name: 'lab_source_cn', type: 'varchar', nullable: false})
    lab_source_cn: string;
    @Column({name: 'next_advance_cn', type: 'varchar', nullable: false})
    next_advance_cn: string;
    @Column({name: 'purchase_unit', type: 'varchar', nullable: false})
    purchase_unit: string;
    @Column({name: 'average_unit_price', type: 'float', nullable: true})
    average_unit_price: number;
    @Column({name: 'category', type: 'varchar', nullable: true})
    category: string;
    @Column({name: 'comments', type: 'varchar', nullable: true})
    comments: string;
    @Column({name: 'type', type: 'varchar', nullable: true})
    type: string;
    @Column({name: 'group', type: 'varchar', nullable: true})
    group: string;
    @Column({name: 'is_active', type: 'boolean', nullable: false})
    is_active: boolean;
    @OneToMany(type => ExtractionsEntity, extractions => extractions.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    extractions: ExtractionsEntity[];
    @OneToMany(type => StoreRoomEntity, storeRoom => storeRoom.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    storeRoom: StoreRoomEntity[];
    @OneToMany(type => GeneralRequestEntity, generalRequest => generalRequest.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    generalRequest: GeneralRequestEntity[];
    @OneToMany(type => GeneralEntity, general => general.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    general: GeneralEntity[];
    @OneToMany(type => StoreRoomRequestEntity, storeRoomRequest => storeRoomRequest.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    storeRoomRequest: StoreRoomRequestEntity[];
    @OneToMany(type => MassSpecEntity, massSpec => massSpec.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    massSpec: MassSpecEntity[];
    @OneToMany(type => ReceivingEntity, receiving => receiving.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    receiving: ReceivingEntity[];
    @OneToMany(type => QualityEntity, quality => quality.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    quality: QualityEntity[];  
    @OneToMany(type => RdEntity, rd => rd.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    rd: RdEntity[];
    @OneToMany(type => ScreeningEntity, screening => screening.master, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    screening: ScreeningEntity[];
    @OneToMany(type => ShippingEntity, shipping => shipping.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    shipping: ShippingEntity[];
    @OneToMany(type => SafetyEntity, safety => safety.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    safety: SafetyEntity[];
    @OneToMany(type => OfficeSupplyEntity, officeSupply => officeSupply.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    officeSupply: OfficeSupplyEntity[];
    @OneToMany(type => OfficeSupplyRequestEntity, officeSupplyRequest => officeSupplyRequest.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    officeSupplyRequest: OfficeSupplyRequestEntity[];
    @OneToMany(type => ChemicalsEntity, chemicals => chemicals.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    chemicals: ChemicalsEntity[];
    @OneToMany(type => AnalyticsEntity, analytics => analytics.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    analytics: AnalyticsEntity[];
    @OneToMany(type => BreakroomEntity, breakroom => breakroom.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    breakroom: BreakroomEntity[];
    @OneToMany(type => BreakroomRequestEntity, breakroomRequest => breakroomRequest.master, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    breakroomRequest: BreakroomRequestEntity[];
}