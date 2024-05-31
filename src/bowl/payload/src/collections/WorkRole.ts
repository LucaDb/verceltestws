
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { group, slug } from '../config';

export const WorkRole: BowlCollection = {
  type: 'withCollection',
  slug: slug.work_role,
  admin: {
    group: group.content,
    useAsTitle: 'title',
    defaultColumns: ['title', 'id', 'createdAt', 'updatedAt'],
  },
  fields: [
    // inherited fields: id, createdAt, updatedAt
    { type: 'withTitle', required: true },
  ],
};
