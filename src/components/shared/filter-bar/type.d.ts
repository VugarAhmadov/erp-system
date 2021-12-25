export interface IFilterBar {
  // config: IFilterBarConfig;
  addButton: IAddButton;
}

export interface IFilterBarConfig {}

export interface IAddButton {
  show: boolean;
  title?: string;
  onClick?(): void;
  // link?: string;
  icon?: string;
}
