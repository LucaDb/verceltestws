import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withExtendedColorScheme, withInnerSpace, withNavs, withSeoWeight, withTopSpace } from './BaseFields';

export const SideImages1: BowlBlock = {
  type: 'withBlock',
  slug: 'side-images-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withDescription' },
    { type: 'withMedia' },
    { type: 'withMedias', name: 'items' },
    withNavs(1),
    withAnchor(),
    withSeoWeight(),
    withExtendedColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
