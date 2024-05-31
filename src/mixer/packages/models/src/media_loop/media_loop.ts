import { IMedia } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type IMediaLoop = IComponent & {
  wrapper: boolean;
  items?: IMedia[];
  speed?: number;
};

