import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const Gallery1: BowlBlock = {
  type: 'withBlock',
  slug: 'gallery-1',
  fields: [
    { type: 'withTitle' },
    { type: 'relationship', name: 'items', relationTo: slug.project_detail, hasMany: true },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
