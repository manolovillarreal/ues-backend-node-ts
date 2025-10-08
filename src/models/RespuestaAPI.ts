export interface RespuestaAPI<T = any> {
  ok: boolean;
  message: string;
  data?: T;
}