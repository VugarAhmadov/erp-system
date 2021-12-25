export interface INativeTable {
  table: ITable;
  apiEndpoints: IApiEndpoints;
}

export interface ITable {
  config: ITableConfig;
  columnConfig: ITableColumnConfig;
}

export interface ITableColumnConfig {
  numberIndexed: boolean;
}

export interface IApiEndpoints {
  allView: string;
}
