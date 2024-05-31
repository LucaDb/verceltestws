import { IProjectDetail } from '@websolute/models';
import { IComponent } from '../component/component';

export type IGallery = IComponent & {
  title?: string;
  items?: IProjectDetail[]
};

export type IGalleryViewType = 'gallery' | 'grid';
