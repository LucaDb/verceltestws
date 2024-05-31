import { IMedia } from '@websolutespa/bom-core';

export type BlogType = 'webinar' | 'article' | 'podcast' | 'progetto' | string;

export type BlogItem = {
  id: number;
  href?: string;
  title: string;
  abstract: string;
  type: BlogType;
  date: string | Date;
  media: IMedia;
};

export type BlogMoreItem = {
  title: string;
  items: BlogItem[];
};
