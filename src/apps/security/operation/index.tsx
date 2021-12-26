import React, { useEffect } from "react";
import { DataTable, FilterBar, SectionHeader, Spinner } from "components/shared";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { add, edit, getAll, remove } from "./store/actions";
import { AppState } from "store";
import { Column } from "@material-table/core";
import { setDialog, setSelectedOperation } from "./store";
import { AddOrEdit } from "./components";
import { IAddOrEditOperationRequest } from "./store/types";
import { Icon, IconButton } from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { StyledOperation } from "./operation.styled";

export const Operation = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const operations = useSelector((state: AppState) => state.operation.operations);
  const loading = useSelector((state: AppState) => state.operation.loading);
  const seqColumns = operations?.seqColumn?.split(",");
  const dialog = useSelector((state: AppState) => state.operation.dialog);
  const selectedOperation = useSelector((state: AppState) => state.operation.selectedOperation);

  useEffect(() => {
    dispatch(getAll());
  }, []);

  const buildColumns = () => {
    let columns: Column<object>[] = [
      {
        title: "№",
        field: "index",
        width: "100px",
      },
    ];

    operations?.c?.forEach((column) => {
      columns.push({
        title: column.n,
        field: column.i,
        hidden: !seqColumns.includes(column.i),
      });
    });

    columns.push({
      title: "",
      field: "action",
      editable: "never",
      render: (rowData: any) => (
        <div className="action-button">
          <IconButton onClick={() => handleEditClick(rowData.id)} className="edit-btn">
            <Icon>edit</Icon>
          </IconButton>
          <IconButton onClick={() => handleRemove(rowData.id)} className="remove-btn">
            <Icon>delete</Icon>
          </IconButton>
        </div>
      ),
    });

    return columns;
  };

  const buildData = () => {
    let data: any[] = [];

    operations?.r?.map((row, index) => {
      data.push({ index: index + 1, ...row });
    });

    return data;
  };

  const handleAddClick = () => {
    dispatch(setDialog({ opened: true, type: "add" }));
  };

  const handleEditClick = (operationId: string) => {
    dispatch(setSelectedOperation(operationId));
    dispatch(setDialog({ type: "edit", opened: true }));
  };

  const handleRemove = (operationId: string) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      text: "Are you sure to remove?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "confirm",
      cancelButtonText: "cancel",
    }).then((result) => {
      if (result.value) {
        dispatch(remove(operationId));
      }
    });
  };

  const handleDialogClose = () => {
    dispatch(setDialog({ opened: false, type: "" }));
  };

  const handleSubmit = (data: IAddOrEditOperationRequest) => {
    dialog.type === "edit" ? dispatch(edit({ ...data, id: selectedOperation })) : dispatch(add(data));
  };

  return (
    <>
      {" "}
      <StyledOperation>
        <SectionHeader title="Operations" />
        <FilterBar
          addButton={{
            show: true,
            title: t("addOperation"),
            onClick: handleAddClick,
          }}
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
      </StyledOperation>
      <AddOrEdit dialog={dialog} onClose={handleDialogClose} onSubmit={handleSubmit} />
    </>
  );
};
