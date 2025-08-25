import IMask from "imask/holder";

export default abstract class BaseMask {
  protected _mask_config: Record<string, unknown>;
  public mask: any;

  constructor(config: Record<string, unknown>) {
    this._mask_config = config;
    this.mask = null;
  }

  public update(value: string): any {
    this.mask.value = value;
    this.mask.updateValue();
    return this.mask;
  }

  protected _destroy(): null {
    this.mask.destroy();
    this.mask = null;
    return null;
  }

  public create(input: any): any {
    return (this.mask = IMask(input, this._mask_config));
  }

  public refresh(input: any, value: string): any {
    if (this.mask)
      this._destroy();

    this.mask = this.create(input);
    this.update(value);
    return this.mask;
  }

  public reload(config: Record<string, unknown>): any {
    if (this.mask !== null)
      this._destroy();

    this._mask_config = config;
    return this.mask;
  }
}