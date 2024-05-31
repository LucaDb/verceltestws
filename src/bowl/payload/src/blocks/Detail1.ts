import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const Detail1: BowlBlock = {
  type: 'withBlock',
  slug: 'detail-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withAbstract' },
    {
      type: 'group', name: 'list', fields: [
        { type: 'withTitle' },
        { type: 'withAbstract' },
        {
          type: 'array', name: 'items', fields: [
            { type: 'withTitle' },
          ],
        },
      ],
    },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
    { type: 'withCheckbox', name: 'bottomBorder' },
    { type: 'withCheckbox', name: 'swap' },
  ],
};
