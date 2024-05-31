import { IMenuItem } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';
import { IProjectDetail } from '../project_detail/project_detail';

export type IProjectMore = IComponent & {
  title?: string,
  quantity?: number;
  navs: IMenuItem[];
  items?: IProjectDetail[];
};