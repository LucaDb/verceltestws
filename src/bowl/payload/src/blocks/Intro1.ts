import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';

export const Intro1: BowlBlock = {
  type: 'withBlock',
  slug: 'intro-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withSelect', name: 'titleSize', options: ['md', 'lg'] },
    { type: 'withSelect', name: 'layout', options: ['default', 'breadcrumb'] },
    { type: 'withAbstract' },
    { type: 'withDescription' },
    { type: 'withCheckbox', name: 'archived' },
    { type: 'withMedia' },
    {
      type: 'group', name: 'scrollToAnchor', fields: [
        { type: 'withText', name: 'target' },
        { type: 'withTitle' },
      ]
    },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
