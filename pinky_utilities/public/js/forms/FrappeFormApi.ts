import { Exception } from "../exception/Exception";
import { Frappe } from "../types/Frappe";

export default abstract class FrappeFormApi {
  private readonly frappe: Frappe;
  protected readonly _dom: any;
  protected readonly _api: any;

  protected constructor(frappe: Frappe) {
    this.frappe = frappe;
    this._api = frappe.ui.form;
    this._dom = frappe.dom;
  }

  protected _freezeDom(msg: string) {
    this._dom.freeze(msg);
  }

  protected _unfreezeDom() {
    this._dom.unfreeze();
  }

  protected _exception(error: Exception) {
    this.frappe.throw(error.dialogError());
  }
}