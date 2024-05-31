import { IMedia, IMenuItem } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type ICircularSlider = IComponent & {
  eyelet?: string;
  title?: string;
  abstract?: string;
  description?: string;
  items: IMedia[];
  navs?: IMenuItem[];
};
