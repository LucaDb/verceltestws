import { IMedia } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type IHero = IComponent & {
  title: string;
  media: IMedia;
  layout?: IHeroLayout;
  gallery?: IMedia[];
};

export type IHeroLayout = 'default' | 'masked';
