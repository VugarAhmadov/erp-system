import React, { FC, useEffect, useState } from "react";
import { Icon, IconButton, Button as MuiButton } from "@mui/material";
import { ElementWithDnd, Element, Modal } from "../..";

export interface IButtonParams {
  sort: "icon" | "button" | "link";
  size: "small" | "medium" | "large";
  variant: "text" | "outlined" | "contained";
  color: "error" | "info" | "warning" | "success" | "inherit" | "primary" | "secondary";
  iconName?: string;
  linkUrl?: string;
  label: string;
  linkedOperationId?: string;
}

interface IButtonElement {
  withDnd?: boolean;
  gridRowIndex: number;
  gridColumnIndex: number;
  params: IButtonParams;
  onEdit?(type: string, gridRowIndex: number, gridColumnIndex: number): void;
  onDelete?(gridRowIndex: number, gridColumnIndex: number): void;
}

export const ButtonElement: FC<IButtonElement> = ({ withDnd, params, ...rest }) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const { label, variant, size, iconName, color, sort, linkUrl, linkedOperationId } = params;

  const button =
    sort === "icon" ? (
      <IconButton size={size} color={color}>
        <Icon>{iconName}</Icon>
      </IconButton>
    ) : (
      <MuiButton
        variant={variant}
        href={sort === "link" && linkUrl ? linkUrl : undefined}
        size={size}
        color={color}
        fullWidth
        onClick={() => (linkedOperationId ? setModalOpened(true) : undefined)}
      >
        {label}
      </MuiButton>
    );

  return withDnd ? (
    <>
      <ElementWithDnd {...rest} type="button" params={params}>
        {button}
      </ElementWithDnd>
      {linkedOperationId && (
        <Modal open={modalOpened} onClose={() => setModalOpened(false)} linkedOperationId={linkedOperationId} />
      )}
    </>
  ) : (
    <>
      <Element>{button}</Element>
    </>
  );
};
