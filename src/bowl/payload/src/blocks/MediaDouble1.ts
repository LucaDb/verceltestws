import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const MediaDouble1: BowlBlock = {
  type: 'withBlock',
  slug: 'media-double-1',
  fields: [
    { type: 'withMedias', name: 'items' },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
    { type: 'withCheckbox', name: 'wrapper' },
  ],
};
