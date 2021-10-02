import { MasterEntity } from "../master/master.entity";

export class ChemicalsDto {
    id: number;
    cas: string;
    physical_state: string;
    container_size: string;
    health_hr: number;
    fire_hr: number;
    special_hr: number;
    special_notes: string;
    item_id: number;
    master: MasterEntity
}