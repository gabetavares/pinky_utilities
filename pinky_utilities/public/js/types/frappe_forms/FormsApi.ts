export interface FormEventInterface {
  registerHandlers(): void;
}

export interface FrappeDialogOptions {
  title: string,
  indicator: string,
  message: string,
}

export interface FormBinderOptions {
  formName: string;
}
