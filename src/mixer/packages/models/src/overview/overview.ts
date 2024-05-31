import { IMenuItem } from '@websolutespa/bom-core';
import { ICompany } from '../company/company';
import { IComponent } from '../component/component';
import { IPerson } from '../person/person';
import { IWorkRole } from '../work_role/work_role';

export type IOverview = IComponent & {
  items: IOverviewTab[];
};

export type IOverviewTab = {
  title: string;
  items: IOverviewTabItem[];
  companies?: ICompany[];
  partners?: IOverviewTabItem[];
};

export type IOverviewTabItem = {
  title?: string;
  role?: IWorkRole;
  abstract?: string;
  items: IOverviewTabListItem[];
};

export type IOverviewTabListItem = {
  title?: string;
  member?: IPerson;
  navs?: IMenuItem[];
};
