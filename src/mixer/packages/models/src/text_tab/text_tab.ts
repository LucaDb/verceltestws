import { SeoWeight } from '@websolutespa/bom-mixer-models';
import { IColor } from '../color/color';
import { IComponent } from '../component/component';

export type ITextTabs = IComponent & {
  title: string;
  abstract?: string;
  colorData?: IColor;
  items?: ITextTab[]
};

export type ITextTab = {
  seoWeight?: SeoWeight;
  title: string;
  abstract?: string;
  colorData?: IColor;
  active?: boolean;
};
