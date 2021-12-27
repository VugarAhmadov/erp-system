import React from "react";
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
import { AppState } from "store";
import { StyledOperations } from "./operations.styled";
import { useTranslation } from "react-i18next";
import { AddForm, Dialog } from "./components";
import { setDialog, setSelectedOperation } from "./store";
import { useDialog } from "hooks";

export const Operations = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const addDialog = useDialog();
  const apps = useSelector((state: AppState) => state.auth.user.applications);
  const dialog = useSelector((state: AppState) => state.operations.dialog);

  const handleDialogOpen = (type: "" | "add" | "edit" | "all-view" | "add-priv", operation: string) => {
    addDialog({
      content: <AddForm />,
      maxWidth: "sm",
      scroll: "paper",
      fullWidth: true,
    });

    dispatch(setSelectedOperation(operation));
    dispatch(setDialog({ type, opened: true }));
  };

  const handleDialogClose = () => {
    dispatch(setDialog({ type: "", opened: false }));
  };

  return (
    <>
      <StyledOperations>
        {apps.map((app) => (
          <Accordion className="application" key={app.id}>
            <AccordionSummary expandIcon={<Icon>expand_more</Icon>} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>{app.name.az}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {app.modules.map((module) => (
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
                        {module.operations.map((operation) => (
                          <TableRow key={operation.id}>
                            <TableCell>{operation.name.az}</TableCell>
                            <TableCell>
                              {operation.code === "ADD" && (
                                <Button variant="contained" onClick={() => handleDialogOpen("add", operation.id)}>
                                  {t("openAddDialog")}
                                </Button>
                              )}
                              {operation.code === "ADD_PRIV" && (
                                <Button
                                  variant="contained"
                                  color="success"
                                  onClick={() => handleDialogOpen("add-priv", operation.id)}
                                >
                                  {t("openAddPrivDialog")}
                                </Button>
                              )}
                              {operation.code === "ALL_VIEW" && (
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleDialogOpen("all-view", operation.id)}
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
      </StyledOperations>
      {/* <Dialog dialog={dialog} onClose={handleDialogClose} onSubmit={() => {}} /> */}
    </>
  );
};
