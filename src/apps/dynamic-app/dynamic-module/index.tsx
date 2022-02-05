import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAccess } from "helpers";
import { AppState } from "store";
import { add, getAll } from "./store/actions";
import { DataTable, FilterBar, SectionHeader } from "components/shared";
import { useTranslation } from "react-i18next";
import { Column } from "@material-table/core";
import { Icon, IconButton } from "@mui/material";
import { StyledDynamicModule } from "./dynamic-module.styled";
import { IName } from "apps/auth/store/types";
import { AddOrEdit } from "./components";
import { setDialog } from "./store";

export const DynamicModule = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("common");
  const module = useSelector((state: AppState) => state.module.module);
  const loading = useSelector((state: AppState) => state.dynamic.loading);
  const datas = useSelector((state: AppState) => state.dynamic.datas);
  const seqColumns = datas?.seqColumn?.split(",");
  const dialog = useSelector((state: AppState) => state.dynamic.dialog);

  useEffect(() => {
    if (checkUserAccess(module, "ALL_VIEW")) {
      dispatch(getAll());
    }
  }, [module]);

  const buildColumns = () => {
    let columns: Column<object>[] = [
      {
        title: "#",
        field: "index",
        width: "100px",
      },
    ];

    seqColumns?.forEach((c) => {
      let column = datas.c.find((column) => column.i === c);
      columns.push({
        title: column!.n,
        field: column!.i,
        type: column!.i.includes("Date") ? "datetime" : undefined,
        dateSetting: {
          locale: "tr-TR",
        },
      });
    });

    columns.push({
      title: "",
      field: "action",
      editable: "never",
      render: (rowData: any) => (
        <div className="action-button">
          {/* <IconButton onClick={() => handleEditClick(rowData.id)} className="edit-btn">
            <Icon>edit</Icon>
          </IconButton>
          <IconButton onClick={() => handleRemove(rowData.id)} className="remove-btn">
            <Icon>delete</Icon>
          </IconButton> */}
        </div>
      ),
    });

    return columns;
  };

  const buildData = () => {
    let data: any[] = [];

    datas?.r?.map((row, index) => {
      data.push({ index: index + 1, ...row });
    });

    return data;
  };

  const handleAddClick = () => {
    dispatch(setDialog({ opened: true, type: "add" }));
  };

  const handleDialogClose = useCallback(() => {
    dispatch(setDialog({ opened: false, type: "" }));
  }, []);

  const handleSubmit = useCallback((data: any) => {
    if (checkUserAccess(module, "ADD")) {
      dispatch(add(data));
    }
  }, []);

  return (
    <>
      <StyledDynamicModule>
        <FilterBar
          addButton={{
            show: true,
            title: t("addApplication"),
            onClick: handleAddClick,
          }}
          title={module.name[i18n.language as keyof IName]}
        />
        <DataTable
          columns={buildColumns()}
          style={{ marginTop: "1.5rem" }}
          data={buildData()}
          isLoading={loading.getAll}
          options={{
            toolbar: false,
          }}
        />
      </StyledDynamicModule>
      <AddOrEdit dialog={dialog} onClose={handleDialogClose} onSubmit={handleSubmit} />
    </>
  );
};
