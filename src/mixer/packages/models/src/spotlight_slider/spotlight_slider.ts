import { IMenuItem } from '@websolutespa/bom-core';
import { ICompany } from '../company/company';
import { IComponent } from '../component/component';

export type ISpotlightSlider = IComponent & {
  eyelet: string;
  title: string;
  abstract: string;
  description: string;
  navs: IMenuItem[];
  startingIndex?: number;
  companies?: ICompany[];
};
