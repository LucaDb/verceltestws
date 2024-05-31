import { IMedia, IMenuItem } from '@websolutespa/bom-core';
import { ILazyComponent, SeoWeight } from '@websolutespa/bom-mixer-models';
import { IColor } from '../color/color';
import { IComponent } from '../component/component';

export type IFolderComponent = {
  colorData: IColor;
  title?: string;
  abstract?: string;
  seoWeight?: SeoWeight;
};

export type IFolder = IComponent & {
  title?: string;
  abstract?: string;
  components?: (ILazyComponent & IFolderComponent)[];
};

export type IFolderPie = IFolderComponent & {
  items: IFolderPieItem[];
};

export type IFolderPieItem = {
  title: string | undefined;
  top: string | undefined;
  left: string | undefined;
};

export type IFolderAccordion = IFolderComponent & {
  items: IFolderAccordionItem[],
};

export type IFolderAccordionItem = {
  title: string;
  abstract?: string;
  colorData?: IColor;
  active?: boolean;
};

export type IFolderHive = IFolderComponent & {
  items: IFolderHiveItem[];
};

export type IFolderHiveItem = {
  title: string | undefined;
  abstract?: string | undefined;
};

export type IFolderMedia = IFolderComponent & {
  categories: IFolderMediaCategory[];
};

export type IFolderMediaCategory = {
  title: string,
  items: IFolderMediaItem[];
};

export type IFolderMediaItem = {
  media?: IMedia;
  navs?: IMenuItem[];
};
