import { createAsyncThunk } from "@reduxjs/toolkit";
import { dictionaryApi } from "api";
import i18n from "translation";
import { IGetDictionariesListByCommon } from "types";

export const getGenders = createAsyncThunk("dictionary/getGenders", async (_, { rejectWithValue }) => {
  try {
    const requestData: IGetDictionariesListByCommon = {
      lang: i18n.language,
      typeId: "1100000001",
    };

    const { data } = await dictionaryApi.getDictionariesListByCommon(requestData);
    if (data?.err?.length === 0) {
      return data.tbl[0].r;
    } else {
      return rejectWithValue(data);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});
