import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { OfficeSupplyEntity } from "./office-supply.entity";

export class OfficeSupplyDto {
    id: number;
    @Validate(Unique, [OfficeSupplyEntity])
    item_id: number;
    location: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    usage_level: string;
    order_quantity: number;
    update_on: Date
}