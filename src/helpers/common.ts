import { IModule } from "apps/auth/store/types";

export const a11yProps = (index: number | string) => ({
  id: `tab-${index}`,
  "aria-controls": `tabpanel-${index}`,
});

export const isNotNull = (obj?: {}) => {
  if (obj) {
    return Object.keys(obj).length > 0;
  } else {
    return false;
  }
};

export const checkUserAccess = (module: IModule, operationCode: string) => {
  if (module.operations.length > 0) {
    const isAllowed = module.operations.find((operation) => operation.code === operationCode);

    if (isAllowed) {
      return true;
    }
  }

  return false;
};
