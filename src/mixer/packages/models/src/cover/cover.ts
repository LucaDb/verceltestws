import { IMedia, IMenuItem } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type ICover = IComponent & {
  title?: string;
  abstract?: string;
  navs?: IMenuItem[];
  media?: IMedia;
};
