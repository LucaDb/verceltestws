
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';

export const InverstorRelationsIndex: BowlCollection = {
  type: 'withPage',
  slug: 'inverstor_relations_index',
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription', required: true },
    { type: 'withMedia', required: true },
  ],
};
