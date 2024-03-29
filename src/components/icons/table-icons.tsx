import { forwardRef } from "react";
import { Icon } from "@mui/material";

export const tableIcons = {
  // Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Add: forwardRef((props, ref) => <Icon {...props}>add_box</Icon>),
  // Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Icon {...props}>check</Icon>),
  // Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Icon {...props}>clear</Icon>),
  // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <Icon {...props}>delete_outline</Icon>),
  // DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <Icon {...props}>chevron_right</Icon>),
  // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Icon {...props}>edit</Icon>),
  // Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <Icon {...props}>save_alt</Icon>),
  // Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <Icon {...props}>filter_list</Icon>),
  // FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <Icon {...props}>first_page</Icon>),
  // LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <Icon {...props}>last_page</Icon>),
  // NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <Icon {...props}>chevron_right</Icon>),
  // PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <Icon {...props}>chevron_left</Icon>),
  // ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Icon {...props}>clear</Icon>),
  // Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Icon {...props}>search</Icon>),
  // SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <Icon {...props}>arrow_upward</Icon>),
  // ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Icon {...props}>remove</Icon>),
  // ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <Icon {...props}>view_column</Icon>),
};
