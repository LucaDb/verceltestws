import { ICarousel, IHero, IMediaTabs, IMore } from '@websolute/models';
import { ICategorized } from '@websolutespa/bom-core';

export type IProductCategory = ICategorized & {
  slug: string;
  title?: string;
  abstract?: string;
  description?: string;
  href?: string;
  hero?: IHero;
  more?: IMore;
  carousel?: ICarousel;
  mediaTabs?: IMediaTabs;
};
