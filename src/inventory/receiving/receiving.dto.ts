import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { ReceivingEntity } from "./receving.entity";

export class ReceivingDto {
    id: number;
    @Validate(Unique, [ReceivingEntity])
    item_id: number;
    location: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    usage_level: string;
}