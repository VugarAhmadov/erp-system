import {
  IEditTableRequest,
  IAddColumnRequest,
  IEditColumnRequest,
  IRemoveColumnRequest,
} from "apps/security/configuration/tables/store/types";
import { defaultRequest } from "helpers";
import { IDispatcherResponse, IObject } from "types";

const getAll = async () => {
  return await defaultRequest.post<IObject[]>("api/jwt/tables");
};

const edit = async (requestData: IEditTableRequest) => {
  const { oldName, newName } = requestData;

  return await defaultRequest.post<IDispatcherResponse<null>>(`api/jwt/generateObject/${newName}/EDIT`, { oldName });
};

const remove = async (tableName: string) => {
  return await defaultRequest.post<IDispatcherResponse<null>>(`api/jwt/generateObject/${tableName}/REMOVE`, {});
};

const addColumn = async (requestData: IAddColumnRequest) => {
  const { tableName, columnName, columnType } = requestData;

  return await defaultRequest.post<IDispatcherResponse<null>>(
    `api/jwt/generate/object/${tableName}/${columnName}/ADD`,
    { fieldType: columnType }
  );
};

const editColumn = async (requestData: IEditColumnRequest) => {
  const { tableName, fieldName, fieldType, oldFieldName, oldFieldType } = requestData;

  return await defaultRequest.post<IDispatcherResponse<null>>(
    `api/jwt/generate/object/${tableName}/${fieldName}/EDIT`,
    { oldFieldType, oldFieldName, fieldType }
  );
};

const removeColumn = async (requestData: IRemoveColumnRequest) => {
  const { tableName, columnName, columnType } = requestData;

  return await defaultRequest.post<IDispatcherResponse<null>>(
    `api/jwt/generate/object/${tableName}/${columnName}/REMOVE`,
    { fieldType: columnType }
  );
};

export const tablesApi = {
  getAll,
  edit,
  remove,
  addColumn,
  editColumn,
  removeColumn,
};
