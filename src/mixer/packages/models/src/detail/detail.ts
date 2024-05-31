import { IComponent } from '../component/component';

export type IDetail = IComponent & {
  bottomBorder: boolean;
  title: string;
  abstract?: string;
  swap: boolean;
  list?: IDetailList;
};

export type IDetailList = {
  title?: string;
  abstract?: string
  items?: IDetailItem[];
};

export type IDetailItem = {
  title: string;
};
