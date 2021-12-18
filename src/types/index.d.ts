export interface IDispatcherResponse<T> {
  code: ResponseStatus;
  data?: T;
  message: IMessage | string;
}

export type ResponseStatus = "OK" | "ERROR" | "UNAUTHORIZED";

export interface IMessage {
  az: string;
  en?: string;
  ru?: string;
}
