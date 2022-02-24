export interface IDialogOpen {
  input: boolean;
  select: boolean;
  checkbox: boolean;
  label: boolean;
  radio: boolean;
  datepicker: boolean;
  button: boolean;
  image: boolean;
  table: boolean;
  tab: boolean;
  fileUpload: boolean;
  profileImage: boolean;
}

export interface IDialogState {
  open: IDialogOpen;
}