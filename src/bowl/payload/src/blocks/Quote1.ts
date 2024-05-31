import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withAuthor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const Quote1: BowlBlock = {
  type: 'withBlock',
  slug: 'quote-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withDescription' },
    withAuthor(),
    { type: 'withMedia' },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
