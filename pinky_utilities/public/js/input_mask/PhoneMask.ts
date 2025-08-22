import BaseMask from "./BaseMask";

export default class PhoneMask extends BaseMask {
  constructor(config: Record<string, unknown>) {
    super(config);
  }

  public is_valid(): boolean {
    return this.is_mobile() ? this.length() === 13 : this.length() === 12;
  }

  public is_mobile(): boolean {
    return /^\d{4}9/g.test(this.sanitized());
  }

  public length(): number {
    return this.sanitized().length;
  }

  public sanitized(): string {
    return this.mask.unmaskedValue.replace(/\D+/g, "");
  }

  public static config(): Record<string, unknown> {
    return {
      mask: [
        { mask: "+{55} (00) 0000-0000" },
        { mask: "+{55} (00) 00000-0000" }
      ],
      dispatch: function (appended: any, dynamicMasked: any) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "");
        return number.length > 12
          ? dynamicMasked.compiledMasks[1]
          : dynamicMasked.compiledMasks[0];
      }
    }
  }
}