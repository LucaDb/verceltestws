import { IMenuItem } from '@websolutespa/bom-core';
import { IClient } from '../client/client';
import { IComponent } from '../component/component';

export type IHighlights = IComponent & {
  eyelet?: string;
  title?: string;
  abstract?: string;
  description?: string;
  clients: IClient[];
  navs: IMenuItem[];
};
