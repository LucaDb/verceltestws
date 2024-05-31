import { IProductDetail } from '@websolute/models';
import { IComponent } from '../component/component';

export type ICarousel = IComponent & {
  title: string;
  abstract?: string;
  items?: IProductDetail[]
};

export type ICarouselType = 'gallery' | 'grid';
