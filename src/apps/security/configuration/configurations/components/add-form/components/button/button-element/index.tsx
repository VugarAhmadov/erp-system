import React, { FC, useEffect, useState } from "react";
import { Icon, IconButton, Button as MuiButton } from "@mui/material";
import { ElementWithDnd, Element, Modal } from "../..";

interface IButtonElement {
  withDnd?: boolean;
  sort: "icon" | "button" | "link";
  size: "small" | "medium" | "large";
  variant: "text" | "outlined" | "contained";
  color: "error" | "info" | "warning" | "success" | "inherit" | "primary" | "secondary";
  iconName?: string;
  linkUrl?: string;
  label: string;
  top: number;
  left: number;
  width?: string;
  index: number;
  linkedOperationId?: string;
  onEdit?(type: string, index: number): void;
  onDelete?(index: number): void;
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
      <ElementWithDnd {...rest} type="button">
        {button}
      </ElementWithDnd>
      {linkedOperationId && (
        <Modal open={modalOpened} onClose={() => setModalOpened(false)} linkedOperationId={linkedOperationId} />
      )}
    </>
  ) : (
    <>
      <Element top={rest.top} left={rest.left} width={rest.width}>
        {button}
      </Element>
    </>
  );
};
