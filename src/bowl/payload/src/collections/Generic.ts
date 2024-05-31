
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';

export const Generic: BowlCollection = {
  type: 'withPage',
  slug: 'generic',
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription', required: true },
    { type: 'withMedia', required: true },
  ],
};
