import { IMenuItem } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type ITextList = IComponent & {
  eyelet?: string;
  title?: string;
  abstract?: string;
  description?: string;
  items?: ITextListItem[];
};

export type ITextListItem = {
  title?: string;
  abstract?: string;
  description?: string;
  navs?: IMenuItem[];
};
