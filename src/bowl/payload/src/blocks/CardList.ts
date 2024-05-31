import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withEyelet, withInnerSpace, withNavs, withSeoWeight, withTopSpace } from './BaseFields';

export const CardList: BowlBlock = {
  type: 'withBlock',
  slug: 'card-list',
  fields: [
    withEyelet(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    {
      type: 'array', name: 'items', fields: [
        { type: 'withTitle' },
        { type: 'withAbstract' },
        { type: 'withMedia' },
        withNavs(),
      ],
    },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
