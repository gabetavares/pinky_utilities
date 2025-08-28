import { FormBinderOptions } from "./FormsApi";

export interface PhoneMaskBinderOptions extends FormBinderOptions {
  phoneFields: Array<string>
}