import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';

export const Newsletter: BowlCollection = {
  type: 'withPage',
  slug: slug.newsletter,
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription' },
    { type: 'withMedia' },
  ],
};
