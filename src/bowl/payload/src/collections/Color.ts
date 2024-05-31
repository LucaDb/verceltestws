import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { group, slug } from '../config';

export const Color: BowlCollection = {
  type: 'withCollection',
  slug: slug.color,
  admin: {
    group: group.content,
    useAsTitle: 'title',
    defaultColumns: ['title', 'className', 'id', 'createdAt', 'updatedAt'],
  },
  fields: [
    // inherited fields: id, createdAt, updatedAt
    { type: 'withTitle', required: true },
    { type: 'withText', name: 'className', required: true },
  ],
};
