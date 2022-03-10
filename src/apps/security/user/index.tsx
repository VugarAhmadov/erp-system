import React, { useEffect } from "react";
import { DataTable, FilterBar, SectionHeader, Spinner } from "components/shared";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { add, edit, getAll, remove } from "./store/actions";
import { AppState } from "store";
import { Column } from "@material-table/core";
import { setDialog, setSelectedUser } from "./store";
import { AddOrEdit } from "./components";
import { IAddOrEditUserRequest } from "./store/types";
import { Icon, IconButton } from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { StyledUser } from "./user.styled";
import { snakeCase } from "lodash";

export const User = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const users = useSelector((state: AppState) => state.user.users);
  const loading = useSelector((state: AppState) => state.user.loading);
  const seqColumns = users?.seqColumn?.split(",");
  const dialog = useSelector((state: AppState) => state.user.dialog);
  const selectedUser = useSelector((state: AppState) => state.user.selectedUser);

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

    users?.c?.forEach((column) => {
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

    users?.r?.map((row, index) => {
      data.push({ index: index + 1, ...row });
    });

    return data;
  };

  const handleAddClick = () => {
    dispatch(setDialog({ opened: true, type: "add" }));
  };

  const handleEditClick = (userId: string) => {
    dispatch(setSelectedUser(userId));
    dispatch(setDialog({ type: "edit", opened: true }));
  };

  const handleRemove = (userId: string) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      text: "Are you sure to remove?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "confirm",
      cancelButtonText: "cancel",
    }).then((result) => {
      if (result.value) {
        dispatch(remove(userId));
      }
    });
  };

  const handleDialogClose = () => {
    dispatch(setDialog({ opened: false, type: "" }));
  };

  const handleSubmit = (data: IAddOrEditUserRequest) => {
    // console.log(data);
    // dialog.type === "edit"
    //   ? dispatch(edit({ ...data, id: selectedUser }))
    //   : dispatch(add({ ...data, viewName: data.userName === "VIEW" ? snakeCase(data.entity) : undefined }));
  };

  return (
    <>
      <StyledUser>
        <FilterBar
          addButton={{
            show: true,
            title: t("addOperation"),
            onClick: handleAddClick,
          }}
          title="Users"
        />
        <DataTable
          columns={buildColumns()}
          style={{ marginTop: "1rem" }}
          data={buildData()}
          isLoading={loading.getAll}
          options={{
            toolbar: false,
          }}
        />
      </StyledUser>
      <AddOrEdit dialog={dialog} onClose={handleDialogClose} onSubmit={handleSubmit} />
    </>
  );
};
