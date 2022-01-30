import React, { useEffect } from "react";
import { DataTable, FilterBar, SectionHeader, Spinner } from "components/shared";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { add, getAll } from "./store/actions";
import { AppState } from "store";
import { Column } from "@material-table/core";
import { setDialog } from "./store";
import { AddOrEdit } from "./components";
import { IAddOrEditCommonOperationRequest } from "./store/types";
// import { Icon, IconButton } from "@mui/material";
// import withReactContent from "sweetalert2-react-content";
// import Swal from "sweetalert2";
import { StyledCommonOperation } from "./common-operation.styled";
import { snakeCase } from "lodash";

export const CommonOperation = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const commonOperations = useSelector((state: AppState) => state.commonOperation.commonOperations);
  const loading = useSelector((state: AppState) => state.commonOperation.loading);
  const seqColumns = commonOperations?.seqColumn?.split(",");
  const dialog = useSelector((state: AppState) => state.commonOperation.dialog);
  // const selectedOperation = useSelector((state: AppState) => state.operation.selectedOperation);

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

    commonOperations?.c?.forEach((column) => {
      columns.push({
        title: column.n,
        field: column.i,
        hidden: !seqColumns.includes(column.i),
      });
    });

    // columns.push({
    //   title: "",
    //   field: "action",
    //   editable: "never",
    //   render: (rowData: any) => (
    //     <div className="action-button">
    //       <IconButton onClick={() => handleEditClick(rowData.id)} className="edit-btn">
    //         <Icon>edit</Icon>
    //       </IconButton>
    //       <IconButton onClick={() => handleRemove(rowData.id)} className="remove-btn">
    //         <Icon>delete</Icon>
    //       </IconButton>
    //     </div>
    //   ),
    // });

    return columns;
  };
  const buildData = () => {
    let data: any[] = [];

    commonOperations?.r?.map((row, index) => {
      data.push({ index: index + 1, ...row });
    });

    return data;
  };

  const handleAddClick = () => {
    dispatch(setDialog({ opened: true, type: "add" }));
  };

  // const handleEditClick = (operationId: string) => {
  //   dispatch(setSelectedOperation(operationId));
  //   dispatch(setDialog({ type: "edit", opened: true }));
  // };

  // const handleRemove = (operationId: string) => {
  //   const MySwal = withReactContent(Swal);
  //   MySwal.fire({
  //     text: "Are you sure to remove?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "confirm",
  //     cancelButtonText: "cancel",
  //   }).then((result) => {
  //     if (result.value) {
  //       dispatch(remove(operationId));
  //     }
  //   });
  // };

  const handleDialogClose = () => {
    dispatch(setDialog({ opened: false, type: "" }));
  };

  const handleSubmit = (data: IAddOrEditCommonOperationRequest) => {
    // dialog.type === "edit"
    //   ? dispatch(edit({ ...data, id: selectedOperation }))
    //   :
    dispatch(add({ ...data, viewName: data.operationName === "VIEW" ? snakeCase(data.entity) : undefined }));
  };

  return (
    <>
      <StyledCommonOperation>
        <SectionHeader title="CommonOperations" />
        <FilterBar
          addButton={{
            show: true,
            title: t("addCommonOperation"),
            onClick: handleAddClick,
          }}
        />
        <DataTable
          columns={buildColumns()}
          style={{ marginTop: "1.5rem" }}
          data={buildData()}
          isLoading={loading.getAll}
          options={{
            toolbar: true,
            showTitle: false,
          }}
        />
      </StyledCommonOperation>
      <AddOrEdit dialog={dialog} onClose={handleDialogClose} onSubmit={handleSubmit} />
    </>
  );
};
