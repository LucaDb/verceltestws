import { IMedia } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';
import { IPerson } from '../person/person';

export type IQuote = IComponent & {
  title: string,
  description: string,
  author: IPerson,
  media: IMedia;
};
