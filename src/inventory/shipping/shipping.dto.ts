import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { ShippingEntity } from "./shipping.entity";

export class ShippingDto {
    id: number;
    @Validate(Unique, [ShippingEntity])
    item_id: number;
    location: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    usage_level: string;
}