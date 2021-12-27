import { useDispatch } from "react-redux";
import { IDialogHookProps } from "components/shared/dialogs/types";
import { addDialog } from "components/shared/dialogs/store";

export const useDialog = () => {
  const dispatch = useDispatch();
  let a = 0;

  const openDialog = (props?: IDialogHookProps) => {
    dispatch(addDialog({ ...props, id: a++, open: true }));
  };

  return openDialog;
};
