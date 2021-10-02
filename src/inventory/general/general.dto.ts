import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { GeneralEntity } from "./general.entity";

export class GeneralDto {
    id: number;
    @Validate(Unique, [GeneralEntity])
    item_id: number;
    location: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    usage_level: string;
    order_quantity: number;
    update_on: Date
}