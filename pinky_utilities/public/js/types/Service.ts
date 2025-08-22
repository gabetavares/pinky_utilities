export interface ServiceResponse<T> {
  success: boolean;
  payload: T;
}