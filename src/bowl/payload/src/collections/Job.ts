
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { CardList } from '../blocks/CardList';
import { Intro1 } from '../blocks/Intro1';
import { MediaBox1 } from '../blocks/MediaBox1';
import { MediaSliderGrid } from '../blocks/MediaSliderGrid';
import { MediaTabs1 } from '../blocks/MediaTabs1';
import { TextComboSlider1 } from '../blocks/TextComboSlider1';
import { TextList } from '../blocks/TextList';
import { slug } from '../config';

export const Job: BowlCollection = {
  type: 'withPage',
  slug: slug.job,
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
              blocks: [Intro1, MediaSliderGrid, MediaBox1, TextList, MediaTabs1, TextComboSlider1, CardList],
            },
          ],
        },
      ],
    },
  ],
};
