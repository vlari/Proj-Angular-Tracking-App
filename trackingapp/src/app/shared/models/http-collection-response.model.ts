export class HttpCollectionResponse<T> {
    data: T[];
    count: number;
    pagination?: any
}