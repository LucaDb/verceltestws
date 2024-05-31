import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const CoverMain: BowlBlock = {
  type: 'withBlock',
  slug: 'cover-main',
  fields: [
    { type: 'withTitle' },
    { type: 'withMedias', name: 'items' },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
