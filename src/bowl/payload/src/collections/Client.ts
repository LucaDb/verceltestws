
import { BowlCollection } from '@websolutespa/payload-plugin-bowl';
import { group, slug } from '../config';

export const Client: BowlCollection = {
  type: 'withCollection',
  slug: slug.client,
  admin: {
    group: group.content,
    useAsTitle: 'title',
    defaultColumns: ['title', 'id', 'fromDate', 'toDate'],
  },
  fields: [
    // inherited fields: id, createdAt, updatedAt
    { type: 'withTitle' },
    { type: 'withDate', name: 'fromDate' },
    { type: 'withDate', name: 'toDate' },
    { type: 'withMedia' },
    {
      type: 'array', name: 'projects', fields: [
        { type: 'withTitle' },
        { type: 'withAbstract' },
        { type: 'withMedia' },
        { type: 'relationship', name: 'tag', relationTo: slug.category, hasMany: true },
        { type: 'relationship', name: 'type', relationTo: slug.category, hasMany: true },
        {
          type: 'array', name: 'features', fields: [
            { type: 'withTitle' },
            {
              type: 'array', name: 'features', fields: [
                { type: 'withTitle' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
