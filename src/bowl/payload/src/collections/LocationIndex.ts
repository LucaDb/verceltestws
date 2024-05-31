
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';

export const LocationIndex: BowlCollection = {
  type: 'withPage',
  slug: slug.location_index,
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription', required: true },
    { type: 'withMedia', required: true },
  ],
};
