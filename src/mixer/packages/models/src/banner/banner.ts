import { IEntity, IMenuItem } from '@websolutespa/bom-core';
import { IColor } from '../color/color';

export type IBanner = IEntity & {
  title?: string;
  description?: string;
  navs?: IMenuItem[];
  colorData?: IColor;
};
