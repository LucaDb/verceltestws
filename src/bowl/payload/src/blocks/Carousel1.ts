import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const Carousel1: BowlBlock = {
  type: 'withBlock',
  slug: 'carousel-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'relationship', name: 'items', relationTo: slug.product_detail, hasMany: true },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
