export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  lastPage: number;
}
