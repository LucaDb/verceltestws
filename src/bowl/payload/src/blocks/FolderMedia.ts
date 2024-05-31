import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withColor, withNavs, withSeoWeight } from './BaseFields';

export const FolderMedia: BowlBlock = {
  type: 'withBlock',
  slug: 'folder-media',
  fields: [
    withColor(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    withSeoWeight(),
    {
      type: 'array', name: 'categories', fields: [
        { type: 'withTitle', required: true },
        {
          type: 'array', name: 'items', fields: [
            { type: 'withMedia' },
            withNavs(1)
          ],
        },
      ],
    },
  ],
};
