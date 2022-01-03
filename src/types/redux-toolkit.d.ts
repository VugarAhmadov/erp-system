// import { AppState } from "store";

// declare module "@reduxjs/toolkit" {
//   type AsyncThunkConfig = {
//     state?: unknown;
//     dispatch?: Dispatch;
//     extra?: unknown;
//     rejectValue?: unknown;
//     serializedErrorType?: unknown;
//   };

//   function createAsyncThunk<
//     Returned,
//     ThunkArg = void,
//     ThunkApiConfig extends AsyncThunkConfig = {
//       state: AppState; // this line makes a difference
//     }
//   >(
//     typePrefix: string,
//     payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkApiConfig>,
//     options?: any
//   ): AsyncThunk<Returned, ThunkArg, ThunkApiConfig>;
// }
