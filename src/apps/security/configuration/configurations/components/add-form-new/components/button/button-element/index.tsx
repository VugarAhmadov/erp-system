import React, { FC, useEffect, useState } from "react";
import { Icon, IconButton, Button as MuiButton } from "@mui/material";
import { ElementWithDnd, Element, Modal } from "../..";

interface IButtonElement {
  withDnd?: boolean;
  rowIndex: number;
  columnIndex: number;
  params: any;
  sort: "icon" | "button" | "link";
  size: "small" | "medium" | "large";
  variant: "text" | "outlined" | "contained";
  color: "error" | "info" | "warning" | "success" | "inherit" | "primary" | "secondary";
  iconName?: string;
  linkUrl?: string;
  label: string;
  linkedOperationId?: string;
  onEdit?(type: string, rowIndex: number, columnIndex: number): void;
  onDelete?(rowIndex: number, columnIndex: number): void;
}

export const ButtonElement: FC<IButtonElement> = ({
  withDnd,
  label,
  variant,
  size,
  iconName,
  color,
  sort,
  linkUrl,
  linkedOperationId,
  params,
  ...rest
}) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

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
