import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { SafetyEntity } from "./safety.entity";

export class SafetyDto {
    id: number;
    @Validate(Unique, [SafetyEntity])
    item_id: number;
    location: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    usage_level: string;
}