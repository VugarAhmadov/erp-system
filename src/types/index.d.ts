export interface IDispatcherResponse<T> {
  code: ResponseStatus;
  data?: T;
  message: string;
}

export type ResponseStatus = "OK" | "ERROR" | "UNAUTHORIZED";
