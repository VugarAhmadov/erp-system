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
import { getViewForm, getHtmlForm } from "./store/actions";
import { HtmlFormDialog, ViewFormDialog } from "./components";
import { Button } from "components/shared";

export const Configurations = () => {
  const dispatch = useDispatch();
  const apps = useSelector((state: AppState) => state.auth.user.applications);
  const loading = useSelector((state: AppState) => state.configurations.loading);
  const { t, i18n } = useTranslation("common");

  const handleHtmlFormClick = (id: string) => {
    dispatch(getHtmlForm({ lang: i18n.language, operationId: id }));
  };

  const handleAllViewFormClick = (id: string) => {
    dispatch(getViewForm({ lang: i18n.language, operationId: id }));
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
                                <Button onClick={() => handleHtmlFormClick(operation.id)} loading={loading.getHtmlForm}>
                                  {t("openAddDialog")}
                                </Button>
                              )}
                              {operation.code === "ADD_PRIV" && (
                                <Button variant="contained" color="success" onClick={() => {}}>
                                  {t("openAddPrivDialog")}
                                </Button>
                              )}
                              {operation.code === "ALL_VIEW" && (
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleAllViewFormClick(operation.id)}
                                  loading={loading.getViewForm}
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
      <HtmlFormDialog />
      <ViewFormDialog />
    </>
  );
};
