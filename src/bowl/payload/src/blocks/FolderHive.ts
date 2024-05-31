import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withColor, withSeoWeight } from './BaseFields';

export const FolderHive: BowlBlock = {
  type: 'withBlock',
  slug: 'folder-hive',
  fields: [
    withColor(),
    { type: 'withTitle' },
    { type: 'withAbstract' },
    withSeoWeight(),
    {
      type: 'array', name: 'items', fields: [
        { type: 'withTitle', required: true },
        { type: 'withAbstract' },
      ],
    },
  ],
};
