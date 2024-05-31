import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const MediaVideo: BowlBlock = {
  type: 'withBlock',
  slug: 'media-video',
  fields: [
    { type: 'withMedia' },
    { type: 'withMedia', name: 'thumb' },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
    { type: 'withCheckbox', name: 'wrapper' },
  ],
};
