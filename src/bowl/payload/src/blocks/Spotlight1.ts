import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';
import { withAnchor, withColorScheme, withInnerSpace, withNavs, withSeoWeight, withTopSpace } from './BaseFields';

export const Spotlight1: BowlBlock = {
  type: 'withBlock',
  slug: 'spotlight-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    { type: 'withSelect', name: 'layout', options: ['grid', 'line'] },
    { type: 'relationship', name: 'companies', relationTo: slug.company, hasMany: true },
    withNavs(),
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
