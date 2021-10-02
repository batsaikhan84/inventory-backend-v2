import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm';
import { MasterModule } from './inventory/master/master.module';
import { typeOrmConfig } from './config/typeOrm.config';
import { StoreRoomModule } from './inventory/store-room/store-room.module';
import { ExtractionsModule } from './inventory/extractions/extractions.module';
import { StoreRoomRequestModule } from './inventory/store-room-request/store-room-request.module';
import { RdModule } from './inventory/rd/rd.module';
import { ScreeningModule } from './inventory/screening/screening.module';
import { SafetyModule } from './inventory/safety/safety.module';
import { ChemicalModule } from './inventory/chemicals/chemicals.module';
import { ShippingModule } from './inventory/shipping/shipping.module';
import { MassSpecModule } from './inventory/mass-spec/mass-spec.module';
import { ReceivingModule } from './inventory/receiving/receiving.module';
import { QualityModule } from './inventory/quality/quality.module';
import { GeneralRequestModule } from './inventory/general-request/general-request.module';
import { OfficeSupplyModule } from './inventory/office-supply/office-supply.module';
import { OfficeSupplyRequestModule } from './inventory/office-supply-request/office-supply-request.module';
import { GeneralModule } from './inventory/general/general.module';
import { AnalyticsModule } from './inventory/analytics/analytics.module';
import { EmailModule } from './inventory/email/email.module';
import { BreakroomModule } from './inventory/breakroom/breakroom.module';
import { BreakroomRequestModule } from './inventory/breakroom-request/breakroom-request.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MasterModule,
    StoreRoomModule,
    ExtractionsModule,
    StoreRoomRequestModule,
    GeneralRequestModule,
    MassSpecModule,
    ReceivingModule,
    RdModule,
    QualityModule,
    ScreeningModule,
    RdModule,
    SafetyModule,
    ChemicalModule,
    ShippingModule,
    OfficeSupplyModule,
    OfficeSupplyRequestModule,
    GeneralModule,
    GeneralRequestModule,
    AnalyticsModule,
    EmailModule,
    BreakroomModule,
    BreakroomRequestModule,
  ]
})
export class InventoryModule {
  constructor(private connection: Connection) { }
}
