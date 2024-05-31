
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { BlogMore1 } from '../blocks/BlogMore1';
import { Carousel1 } from '../blocks/Carousel1';
import { Gallery1 } from '../blocks/Gallery1';
import { Hero1 } from '../blocks/Hero1';
import { Highlights1 } from '../blocks/Highlights1';
import { MediaTabs1 } from '../blocks/MediaTabs1';
import { More1 } from '../blocks/More1';
import { slug } from '../config';

export const ProductCategory: BowlCollection = {
  type: 'withPage',
  slug: slug.product_category,
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              type: 'withComponents',
              blocks: [Hero1, More1, MediaTabs1, Carousel1, Highlights1, Gallery1, BlogMore1],
            },
          ],
        },
      ],
    },
  ],
};
