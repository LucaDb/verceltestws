
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { withColorScheme } from '../blocks/BaseFields';
import { BlogMore1 } from '../blocks/BlogMore1';
import { Detail1 } from '../blocks/Detail1';
import { Gallery1 } from '../blocks/Gallery1';
import { Highlights1 } from '../blocks/Highlights1';
import { Intro1 } from '../blocks/Intro1';
import { MediaBox1 } from '../blocks/MediaBox1';
import { MediaLoop } from '../blocks/MediaLoop';
import { MediaYoutube } from '../blocks/MediaYoutube';
import { TextColumns1 } from '../blocks/TextColumns1';
import { TextCombo1 } from '../blocks/TextCombo1';

export const IndustryDetail: BowlCollection = {
  type: 'withPage',
  slug: 'industry_detail',
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription', required: true },
    { type: 'withMedia', required: true },
    { type: 'withMedias', name: 'gallery' },
    withColorScheme(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              type: 'withComponents',
              blocks: [Intro1, MediaYoutube, MediaLoop, MediaBox1, TextCombo1, Detail1, TextColumns1, Highlights1, Gallery1, BlogMore1],
            },
          ],
        },
      ],
    },
  ],
};
