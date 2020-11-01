import { ContentType } from "./content-type.model";
import { StatusType } from "./status-type.model";

export interface Package {
    id: number;
    trackingNumber: string;
    date: string;
    weight: string;
    length: string;
    width: string;
    height: string;
    service: string;
    AccountId: number;
    StatusTypeId: number;
    ContentTypeId: number
    StatusType: StatusType;
    ContentType: ContentType;
    longitude: string;
    latitude: string;
}
