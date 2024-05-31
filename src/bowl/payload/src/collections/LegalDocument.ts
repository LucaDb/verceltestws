
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';

export const LegalDocument: BowlCollection = {
  type: 'withPage',
  slug: slug.legal_document,
  fields: [
    // inherited fields: id, title, slug, category, markets, template, meta, status, createdAt, updatedAt
    { type: 'relationship', name: 'legal_notice', relationTo: slug.legal_notice, required: true },
  ],
};
