import { IMedia } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type IMediaBox = IComponent & {
  wrapper: boolean;
  media: IMedia;
  layout: IMediaBoxLayout,
  items: IMedia[];
};

export type IMediaBoxLayout = 'vertical' | 'horizontal';

