import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';
import { withAnchor, withColorScheme, withEyelet, withInnerSpace, withNavs, withSeoWeight, withTopSpace } from './BaseFields';

export const SpotlightSlider: BowlBlock = {
  type: 'withBlock',
  slug: 'spotlight-slider',
  fields: [
    withEyelet(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    { type: 'relationship', name: 'companies', relationTo: slug.company, hasMany: true },
    { type: 'number', name: 'startingIndex' },
    withNavs(),
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
