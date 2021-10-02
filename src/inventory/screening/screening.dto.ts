import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { ScreeningEntity } from "./screening.entity";

export class ScreeningDto {
    id: number;
    @Validate(Unique, [ScreeningEntity])
    item_id: number;
    location: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    usage_level: string;
}