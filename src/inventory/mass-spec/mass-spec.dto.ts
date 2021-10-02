import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { MassSpecEntity } from "./mass-spec.entity";

export class MassSpecDto {
    id: number;
    @Validate(Unique, [MassSpecEntity])
    item_id: number;
    location: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    usage_level: string;
}