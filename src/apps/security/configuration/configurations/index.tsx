import React, { useCallback } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppState } from "store";
import { StyledConfigurations } from "./configurations.styled";
import { Dialog } from "./components";
import { setDialog, setSelectedOperation } from "./store";
import { IAddHtmlFormRequest, IAddViewFormRequest } from "apps/security/operation/store/types";
import { addHtmlForm, addViewForm } from "apps/security/operation/store/actions";
import { IOperation } from "apps/auth/store/types";

export const Configurations = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const apps = useSelector((state: AppState) => state.auth.user.applications);
  const dialog = useSelector((state: AppState) => state.configurations.dialog);

  const handleDialogOpen = (type: "" | "add" | "edit" | "all-view" | "add-priv", operation: IOperation) => {
    dispatch(setSelectedOperation(operation));
    dispatch(getConfigurationHtmlFormOrViewname());
    dispatch(setDialog({ type, opened: true }));
  };

  const handleDialogClose = useCallback(() => {
    dispatch(setDialog({ type: "", opened: false }));
  }, []);

  const handleAddFormSubmit = (data: IAddHtmlFormRequest) => {
    dispatch(addHtmlForm(data));
  };

  const handleAllViewFormSubmit = (data: IAddViewFormRequest) => {
    dispatch(addViewForm(data));
  };

  return (
    <>
      <StyledConfigurations>
        {apps?.map((app) => (
          <Accordion className="application" key={app.id}>
            <AccordionSummary expandIcon={<Icon>expand_more</Icon>} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>{app.name.az}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {app?.modules?.map((module) => (
                <Accordion className="module" key={module.id}>
                  <AccordionSummary
                    expandIcon={<Icon>expand_more</Icon>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>{module.name.az}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>{t("operations")}</TableCell>
                          <TableCell>{t("actions")}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {module?.operations?.map((operation) => (
                          <TableRow key={operation.id}>
                            <TableCell>{operation.name.az}</TableCell>
                            <TableCell>
                              {operation.code === "ADD" && (
                                <Button variant="contained" onClick={() => handleDialogOpen("add", operation)}>
                                  {t("openAddDialog")}
                                </Button>
                              )}
                              {operation.code === "ADD_PRIV" && (
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={() => handleDialogOpen("add-priv", operation)}
                                >
                                  {t("openAddPrivDialog")}
                                </Button>
                              )}
                              {operation.code === "ALL_VIEW" && (
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleDialogOpen("all-view", operation)}
                                >
                                  {t("openAllViewDialog")}
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </StyledConfigurations>
      <Dialog
        dialog={dialog}
        onClose={handleDialogClose}
        onAddFormSubmit={handleAddFormSubmit}
        onAllViewFormSubmit={handleAllViewFormSubmit}
      />
    </>
  );
};
