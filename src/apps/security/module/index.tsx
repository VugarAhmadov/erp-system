import React, { useEffect } from "react";
import { DataTable, FilterBar, SectionHeader } from "components/shared";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getAll, add, edit, remove } from "./store/actions";
import { AppState } from "store";
import { Column } from "@material-table/core";
import { setDialog, setSelectedModule } from "./store";
import { AddOrEdit } from "./components";
import { IAddOrEditModuleRequest } from "./store/types";
import { Icon, IconButton } from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { StyledModule } from "./module.styled";

export const Module = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const modules = useSelector((state: AppState) => state.module.modules);
  const loading = useSelector((state: AppState) => state.module.loading);
  const seqColumns = modules?.seqColumn?.split(",");
  const dialog = useSelector((state: AppState) => state.module.dialog);
  const selectedModule = useSelector((state: AppState) => state.module.selectedModule);

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

    modules?.c?.forEach((column) => {
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

    modules?.r?.map((row, index) => {
      data.push({ index: index + 1, ...row });
    });

    return data;
  };

  const handleAddClick = () => {
    dispatch(setDialog({ opened: true, type: "add" }));
  };

  const handleEditClick = (moduleId: string) => {
    dispatch(setSelectedModule(moduleId));
    dispatch(setDialog({ type: "edit", opened: true }));
  };

  const handleRemove = (moduleId: string) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      text: "Are you sure to remove?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "confirm",
      cancelButtonText: "cancel",
    }).then((result) => {
      if (result.value) {
        dispatch(remove(moduleId));
      }
    });
  };

  const handleDialogClose = () => {
    dispatch(setDialog({ opened: false, type: "" }));
  };

  const handleSubmit = (data: IAddOrEditModuleRequest) => {
    dialog.type === "edit" ? dispatch(edit({ ...data, id: selectedModule })) : dispatch(add(data));
  };

  return (
    <>
      {" "}
      <StyledModule>
        <SectionHeader title="Modules" />
        <FilterBar
          addButton={{
            show: true,
            title: t("addModule"),
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
      </StyledModule>
      <AddOrEdit dialog={dialog} onClose={handleDialogClose} onSubmit={handleSubmit} />
    </>
  );
};
