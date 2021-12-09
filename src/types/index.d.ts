export interface IDispatcherResponse<T> {
  code: ResponseStatus;
  data: T;
  message: string;
}

export enum ResponseStatus {
  OK = "OK",
  ERROR = "ERROR",
  UNAUTHORIZED = "UNAUTHORIZED",
}
