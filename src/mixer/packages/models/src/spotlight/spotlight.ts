import { IMenuItem } from '@websolutespa/bom-core';
import { ICompany } from '../company/company';
import { IComponent } from '../component/component';

export type ISpotlight = IComponent & {
  layout: ISpotlightType;
  title: string;
  abstract: string;
  description: string;
  navs: IMenuItem[];
  companies?: ICompany[];
};

export type ISpotlightDetail = ICompany & {
  textColor?: string;
  textSize?: 'sm' | 'md';
};

export type ISpotlightType = 'grid' | 'line';
