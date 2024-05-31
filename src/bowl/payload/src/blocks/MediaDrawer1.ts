import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withExtendedColorScheme, withEyelet, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const MediaDrawer1: BowlBlock = {
  type: 'withBlock',
  slug: 'media-drawer-1',
  fields: [
    withEyelet(),
    { type: 'withAbstract' },
    { type: 'withMedia' },
    {
      type: 'array', name: 'modal', maxRows: 1, fields: [
        { type: 'withTitle' },
        { type: 'withAbstract' },
        { type: 'withDescription' },
      ],
    },
    withAnchor(),
    withSeoWeight(),
    withExtendedColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
