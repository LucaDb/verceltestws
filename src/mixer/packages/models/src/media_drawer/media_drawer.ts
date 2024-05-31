import { IMedia } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type IMediaDrawer = IComponent & {
  eyelet: string;
  abstract: string;
  media: IMedia;
  modal: IMediaDrawerModal[];
};

export type IMediaDrawerModal = {
  title: string;
  abstract: string;
  description: string;
};
