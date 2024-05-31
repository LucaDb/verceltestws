import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const More1: BowlBlock = {
  type: 'withBlock',
  slug: 'more-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
