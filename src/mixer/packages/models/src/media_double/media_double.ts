import { IMedia } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type IMediaDouble = IComponent & {
  wrapper: boolean;
  items: IMedia[];
};

