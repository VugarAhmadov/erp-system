import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AppState } from "store";
import { StyledConfigurations } from "./configurations.styled";
import { useTranslation } from "react-i18next";
import { getHtmlFormOrViewname } from "./store/actions";
import { AddFormDialog } from "./components";
import { Button } from "components/shared";

export const Configurations = () => {
  const dispatch = useDispatch();
  const apps = useSelector((state: AppState) => state.auth.user.applications);
  const loading = useSelector((state: AppState) => state.configurationsNew.loading);
  const { t, i18n } = useTranslation("common");

  const handleDialogOpen = (id: string) => {
    dispatch(getHtmlFormOrViewname({ lang: i18n.language, operationId: id }));
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
                                <Button
                                  onClick={() => handleDialogOpen(operation.id)}
                                  loading={loading.getHtmlFormOrViewname}
                                >
                                  {t("openAddDialog")}
                                </Button>
                              )}
                              {operation.code === "ADD_PRIV" && (
                                // onClick={() => handleDialogOpen("add-priv", operation)}
                                <Button variant="contained" color="success">
                                  {t("openAddPrivDialog")}
                                </Button>
                              )}
                              {operation.code === "ALL_VIEW" && (
                                // onClick={() => handleDialogOpen("all-view", operation)}
                                <Button variant="contained" color="secondary">
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
      <AddFormDialog />
    </>
  );
};
