import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withEyelet, withInnerSpace, withNavs, withSeoWeight, withTopSpace } from './BaseFields';

export const TextCombo1: BowlBlock = {
  type: 'withBlock',
  slug: 'text-combo-1',
  fields: [
    withEyelet(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    { type: 'withMedia' },
    { type: 'withMedias', name: 'mediaSmall' },
    withNavs(),
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
    { type: 'withCheckbox', name: 'dots' },
    { type: 'withCheckbox', name: 'swap' },
    { type: 'withCheckbox', name: 'mediaRadius' },
  ],
};
