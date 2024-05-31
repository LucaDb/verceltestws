import { BowlBlock } from '@websolutespa/payload-plugin-bowl';
import { slug } from '../config';

export const CulturaCallout: BowlBlock = {
  type: 'withBlock',
  slug: 'cultura-callout',
  fields: [
    { type: 'relationship', name: 'banner', relationTo: slug.banner, hasMany: false },
  ],
};
