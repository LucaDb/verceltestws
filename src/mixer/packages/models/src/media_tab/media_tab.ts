import { IMedia, IMenuItem } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type IMediaTabs = IComponent & {
  layout: IMediaTabsLayout;
  title: string;
  abstract?: string;
  description?: string;
  media?: IMedia;
  navs?: IMenuItem[];
  itemsList?: boolean;
  mediaRadius?: boolean;
  items?: IMediaTab[];
};

export type IMediaTab = {
  title: string;
  abstract?: string;
  description?: string;
  media?: IMedia;
};

export type IMediaTabsLayout = 'default' | 'inline';
