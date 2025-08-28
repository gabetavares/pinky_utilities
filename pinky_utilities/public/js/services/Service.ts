import { Exception } from "../exception/Exception";
import { FailServiceResponse, ServiceResponse, SuccessServiceResponse } from "../types/Service";

export abstract class Service {
  protected constructor() { }

  protected _response<T>(data: ServiceResponse<T>): ServiceResponse<T> {
    return data;
  }

  protected _failResponse<T extends Exception>(error: T): FailServiceResponse<T> {
    return this._response({
      success: false,
      payload: {
        code: error.code,
        message: error.message,
        error,
      }
    });
  }

  protected _successResponse<T>(data: T): SuccessServiceResponse<T> {
    return this._response({
      success: true,
      payload: data
    });
  }
}