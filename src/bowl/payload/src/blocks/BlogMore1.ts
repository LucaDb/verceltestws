import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const BlogMore1: BowlBlock = {
  type: 'withBlock',
  slug: 'blog-more-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    { type: 'number', name: 'quantity' },
    { type: 'withCheckbox', name: 'cta' },
    { type: 'relationship', name: 'items', relationTo: slug.cultura_detail, hasMany: true },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
