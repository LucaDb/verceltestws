import { IComponent } from '../component/component';

export type IMore = IComponent & {
  title: string;
  abstract?: string;
  description?: string;
};
