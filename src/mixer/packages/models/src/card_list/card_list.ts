import { IMedia, IMenuItem } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type ICardList = IComponent & {
  eyelet?: string;
  title?: string;
  abstract?: string;
  description?: string;
  items?: ICardListItem[];
};

export type ICardListItem = {
  title?: string;
  abstract?: string;
  media?: IMedia;
  navs?: IMenuItem[];
};
