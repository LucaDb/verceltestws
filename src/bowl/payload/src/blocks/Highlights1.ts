import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';
import { withAnchor, withColorScheme, withEyelet, withInnerSpace, withNavs, withSeoWeight, withTopSpace } from './BaseFields';

export const Highlights1: BowlBlock = {
  type: 'withBlock',
  slug: 'highlights-1',
  fields: [
    withEyelet(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    { type: 'relationship', name: 'clients', relationTo: slug.client, hasMany: true },
    withNavs(),
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
