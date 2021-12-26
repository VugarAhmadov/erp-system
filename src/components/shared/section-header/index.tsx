import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { StyledSectionHeader } from "./section-header.styled";

interface ISectionHeader {
  title: string;
}

export const SectionHeader: FC<ISectionHeader> = ({ title }) => {
  return (
    <StyledSectionHeader variant="h4">
      <Helmet>
        <title>{`CODEUM | ${title}`}</title>
      </Helmet>
      {title}
    </StyledSectionHeader>
  );
};
