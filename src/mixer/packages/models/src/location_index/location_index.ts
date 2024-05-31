import { ICategorized, IMedia } from '@websolutespa/bom-core';

export type ILocationIndex = ICategorized & {
  slug: string;
  title: string;
  abstract: string;
  description: string;
  href: string;
  media: IMedia;
};
