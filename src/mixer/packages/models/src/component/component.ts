import { SeoWeight } from '@websolutespa/bom-mixer-models';
import { IAnchor } from '../anchor/anchor';
import { IColorScheme } from '../color-scheme/color-scheme';

export type IComponent = {
  anchor?: IAnchor;
  seoWeight?: SeoWeight;
  colorScheme?: IColorScheme;
  topSpace?: boolean;
  innerSpace?: boolean;
};
