import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withEyelet, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const MediaSliderGrid: BowlBlock = {
  type: 'withBlock',
  slug: 'media-slider-grid',
  fields: [
    withEyelet(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    {
      type: 'array', name: 'items', fields: [
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
