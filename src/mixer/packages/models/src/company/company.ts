import { IEntity, IMedia, IMenuItem } from '@websolutespa/bom-core';
import { IColor } from '../color/color';

export type ICompany = IEntity & {
  title: string;
  abstract: string;
  media: IMedia;
  colorData?: IColor;
  order?: number;
  navs?: IMenuItem[];
};
