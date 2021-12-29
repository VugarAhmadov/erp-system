export interface ILoading {
  getDictionaryTypeList: boolean;
}

export interface IDictionyType {
  active: string;
  code: string;
  createDate: Date;
  createUserId: string;
  hiddenStatus: string;
  id: string;
  name: string;
  nameAz: string;
  nameEn: string;
  nameRu: string;
  showUserType: string;
  updateDate: string;
  updateUserId: string;
}
