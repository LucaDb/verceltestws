import { IMenuItem } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';
import { IIndustryDetail } from '../industry_detail/industry_detail';

export type IIndustryMore = IComponent & {
  title?: string,
  quantity?: number;
  navs: IMenuItem[];
  items?: IIndustryDetail[];
};