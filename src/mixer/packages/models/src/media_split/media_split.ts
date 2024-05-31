import { IColorScheme } from '@websolute/models';
import { IMedia } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type IMediaSplit = IComponent & {
  eyelet: string;
  abstract: string;
  title: string;
  description: string;
  swap: boolean;
  layout: IMediaSplitLayout,
  mediaColor: IColorScheme;
  media: IMedia;
};

export type IMediaSplitLayout = 'full' | 'vertical';
