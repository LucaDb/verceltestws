import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const MediaLoop: BowlBlock = {
  type: 'withBlock',
  slug: 'media-loop',
  fields: [
    { type: 'withMedias', name: 'items' },
    { type: 'number', name: 'speed' },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
    { type: 'withCheckbox', name: 'wrapper' },
  ],
};
