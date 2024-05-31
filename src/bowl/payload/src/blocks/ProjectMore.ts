import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';
import { withAnchor, withColorScheme, withInnerSpace, withNavs, withSeoWeight, withTopSpace } from './BaseFields';

export const ProjectMore: BowlBlock = {
  type: 'withBlock',
  slug: 'project-more',
  fields: [
    { type: 'withTitle' },
    { type: 'number', name: 'quantity' },
    { type: 'relationship', name: 'items', relationTo: slug.project_detail, hasMany: true },
    withNavs(),
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
