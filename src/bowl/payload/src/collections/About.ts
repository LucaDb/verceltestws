
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { CircularSlider } from '../blocks/CircularSlider';
import { Highlights1 } from '../blocks/Highlights1';
import { Intro1 } from '../blocks/Intro1';
import { MediaBox1 } from '../blocks/MediaBox1';
import { Spotlight1 } from '../blocks/Spotlight1';
import { TextColumns1 } from '../blocks/TextColumns1';
import { TextCombo1 } from '../blocks/TextCombo1';
import { TextComboSlider1 } from '../blocks/TextComboSlider1';
import { TitleBox1 } from '../blocks/TitleBox1';
import { slug } from '../config';

export const About: BowlCollection = {
  type: 'withPage',
  slug: slug.about,
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription', required: true },
    { type: 'withMedia', required: true },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Layout',
          fields: [
            {
              type: 'withComponents',
              blocks: [Intro1, MediaBox1, TitleBox1, TextComboSlider1, Spotlight1, TextColumns1, Highlights1, TextCombo1, CircularSlider],
            },
          ],
        },
      ],
    },
  ],
};
