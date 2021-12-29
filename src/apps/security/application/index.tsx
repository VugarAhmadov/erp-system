import React, { useEffect } from "react";
import { DataTable, FilterBar, SectionHeader } from "components/shared";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAll, add, edit, remove } from "./store/actions";
import { AppState } from "store";
import { Column } from "@material-table/core";
import { setDialog, setSelectedApplication } from "./store";
import { AddOrEdit } from "./components";
import { IAddOrEditApplicationRequest } from "./store/types";
import { Icon, IconButton } from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { StyledApplication } from "./application.styled";

export const Application = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const applications = useSelector((state: AppState) => state.application.applications);
  const loading = useSelector((state: AppState) => state.application.loading);
  const seqColumns = applications?.seqColumn?.split(",");
  const dialog = useSelector((state: AppState) => state.application.dialog);
  const selectedApp = useSelector((state: AppState) => state.application.selectedApp);

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

    applications?.c?.forEach((column) =>
      columns.push({
        title: column.n,
        field: column.i,
        hidden: !seqColumns.includes(column.i),
      })
    );

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

    applications?.r?.map((row, index) => {
      data.push({ index: index + 1, ...row });
    });

    return data;
  };

  const handleAddClick = () => {
    dispatch(setDialog({ opened: true, type: "add" }));
  };

  const handleEditClick = (appId: string) => {
    dispatch(setSelectedApplication(appId));
    dispatch(setDialog({ type: "edit", opened: true }));
  };

  const handleRemove = (appId: string) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      text: "Are you sure to remove?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "confirm",
      cancelButtonText: "cancel",
    }).then((result) => {
      if (result.value) {
        dispatch(remove(appId));
      }
    });
  };

  const handleDialogClose = () => {
    dispatch(setDialog({ opened: false, type: "" }));
  };

  const handleSubmit = (data: IAddOrEditApplicationRequest) => {
    dialog.type === "edit" ? dispatch(edit({ ...data, id: selectedApp })) : dispatch(add(data));
  };

  return (
    <>
      <StyledApplication>
        <SectionHeader title="Applications" />
        <FilterBar
          addButton={{
            show: true,
            title: t("addApplication"),
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
      </StyledApplication>
      <AddOrEdit dialog={dialog} onClose={handleDialogClose} onSubmit={handleSubmit} />
    </>
  );
};
