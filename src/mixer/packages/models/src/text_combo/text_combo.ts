import { IMedia, IMenuItem } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type ITextCombo = IComponent & {
  dots?: boolean;
  swap?: boolean;
  mediaRadius?: boolean;
  eyelet: string;
  title: string,
  description: string,
  abstract: string;
  media?: IMedia;
  mediaSmall: IMedia[];
  navs: IMenuItem[];
};
