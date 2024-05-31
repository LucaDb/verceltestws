import { ICategorized, IMedia } from '@websolutespa/bom-core';
import { IClient } from '../client/client';
import { IColor } from '../color/color';
import { IHero } from '../hero/hero';
import { IPerson } from '../person/person';

export type IProjectDetail = ICategorized & {
  slug: string;
  title: string;
  abstract: string;
  description: string;
  href: string;
  media: IMedia;
  selection: boolean;
  client: IClient;
  tag: {
    id: string;
    title: string;
  }[];
  type: {
    id: string;
    title: string;
  }[];
  layout: IProjectLayout;
  author?: IPerson;
  colorData?: IColor;
  hero: IHero[];
};

export type IProjectLayout = 'default' | 'big' | 'editorial';
