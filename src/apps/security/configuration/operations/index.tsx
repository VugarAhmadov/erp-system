import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Icon, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { StyledOperations } from "./operations.styled";

export const Operations = () => {
  const apps = useSelector((state: AppState) => state.auth.user.applications);

  return (
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
                  <ul>
                    {module.operations.map((operation) => (
                      <li key={operation.id}>{operation.name.az}</li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </StyledOperations>
  );
};
