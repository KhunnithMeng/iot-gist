export interface DataResponse<T> {
  PID: string,
  error: string,
  message: string,
  statusCode: string,
  total: number,
  data: T
}
