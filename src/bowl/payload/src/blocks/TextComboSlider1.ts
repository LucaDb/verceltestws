import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withEyelet, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const TextComboSlider1: BowlBlock = {
  type: 'withBlock',
  slug: 'text-combo-slider-1',
  fields: [
    withEyelet(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    { type: 'withMedia' },
    {
      type: 'array', name: 'items', fields: [
        withEyelet(),
        { type: 'withTitle' },
        { type: 'withAbstract' },
        { type: 'withDescription' },
        { type: 'withMedia' },
      ],
    },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
