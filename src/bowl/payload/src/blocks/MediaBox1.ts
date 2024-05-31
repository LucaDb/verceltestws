import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withExtendedColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const MediaBox1: BowlBlock = {
  type: 'withBlock',
  slug: 'media-box-1',
  fields: [
    { type: 'withSelect', name: 'layout', options: ['vertical', 'horizontal'] },
    { type: 'withMedia' },
    { type: 'withMedias', name: 'items' },
    withAnchor(),
    withSeoWeight(),
    withExtendedColorScheme(),
    withTopSpace(),
    withInnerSpace(),
    { type: 'withCheckbox', name: 'wrapper' },
  ],
};
