import React from "react";
import { useSelector } from "react-redux";
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
import { AppState } from "store";
import { StyledConfigurations } from "./configurations.styled";
import { useTranslation } from "react-i18next";

export const Configurations = () => {
  const apps = useSelector((state: AppState) => state.auth.user.applications);

  const { t } = useTranslation("common");

  return (
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
                              // onClick={() => handleDialogOpen("add", operation)}
                              <Button variant="contained">{t("openAddDialog")}</Button>
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
  );
};
