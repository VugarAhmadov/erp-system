export interface IFilterBar {
  // config: IFilterBarConfig;
  addButton: IAddButton;
  title?: string;
}

export interface IFilterBarConfig {}

export interface IAddButton {
  show: boolean;
  title?: string;
  onClick?(): void;
  // link?: string;
  icon?: string;
}
