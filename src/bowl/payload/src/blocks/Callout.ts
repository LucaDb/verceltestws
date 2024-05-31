import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withNavs, withSeoWeight, withTopSpace } from './BaseFields';

export const Callout: BowlBlock = {
  type: 'withBlock',
  slug: 'callout',
  fields: [
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    { type: 'relationship', name: 'banner', relationTo: 'banner', hasMany: false },
    withNavs(),
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
    { type: 'withCheckbox', name: 'swap' },
  ],
};
