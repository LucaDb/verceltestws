
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { withAuthor, withColor, withDate } from '../blocks/BaseFields';
import { CulturaCallout } from '../blocks/CulturaCallout';
import { CulturaContent } from '../blocks/CulturaContent';
import { CulturaImage } from '../blocks/CulturaImage';
import { CulturaSlider } from '../blocks/CulturaSlider';
import { CulturaVideo } from '../blocks/CulturaVideo';
import { CulturaYoutube } from '../blocks/CulturaYoutube';
import { slug } from '../config';

export const CulturaDetail: BowlCollection = {
  type: 'withPage',
  slug: slug.cultura_detail,
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract' },
    { type: 'withDescription' },
    withDate(),
    { type: 'withMedia' },
    {
      type: 'withMedia', name: 'thumb', admin: {
        description: () =>
          'Compilare solo se diversa dall\'immagine principale',
      },
    },
    { type: 'relationship', name: 'type', relationTo: slug.category, hasMany: false },
    { type: 'relationship', name: 'tag', relationTo: slug.category, hasMany: true },
    { type: 'withSelect', name: 'layout', options: ['default', 'big', 'editorial'] },
    withAuthor(),
    withColor(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              type: 'withComponents',
              blocks: [CulturaContent, CulturaImage, CulturaCallout, CulturaSlider, CulturaVideo, CulturaYoutube],
            },
          ],
        },
      ],
    },
  ],
};
