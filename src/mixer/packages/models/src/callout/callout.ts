import { IMenuItem } from '@websolutespa/bom-core';
import { IBanner } from '../banner/banner';
import { IComponent } from '../component/component';

export type ICallout = IComponent & {
  swap?: boolean;
  title?: string;
  abstract?: string;
  description?: string;
  navs?: IMenuItem[];
  banner?: IBanner
};
