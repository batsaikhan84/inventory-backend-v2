import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { RdEntity } from "./rd.entity";

export class RdDto {
    id: number;
    @Validate(Unique, [RdEntity])
    item_id: number;
    location: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    usage_level: string;
}