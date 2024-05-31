import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const TextTabs1: BowlBlock = {
  type: 'withBlock',
  slug: 'text-tabs-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withAbstract' },
    withColor(),
    {
      type: 'array', name: 'items', fields: [
        { type: 'withTitle' },
        { type: 'withAbstract' },
        withColor(),
        withSeoWeight(),
        { type: 'withCheckbox', name: 'active' },
      ],
    },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
