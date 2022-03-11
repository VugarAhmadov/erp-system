import React, { FC } from "react";
import { StyledElement } from "./element.styled";

interface IElement {
  params: any;
}

export const Element: FC<IElement> = ({ children, params }) => {
  return (
    <StyledElement
      style={{
        width: params.width && `${params.width}px`,
        height: params.height && `${params.height}px`,
        marginTop: params.marginTop && `${params.marginTop}px`,
        marginBottom: params.marginBottom && `${params.marginBottom}px`,
      }}
    >
      {children}
    </StyledElement>
  );
};
