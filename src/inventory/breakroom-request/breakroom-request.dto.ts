import { MasterEntity } from "../master/master.entity";

export class BreakroomRequestDto {
  id: number;
  item_id: number;
  quantity: number;
  department: string;
  location: string;
  status: string;
  time_requested: Date;
  time_updated: Date;
  is_special_request: boolean;
  is_confirmed: boolean;
  comment: string;
  user: string;
  master: MasterEntity
}