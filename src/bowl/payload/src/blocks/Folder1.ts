import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { withAnchor, withColorScheme, withInnerSpace, withSeoWeight, withTopSpace } from './BaseFields';
import { FolderAccordion } from './FolderAccordion';
import { FolderHive } from './FolderHive';
import { FolderMedia } from './FolderMedia';
import { FolderPie } from './FolderPie';

export const Folder1: BowlBlock = {
  type: 'withBlock',
  slug: 'folder-1',
  fields: [
    { type: 'withTitle' },
    { type: 'withAbstract' },
    { type: 'withComponents', blocks: [FolderPie, FolderAccordion, FolderHive, FolderMedia] },
    withAnchor(),
    withSeoWeight(),
    withColorScheme(),
    withTopSpace(),
    withInnerSpace(),
  ],
};
