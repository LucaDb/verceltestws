import { IMedia } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type IIntro = IComponent & {
  title?: string;
  titleSize?: keyof ITitleSize;
  layout?: 'default' | 'breadcrumb';
  abstract?: string;
  description?: string;
  archived?: boolean;
  media?: IMedia;
  scrollToAnchor?: IScrollTo;
};

export type ITitleSize = {
  md: string;
  lg: string;
};

export type IScrollTo = {
  target: string;
  title: string;
}