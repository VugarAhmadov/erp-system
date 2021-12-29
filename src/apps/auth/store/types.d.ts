export interface ILoading {
  login: boolean;
  checkUser: boolean;
}

export interface IUser {
  id: string;
  defaultAppId: string;
  account: IAccount;
  username: string;
  firstname: string;
  lastname: string;
  patronymic: string;
  personId: string;
  birthdate: string;
  photoFilePath?: string;
  organization: IOrganization;
  userType: string;
  gender: IGender;
  lang: ILang;
  pincode: string;
  sessionActive: boolean;
  isBlocked: boolean;
  defaultURL: string;
  applications: IApplication[];
  privilegeList: string[];
  inSystem: number;
  email: string;
  lastLoginDate: Date;
  myAllUsers: IMyUser[];
}

export interface IAccount {
  id: string;
  role: IRole;
}

export interface IRole {
  id: string;
  value: IName;
}

export interface IOrganization {
  id: string;
  orgTypeId: string;
  name: IName;
  shortName?: string;
  formula: string;
  logoName?: IName;
  serverName?: IName;
  description?: string;
  logo?: IOrganizationLogo;
}

export interface IName {
  az: string;
  en: string;
  ru: string;
}

export interface IOrganizationLogo {
  id?: string;
  path?: string;
}

export interface IGender {
  id: string;
  value: IName;
}

export interface ILang {
  id: string;
  value: IName;
}

export interface IApplication {
  id: string;
  name: IName;
  shortName: IName;
  url: string;
  orderBy: number;
  icon?: string;
  modules: IModule[];
}

export interface IModule {
  id: string;
  name: IName;
  shortName: IName;
  orderBy: number;
  icon?: string;
  code: string;
  operations: IOperation[];
  url: string;
}

export interface IOperation {
  id: string;
  moduleId: string;
  url: string;
  code: string;
  name: IName;
  formHtml: string;
  newType: string;
  url: string;
  viewName: string;
}

export interface IMyUser {
  id: string;
  accountId: string;
  organization: IOrganization;
  userType: string;
  role: IRole;
  currentStatus: number;
}

export interface ILoginData {
  username: string;
  password: string;
}
