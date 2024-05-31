import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const Cover1: BowlBlock = {
  type: 'withBlock',
  slug: 'cover-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withMedia' },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
