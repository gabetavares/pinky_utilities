import { ServiceResponse } from "../types/Service";

export abstract class Service {
  protected constructor() { }

  protected _response<T>(data: ServiceResponse<T>): ServiceResponse<T> {
    return data;
  }
}