import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withEyelet, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const TextColumns1: BowlBlock = {
  type: 'withBlock',
  slug: 'text-columns-1',
  fields: [
    withEyelet(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    {
      type: 'array', name: 'items', fields: [
        { type: 'number', name: 'counter' },
        { type: 'withTitle' },
        { type: 'withAbstract' },
        { type: 'withDescription' },
      ],
    },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
