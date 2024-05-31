import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const MediaYoutube: BowlBlock = {
  type: 'withBlock',
  slug: 'media-youtube',
  fields: [
    { type: 'withTitle' },
    { type: 'withText', name: 'src', required: true },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
