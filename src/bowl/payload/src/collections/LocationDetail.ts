
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { Callout } from '../blocks/Callout';
import { Carousel1 } from '../blocks/Carousel1';
import { Intro1 } from '../blocks/Intro1';
import { LocationMore } from '../blocks/LocationMore';
import { MediaSlider } from '../blocks/MediaSlider';
import { slug } from '../config';

export const LocationDetail: BowlCollection = {
  type: 'withPage',
  slug: slug.location_detail,
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
              blocks: [Intro1, Callout, MediaSlider, Carousel1, LocationMore],
            },
          ],
        },
      ],
    },
  ],
};
