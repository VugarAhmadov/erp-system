import React, { useEffect } from "react";
import { DataTable, FilterBar, Spinner } from "components/shared";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "./store/actions";
import { AppState } from "store";
import { Column } from "@material-table/core";
import { setDialog } from "./store";
import { AddOrEdit } from "./components";

export const Application = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const applications = useSelector((state: AppState) => state.application.applications);
  const loading = useSelector((state: AppState) => state.application.loading);
  const seqColumns = applications?.seqColumn?.split(",");
  const dialog = useSelector((state: AppState) => state.application.dialog);

  useEffect(() => {
    dispatch(getAll());
  }, []);

  const buildColumns = () => {
    let columns: Column<object>[] = [
      {
        title: "№",
        field: "index",
      },
    ];

    applications?.c?.forEach((column) => {
      columns.push({
        title: column.n,
        field: column.i,
        hidden: !seqColumns.includes(column.i),
      });
    });

    return columns;
  };

  const buildData = () => {
    let data: any[] = [];

    applications?.r?.map((row, index) => {
      data.push({ index: index + 1, ...row });
    });

    return data;
  };

  const handleDialogClose = () => {
    dispatch(setDialog({ opened: false, type: "" }));
  };

  return !loading.getAll ? (
    <>
      <FilterBar
        addButton={{
          show: true,
          title: t("addApplication"),
          onClick: () => dispatch(setDialog({ opened: true, type: "add" })),
        }}
      />
      <DataTable columns={buildColumns()} data={buildData()} />
      <AddOrEdit dialog={dialog} onClose={handleDialogClose} onSubmit={(data: any) => console.log(data)} />
    </>
  ) : (
    <Spinner />
  );
};
