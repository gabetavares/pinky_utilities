import { Frappe } from "../types/Frappe";
import { FormEventInterface } from "../types/frappe_forms/FormsApi";
import { GenericFn } from "../types/Utils";
import FrappeFormApi from "./FrappeFormApi";

export default abstract class FrappeFormEvent extends FrappeFormApi implements FormEventInterface {
  protected readonly _formName: string;
  private readonly _handlers: Map<string, Array<GenericFn>>

  protected constructor(frappe: Frappe, form_name: string) {
    super(frappe);
    this._formName = form_name;
    this._handlers = new Map();
  }

  protected _addHandler(name: string, handler: GenericFn) {
    if (!this._handlers.has(name)) this._handlers.set(name, []);
    this._handlers.get(name)!.push(handler);
  }

  public register(): unknown {
    this.registerHandlers();

    const options = [...this._handlers.entries()].reduce((acc, [name, callbacks]) => {
      acc[name] = callbacks.reduce<GenericFn>((prev, curr) => {
        return (...args: Array<unknown>): unknown => {
          prev(...args);
          return curr(...args);
        }
      }, () => { });
      return acc;
    }, {} as Record<string, unknown>);

    return this._api.on(this._formName, options);
  }

  public abstract registerHandlers(): void;
}