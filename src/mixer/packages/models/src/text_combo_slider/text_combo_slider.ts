import { IMedia } from '@websolutespa/bom-core';
import { IComponent } from '../component/component';

export type ITextComboSlider = IComponent & {
  eyelet?: string;
  title?: string;
  abstract?: string;
  description?: string;
  items?: ITextComboSliderCard[];
};

export type ITextComboSliderCard = {
  eyelet?: string;
  title?: string;
  abstract?: string;
  description?: string;
  media: IMedia;
};
