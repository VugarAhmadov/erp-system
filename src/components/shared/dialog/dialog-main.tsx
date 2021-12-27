export interface IModal {
  id: number;
  open: boolean;
  title: string;
  content?: JSX.Element;
  onClose(id: number): void;
}

export const Modal: FC<IModal> = ({ open, id, content, title, onClose }) => {
  return (
    <Dialog open={open} onClose={() => onClose(id)} PaperComponent={Paper}>
      <DialogTitle style={{ cursor: "move" }}>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <MaterialDialogActions>
        <Button autoFocus color="primary" onClick={() => onClose(id)}>
          Cancel
        </Button>
      </MaterialDialogActions>
    </Dialog>
  );
};
