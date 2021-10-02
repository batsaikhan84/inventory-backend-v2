import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { BreakroomEntity } from "./breakroom.entity";

export class BreakroomDto {
    id: number;
    @Validate(Unique, [BreakroomEntity])
    item_id: number;
    location: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    usage_level: string;
    order_quantity: number;
    update_on: Date
}