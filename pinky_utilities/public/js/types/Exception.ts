export interface ExceptionInterface {
  name?: string,
  code: string,
  message: string,
  meta?: Record<string, unknown>
}