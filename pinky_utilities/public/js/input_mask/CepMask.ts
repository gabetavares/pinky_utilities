import BaseMask from "./BaseMask";

export default class CepMask extends BaseMask {
  constructor(config: Record<string, unknown>) {
    super(config);
  }

  public static config(): Record<string, unknown> {
    return {
      mask: "00000-000"
    };
  }
}