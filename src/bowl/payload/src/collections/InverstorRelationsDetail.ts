
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';

export const InverstorRelationsDetail: BowlCollection = {
  type: 'withPage',
  slug: 'inverstor_relations_detail',
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'withAbstract', required: true },
    { type: 'withDescription', required: true },
    { type: 'withMedia', required: true },
  ],
};
