import { Validate } from "class-validator";
import { Unique } from "typeorm";
import { StoreRoomEntity } from "./store-room.entity";

export class StoreRoomDto {
    id: number;
    @Validate(Unique, [StoreRoomEntity])
    item_id: number;
    location: string;
    quantity: number;
    min_quantity: number;
    max_quantity: number;
    usage_level: string;
    last_issued: number;
    last_received: number;
    order_quantity: number;
    update_on: Date;
}