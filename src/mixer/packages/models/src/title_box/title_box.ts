import { IMedia } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type ITitleBox = IComponent & {
  eyelet?: string;
  title?: string,
  description?: string,
  abstract?: string;
  media?: IMedia;
};
