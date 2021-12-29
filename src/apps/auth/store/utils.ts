import { IUser } from "./types";

export const getUrl = (user: IUser) => {
  const appUrl = getAppUrl(user.applications[0].id);
  const moduleUrl = getModuleUrl(user.applications[0].modules[0].id as string);

  return `${appUrl}/${moduleUrl}`;
};

export const getAppUrl = (appId: string) => {
  switch (appId) {
    case "1800000000":
      return "security";
    // case "300000000":
    //   return "admin";
    // case "400000000":
    //   return "education";
    // case "500000000":
    //   return "exam";
    // case "600000000":
    //   return "admin";
    // case "110000000":
    //   return "admission-admin";
    // case "120000000":
    //   return "library";
    default:
      break;
  }
};

export const getModuleUrl = (moduleId: string) => {
  switch (moduleId) {
    // security
    case "1900000000":
      return "configuration";
    case "1900000001":
      return "users";
    case "1900000002":
      return "dictionaries";
    case "1900000003":
      return "user-groups";
    case "1900000004":
      return "organizations";
    case "1900000005":
      return "multilangs";
    case "1900000010":
      return "applications";
    case "1900000011":
      return "ent-modules";
    case "1900000012":
      return "operations";
    case "1900000013":
      return "ent-modules";
    case "1900000014":
      return "operations";
    case "210609491607716291":
      return "communication";
    case "210610032802299307":
      return "multilangs";
    case "210616301305003775":
      return "edu-years";
    default:
      break;
  }
};
