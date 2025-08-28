import { ExceptionInterface } from "../types/Exception";
import { FrappeDialogOptions } from "../types/frappe/FormsApi";

export abstract class Exception extends Error {
  public readonly name: string;
  public readonly code: string;
  public readonly meta: Record<string, unknown>;

  protected constructor(data: ExceptionInterface) {
    super(data.message);
    this.name = data.name || "Error";
    this.code = data.code.toUpperCase();
    this.meta = data.meta || {};
  }

  public clientMessage(): string {
    return `${this.message}`;
  }

  public dialogError(): FrappeDialogOptions {
    return {
      title: this.name,
      indicator: 'red',
      message: this.clientMessage()
    }
  }
}
