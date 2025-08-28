import { Exception } from "../exception/Exception";
import { ServiceResponse } from "../types/Service";

export abstract class Service {
  protected constructor() { }

  protected _response<T>(data: ServiceResponse<T>): ServiceResponse<T> {
    return data;
  }

  protected _failResponse(error: Exception) {
    return this._response({
      success: false,
      payload: {
        code: error.code,
        message: error.message,
        error,
      }
    });
  }

  protected _successResponse(data: Record<string, unknown>) {
    return this._response({
      success: true,
      payload: data
    });
  }
}