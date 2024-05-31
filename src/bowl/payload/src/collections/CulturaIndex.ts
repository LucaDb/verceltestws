
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';

export const CulturaIndex: BowlCollection = {
  type: 'withPage',
  slug: slug.cultura_index,
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription', required: true },
    { type: 'withMedia', required: true },
  ],
};
