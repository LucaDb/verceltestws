import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withExtendedColorScheme, withEyelet, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const MediaSplit1: BowlBlock = {
  type: 'withBlock',
  slug: 'media-split-1',
  fields: [
    withEyelet(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    { type: 'withSelect', name: 'layout', options: ['full', 'vertical'] },
    withExtendedColorScheme('mediaColor'),
    { type: 'withMedia' },
    withAnchor(),
    withSeoWeight(),
    withExtendedColorScheme(),
    withTopSpace(),
    withInnerSpace(),
    { type: 'withCheckbox', name: 'swap' },
  ],
};
