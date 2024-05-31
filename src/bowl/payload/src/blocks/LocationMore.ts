import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const LocationMore: BowlBlock = {
  type: 'withBlock',
  slug: 'location-more',
  fields: [
    { type: 'withTitle' },
    { type: 'number', name: 'quantity' },
    { type: 'relationship', name: 'items', relationTo: slug.location_detail, hasMany: true },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
