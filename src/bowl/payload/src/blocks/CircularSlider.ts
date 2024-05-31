import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withEyelet, withInnerSpace, withNavs, withSeoWeight, withTopSpace } from './BaseFields';

export const CircularSlider: BowlBlock = {
  type: 'withBlock',
  slug: 'circular-slider',
  fields: [
    withEyelet(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    { type: 'withMedias', name: 'items', minRows: 10, maxRows: 12 },
    withNavs(),
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
