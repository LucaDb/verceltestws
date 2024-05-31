import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';
import { withAnchor, withColorScheme, withInnerSpace, withNavs, withSeoWeight, withTopSpace } from './BaseFields';

export const IndustryMore: BowlBlock = {
  type: 'withBlock',
  slug: 'industry-more',
  fields: [
    { type: 'withTitle' },
    { type: 'number', name: 'quantity' },
    { type: 'relationship', name: 'items', relationTo: slug.industry_detail, hasMany: true },
    withNavs(),
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
