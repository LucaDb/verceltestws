import { ICategorized, IMedia } from '@websolutespa/bom-core';
import { IColor } from '../color/color';
import { IPerson } from '../person/person';

export type ICulturaDetail = ICategorized & {
  slug: string;
  title: string;
  abstract?: string;
  description?: string;
  type: { id: string, title: string };
  tag: { id: string, title: string }[];
  layout: ICulturaLayout;
  author?: IPerson;
  colorData?: IColor;
  href?: string;
  media?: IMedia;
  thumb?: IMedia;
  youtubeCover: { title: string, src: string }
};

export type ICulturaLayout = 'default' | 'big' | 'editorial';
