import { Exception } from "../exception/Exception";

export interface ServiceResponse<T> {
  success: boolean;
  payload: T;
}

export type FailServiceResponse<T extends Exception> = ServiceResponse<{
  code: string,
  message: string,
  error: T
}>

export type SuccessServiceResponse<T> = ServiceResponse<T>