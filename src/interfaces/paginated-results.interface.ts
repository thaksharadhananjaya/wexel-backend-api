export interface IPaginatedResults<T> {
    results: T[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}
