import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withColor, withSeoWeight } from './BaseFields';

export const FolderAccordion: BowlBlock = {
  type: 'withBlock',
  slug: 'folder-accordion',
  fields: [
    withColor(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    withSeoWeight(),
    {
      type: 'array', name: 'items', fields: [
        { type: 'withTitle', required: true },
        { type: 'withAbstract' },
        withColor(),
        { type: 'withCheckbox', name: 'active' },
      ],
    },
  ],
};
