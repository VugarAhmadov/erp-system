import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUserAccess } from "helpers";
import { AppState } from "store";
import { add, edit, get, getAll, remove } from "./store/actions";
import { ConfirmDialog, DataTable, FilterBar } from "components/shared";
import { useTranslation } from "react-i18next";
import { Column } from "@material-table/core";
import { StyledDynamicModule } from "./dynamic-module.styled";
import { IModule, IName } from "apps/auth/store/types";
import { AddOrEditDialog } from "./components";
import { setDialog } from "./store";
import { useLocation, useNavigate } from "react-router-dom";
import { setSelectedModule } from "store/common";
import { Icon, IconButton, Paper } from "@mui/material";

export const DynamicModule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("common");

  const module = useSelector((state: AppState) => state.common.selectedModule);
  const loading = useSelector((state: AppState) => state.dynamic.loading);
  const datas = useSelector((state: AppState) => state.dynamic.datas);
  const dialog = useSelector((state: AppState) => state.dynamic.dialog);

  useEffect(() => {
    if (module && checkUserAccess(module, "ALL_VIEW")) {
      dispatch(getAll());
    } else {
      navigate(-1);
    }

    return () => {
      dispatch(setSelectedModule(null));
    };
  }, [module]);

  const handleEditClick = (id: string) => {
    dispatch(get({ url: module!.operations.find((operation) => operation.code === "ALL_VIEW")!.url, id }));
  };

  const handleDeleteClick = (id: string) => {
    dispatch(setDialog({ type: "confirm", opened: true, selectedDataId: id }));
  };

  const buildColumns = () => {
    let columns: Column<object>[] = [
      {
        title: "#",
        field: "index",
        width: "100px",
      },
    ];

    datas?.seqColumn?.split(",").forEach((c) => {
      let column = datas.c.find((column) => column.i === c);

      if (column) {
        columns.push({
          title: column.n,
          field: column.i,
          type: column.i.includes("Date") ? "datetime" : undefined,
          dateSetting: {
            locale: "tr-TR",
          },
        });
      }
    });

    if (module) {
      columns.push({
        title: "",
        field: "action",
        editable: "never",
        render: (rowData: any) => (
          <div className="action-buttons">
            {checkUserAccess(module, "EDIT") && (
              <IconButton onClick={() => handleEditClick(rowData.id)} className="edit-btn" size="small">
                <Icon>edit</Icon>
              </IconButton>
            )}
            {checkUserAccess(module, "DELETE") && (
              <IconButton onClick={() => handleDeleteClick(rowData.id)} className="remove-btn" size="small">
                <Icon>delete</Icon>
              </IconButton>
            )}
          </div>
        ),
      });
    }

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
    dispatch(setDialog({ opened: true, type: "add", selectedDataId: null }));
  };

  const handleDialogClose = useCallback(() => {
    dispatch(setDialog({ opened: false, type: "" }));
  }, []);

  const handleSubmit = useCallback(
    (data: any) => {
      if (dialog.type === "edit") {
        dispatch(edit({ url: module!.operations.find((operation) => operation.code === "EDIT")!.url, data }));
      } else {
        dispatch(add({ url: module!.operations.find((operation) => operation.code === "ADD")!.url, data }));
      }
    },
    [dialog.type]
  );

  const handleDeleteConfirm = useCallback(() => {
    dispatch(
      remove({
        url: module!.operations.find((operation) => operation.code === "DELETE")!.url,
        id: dialog.selectedDataId!,
      })
    );
  }, []);

  return module ? (
    <>
      <StyledDynamicModule>
        <FilterBar
          addButton={{
            show: checkUserAccess(module!, "ADD"),
            title: t("add"),
            onClick: handleAddClick,
          }}
          title={module.name[i18n.language as keyof IName]}
        />
        <DataTable
          columns={buildColumns()}
          style={{ marginTop: "1rem" }}
          data={buildData()}
          isLoading={loading.getAll}
          components={{ Container: (props) => <Paper variant="outlined" {...props} /> }}
          options={{
            toolbar: false,
            pageSize: 20,
          }}
        />
      </StyledDynamicModule>
      {checkUserAccess(module!, "ADD") && (
        <AddOrEditDialog dialog={dialog} onClose={handleDialogClose} onSubmit={handleSubmit} />
      )}
      <ConfirmDialog
        open={dialog.type === "confirm" && dialog.opened}
        onClose={handleDialogClose}
        onConfirm={handleDeleteConfirm}
        confirmLoading={loading.remove}
        content="Are you sure to delete?"
        title="Delete"
      />
    </>
  ) : (
    <></>
  );
};
