import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { QualityEntity } from "./quality.entity";

export class QualityDto {
    id: number;
    @Validate(Unique, [QualityEntity])
    item_id: number;
    location: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    usage_level: string;
}