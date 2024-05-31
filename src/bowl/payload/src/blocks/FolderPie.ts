import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withColor, withSeoWeight } from './BaseFields';

export const FolderPie: BowlBlock = {
  type: 'withBlock',
  slug: 'folder-pie',
  fields: [
    withColor(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    withSeoWeight(),
    {
      type: 'array', name: 'items', fields: [
        { type: 'withTitle' },
        { type: 'withText', name: 'top' },
        { type: 'withText', name: 'left' },
      ],
    },
  ],
};
