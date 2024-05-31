
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { BlogMore1 } from '../blocks/BlogMore1';
import { Cover1 } from '../blocks/Cover1';
import { Detail1 } from '../blocks/Detail1';
import { Folder1 } from '../blocks/Folder1';
import { Gallery1 } from '../blocks/Gallery1';
import { Spotlight1 } from '../blocks/Spotlight1';
import { TextTabs1 } from '../blocks/TextTabs1';
import { slug } from '../config';

export const ProductDetail: BowlCollection = {
  type: 'withPage',
  slug: slug.product_detail,
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription' },
    { type: 'withMedia' },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              type: 'withComponents',
              blocks: [Cover1, TextTabs1, Folder1, Spotlight1, Gallery1, Detail1, BlogMore1],
            },
          ],
        },
      ],
    },
  ],
};
