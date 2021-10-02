// import { DepartmentRequest } from "../department-request/department-request.entity";
// import { Extraction } from "../extraction/extraction.entity";
// import { MassSpec } from "../mass-spec/mass-spec.entity";
// import { Rd } from "../rd/rd.entity";
// import { Receiving } from "../receiving/receving.entity";
// import { Screening } from "../screening/screening.entity";

export class MasterDto {
    id: number;
    item: string;
    manufacturer: string;
    part_number: string;
    recent_cn: string;
    recent_vendor: string;
    fisher_cn: string;
    vwr_cn: string;
    lab_source_cn: string;
    next_advance_cn: string;
    purchase_unit: string;
    average_unit_price: number;
    category: string;
    comments: string;
    type: string;
    group: string;
    is_active: boolean;
    is_request_item: boolean
    extractions: boolean;
    mass_spec: boolean;
    receiving: boolean;
    rd: boolean;
    screening: boolean;
    quality: boolean;
    shipping: boolean;
    general: boolean;
    safety: boolean;
    store_room: boolean;
    office_supply: boolean;
    breakroom: boolean;
    // extraction: Extraction[];
    // massSpec: MassSpec[];
    // receiving: Receiving[];
    // rd: Rd[];
    // screening: Screening[];
    // department: DepartmentRequest[];
}