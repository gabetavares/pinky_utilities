import BaseMask from "./BaseMask";

export default class TaxIdMask extends BaseMask {
  constructor(config: Record<string, unknown>) {
    super(config);
  }

  public static individual_config(): Record<string, unknown> {
    return {
      mask: "000.000.000-00"
    }
  }

  public static company_config(): Record<string, unknown> {
    return {
      mask: "00.000.000/0000-00"
    }
  }

  public load_individual_mask(): any {
    return this.reload(TaxIdMask.individual_config());
  }

  public load_company_mask(): any {
    return this.reload(TaxIdMask.company_config());
  }
}