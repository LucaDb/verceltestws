import { IMedia, IMenuItem } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type ISideImages = IComponent & {
  title: string,
  description: string,
  navs?: IMenuItem[],
  media?: IMedia,
  items: IMedia[]
};
