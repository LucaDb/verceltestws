import { ICategorized, IMedia } from '@websolutespa/bom-core';
import { IColorScheme } from '../color-scheme/color-scheme';

export type IIndustryDetail = ICategorized & {
  slug: string;
  title: string;
  abstract: string;
  description: string;
  href: string;
  media: IMedia;
  gallery?: IMedia[];
  colorScheme?: IColorScheme;
};
