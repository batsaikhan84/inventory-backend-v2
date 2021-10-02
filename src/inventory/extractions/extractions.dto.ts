import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { MasterEntity } from "../master/master.entity";
import { ExtractionsEntity } from "./extractions.entity";

export class ExtractionsDto {
    id: number;
    @Validate(Unique, [ExtractionsEntity])
    item_id: number;
    location: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    usage_level: string;
    master: MasterEntity;
    lot_number: number;
    expiration_date: Date;
    received_date: Date;
}