export class AnalyticsDto {
    id?: number;
    old_quantity: number;
    new_quantity: number;
    time_created?: Date;
    item_id: number;
    department: string;
    user: string;
    received: boolean;
    issued: boolean;
    received_cost: number;
    issued_cost: number;
    number_received: number;
    number_issued: number;
}