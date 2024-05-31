import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withEyelet, withInnerSpace, withNavs, withSeoWeight, withTopSpace } from './BaseFields';

export const TextList: BowlBlock = {
  type: 'withBlock',
  slug: 'text-list',
  fields: [
    withEyelet(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    {
      type: 'array', name: 'items', fields: [
        { type: 'withTitle' },
        { type: 'withAbstract' },
        { type: 'withDescription' },
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
