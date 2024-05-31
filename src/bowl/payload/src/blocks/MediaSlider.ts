import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const MediaSlider: BowlBlock = {
  type: 'withBlock',
  slug: 'media-slider',
  fields: [
    { type: 'withTitle' },
    {
      type: 'array', name: 'items', fields: [
        { type: 'withTitle' },
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
