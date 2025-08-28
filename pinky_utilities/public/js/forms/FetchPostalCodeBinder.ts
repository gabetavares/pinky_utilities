import FetchPostalCodeException from "../exception/FetchPostalCodeException";
import Cep from "../helpers/Cep";
import CepService from "../services/CepService";
import { CepFailResponse, CepSuccessResponse } from "../types/Cep";
import { Frappe, FrappeForm } from "../types/Frappe";
import { FetchPostalCodeBinderFields, FetchPostalCodeBinderOptions } from "../types/frappe_forms/FetchPostalCodeBinderTypes";
import { FormEventInterface } from "../types/frappe_forms/FormsApi";
import FrappeFormEvent from "./FrappeFormEvent";

export default class FetchPostalCodeBinder extends FrappeFormEvent implements FormEventInterface {
  public readonly fieldNames: Required<FetchPostalCodeBinderFields>;
  protected _cep: Cep | null;

  constructor(frappe: Frappe, options: FetchPostalCodeBinderOptions) {
    super(frappe, options.formName);

    const {
      pincode = "pincode",
      addressLine1 = "address_line1",
      addressLine2 = "address_line2",
      city = "city",
      state = "state",
      country = "country",
      complement = "custom_complemento",
      number = "custom_número",
      ...fieldNames
    } = options.fieldNames ?? {}

    this.fieldNames = {
      pincode,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      complement,
      number,
      ...fieldNames
    }

    this._cep = null;
  }

  protected _showHideFields(frm: FrappeForm, isHidden: boolean) {
    frm.set_df_property(this.fieldNames.addressLine1, 'hidden', isHidden);
    frm.set_df_property(this.fieldNames.addressLine2, 'hidden', isHidden);
    frm.set_df_property(this.fieldNames.city, 'hidden', isHidden);
    frm.set_df_property(this.fieldNames.state, 'hidden', isHidden);
    frm.set_df_property(this.fieldNames.country, 'hidden', isHidden);
    frm.set_df_property(this.fieldNames.complement, 'hidden', isHidden);
    frm.set_df_property(this.fieldNames.number, 'hidden', isHidden);
  }

  protected _updateFields(frm: FrappeForm) {
    const addressLine1 = frm.doc[this.fieldNames.addressLine1] || "";

    if (addressLine1.trim().length === 0) {
      this._showHideFields(frm, true);
      frm.set_value(this.fieldNames.complement, "");
      frm.set_value(this.fieldNames.number, "");
      return;
    }

    this._showHideFields(frm, false);
  }

  protected _refreshData(frm: FrappeForm) {
    const pincode = (frm.doc[this.fieldNames.pincode] || "").replace(/\D+/g, "");

    if (pincode.length < 8) {
      this._cep = null;
    } else {
      const currPostcode = this._cep ? this._cep.postcode.replace(/\D+/g, "") : "";

      if (currPostcode !== pincode) {
        this._cep = Cep.fromJSON({
          postcode: frm.doc[this.fieldNames.pincode],
          street: frm.doc[this.fieldNames.addressLine1],
          neighbourhood: frm.doc[this.fieldNames.addressLine2],
          city: frm.doc[this.fieldNames.city],
          state_name: frm.doc[this.fieldNames.state],
        });
      }
    }
  }

  public registerHandlers(): void {
    this._addHandler("pincode", async (frm) => {
      const pincode = (frm.doc[this.fieldNames.pincode] || "").replace(/\D+/g, '');
      if (pincode.length < 8) return;

      const currPostcode = this._cep ?
        this._cep.postcode.replace(/\D+/g, "") :
        ""

      if (this._cep && pincode === currPostcode) {
        frm.set_value("address_line1", this._cep.street);
        frm.set_value("address_line2", this._cep.neighbourhood);
        frm.set_value("city", this._cep.city);
        frm.set_value("state", this._cep.state_name);
        return;
      }

      this._freezeDom(`Buscando o CEP ${frm.doc[this.fieldNames.pincode]}...`);

      const cepService = new CepService();
      const data = await cepService.fetch(pincode);

      this._unfreezeDom();

      if (!data.success)
        this._exception((data as CepFailResponse).payload.error);

      this._cep = Cep.fromJSON((data as CepSuccessResponse).payload);

      frm.set_value("address_line1", this._cep.street);
      frm.set_value("address_line2", this._cep.neighbourhood);
      frm.set_value("city", this._cep.city);
      frm.set_value("state", this._cep.state_name);
    })

    this._addHandler(this.fieldNames.addressLine1, (frm) => {
      this._updateFields(frm);
    })

    this._addHandler('refresh', (frm) => {
      this._updateFields(frm);
      this._refreshData(frm);

      const input = frm.fields_dict[this.fieldNames.pincode].$input;

      input.on("input", (e: any) => {
        const postcode = e.target.value.replace(/\D+/g, '');

        if (postcode.length >= 8) return;

        frm.set_value(this.fieldNames.addressLine1, "");
        frm.set_value(this.fieldNames.addressLine2, "");
        frm.set_value(this.fieldNames.city, "");
        frm.set_value(this.fieldNames.state, "");
      });
    })

    this._addHandler('validate', (frm) => {
      const pincode = (frm.doc[this.fieldNames.pincode] || "").replace(/\D+/g, "");
      if (pincode.length < 8)
        this._exception(FetchPostalCodeException.mandatoryField())
    })
  }
}