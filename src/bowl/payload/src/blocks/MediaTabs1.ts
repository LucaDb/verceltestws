import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withNavs, withSeoWeight, withTopSpace } from './BaseFields';

export const MediaTabs1: BowlBlock = {
  type: 'withBlock',
  slug: 'media-tabs-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    { type: 'withMedia' },
    { type: 'withSelect', name: 'layout', options: ['default', 'inline'] },
    { type: 'withCheckbox', name: 'itemsList' },
    { type: 'withCheckbox', name: 'mediaRadius' },
    withNavs(1),
    {
      type: 'array', name: 'items', fields: [
        { type: 'withTitle' },
        { type: 'withAbstract' },
        { type: 'withDescription' },
        { type: 'withMedia' },
      ],
    },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
