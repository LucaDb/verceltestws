import { IComponent } from '../component/component';
import { ICulturaDetail } from '../cultura_detail/cultura_detail';

export type IBlogMore = IComponent & {
  title: string;
  abstract?: string;
  description?: string;
  quantity?: number;
  cta?: boolean;
  items?: ICulturaDetail[];
};
