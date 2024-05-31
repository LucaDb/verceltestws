import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const Hero1: BowlBlock = {
  type: 'withBlock',
  slug: 'hero-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withMedia' },
    { type: 'withSelect', name: 'layout', options: ['default', 'masked'] },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
