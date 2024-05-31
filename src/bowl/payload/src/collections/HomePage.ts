import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { BlogMore1 } from '../blocks/BlogMore1';
import { CoverMain } from '../blocks/CoverMain';
import { IndustryMore } from '../blocks/IndustryMore';
import { ProjectMore } from '../blocks/ProjectMore';
import { SpotlightSlider } from '../blocks/SpotlightSlider';
import { TextBig } from '../blocks/TextBig';
import { slug } from '../config';

export const Homepage: BowlCollection = {
  type: 'withPage',
  slug: slug.homepage,
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withMedia' },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              type: 'withComponents',
              blocks: [CoverMain, TextBig, ProjectMore, IndustryMore, SpotlightSlider, BlogMore1],
            },
          ],
        },
      ],
    },
  ],
};

